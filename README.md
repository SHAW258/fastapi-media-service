# Media API (Python FastAPI + Supabase / PostgreSQL + JWT Auth)

Enterprise Python FastAPI media service converted from Kotlin/Ktor with JWT authentication, PostgreSQL/Supabase database integration, and full endpoint parity.

---

## 🚀 Features

- **FastAPI Framework**: High-performance, async-ready web framework with automatic OpenAPI / Swagger documentation.
- **Supabase & PostgreSQL Support**: Native connection support for Cloud **Supabase PostgreSQL** databases via `DATABASE_URL` (with SQLite fallback for local development).
- **JWT Authentication & Security**: Secure password hashing (PBKDF2 SHA-256), OAuth2 Bearer token generation, user registration, login, and protected routes.
- **Automated Database Seeding**: Pre-populates 1,000 media items from `media-1000.json` and creates a default admin user on startup.

---

## 📁 Repository Structure

```text
├── Dockerfile                  # Production Docker container
├── render.yaml                 # Render Blueprint configuration
├── README.md                   # Project documentation
├── ENDPOINTS.md                # Route specifications
└── fastapi_app/
    ├── .env.example            # Environment variables configuration template
    ├── requirements.txt        # Dependencies
    ├── media-1000.json         # 1,000 media items dataset
    ├── test_api.py             # Automated API & JWT test runner
    └── app/
        ├── main.py             # FastAPI entry point & CORS configuration
        ├── config.py           # Configuration settings
        ├── database.py         # SQLAlchemy engine & session lifecycle
        ├── models.py           # SQLAlchemy User & MediaItem models
        ├── schemas.py          # Pydantic V2 Request & Response schemas
        ├── auth.py             # JWT token handling & password hashing
        ├── seed.py             # Database seed logic
        └── routers/
            ├── auth.py         # Auth routes (/api/auth/register, /api/auth/login, /api/auth/me)
            ├── media.py        # Media routes (/api/media, /api/categories)
            ├── songs.py        # Songs & Artists routes (/song, /song/artists, /artist/{id})
            └── videos.py       # Video routes (/videos, /video/{id})
```

---

## 🛠 Local Setup & Running

### 1. Install Dependencies
```bash
pip install -r fastapi_app/requirements.txt
```

### 2. Configure Environment (Optional for Supabase)
Copy `.env.example` to `.env` in `fastapi_app/`:
```ini
DATABASE_URL=postgresql://postgres.your_project_ref:YOUR_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres
JWT_SECRET_KEY=your-custom-jwt-secret
```

### 3. Run FastAPI Server
```bash
cd fastapi_app
python -m uvicorn app.main:app --reload --port 8000
```

- **Interactive Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Health Endpoint**: [http://localhost:8000/api/health](http://localhost:8000/api/health)

---

## 🧪 Running Automated Test Suite

Run the automated endpoint and JWT authentication test suite:
```bash
python fastapi_app/test_api.py
```
