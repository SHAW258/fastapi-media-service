import os
import sys
import time
import threading
import httpx
import uvicorn

# Ensure app package is importable
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.main import app

def run_server():
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="warning")

def test_fastapi_endpoints():
    print("=" * 70)
    print("STARTING FASTAPI SUITE VERIFICATION (SUPABASE POSTGRESQL + JWT)")
    print("=" * 70)

    # Start Uvicorn in background thread
    server_thread = threading.Thread(target=run_server, daemon=True)
    server_thread.start()
    time.sleep(2.5)  # Wait for startup & DB connection

    BASE_URL = "http://127.0.0.1:8000"

    with httpx.Client(base_url=BASE_URL, timeout=15.0) as client:
        # 1. Health check
        res = client.get("/api/health")
        assert res.status_code == 200, f"Health check failed: {res.text}"
        print("[OK] GET /api/health PASS:", res.json())

        # 2. Root endpoint
        res = client.get("/")
        assert res.status_code == 200
        print("[OK] GET / PASS:", res.json()["message"])

        # 3. Auth Register Test User in Cloud Supabase
        test_username = f"testuser_{int(time.time())}"
        test_email = f"{test_username}@example.com"
        reg_payload = {
            "username": test_username,
            "email": test_email,
            "password": "SecretPassword123!"
        }
        res = client.post("/api/auth/register", json=reg_payload)
        assert res.status_code == 201, f"Registration failed: {res.text}"
        reg_data = res.json()
        print(f"[OK] POST /api/auth/register (Cloud Supabase DB) PASS: Registered '{reg_data['username']}' (ID: {reg_data['id']})")

        # 4. Auth Login & Obtain JWT Token
        login_data = {
            "username": test_username,
            "password": "SecretPassword123!"
        }
        res = client.post("/api/auth/login", data=login_data)
        assert res.status_code == 200, f"Login failed: {res.text}"
        token_data = res.json()
        access_token = token_data["access_token"]
        assert access_token, "No access token received"
        print(f"[OK] POST /api/auth/login (JWT) PASS: Acquired token ({access_token[:25]}...)")

        # 5. Fetch Protected Profile (/api/auth/me)
        headers = {"Authorization": f"Bearer {access_token}"}
        res = client.get("/api/auth/me", headers=headers)
        assert res.status_code == 200, f"Me endpoint failed: {res.text}"
        print(f"[OK] GET /api/auth/me (JWT Protected Profile) PASS: Email = {res.json()['email']}")

        # 6. Test Media Endpoints on Supabase
        res = client.get("/api/media")
        assert res.status_code == 200
        media_list = res.json()
        print(f"[OK] GET /api/media (Supabase DB Query) PASS: Total items in Supabase DB = {media_list['total']}")

        res = client.get("/api/media/1")
        assert res.status_code == 200
        item_1 = res.json()
        print(f"[OK] GET /api/media/1 PASS: Item Title = '{item_1['title']}'")

        # 7. Create Media Item with JWT Authorization in Cloud Supabase
        new_media = {
            "title": "Live Supabase Track",
            "description": "Testing item creation with JWT Token in Supabase PostgreSQL",
            "mediaType": "audio",
            "format": "mp3",
            "category": "Testing",
            "duration": "03:45",
            "thumbnailUrl": "https://example.com/thumb.jpg",
            "mediaUrl": "https://example.com/audio.mp3",
            "artist": "Supabase Tester",
            "views": 100,
            "likes": 50,
            "isPremium": False,
            "createdAt": "2026-07-23T00:00:00Z"
        }
        res = client.post("/api/media", json=new_media, headers=headers)
        assert res.status_code == 201, f"Create media failed: {res.text}"
        created_item = res.json()
        print(f"[OK] POST /api/media (JWT Protected Create in Supabase) PASS: Created ID {created_item['id']} ('{created_item['title']}')")

        # 8. Test Songs & Artists Endpoints
        res = client.get("/song")
        assert res.status_code == 200
        songs = res.json()
        print(f"[OK] GET /song PASS: Total Songs = {songs['total']}")

        res = client.get("/song/artists")
        assert res.status_code == 200
        artists = res.json()
        print(f"[OK] GET /song/artists PASS: Total Artists = {artists['total']}")

        res = client.get("/artist/1")
        assert res.status_code == 200
        artist_detail = res.json()["data"]
        print(f"[OK] GET /artist/1 PASS: Artist '{artist_detail['name']}' has {artist_detail['totalSongs']} songs")

        # 9. Test Videos Endpoints
        res = client.get("/videos")
        assert res.status_code == 200
        videos = res.json()
        print(f"[OK] GET /videos PASS: Total Videos = {videos['total']}")

        # 10. Test Categories
        res = client.get("/api/categories")
        assert res.status_code == 200
        categories = res.json()
        print(f"[OK] GET /api/categories PASS: Found {categories['total']} categories")

    print("=" * 70)
    print("ALL FASTAPI + LIVE SUPABASE POSTGRESQL + JWT TESTS PASSED PERFECTLY!")
    print("=" * 70)

if __name__ == "__main__":
    test_fastapi_endpoints()
