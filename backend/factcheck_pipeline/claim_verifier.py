"""
Verifies a single claim using the Groq LLM without Pinecone/RAG.
"""
import json
import logging

ALLOWED_VERDICTS = {"verified", "misleading", "false", "unverifiable"}
VERDICT_PROMPT = """You are MarketMind FactCheck Verifier.
Determine whether the following claim is VERIFIED, MISLEADING, FALSE, or UNVERIFIABLE against the context of Indian markets.
Respond with JSON, for example: {"verdict": "VERIFIED", "explanation": "..."}. Stick to the format.

Claim:
{claim}
"""

logger = logging.getLogger(__name__)


def verify_claim(claim: str, groq_client, context_snippet: str = "") -> dict:
    if not claim:
        raise ValueError("Claim is required for verification.")

    prompt_context = f"{context_snippet}\n" if context_snippet else ""
    system = "You are MarketMind FactCheck. Use the context to verify the claim."
    user_content = f"{VERDICT_PROMPT.format(claim=claim)}{prompt_context}"

    try:
        response = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": user_content},
            ],
            temperature=0.2,
            max_tokens=400,
            stream=False,
        )
    except Exception as exc:
        logger.error("Groq verifier failed: %s", exc)
        return {"verdict": "unverifiable", "explanation": "Verification service temporarily unavailable."}

    content = response.choices[0].message.content.strip()
    verdict = "unverifiable"
    explanation = content

    try:
        parsed = json.loads(content)
        verdict_raw = parsed.get("verdict", "")
        explanation = parsed.get("explanation", explanation)
        if isinstance(verdict_raw, str):
            verdict_lower = verdict_raw.strip().lower()
            verdict = verdict_lower if verdict_lower in ALLOWED_VERDICTS else "unverifiable"
    except json.JSONDecodeError:
        upper = content.upper()
        if "VERIFIED" in upper and "FALSE" not in upper:
            verdict = "verified"
        elif "MISLEADING" in upper:
            verdict = "misleading"
        elif "FALSE" in upper:
            verdict = "false"

    if verdict not in ALLOWED_VERDICTS:
        verdict = "unverifiable"

    explanation = explanation.strip()
    if len(explanation) > 500:
        explanation = explanation[:500] + "..."

    return {
        "verdict": verdict,
        "explanation": explanation,
        "source": "MarketMind FactCheck LLM"
    }
