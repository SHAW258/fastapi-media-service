from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas

router = APIRouter(tags=["Songs & Artists"])

@router.get("/song", response_model=schemas.MediaListResponse)
def get_all_songs(db: Session = Depends(get_db)):
    """Fetch all audio songs from database."""
    songs = (
        db.query(models.MediaItem)
        .filter(func.lower(models.MediaItem.media_type) == "audio")
        .all()
    )
    return {
        "success": True,
        "message": "Songs fetched successfully",
        "total": len(songs),
        "data": songs
    }

def _get_artists_list(db: Session) -> List[schemas.ArtistSummary]:
    songs = (
        db.query(models.MediaItem)
        .filter(func.lower(models.MediaItem.media_type) == "audio")
        .all()
    )
    artist_names = sorted(
        list({s.artist for s in songs if s.artist}),
        key=lambda name: name.lower()
    )
    artists = []
    for idx, name in enumerate(artist_names, start=1):
        count = sum(1 for s in songs if s.artist == name)
        artists.append(schemas.ArtistSummary(id=idx, name=name, totalSongs=count))
    return artists

@router.get("/song/artists", response_model=schemas.ArtistsResponse)
@router.get("/song/artistg", response_model=schemas.ArtistsResponse)
def get_all_artists(db: Session = Depends(get_db)):
    """Fetch all audio artists and their total song counts."""
    artists = _get_artists_list(db)
    return {
        "success": True,
        "message": "Artists fetched successfully",
        "total": len(artists),
        "data": artists
    }

@router.get("/song/{id}", response_model=schemas.MediaItemSchema)
def get_song_by_id(id: int, db: Session = Depends(get_db)):
    """Fetch single song by ID."""
    song = (
        db.query(models.MediaItem)
        .filter(models.MediaItem.id == id)
        .filter(func.lower(models.MediaItem.media_type) == "audio")
        .first()
    )
    if not song:
        raise HTTPException(status_code=404, detail="Song not found")
    return song

@router.get("/artist/{id}", response_model=schemas.ArtistDetailResponse)
def get_artist_by_id(id: int, db: Session = Depends(get_db)):
    """Fetch artist details and songs by artist ID."""
    artists = _get_artists_list(db)
    target_artist = next((a for a in artists if a.id == id), None)
    if not target_artist:
        raise HTTPException(status_code=404, detail="Artist not found")

    artist_songs = (
        db.query(models.MediaItem)
        .filter(func.lower(models.MediaItem.media_type) == "audio")
        .filter(models.MediaItem.artist == target_artist.name)
        .all()
    )

    return {
        "success": True,
        "message": "Artist fetched successfully",
        "data": schemas.ArtistDetail(
            id=target_artist.id,
            name=target_artist.name,
            totalSongs=target_artist.totalSongs,
            songs=artist_songs
        )
    }
