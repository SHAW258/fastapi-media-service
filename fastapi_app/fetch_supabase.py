import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal
from app import models

def fetch_all_from_supabase():
    print("=" * 70)
    print("FETCHING MEDIA ITEMS DIRECTLY FROM CLOUD SUPABASE POSTGRESQL")
    print("=" * 70)

    db = SessionLocal()
    try:
        # 1. Total Media Items in Supabase
        total_items = db.query(models.MediaItem).count()
        print(f"Total Media Items stored in Supabase: {total_items}")

        # 2. Audio vs Video count in Supabase
        audio_count = db.query(models.MediaItem).filter(models.MediaItem.media_type == "audio").count()
        video_count = db.query(models.MediaItem).filter(models.MediaItem.media_type == "video").count()
        print(f" - Songs (audio): {audio_count}")
        print(f" - Videos (video): {video_count}")

        # 3. Sample 5 items fetched from Supabase
        print("\n--- SAMPLE ITEMS FETCHED FROM SUPABASE ---")
        items = db.query(models.MediaItem).order_by(models.MediaItem.id).limit(5).all()
        for item in items:
            print(f" ID #{item.id}: [{item.media_type.upper()}] '{item.title}' | Category: {item.category} | Duration: {item.duration}")

        # 4. Fetch Categories Summary from Supabase
        print("\n--- CATEGORY BREAKDOWN FROM SUPABASE ---")
        from sqlalchemy import func
        categories = (
            db.query(models.MediaItem.category, func.count(models.MediaItem.id))
            .group_by(models.MediaItem.category)
            .all()
        )
        for name, count in categories:
            print(f" - Category: {name:15s} -> {count} items")

        print("=" * 70)
        print("ALL DATA VERIFIED LIVE FROM CLOUD SUPABASE POSTGRESQL!")
        print("=" * 70)

    finally:
        db.close()

if __name__ == "__main__":
    fetch_all_from_supabase()
