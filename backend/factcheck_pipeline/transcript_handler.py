"""
Transcript handler for the MarketMind FactCheck pipeline.
Responsible for loading captions via the existing ingestion helpers and
falling back to metadata when transcripts are unavailable.
"""
import html
import logging
import re
from urllib.parse import quote_plus

import requests

from rag_pipeline.stage1_ingestion.ingestion import load_youtube_transcript

logger = logging.getLogger(__name__)


def _fetch_video_metadata(youtube_url: str) -> dict:
    metadata = {}
    try:
        resp = requests.get(
            f"https://www.youtube.com/oembed?url={quote_plus(youtube_url)}&format=json",
            timeout=8,
        )
        if resp.ok:
            data = resp.json()
            metadata["title"] = data.get("title") or ""
            metadata["author"] = data.get("author_name") or ""
    except requests.RequestException as exc:
        logger.debug("OEmbed metadata fetch failed: %s", exc)

    if "title" not in metadata or not metadata["title"]:
        try:
            resp = requests.get(youtube_url, timeout=8, headers={"User-Agent": "Mozilla/5.0"})
            if resp.ok:
                title_match = re.search(r'<meta name="title" content="([^"]+)"', resp.text)
                if title_match:
                    metadata["title"] = title_match.group(1)
                desc_match = re.search(r'<meta name="description" content="([^"]+)"', resp.text)
                if desc_match:
                    metadata["description"] = html.unescape(desc_match.group(1))
        except requests.RequestException as exc:
            logger.debug("YouTube page fetch failed: %s", exc)

    return metadata


def get_transcript_text(youtube_url: str) -> tuple[str, dict]:
    """
    Return a best-effort transcript string and metadata for the video.
    Falls back to title/description if no captions exist.
    """
    docs = load_youtube_transcript(
        youtube_url=youtube_url,
        video_title="FactCheck Video",
        channel_name="MarketMind FactCheck",
    )

    if docs:
        joined = " ".join(doc.page_content for doc in docs[:6]).strip()
        text = joined[:8000] if len(joined) > 8000 else joined
        return text, {"source": "transcript", "segments": len(docs)}

    metadata = _fetch_video_metadata(youtube_url)
    title = metadata.get("title", "").strip()
    description = metadata.get("description", "").strip()

    if not title and not description:
        raise ValueError("Unable to load transcript or metadata for the requested video.")

    fallback_text = " ".join(part for part in (title, description) if part).strip()
    return fallback_text[:8000], {"source": "metadata", **metadata}
