# FastAPI Media Service & React Tailwind Frontend

An enterprise-grade **Python FastAPI Backend** service & **React + Tailwind CSS Frontend App** with **Cloud Supabase PostgreSQL** database integration, **Strict JWT Authentication & Security on ALL endpoints**, **Responsive Navigation & Menu Bars**, and **Dark & Light Mode Support**.

[![Vercel](https://img.shields.io/badge/Frontend-Vercel%20Live-000000.svg?style=flat&logo=vercel)](https://reacttailwind-nine.vercel.app)
[![Railway](https://img.shields.io/badge/Backend-Railway%20Live-000000.svg?style=flat&logo=railway)](https://fastapi-media-service-production.up.railway.app)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg?style=flat&logo=react)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![PostgreSQL](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-336791.svg?style=flat&logo=postgresql)](https://supabase.com)
[![JWT](https://img.shields.io/badge/Security-Strict%20JWT%20Tokens-000000.svg?style=flat&logo=jsonwebtokens)](https://jwt.io)

---

## 🔗 Live Hosted Services & Quick Links

| Service | Platform | Live URL / Access Link |
| :--- | :--- | :--- |
| 🎨 **Frontend Web App** | **Vercel** | [https://reacttailwind-nine.vercel.app](https://reacttailwind-nine.vercel.app) |
| 🚀 **Backend Production API** | **Railway** | [https://fastapi-media-service-production.up.railway.app](https://fastapi-media-service-production.up.railway.app) |
| ⚡ **Interactive Demo UI** | **FastAPI Static** | [https://fastapi-media-service-production.up.railway.app/demo](https://fastapi-media-service-production.up.railway.app/demo) |
| 📖 **Swagger OpenAPI Docs** | **FastAPI Docs** | [https://fastapi-media-service-production.up.railway.app/docs](https://fastapi-media-service-production.up.railway.app/docs) |
| 🩺 **System Health Check** | **Railway** | [https://fastapi-media-service-production.up.railway.app/api/health](https://fastapi-media-service-production.up.railway.app/api/health) |
| 🗄️ **Cloud Database** | **Supabase** | `aws-1-ap-south-1.pooler.supabase.com:5432` |

---

## 🖼 Sample UI & Test Suite Preview

Below is a live screenshot sample of the interactive web testing client running live:

![Sample Interactive UI Preview Screenshot](https://raw.githubusercontent.com/SHAW258/fastapi-media-service/main/docs/images/interactive_demo_ui.png)

*The interactive interface allows testing User Registration, JWT Bearer Token Login, and Strict Security Verification directly from your browser.*

---

## 📌 Project Overview

This repository houses the production-ready backend API service and full frontend web app for media streaming, user management, and video/audio playback. It features strict security, performance optimization, and cloud connectivity:

1. **React + Tailwind CSS Frontend (`/reacttailwind`)**:
   - Hosted live on **Vercel** at [https://reacttailwind-nine.vercel.app](https://reacttailwind-nine.vercel.app).
   - Features Dark/Light theme switching, responsive sidebar menu bars, user profile management, active JWT token display box, grid/list media views, and embedded audio/video player modals.
2. **Strict JWT Authentication on ALL Media Endpoints**: All requests to `/api/media`, `/song`, `/videos`, `/api/categories`, and `/artist/{id}` require a valid JWT Bearer token (`Authorization: Bearer <access_token>`). Unauthenticated requests are blocked with `HTTP 401 Unauthorized`.
3. **Cloud Supabase PostgreSQL Database Integration**: Connected via SQLAlchemy 2.0 ORM to Cloud Supabase PostgreSQL (`aws-1-ap-south-1.pooler.supabase.com:5432`).
4. **Password Security**: Uses PBKDF2 SHA-256 with salt hashing, OAuth2 bearer tokens, registration (`/api/auth/register`), login (`/api/auth/login`), and profile fetching (`/api/auth/me`).
5. **Automated Database Seeding**: Pre-populates all **833 media items** from `media-1000.json` into Supabase PostgreSQL tables and synchronizes primary key sequences automatically.
6. **Frontend Connection Middleware**: High-performance middleware handling Cross-Origin Resource Sharing (CORS), preflight `OPTIONS` requests, request logging, and attaching `X-Process-Time` latency headers.

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
├── reacttailwind/              # React + Tailwind CSS Web Application (Hosted on Vercel)
│   ├── package.json
│   ├── vite.config.js          # Configured with @tailwindcss/vite compiler
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
└── fastapi_app/                # Main Python FastAPI Web Service (Hosted on Railway)
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

## 🛠 Step-by-Step Local Setup Guide

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
