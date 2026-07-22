from pathlib import Path
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.responses import HTMLResponse, FileResponse
from app.config import settings
from app.database import engine, SessionLocal, Base
from app.seed import seed_database
from app.middleware import setup_middlewares
from app.routers import auth, media, songs, videos

STATIC_DIR = Path(__file__).resolve().parent / "static"

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 1. Initialize Database Tables in Supabase/PostgreSQL
    Base.metadata.create_all(bind=engine)
    
    # 2. Seed Database with initial media-1000 items and default user
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()
        
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Enterprise FastAPI conversion of Media API with Supabase PostgreSQL, Strict JWT Auth, & Interactive Web Tester.",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# Setup Smooth Frontend <-> Backend Middleware (CORS, Preflight, Response Timing, Security, Global Error Handlers)
setup_middlewares(app)

# Include API Routers
app.include_router(auth.router)
app.include_router(media.router)
app.include_router(songs.router)
app.include_router(videos.router)

@app.get("/", response_class=HTMLResponse)
@app.get("/demo", response_class=HTMLResponse)
@app.get("/test", response_class=HTMLResponse)
def get_interactive_tester():
    """Serve the interactive web test suite & demo client."""
    html_file = STATIC_DIR / "index.html"
    return FileResponse(html_file)

@app.get("/api/info")
def read_root():
    return {
        "success": True,
        "message": "Media API Python FastAPI Conversion is running",
        "docs": "/docs",
        "demo": "/demo",
        "health": "/api/health",
        "database": settings.sqlalchemy_database_url.split("@")[-1] if "@" in settings.sqlalchemy_database_url else "Local Database"
    }

@app.get("/api/health")
def health_check():
    return {"status": "ok", "success": True}
