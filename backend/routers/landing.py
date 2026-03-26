"""
MarketMind AI — Landing Router
GET /api/landing/data — News ticker + platform stats
"""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import feedparser
from datetime import datetime

router = APIRouter()


class NewsItem(BaseModel):
    headline: str
    time: str
    tag: str  # "NSE" | "BSE" | "SEBI" | "ET"
    url: str


class PlatformStats(BaseModel):
    total_analyses: int
    active_users: int
    accuracy_rate: float


class LandingData(BaseModel):
    news: List[NewsItem]
    stats: PlatformStats


def fetch_et_markets_news() -> List[NewsItem]:
    """
    Fetch latest news from ET Markets RSS feed.
    This reuses the existing Stage 1 ingestion logic.
    """
    news_items = []
    
    try:
        # ET Markets RSS feed (same as Stage 1)
        feed_url = "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms"
        feed = feedparser.parse(feed_url)
        
        for entry in feed.entries[:5]:  # Latest 5 news items
            # Determine tag based on content
            title_lower = entry.title.lower()
            summary_lower = entry.get('summary', '').lower()
            combined = title_lower + " " + summary_lower
            
            tag = "ET"  # Default
            if "nse" in combined or "nifty" in combined:
                tag = "NSE"
            elif "bse" in combined or "sensex" in combined:
                tag = "BSE"
            elif "sebi" in combined:
                tag = "SEBI"
            
            # Format time
            pub_date = entry.get('published', '')
            try:
                dt = datetime.strptime(pub_date, "%a, %d %b %Y %H:%M:%S %z")
                time_str = dt.strftime("%I:%M %p")
            except:
                time_str = "Just now"
            
            news_items.append(NewsItem(
                headline=entry.title[:100],  # Limit to 100 chars
                time=time_str,
                tag=tag,
                url=entry.link
            ))
    
    except Exception as e:
        print(f"[WARN] Failed to fetch ET Markets news: {e}")
        # Return fallback news
        news_items = [
            NewsItem(
                headline="Market updates temporarily unavailable",
                time="Now",
                tag="ET",
                url="https://economictimes.indiatimes.com/markets"
            )
        ]
    
    return news_items


@router.get("/landing/data", response_model=LandingData)
async def get_landing_data():
    """
    Landing page data: Latest news ticker + platform stats.
    News: Pulled from ET Markets RSS (live)
    Stats: Hardcoded for MVP (would come from analytics database)
    """
    
    # Fetch live news
    news = fetch_et_markets_news()
    
    # Platform stats (hardcoded for MVP)
    stats = PlatformStats(
        total_analyses=15847,
        active_users=1234,
        accuracy_rate=82.3
    )
    
    return LandingData(
        news=news,
        stats=stats
    )