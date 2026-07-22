import json
from pathlib import Path
from sqlalchemy.orm import Session
from sqlalchemy import text
from app import models, auth

def sync_pg_sequence(db: Session, table_name: str, id_column: str = "id"):
    """Sync PostgreSQL primary key auto-increment sequence after bulk insert."""
    try:
        if db.bind and db.bind.dialect.name == "postgresql":
            sql = text(f"SELECT setval(pg_get_serial_sequence('{table_name}', '{id_column}'), COALESCE(MAX({id_column}), 1)) FROM {table_name};")
            db.execute(sql)
            db.commit()
    except Exception as e:
        db.rollback()
        print(f"Note: Could not sync sequence for {table_name}: {e}")

def seed_database(db: Session):
    """Seed media database with 1,000 items from media-1000.json and create default admin user if missing."""
    
    # 1. Seed Default Admin User if missing
    admin_user = db.query(models.User).filter(models.User.username == "admin").first()
    if not admin_user:
        admin_user = models.User(
            username="admin",
            email="admin@example.com",
            hashed_password=auth.hash_password("admin123"),
            is_active=True,
            is_superuser=True
        )
        db.add(admin_user)
        db.commit()
        print("[OK] Created default admin user (admin / admin123)")

    # 2. Seed Media Items if table is empty
    count = db.query(models.MediaItem).count()
    if count == 0:
        json_locations = [
            Path(__file__).resolve().parent.parent / "media-1000.json",
            Path(__file__).resolve().parent.parent.parent / "media-1000.json",
            Path("media-1000.json"),
            Path("fastapi_app/media-1000.json")
        ]
        
        target_path = None
        for path in json_locations:
            if path.exists():
                target_path = path
                break

        if not target_path:
            print("Warning: media-1000.json not found for database seeding.")
            return

        with open(target_path, "r", encoding="utf-8") as f:
            content = json.load(f)

        raw_items = content.get("data", [])
        db_items = []
        for item in raw_items:
            db_item = models.MediaItem(
                id=item["id"],
                title=item["title"],
                description=item["description"],
                media_type=item["mediaType"],
                format=item["format"],
                category=item["category"],
                duration=item["duration"],
                thumbnail_url=item["thumbnailUrl"],
                media_url=item["mediaUrl"],
                artist=item.get("artist"),
                views=item.get("views", 0),
                likes=item.get("likes", 0),
                is_premium=item.get("isPremium", False),
                created_at=item.get("createdAt", "")
            )
            db_items.append(db_item)
            
        db.bulk_save_objects(db_items)
        db.commit()
        print(f"[OK] Successfully seeded {len(db_items)} media items into database.")
    
    # Sync PostgreSQL sequence for media_items and users
    sync_pg_sequence(db, "media_items")
    sync_pg_sequence(db, "users")
