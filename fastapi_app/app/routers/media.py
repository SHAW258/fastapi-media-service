from typing import Any, Dict, List, Optional
from urllib.parse import unquote
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app import models, schemas, auth

router = APIRouter(prefix="/api", tags=["Media"])

@router.get("/media", response_model=schemas.MediaListResponse)
def get_all_media(db: Session = Depends(get_db)):
    """Fetch all 1,000 media items from Supabase/PostgreSQL database."""
    items = db.query(models.MediaItem).all()
    return {
        "success": True,
        "message": "Media items fetched successfully",
        "total": len(items),
        "data": items
    }

@router.get("/media/{id}", response_model=schemas.MediaItemSchema)
def get_media_by_id(id: int, db: Session = Depends(get_db)):
    """Get single media item by ID."""
    item = db.query(models.MediaItem).filter(models.MediaItem.id == id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Media item not found")
    return item

@router.post("/media", response_model=schemas.MediaItemSchema, status_code=status.HTTP_201_CREATED)
def create_media_item(
    media_in: schemas.MediaItemCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    """Create a new media item (requires JWT authentication)."""
    db_item = models.MediaItem(
        title=media_in.title,
        description=media_in.description,
        media_type=media_in.mediaType,
        format=media_in.format,
        category=media_in.category,
        duration=media_in.duration,
        thumbnail_url=media_in.thumbnailUrl,
        media_url=media_in.mediaUrl,
        artist=media_in.artist,
        views=media_in.views,
        likes=media_in.likes,
        is_premium=media_in.isPremium,
        created_at=media_in.createdAt
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.post("/media/echo")
async def echo_media(request: Request):
    """Echo JSON body back to caller."""
    body = await request.json()
    return body

@router.get("/categories", response_model=schemas.CategoriesResponse)
def get_all_categories(db: Session = Depends(get_db)):
    """Fetch all categories and total item count per category."""
    results = (
        db.query(models.MediaItem.category, func.count(models.MediaItem.id).label("total"))
        .group_by(models.MediaItem.category)
        .all()
    )
    categories = sorted(
        [schemas.CategorySummary(name=row[0], total=row[1]) for row in results],
        key=lambda c: c.name.lower()
    )
    return {
        "success": True,
        "message": "Categories fetched successfully",
        "total": len(categories),
        "data": categories
    }

@router.get("/categories/{category}", response_model=schemas.CategoryMediaResponse)
def get_media_by_category(category: str, db: Session = Depends(get_db)):
    """Fetch all media items under a specific category."""
    decoded_category = unquote(category).strip()
    items = (
        db.query(models.MediaItem)
        .filter(func.lower(models.MediaItem.category) == decoded_category.lower())
        .all()
    )
    if not items:
        raise HTTPException(status_code=404, detail="Category not found")
    
    return {
        "success": True,
        "message": "Category media fetched successfully",
        "category": items[0].category,
        "total": len(items),
        "data": items
    }
