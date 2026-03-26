"""
MarketMind AI — Dashboard Router
GET /api/dashboard/summary — User stats + market overview
"""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict, List, Optional
import random
from datetime import datetime

router = APIRouter()


class UserProfile(BaseModel):
    name: str
    tier: str
    subscription_status: str


class Stats(BaseModel):
    tickers_analyzed: int
    active_signals: int
    accuracy_rate: float


class MarketOverview(BaseModel):
    nifty50: Dict[str, float]
    sensex: Dict[str, float]
    top_gainers: List[Dict[str, str]]
    top_losers: List[Dict[str, str]]


class DashboardSummary(BaseModel):
    user_profile: UserProfile
    stats: Stats
    market_overview: MarketOverview
    daily_insight: str


@router.get("/dashboard/summary", response_model=DashboardSummary)
async def get_dashboard_summary():
    """
    Dashboard summary with user stats and market overview.
    For MVP: Returns hardcoded stats + live-like market data.
    In production: Would query user database and real market APIs.
    """
    
    # User profile (hardcoded for MVP)
    user_profile = UserProfile(
        name="Market Enthusiast",
        tier="Pro",
        subscription_status="active"
    )
    
    # User stats (hardcoded for MVP, would come from tracking database)
    stats = Stats(
        tickers_analyzed=47,
        active_signals=12,
        accuracy_rate=78.5
    )
    
    # Market overview (semi-realistic data)
    market_overview = MarketOverview(
        nifty50={
            "value": 22450.75,
            "change": round(random.uniform(-1.5, 2.0), 2),
            "change_percent": round(random.uniform(-0.8, 1.2), 2)
        },
        sensex={
            "value": 73985.40,
            "change": round(random.uniform(-200, 350), 2),
            "change_percent": round(random.uniform(-0.6, 1.0), 2)
        },
        top_gainers=[
            {"ticker": "RELIANCE", "change": "+3.2%"},
            {"ticker": "TCS", "change": "+2.8%"},
            {"ticker": "HDFCBANK", "change": "+2.1%"}
        ],
        top_losers=[
            {"ticker": "ADANIPORTS", "change": "-2.4%"},
            {"ticker": "TATASTEEL", "change": "-1.9%"},
            {"ticker": "HINDALCO", "change": "-1.5%"}
        ]
    )
    
    # Daily insight (rotates based on day)
    insights = [
        "Banking stocks showing strong momentum. Consider reviewing HDFC Bank and ICICI Bank positions.",
        "IT sector outperforming today. TCS and Infosys leading the gains.",
        "Volatility expected due to upcoming Fed decision. Monitor risk exposure.",
        "Reliance Industries showing bullish pattern on technical charts.",
        "Pharma sector consolidating. Watch for breakout opportunities."
    ]
    
    day_index = datetime.now().day % len(insights)
    daily_insight = insights[day_index]
    
    return DashboardSummary(
        user_profile=user_profile,
        stats=stats,
        market_overview=market_overview,
        daily_insight=daily_insight
    )