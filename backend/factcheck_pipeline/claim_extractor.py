"""
Claim extraction for FactCheck pipeline.
Uses Groq LLM to distill transcripts into short factual claims.
"""
import json
import logging
from typing import List

MAX_TRANSCRIPT_CHARS = 3800
CLAIM_PROMPT_TEMPLATE = """You are MarketMind FactCheck Claim Extractor.
Given the transcript below, extract between 3 to 5 concise, financial claims that a finfluencer made.
Only return the claims — do not provide additional commentary.
Respond with JSON, for example: {"claims": ["claim 1", "claim 2"]}.

Transcript:
{transcript}
"""

logger = logging.getLogger(__name__)


def extract_claims(transcript_text: str, groq_client, max_claims: int = 5) -> List[str]:
    if not transcript_text or not transcript_text.strip():
        raise ValueError("Transcript text is required for claim extraction.")

    transcript_snippet = transcript_text.strip()
    if len(transcript_snippet) > MAX_TRANSCRIPT_CHARS:
        transcript_snippet = transcript_snippet[:MAX_TRANSCRIPT_CHARS] + "..."

    system_prompt = "You are MarketMind FactCheck Claim Extractor. Your job is to distill the transcript into a small list of factual claims."
    user_prompt = CLAIM_PROMPT_TEMPLATE.format(transcript=transcript_snippet)

    response = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.2,
        max_tokens=400,
        stream=False,
    )

    content = response.choices[0].message.content.strip()
    claims = []

    try:
        parsed = json.loads(content)
        if isinstance(parsed, dict):
            claims = parsed.get("claims", [])
        elif isinstance(parsed, list):
            claims = parsed
    except json.JSONDecodeError:
        lines = [
            line.strip().lstrip("0123456789.) -")
            for line in content.splitlines()
            if line.strip()
        ]
        claims = [line for line in lines if line]

    cleaned = []
    for claim in claims:
        text = claim.strip()
        if text:
            cleaned.append(text)
        if len(cleaned) >= max_claims:
            break

    if not cleaned:
        logger.warning("Groq claim extractor returned no structured claims. Falling back to raw transcript snippet.")
        fallback = transcript_snippet.split(". ")
        for sentence in fallback:
            sentence = sentence.strip()
            if len(sentence) > 30:
                cleaned.append(sentence)
            if len(cleaned) >= max_claims:
                break

    return cleaned[:max_claims]
