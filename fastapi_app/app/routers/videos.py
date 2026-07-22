from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas

router = APIRouter(tags=["Videos"])

@router.get("/videos", response_model=schemas.MediaListResponse)
def get_all_videos(db: Session = Depends(get_db)):
    """Fetch all video media items from database."""
    videos = (
        db.query(models.MediaItem)
        .filter(func.lower(models.MediaItem.media_type) == "video")
        .all()
    )
    return {
        "success": True,
        "message": "Videos fetched successfully",
        "total": len(videos),
        "data": videos
    }

@router.get("/video/{id}", response_model=schemas.MediaItemSchema)
def get_video_by_id(id: int, db: Session = Depends(get_db)):
    """Fetch single video by ID."""
    video = (
        db.query(models.MediaItem)
        .filter(models.MediaItem.id == id)
        .filter(func.lower(models.MediaItem.media_type) == "video")
        .first()
    )
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    return video
