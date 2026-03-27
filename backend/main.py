"""
MarketMind AI — FastAPI Entry Point
Run with: uvicorn main:app --reload --host 0.0.0.0 --port 8000
"""
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from rag_pipeline.rag_service import init_rag, get_rag_status
from routers import chat, radar, factcheck, upload, dashboard, landing

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    FastAPI lifespan — runs on startup and shutdown.
    init_rag() loads BGE model + connects to Pinecone ONCE.
    All subsequent requests reuse the loaded retriever.
    """
    logger.info("[Startup] Initializing RAG service...")
    try:
        init_rag()
        logger.info("[Startup] RAG service ready.")
    except Exception as e:
        logger.error(f"[Startup] RAG initialization failed: {e}")
        raise
    yield
    logger.info("[Shutdown] MarketMind AI shutting down.")


app = FastAPI(
    title="MarketMind AI",
    description="RAG-powered Indian stock market intelligence",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Phase 1 routers
app.include_router(chat.router, prefix="/api", tags=["chat"])
app.include_router(radar.router, prefix="/api", tags=["radar"])
app.include_router(factcheck.router, prefix="/api", tags=["factcheck"])

# Mount Phase 2 routers
app.include_router(upload.router, prefix="/api", tags=["upload"])
app.include_router(dashboard.router, prefix="/api", tags=["dashboard"])
app.include_router(landing.router, prefix="/api", tags=["landing"])

@app.get("/")
async def root():
    return {"message": "MarketMind AI is running", "status": "ok", "phase": "2"}


@app.get("/health")
async def health():
    status = get_rag_status()
    return {
        "status": "healthy" if status["initialized"] else "degraded",
        "rag": status,
        "phase": "2 (all features)",
        "endpoints": {
            "core": ["chat", "radar", "factcheck"],
            "additional": ["upload-url", "dashboard/summary", "landing/data"]
        }
    }