"""
MarketMind AI — Finfluencer Fact-Checker Router
POST /api/factcheck — verifies YouTube video claims
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
import time
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class FactCheckRequest(BaseModel):
    youtube_url: str

class Claim(BaseModel):
    claim: str
    verdict: str  # "verified", "misleading", "false", "unverifiable"
    explanation: str
    source: str

class FactCheckResponse(BaseModel):
    claims: List[Claim]
    summary: Dict[str, int]
    processing_time: Optional[float] = None

@router.post("/factcheck", response_model=FactCheckResponse)
async def factcheck(request: FactCheckRequest):
    """
    Verify YouTube video claims against market data.
    
    Steps:
    1. Fetch transcript from YouTube
    2. Filter for financial content
    3. Verify claims using RAG against Pinecone
    4. Return structured verdict
    """
    url = request.youtube_url.strip()
    
    # Validate URL
    if not url or ("youtube.com" not in url and "youtu.be" not in url):
        raise HTTPException(
            status_code=400, 
            detail="Invalid YouTube URL. Please provide a valid youtube.com or youtu.be link."
        )
    
    start_time = time.time()
    logger.info(f"[FactCheck] Processing URL: {url}")
    
    try:
        # Import the RAG service functions
        from rag_pipeline.rag_service import generate_answer, get_rag_status
        from rag_pipeline.stage1_ingestion.ingestion import load_youtube_transcript
        from rag_pipeline.stage1_ingestion.preprocessing import run_cleaning
        
        # Check if RAG is initialized
        status = get_rag_status()
        if not status.get("initialized", False):
            logger.error("[FactCheck] RAG service not initialized")
            raise HTTPException(
                status_code=503,
                detail="RAG service not initialized. Please check server logs."
            )
        
        # Step 1: Fetch transcript
        logger.info(f"[FactCheck] Fetching transcript...")
        try:
            docs = load_youtube_transcript(
                youtube_url=url,
                video_title="FinFluencer Video",
                channel_name="Unknown"
            )
        except Exception as e:
            logger.error(f"[FactCheck] Transcript fetch failed: {e}")
            processing_time = round(time.time() - start_time, 2)
            return FactCheckResponse(
                claims=[Claim(
                    claim="Could not fetch video transcript",
                    verdict="unverifiable",
                    explanation=f"Unable to get captions from this video. Error: {str(e)[:100]}",
                    source="YouTube API"
                )],
                summary={"verified": 0, "misleading": 0, "false": 0, "unverifiable": 1},
                processing_time=processing_time
            )
        
        if not docs:
            processing_time = round(time.time() - start_time, 2)
            return FactCheckResponse(
                claims=[Claim(
                    claim="No transcript available",
                    verdict="unverifiable",
                    explanation="This video does not have captions or transcript enabled.",
                    source="YouTube"
                )],
                summary={"verified": 0, "misleading": 0, "false": 0, "unverifiable": 1},
                processing_time=processing_time
            )
        
        logger.info(f"[FactCheck] Fetched {len(docs)} transcript chunks")
        
        # Step 2: Clean and filter for financial content
        try:
            clean_docs = run_cleaning(docs)
        except Exception as e:
            logger.error(f"[FactCheck] Cleaning failed: {e}")
            processing_time = round(time.time() - start_time, 2)
            return FactCheckResponse(
                claims=[Claim(
                    claim="Could not process transcript",
                    verdict="unverifiable",
                    explanation=f"Transcript processing error: {str(e)[:100]}",
                    source="Content Filter"
                )],
                summary={"verified": 0, "misleading": 0, "false": 0, "unverifiable": 1},
                processing_time=processing_time
            )
        
        if not clean_docs:
            processing_time = round(time.time() - start_time, 2)
            return FactCheckResponse(
                claims=[Claim(
                    claim="Non-financial content detected",
                    verdict="unverifiable",
                    explanation="This video does not appear to contain market-related financial content.",
                    source="Content Filter"
                )],
                summary={"verified": 0, "misleading": 0, "false": 0, "unverifiable": 1},
                processing_time=processing_time
            )
        
        logger.info(f"[FactCheck] After cleaning: {len(clean_docs)} documents")
        
        # Step 3: Extract main claim from transcript
        combined_text = " ".join([doc.page_content for doc in clean_docs[:5]])
        claim_text = combined_text[:300] + "..." if len(combined_text) > 300 else combined_text
        
        logger.info(f"[FactCheck] Extracted claim: {claim_text[:100]}...")
        
        # Step 4: Run factcheck using your existing generate_answer()
        try:
            result = generate_answer(claim_text, mode="factcheck")
            answer = result.get("answer", "")
            sources = result.get("sources", [])
            
            logger.info(f"[FactCheck] Got answer from RAG, length: {len(answer)}")
            
            # Step 5: Parse verdict from answer
            verdict = "unverifiable"
            answer_upper = answer.upper()
            
            if "VERIFIED" in answer_upper and "FALSE" not in answer_upper and "MISLEADING" not in answer_upper:
                verdict = "verified"
            elif "FALSE" in answer_upper:
                verdict = "false"
            elif "MISLEADING" in answer_upper:
                verdict = "misleading"
            
            # Extract explanation (look for EXPLANATION section)
            explanation = answer
            if "EXPLANATION:" in answer_upper:
                idx = answer_upper.find("EXPLANATION:")
                explanation = answer[idx + len("EXPLANATION:"):].strip()
            elif "EVIDENCE:" in answer_upper:
                idx = answer_upper.find("EVIDENCE:")
                explanation = answer[idx:].strip()
            
            # Limit explanation length
            explanation = explanation[:500]
            
            # Build source attribution
            source_text = "MarketMind RAG"
            if sources:
                source_names = list(set([s.get("source", "unknown") for s in sources[:2]]))
                if source_names:
                    source_text = f"MarketMind RAG ({', '.join(source_names)})"
            
            processing_time = round(time.time() - start_time, 2)
            logger.info(f"[FactCheck] ✓ Verdict: {verdict} in {processing_time}s")
            
            return FactCheckResponse(
                claims=[Claim(
                    claim=claim_text,
                    verdict=verdict,
                    explanation=explanation,
                    source=source_text
                )],
                summary={
                    "verified": 1 if verdict == "verified" else 0,
                    "misleading": 1 if verdict == "misleading" else 0,
                    "false": 1 if verdict == "false" else 0,
                    "unverifiable": 1 if verdict == "unverifiable" else 0
                },
                processing_time=processing_time
            )
            
        except Exception as e:
            logger.error(f"[FactCheck] RAG verification failed: {e}", exc_info=True)
            processing_time = round(time.time() - start_time, 2)
            return FactCheckResponse(
                claims=[Claim(
                    claim=claim_text,
                    verdict="unverifiable",
                    explanation=f"Verification service error: {str(e)[:100]}",
                    source="RAG Pipeline"
                )],
                summary={"verified": 0, "misleading": 0, "false": 0, "unverifiable": 1},
                processing_time=processing_time
            )
    
    except HTTPException:
        raise
    except ImportError as e:
        logger.error(f"[FactCheck] Import error: {e}")
        processing_time = round(time.time() - start_time, 2)
        return FactCheckResponse(
            claims=[Claim(
                claim="Service not configured",
                verdict="unverifiable",
                explanation="Required modules not available. Please check installation.",
                source="System"
            )],
            summary={"verified": 0, "misleading": 0, "false": 0, "unverifiable": 1},
            processing_time=processing_time
        )
    except Exception as e:
        logger.error(f"[FactCheck] Unexpected error: {e}", exc_info=True)
        processing_time = round(time.time() - start_time, 2)
        return FactCheckResponse(
            claims=[Claim(
                claim="Service temporarily unavailable",
                verdict="unverifiable",
                explanation=f"Error: {str(e)[:100]}",
                source="System"
            )],
            summary={"verified": 0, "misleading": 0, "false": 0, "unverifiable": 1},
            processing_time=processing_time
        )