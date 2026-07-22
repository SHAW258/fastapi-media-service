import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Media API FastAPI (Supabase & JWT)"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    # Database Settings (Defaults to local SQLite, overridable by Supabase/PostgreSQL URL)
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "sqlite:///./media_api.db"
    )
    
    # JWT Authentication Settings
    SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "super-secret-key-change-this-in-production-123456789")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def sqlalchemy_database_url(self) -> str:
        url = self.DATABASE_URL
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql://", 1)
        return url

settings = Settings()
