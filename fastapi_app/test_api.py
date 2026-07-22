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
    print("STARTING FASTAPI INTERACTIVE TEST & STRICT JWT VERIFICATION")
    print("=" * 70)

    # Start Uvicorn in background thread
    server_thread = threading.Thread(target=run_server, daemon=True)
    server_thread.start()
    time.sleep(2.5)  # Wait for startup & DB connection

    BASE_URL = "http://127.0.0.1:8000"

    with httpx.Client(base_url=BASE_URL, timeout=15.0) as client:
        # 1. Health check (Public)
        res = client.get("/api/health")
        assert res.status_code == 200, f"Health check failed: {res.text}"
        print("[OK] GET /api/health PASS (Public):", res.json())

        # 2. Interactive Test Demo Page (Public)
        res = client.get("/demo")
        assert res.status_code == 200, f"Interactive demo page failed: {res.status_code}"
        assert "<title>FastAPI Media Service - Interactive API Tester</title>" in res.text
        print("[OK] GET /demo PASS (Interactive Web Tester UI loaded!)")

        # 3. VERIFY JWT REQUIREMENT: Accessing /api/media WITHOUT token must be 401 Unauthorized
        res = client.get("/api/media")
        assert res.status_code == 401, f"Expected 401 Unauthorized without token, got: {res.status_code}"
        print("[OK] SECURITY TEST: Unauthenticated access to /api/media properly BLOCKED (401 Unauthorized)")

        # 4. Auth Register Test User in Cloud Supabase
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
        print(f"[OK] POST /api/auth/register PASS: Registered '{reg_data['username']}' (ID: {reg_data['id']})")

        # 5. Auth Login & Obtain JWT Token
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

        # 6. Prepare Authorization Header
        headers = {"Authorization": f"Bearer {access_token}"}

        # 7. Fetch Protected Profile (/api/auth/me)
        res = client.get("/api/auth/me", headers=headers)
        assert res.status_code == 200, f"Me endpoint failed: {res.text}"
        print(f"[OK] GET /api/auth/me (JWT Protected Profile) PASS: Email = {res.json()['email']}")

        # 8. Test Media Endpoints with JWT Token
        res = client.get("/api/media", headers=headers)
        assert res.status_code == 200
        media_list = res.json()
        print(f"[OK] GET /api/media (JWT Protected Query) PASS: Total items = {media_list['total']}")

        res = client.get("/api/media/1", headers=headers)
        assert res.status_code == 200
        item_1 = res.json()
        print(f"[OK] GET /api/media/1 (JWT Protected) PASS: Item Title = '{item_1['title']}'")

        # 9. Create Media Item with JWT Authorization
        new_media = {
            "title": "Interactive Demo Track",
            "description": "Testing item creation via interactive test client",
            "mediaType": "audio",
            "format": "mp3",
            "category": "Testing",
            "duration": "03:45",
            "thumbnailUrl": "https://example.com/thumb.jpg",
            "mediaUrl": "https://example.com/audio.mp3",
            "artist": "Demo Tester",
            "views": 100,
            "likes": 50,
            "isPremium": False,
            "createdAt": "2026-07-23T00:00:00Z"
        }
        res = client.post("/api/media", json=new_media, headers=headers)
        assert res.status_code == 201, f"Create media failed: {res.text}"
        created_item = res.json()
        print(f"[OK] POST /api/media (JWT Protected Create) PASS: Created ID {created_item['id']} ('{created_item['title']}')")

        # 10. Test Songs & Artists Endpoints with JWT Token
        res = client.get("/song", headers=headers)
        assert res.status_code == 200
        songs = res.json()
        print(f"[OK] GET /song (JWT Protected) PASS: Total Songs = {songs['total']}")

        res = client.get("/song/artists", headers=headers)
        assert res.status_code == 200
        artists = res.json()
        print(f"[OK] GET /song/artists (JWT Protected) PASS: Total Artists = {artists['total']}")

        res = client.get("/artist/1", headers=headers)
        assert res.status_code == 200
        artist_detail = res.json()["data"]
        print(f"[OK] GET /artist/1 (JWT Protected) PASS: Artist '{artist_detail['name']}' has {artist_detail['totalSongs']} songs")

        # 11. Test Videos Endpoints with JWT Token
        res = client.get("/videos", headers=headers)
        assert res.status_code == 200
        videos = res.json()
        print(f"[OK] GET /videos (JWT Protected) PASS: Total Videos = {videos['total']}")

        # 12. Test Categories with JWT Token
        res = client.get("/api/categories", headers=headers)
        assert res.status_code == 200
        categories = res.json()
        print(f"[OK] GET /api/categories (JWT Protected) PASS: Found {categories['total']} categories")

    print("=" * 70)
    print("ALL INTERACTIVE DEMO & STRICT JWT TESTS PASSED PERFECTLY!")
    print("=" * 70)

if __name__ == "__main__":
    test_fastapi_endpoints()
