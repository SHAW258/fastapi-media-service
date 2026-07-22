# FastAPI Media Service (Backend API)

An enterprise-grade **Python FastAPI Backend** service converted from Kotlin/Ktor with **Cloud Supabase PostgreSQL** database support, **JWT Authentication & Security**, **Frontend Connection Middleware**, and **Automatic Database Seeding**.

[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB.svg?style=flat&logo=python)](https://python.org)
[![PostgreSQL](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-336791.svg?style=flat&logo=postgresql)](https://supabase.com)
[![JWT](https://img.shields.io/badge/Security-JWT%20Tokens-000000.svg?style=flat&logo=jsonwebtokens)](https://jwt.io)

---

## 📌 Project Overview

This repository houses the production-ready backend API service for media streaming, user management, and video/audio playback. It is fully converted from Kotlin Ktor to Python FastAPI with complete endpoint parity and modern cloud features:

1. **Cloud Supabase PostgreSQL Database Integration**: Connects via SQLAlchemy 2.0 ORM to Cloud Supabase PostgreSQL (`aws-1-ap-south-1.pooler.supabase.com:5432`).
2. **JWT Security & Auth**: Password hashing using PBKDF2 SHA-256 with salt, OAuth2 bearer tokens, registration (`/api/auth/register`), login (`/api/auth/login`), and user profile fetching (`/api/auth/me`).
3. **Automated Database Seeding**: Pre-populates all **833 media items** from `media-1000.json` into Supabase PostgreSQL tables and synchronizes primary key sequences automatically.
4. **Frontend Connection Middleware**: High-performance middleware handling Cross-Origin Resource Sharing (CORS), preflight `OPTIONS` requests, request logging, and attaching `X-Process-Time` latency headers.

---

## 📂 Repository Structure

```text
fastapi-media-service/
├── Dockerfile                  # Production Multi-stage Docker container
├── render.yaml                 # Render.com Cloud Deployment blueprint
├── README.md                   # Step-by-step documentation (this file)
├── ENDPOINTS.md                # Comprehensive route specifications & payloads
└── fastapi_app/
    ├── .env                    # Active environment variables (Supabase URL & JWT Secret)
    ├── .env.example            # Environment template file
    ├── requirements.txt        # Python dependencies (fastapi, uvicorn, sqlalchemy, psycopg2-binary, pyjwt)
    ├── media-1000.json         # 833 media items dataset
    ├── seed_supabase.py        # Database migration & 833 items seeder script
    ├── fetch_supabase.py       # Live Supabase query verification tool
    ├── test_api.py             # Automated end-to-end endpoint & JWT test suite
    └── app/
        ├── main.py             # FastAPI Application instance & router registration
        ├── config.py           # Configuration management (Pydantic Settings)
        ├── database.py         # SQLAlchemy 2.0 Engine & session lifecycle
        ├── models.py           # Database models (User, MediaItem)
        ├── schemas.py          # Pydantic V2 Request & Response schemas
        ├── auth.py             # JWT token handling & password hashing
        ├── seed.py             # Automatic startup seed logic
        ├── middleware.py       # Frontend CORS, preflight, latency & security middleware
        └── routers/
            ├── auth.py         # Auth routes (/api/auth/register, /api/auth/login, /api/auth/me)
            ├── media.py        # Media routes (/api/media, /api/categories)
            ├── songs.py        # Song & Artist routes (/song, /song/artists, /artist/{id})
            └── videos.py       # Video routes (/videos, /video/{id})
```

---

## 🛠 Step-by-Step Setup Guide

Follow these step-by-step instructions to set up, migrate, and run the backend locally or in the cloud.

### Prerequisites
- **Python 3.10+** installed on your system
- **Git** & **Pip** package manager
- **Supabase Account** (or local SQLite fallback)

---

### Step 1: Clone the Repository & Navigate to Workspace
```bash
git clone https://github.com/SHAW258/fastapi-media-service.git
cd fastapi-media-service/fastapi_app
```

---

### Step 2: Install Dependencies
Install all required Python packages:
```bash
pip install -r requirements.txt
```

*Installed libraries include:* `fastapi`, `uvicorn[standard]`, `sqlalchemy`, `pydantic`, `pydantic-settings`, `pyjwt`, `psycopg2-binary`, `python-multipart`, `httpx`.

---

### Step 3: Configure Environment Variables
Create or verify your `.env` file inside `fastapi_app/`:

```ini
# Supabase PostgreSQL Connection String
DATABASE_URL=postgresql://postgres.yznknqclgiwgswgkwmyi:YOUR_PASSWORD@aws-1-ap-south-1.pooler.supabase.com:5432/postgres

# JWT Secret Key
JWT_SECRET_KEY=super-secret-key-change-this-in-production-123456789
```

> **Note:** If `DATABASE_URL` is omitted, the app will automatically default to local SQLite (`sqlite:///./media_api.db`).

---

### Step 4: Run Supabase Database Migration & Seeding
To initialize database tables in Supabase and populate all 833 media items:

```bash
python seed_supabase.py
```

**Output:**
```text
======================================================================
CONNECTING TO SUPABASE POSTGRESQL DATABASE...
Target Host: aws-1-ap-south-1.pooler.supabase.com:5432/postgres
======================================================================
1. Creating database tables (users, media_items) in Supabase...
[OK] Database tables created successfully in Supabase PostgreSQL!
[OK] Admin user already exists in Supabase.
[OK] Supabase database already contains 833 media items.
[OK] Synced sequence for table 'media_items'.
[OK] Synced sequence for table 'users'.
======================================================================
```

---

### Step 5: Start the FastAPI Backend Server
Launch the local development server:

```bash
python -m uvicorn app.main:app --reload --port 8000
```

The server will start at:
- **Base URL:** `http://localhost:8000`
- **Interactive Swagger UI Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc Documentation:** [http://localhost:8000/redoc](http://localhost:8000/redoc)
- **Health Endpoint:** [http://localhost:8000/api/health](http://localhost:8000/api/health)

---

### Step 6: Run Automated End-to-End Test Suite
Run the test runner to verify database connectivity, user registration, JWT login, and media retrieval:

```bash
python test_api.py
```

**Verification Results:**
```text
======================================================================
STARTING FASTAPI SUITE VERIFICATION (SUPABASE POSTGRESQL + JWT)
======================================================================
[OK] GET /api/health PASS: {'status': 'ok', 'success': True}
[OK] GET / PASS: Media API Python FastAPI Conversion is running
[OK] POST /api/auth/register (Cloud Supabase DB) PASS: Registered user
[OK] POST /api/auth/login (JWT) PASS: Acquired token
[OK] GET /api/auth/me (JWT Protected Profile) PASS
[OK] GET /api/media (Supabase DB Query) PASS: Total items = 833
[OK] GET /api/media/1 PASS: Item Title = 'Sample Video 1'
[OK] POST /api/media (JWT Protected Create in Supabase) PASS
[OK] GET /song PASS: Total Songs = 502
[OK] GET /song/artists PASS: Total Artists = 5
[OK] GET /artist/1 PASS: Artist detail fetched
[OK] GET /videos PASS: Total Videos = 333
[OK] GET /api/categories PASS: Found 8 categories
======================================================================
ALL FASTAPI + LIVE SUPABASE POSTGRESQL + JWT TESTS PASSED PERFECTLY!
======================================================================
```

---

## 📖 API Endpoints Quick Reference

See [ENDPOINTS.md](ENDPOINTS.md) for full request/response payloads.

| Category | Method | Endpoint | Description | Auth Required |
| :--- | :---: | :--- | :--- | :---: |
| **Auth** | `POST` | `/api/auth/register` | Register new user in Supabase | No |
| **Auth** | `POST` | `/api/auth/login` | Login and acquire JWT Access Token | No |
| **Auth** | `GET` | `/api/auth/me` | Get current user profile | **JWT Bearer** |
| **Media** | `GET` | `/api/media` | Fetch all 833 media items | No |
| **Media** | `GET` | `/api/media/{id}` | Fetch single media item by ID | No |
| **Media** | `POST` | `/api/media` | Create new media item | **JWT Bearer** |
| **Media** | `POST` | `/api/media/echo` | Echo JSON payload back | No |
| **Categories** | `GET` | `/api/categories` | Fetch category list & totals | No |
| **Categories** | `GET` | `/api/categories/{category}` | Fetch items under category | No |
| **Songs** | `GET` | `/song` | Fetch all audio items (501 songs) | No |
| **Songs** | `GET` | `/song/artists` | Fetch all artists with song count | No |
| **Songs** | `GET` | `/song/{id}` | Fetch single song | No |
| **Artists** | `GET` | `/artist/{id}` | Fetch artist details & songs | No |
| **Videos** | `GET` | `/videos` | Fetch all video items (333 videos) | No |
| **Videos** | `GET` | `/video/{id}` | Fetch single video | No |

---

## 🌐 Frontend Integration Guide

The backend includes a dedicated middleware ([app/middleware.py](file:///C:/Users/indrajit/Downloads/media-api-kotlin/fastapi_app/app/middleware.py)) that makes frontend integration smooth for React, Next.js, Vue, React Native, or Mobile Apps:

### 1. CORS Configuration
All requests from `http://localhost:3000`, `http://localhost:5173`, mobile devices, or deployed web origins are enabled automatically.

### 2. Header Usage in Frontend (JavaScript / Axios Example)
```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Login & Save JWT Token
export async function login(username, password) {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  const response = await axios.post(`${API_BASE_URL}/api/auth/login`, formData);
  const token = response.data.access_token;
  localStorage.setItem('jwt_token', token);
  return response.data;
}

// Fetch Protected Profile with Bearer Token
export async function getProfile() {
  const token = localStorage.getItem('jwt_token');
  const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}
```

---

## 🚀 Cloud Deployment

### Deploy on Render.com
1. Connect your GitHub repository `SHAW258/fastapi-media-service`.
2. Select **Web Service** (using the included `render.yaml`).
3. Set the environment variable `DATABASE_URL` to your Supabase connection string.
4. Deploy!

### Deploy with Docker
```bash
docker build -t fastapi-media-service .
docker run -d -p 8000:8000 --env-file fastapi_app/.env fastapi-media-service
```
