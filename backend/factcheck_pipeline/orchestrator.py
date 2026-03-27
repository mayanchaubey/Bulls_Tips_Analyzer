"""
Orchestrates the new MarketMind fact-checking pipeline.
"""

import logging
import os
from functools import lru_cache
from typing import Dict, List

from groq import Groq

from .claim_extractor import extract_claims
from .claim_verifier import verify_claim
from .transcript_handler import get_transcript_text

logger = logging.getLogger(__name__)


@lru_cache(maxsize=1)
def _get_groq_client():
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise RuntimeError("GROQ_API_KEY is not configured.")
    return Groq(api_key=api_key)


def run_factcheck(youtube_url: str, max_claims: int = 5) -> Dict:
    """
    Main orchestrator for fact-check pipeline.
    """

    # STEP 1 — Get transcript
    transcript_text, metadata = get_transcript_text(youtube_url)

    if not transcript_text:
        raise RuntimeError("No transcript or fallback content available.")

    client = _get_groq_client()

    # STEP 2 — Extract claims
    claims_text = extract_claims(
        transcript_text,
        groq_client=client,
        max_claims=max_claims,
    )

    if not claims_text:
        logger.warning("No claims extracted from transcript.")
        return {
            "claims": [],
            "summary": {"verified": 0, "misleading": 0, "false": 0, "unverifiable": 0},
        }

    # Ensure it's always a list
    if not isinstance(claims_text, list):
        claims_text = [str(claims_text)]

    # STEP 3 — Verify each claim
    verified_claims: List[Dict] = []
    context_snippet = transcript_text[:2500]

    for claim_text in claims_text:
        try:
            verification = verify_claim(
                claim_text,
                groq_client=client,
                context_snippet=context_snippet,
            )

            # 🛡️ SAFETY: ensure dict output
            if not isinstance(verification, dict):
                logger.warning(f"Invalid verification output for claim: {claim_text}")
                verification = {
                    "verdict": "unverifiable",
                    "explanation": str(verification),
                    "source": "MarketMind fallback",
                }

            # Normalize verdict
            verdict = verification.get("verdict", "unverifiable")
            if not isinstance(verdict, str):
                verdict = "unverifiable"

            verdict = verdict.lower().strip()

            if verdict not in ["verified", "misleading", "false", "unverifiable"]:
                verdict = "unverifiable"

            verified_claims.append({
                "claim": claim_text,
                "verdict": verdict,
                "explanation": verification.get("explanation", ""),
                "source": verification.get("source", "MarketMind FactCheck LLM"),
            })

        except Exception as e:
            logger.error(f"Error verifying claim: {claim_text} | Error: {e}")

            # fallback for failed verification
            verified_claims.append({
                "claim": claim_text,
                "verdict": "unverifiable",
                "explanation": "Error during verification",
                "source": "MarketMind error handler",
            })

    # STEP 4 — Build summary
    summary = {"verified": 0, "misleading": 0, "false": 0, "unverifiable": 0}

    for item in verified_claims:
        v = item["verdict"]
        if v not in summary:
            v = "unverifiable"
        summary[v] += 1

    logger.info("FactCheck pipeline extracted %d claims", len(verified_claims))

    # FINAL OUTPUT (STRICT STRUCTURE)
    return {
        "claims": verified_claims,
        "summary": summary,
    }