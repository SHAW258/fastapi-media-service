from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.config import settings
from app.database import engine, SessionLocal, Base
from app.seed import seed_database
from app.middleware import setup_middlewares
from app.routers import auth, media, songs, videos

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
    description="Enterprise FastAPI conversion of Media API with Supabase PostgreSQL, JWT Auth, & Frontend Connection Middleware.",
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

@app.get("/")
def read_root():
    return {
        "success": True,
        "message": "Media API Python FastAPI Conversion is running",
        "docs": "/docs",
        "health": "/api/health",
        "database": settings.sqlalchemy_database_url.split("@")[-1] if "@" in settings.sqlalchemy_database_url else "Local Database"
    }

@app.get("/api/health")
def health_check():
    return {"status": "ok", "success": True}
