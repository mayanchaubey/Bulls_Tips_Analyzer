from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict
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


@router.post("/factcheck", response_model=FactCheckResponse)
async def factcheck(request: FactCheckRequest):
    url = request.youtube_url.strip()

    # ✅ Basic validation
    if not url or ("youtube.com" not in url and "youtu.be" not in url):
        raise HTTPException(status_code=400, detail="Invalid YouTube URL")

    # ✅ Log fallback mode
    logger.warning("FactCheck fallback mode active - pipeline disabled")

    # ✅ Fallback response
    fallback_claim = Claim(
        claim="Fact-checking temporarily unavailable",
        verdict="unverifiable",
        explanation="FactCheck system is being upgraded. Please try again later.",
        source="MarketMind System"
    )

    fallback_summary = {
        "verified": 0,
        "misleading": 0,
        "false": 0,
        "unverifiable": 1
    }

    return FactCheckResponse(
        claims=[fallback_claim],
        summary=fallback_summary
    )