# FastAPI Media Service & React Tailwind Frontend

An enterprise-grade **Python FastAPI Backend** service & **React + Tailwind CSS Frontend App** converted from Kotlin/Ktor with **Cloud Supabase PostgreSQL** database integration, **Strict JWT Authentication & Security on ALL endpoints**, **Responsive Navigation & Menu Bars**, and **Dark & Light Mode Support**.

[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/Frontend-React%2019-61DAFB.svg?style=flat&logo=react)](https://react.dev)
[![PostgreSQL](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-336791.svg?style=flat&logo=postgresql)](https://supabase.com)
[![Railway](https://img.shields.io/badge/Deployment-Railway%20Live-000000.svg?style=flat&logo=railway)](https://fastapi-media-service-production.up.railway.app)
[![JWT](https://img.shields.io/badge/Security-Strict%20JWT%20Tokens-000000.svg?style=flat&logo=jsonwebtokens)](https://jwt.io)

---

## 🌐 Live Production Deployment

- **Live Railway API Base URL:** [https://fastapi-media-service-production.up.railway.app](https://fastapi-media-service-production.up.railway.app)
- **Interactive Web Demo UI:** [https://fastapi-media-service-production.up.railway.app/demo](https://fastapi-media-service-production.up.railway.app/demo)
- **Interactive Swagger Documentation:** [https://fastapi-media-service-production.up.railway.app/docs](https://fastapi-media-service-production.up.railway.app/docs)
- **Health Check Endpoint:** [https://fastapi-media-service-production.up.railway.app/api/health](https://fastapi-media-service-production.up.railway.app/api/health)

---

## 🎨 React + Tailwind Frontend (`/reacttailwind`)

Inside the `reacttailwind/` directory is a responsive React web dashboard connected live to the backend API with the following features:

- 🌓 **Dark & Light Mode Switcher**: Smooth theme toggle persisted in `localStorage`.
- 📱 **Responsive Sidebar & Navigation**: Mobile slide-over drawer with backdrop blur, desktop persistent navigation menu bar, and active indicators.
- 👤 **User Profile & JWT Auth Section**: Profile card displaying user details, JWT Bearer Token copy box, User Registration & Login forms.
- 🎵 **Media Library & Audio/Video Players**: Grid & List view modes, category filters, 500+ audio songs, 330+ videos, artist cards, and HTML5 video/audio playback modal.
- ➕ **Add New Media Modal**: Protected form for adding new assets to Cloud Supabase via `POST /api/media`.

```bash
# How to Run Frontend Locally
cd reacttailwind
npm install
npm run dev
```

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
│       └── interactive_demo_ui.png  # Interactive UI Preview Screenshot Sample
├── reacttailwind/              # React + Tailwind CSS Web Application
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── index.css           # Custom theme design tokens & glassmorphism
│       ├── App.jsx             # Main App layout & route management
        ├── services/
        │   └── api.js          # API client with JWT Bearer Token handling
        └── components/
            ├── Sidebar.jsx     # Responsive Navigation Sidebar & menu bars
            ├── Navbar.jsx      # Top bar with Search, Theme Toggle, & Host selector
            ├── Dashboard.jsx   # Metrics cards & Trending Media Carousel
            ├── MediaLibrary.jsx# Grid & List view, Media type tabs, & Category filter
            ├── SongsSection.jsx# Audio songs list & Artist directory
            ├── VideosSection.jsx# Video gallery & thumbnail cards
            ├── UserProfile.jsx # Profile card, JWT Token box, & Auth forms
            ├── AddMediaModal.jsx# Protected Media Creation Modal
            └── PlayerModal.jsx # Audio/Video Stream Player Modal
└── fastapi_app/                # Main Python FastAPI Web Service
    ├── .env                    # Active environment variables (Supabase URL & JWT Secret)
    ├── requirements.txt        # Dependencies
    ├── media-1000.json         # 833 media items dataset
    ├── seed_supabase.py        # Database migration & 833 items seeder script
    ├── fetch_supabase.py       # Live Supabase query verification tool
    ├── run_and_capture.py      # Localhost server runner & screenshot generator
    ├── test_api.py             # Automated end-to-end endpoint & strict JWT test suite
    └── app/
        ├── main.py             # FastAPI Application instance & router registration
        ├── config.py           # Configuration management
        ├── database.py         # SQLAlchemy 2.0 Engine & session lifecycle
        ├── models.py           # Database models (User, MediaItem)
        ├── schemas.py          # Pydantic V2 Request & Response schemas
        ├── auth.py             # JWT token handling & password hashing
        ├── seed.py             # Automatic startup seed logic
        ├── middleware.py       # Frontend CORS, preflight, latency & security middleware
        └── static/
            └── index.html      # Interactive Web Test Client UI (/demo)
```

---

## 🛠 Step-by-Step Setup Guide

### 1. Run Backend Server (FastAPI)
```bash
cd fastapi_app
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

### 2. Run Frontend Web App (React + Tailwind)
```bash
cd reacttailwind
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser!
