import datetime
from sqlalchemy import Boolean, Column, DateTime, Integer, String, Text
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class MediaItem(Base):
    __tablename__ = "media_items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True, nullable=False)
    description = Column(Text, nullable=True)
    media_type = Column(String(50), index=True, nullable=False)  # "audio" or "video"
    format = Column(String(50), nullable=False)
    category = Column(String(100), index=True, nullable=False)
    duration = Column(String(50), nullable=False)
    thumbnail_url = Column(Text, nullable=False)
    media_url = Column(Text, nullable=False)
    artist = Column(String(255), index=True, nullable=True)
    views = Column(Integer, default=0)
    likes = Column(Integer, default=0)
    is_premium = Column(Boolean, default=False)
    created_at = Column(String(100), nullable=False)
