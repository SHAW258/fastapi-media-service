import os
import sys
import json
from pathlib import Path
from sqlalchemy import text

# Ensure app package is importable
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.config import settings
from app.database import engine, SessionLocal, Base
from app import models, auth

def sync_pg_sequence(db, table_name: str, id_column: str = "id"):
    try:
        sql = text(f"SELECT setval(pg_get_serial_sequence('{table_name}', '{id_column}'), COALESCE(MAX({id_column}), 1)) FROM {table_name};")
        db.execute(sql)
        db.commit()
        print(f"[OK] Synced sequence for table '{table_name}'.")
    except Exception as e:
        db.rollback()
        print(f"Note: Could not sync sequence for {table_name}: {e}")

def migrate_and_seed():
    print("=" * 70)
    print("CONNECTING TO SUPABASE POSTGRESQL DATABASE...")
    print(f"Target Host: {settings.sqlalchemy_database_url.split('@')[-1]}")
    print("=" * 70)

    # 1. Create Tables in Supabase
    print("1. Creating database tables (users, media_items) in Supabase...")
    Base.metadata.create_all(bind=engine)
    print("[OK] Database tables created successfully in Supabase PostgreSQL!")

    # 2. Seed Database
    db = SessionLocal()
    try:
        # Create Admin User if missing
        admin = db.query(models.User).filter(models.User.username == "admin").first()
        if not admin:
            admin = models.User(
                username="admin",
                email="admin@example.com",
                hashed_password=auth.hash_password("admin123"),
                is_active=True,
                is_superuser=True
            )
            db.add(admin)
            db.commit()
            print("[OK] Created default admin user (admin / admin123) in Supabase.")
        else:
            print("[OK] Admin user already exists in Supabase.")

        # Seed Media Items
        existing_count = db.query(models.MediaItem).count()
        if existing_count == 0:
            json_path = Path(__file__).resolve().parent / "media-1000.json"
            if not json_path.exists():
                print(f"Error: {json_path} not found.")
                return

            with open(json_path, "r", encoding="utf-8") as f:
                content = json.load(f)

            raw_items = content.get("data", [])
            print(f"2. Seeding {len(raw_items)} media items into Cloud Supabase PostgreSQL...")
            
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
            print(f"[OK] SUCCESSFULLY SEEDED {len(db_items)} MEDIA ITEMS INTO SUPABASE!")
        else:
            print(f"[OK] Supabase database already contains {existing_count} media items.")

        # Sync PostgreSQL primary key sequences
        sync_pg_sequence(db, "media_items")
        sync_pg_sequence(db, "users")

        # Print summary
        users_count = db.query(models.User).count()
        media_count = db.query(models.MediaItem).count()
        print("=" * 70)
        print("SUPABASE LIVE MIGRATION & SEED SUMMARY:")
        print(f" - Users Table: {users_count} records")
        print(f" - Media Items Table: {media_count} records")
        print("=" * 70)

    except Exception as e:
        db.rollback()
        print(f"Error seeding Supabase: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    migrate_and_seed()
