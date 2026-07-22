# FastAPI Media Service (Backend API)

An enterprise-grade **Python FastAPI Backend** service converted from Kotlin/Ktor with **Cloud Supabase PostgreSQL** database integration, **Strict JWT Authentication & Security on ALL endpoints**, **Frontend Connection Middleware**, and **Automatic Database Seeding**.

[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB.svg?style=flat&logo=python)](https://python.org)
[![PostgreSQL](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-336791.svg?style=flat&logo=postgresql)](https://supabase.com)
[![JWT](https://img.shields.io/badge/Security-Strict%20JWT%20Tokens-000000.svg?style=flat&logo=jsonwebtokens)](https://jwt.io)

---

## 🖥 Interactive Web Test Suite & UI Preview

When running locally (`http://localhost:8000/demo`), any user can interactively test user registration, JWT login, and strict security directly from their browser:

![FastAPI Interactive Demo UI & Test Suite](docs/images/interactive_demo_ui.png)

---

## 📌 Project Overview

This repository houses the production-ready backend API service for media streaming, user management, and video/audio playback. It features strict security, performance optimization, and cloud connectivity:

1. **Strict JWT Authentication on ALL Media Endpoints**: All requests to `/api/media`, `/song`, `/videos`, `/api/categories`, and `/artist/{id}` require a valid JWT Bearer token (`Authorization: Bearer <access_token>`). Unauthenticated requests are blocked with `HTTP 401 Unauthorized`.
2. **Cloud Supabase PostgreSQL Database Integration**: Connected via SQLAlchemy 2.0 ORM to Cloud Supabase PostgreSQL (`aws-1-ap-south-1.pooler.supabase.com:5432`).
3. **Password Security**: Uses PBKDF2 SHA-256 with salt hashing, OAuth2 bearer tokens, registration (`/api/auth/register`), login (`/api/auth/login`), and profile fetching (`/api/auth/me`).
4. **Automated Database Seeding**: Pre-populates all **833 media items** from `media-1000.json` into Supabase PostgreSQL tables and synchronizes primary key sequences automatically.
5. **Frontend Connection Middleware**: High-performance middleware handling Cross-Origin Resource Sharing (CORS), preflight `OPTIONS` requests, request logging, and attaching `X-Process-Time` latency headers.

---

## 📂 Repository Structure

```text
fastapi-media-service/
├── Dockerfile                  # Production Multi-stage Docker container
├── render.yaml                 # Render.com Cloud Deployment blueprint
├── README.md                   # Step-by-step documentation (this file)
├── ENDPOINTS.md                # Comprehensive route specifications & payloads
├── docs/
│   └── images/
│       └── interactive_demo_ui.png  # Interactive UI Preview Screenshot
└── fastapi_app/
    ├── .env                    # Active environment variables (Supabase URL & JWT Secret)
    ├── .env.example            # Environment template file
    ├── requirements.txt        # Python dependencies
    ├── media-1000.json         # 833 media items dataset
    ├── seed_supabase.py        # Database migration & 833 items seeder script
    ├── fetch_supabase.py       # Live Supabase query verification tool
    ├── run_and_capture.py      # Localhost server runner & screenshot generator
    ├── test_api.py             # Automated end-to-end endpoint & strict JWT test suite
    └── app/
        ├── main.py             # FastAPI Application instance & router registration
        ├── config.py           # Configuration management (Pydantic Settings)
        ├── database.py         # SQLAlchemy 2.0 Engine & session lifecycle
        ├── models.py           # Database models (User, MediaItem)
        ├── schemas.py          # Pydantic V2 Request & Response schemas
        ├── auth.py             # JWT token handling & password hashing
        ├── seed.py             # Automatic startup seed logic
        ├── middleware.py       # Frontend CORS, preflight, latency & security middleware
        ├── static/
        │   └── index.html      # Interactive Web Test Client UI (/demo)
        └── routers/
            ├── auth.py         # Auth routes (/api/auth/register, /api/auth/login, /api/auth/me)
            ├── media.py        # Media routes (/api/media, /api/categories) [JWT Protected]
            ├── songs.py        # Song & Artist routes (/song, /song/artists, /artist/{id}) [JWT Protected]
            └── videos.py       # Video routes (/videos, /video/{id}) [JWT Protected]
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

---

### Step 3: Configure Environment Variables
Verify your `.env` file inside `fastapi_app/`:

```ini
# Supabase PostgreSQL Connection String
DATABASE_URL=postgresql://postgres.yznknqclgiwgswgkwmyi:YOUR_PASSWORD@aws-1-ap-south-1.pooler.supabase.com:5432/postgres

# JWT Secret Key
JWT_SECRET_KEY=super-secret-key-change-this-in-production-123456789
```

---

### Step 4: Run Supabase Database Migration & Seeding
Initialize database tables in Supabase and populate all 833 media items:

```bash
python seed_supabase.py
```

---

### Step 5: Start the FastAPI Backend Server
Launch the local development server:

```bash
python -m uvicorn app.main:app --reload --port 8000
```

- **Base URL:** `http://localhost:8000`
- **Interactive Web Tester UI:** [http://localhost:8000/demo](http://localhost:8000/demo)
- **Interactive Swagger Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **Health Check:** [http://localhost:8000/api/health](http://localhost:8000/api/health)

---

### Step 6: Run Automated End-to-End Test Suite & Capture Evidence
Run the test runner to verify strict JWT authentication enforcement:

```bash
python test_api.py
```

---

## 🔐 API Security & Authentication Table

See [ENDPOINTS.md](ENDPOINTS.md) for full request/response schemas.

| Category | Method | Endpoint | Description | Auth Required |
| :--- | :---: | :--- | :--- | :---: |
| **Auth** | `POST` | `/api/auth/register` | Register new user in Supabase | Public |
| **Auth** | `POST` | `/api/auth/login` | Login and acquire JWT Access Token | Public |
| **Auth** | `GET` | `/api/auth/me` | Get current user profile | **YES (`Bearer <token>`)** |
| **Media** | `GET` | `/api/media` | Fetch all 833 media items | **YES (`Bearer <token>`)** |
| **Media** | `GET` | `/api/media/{id}` | Fetch single media item by ID | **YES (`Bearer <token>`)** |
| **Media** | `POST` | `/api/media` | Create new media item | **YES (`Bearer <token>`)** |
| **Media** | `POST` | `/api/media/echo` | Echo JSON payload back | **YES (`Bearer <token>`)** |
| **Categories** | `GET` | `/api/categories` | Fetch category list & totals | **YES (`Bearer <token>`)** |
| **Categories** | `GET` | `/api/categories/{category}` | Fetch items under category | **YES (`Bearer <token>`)** |
| **Songs** | `GET` | `/song` | Fetch all audio items (501 songs) | **YES (`Bearer <token>`)** |
| **Songs** | `GET` | `/song/artists` | Fetch all artists with song count | **YES (`Bearer <token>`)** |
| **Songs** | `GET` | `/song/{id}` | Fetch single song | **YES (`Bearer <token>`)** |
| **Artists** | `GET` | `/artist/{id}` | Fetch artist details & songs | **YES (`Bearer <token>`)** |
| **Videos** | `GET` | `/videos` | Fetch all video items (333 videos) | **YES (`Bearer <token>`)** |
| **Videos** | `GET` | `/video/{id}` | Fetch single video | **YES (`Bearer <token>`)** |

---

## 🌐 Frontend Integration Example (React / Axios / React Native)

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// 1. Authenticate & Obtain JWT Token
export async function loginUser(username, password) {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  const response = await axios.post(`${API_BASE_URL}/api/auth/login`, formData);
  const token = response.data.access_token;
  localStorage.setItem('jwt_token', token);
  return token;
}

// 2. Fetch Protected Media Data using Authorization Header
export async function getMediaItems() {
  const token = localStorage.getItem('jwt_token');
  const response = await axios.get(`${API_BASE_URL}/api/media`, {
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
