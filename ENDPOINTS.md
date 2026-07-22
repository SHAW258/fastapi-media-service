# Media API (FastAPI) - Comprehensive Endpoint Documentation

Welcome to the full API reference for **fastapi-media-service**.

- **Production Base URL:** `https://fastapi-media-service-production.up.railway.app`
- **Interactive Swagger Docs:** `https://fastapi-media-service-production.up.railway.app/docs`
- **Interactive Web Tester UI:** `https://fastapi-media-service-production.up.railway.app/demo`

All media, video, song, and category endpoints require **JWT Bearer Token Authentication** (`Authorization: Bearer <access_token>`).

---

## 🔐 1. Authentication Endpoints (`/api/auth`)

### 1.1 Register User
- **Method:** `POST`
- **Path:** `/api/auth/register`
- **Full URL:** `https://fastapi-media-service-production.up.railway.app/api/auth/register`
- **Auth Required:** No
- **Request Body (`application/json`):**
```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "SecurePassword123!"
}
```
- **Response (`201 Created`):**
```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "id": 1,
  "is_active": true,
  "is_superuser": false
}
```

---

### 1.2 Login & Acquire JWT Access Token
- **Method:** `POST`
- **Path:** `/api/auth/login`
- **Full URL:** `https://fastapi-media-service-production.up.railway.app/api/auth/login`
- **Auth Required:** No
- **Request Format:** Form Data (`application/x-www-form-urlencoded`)
- **Parameters:**
  - `username` (string, required)
  - `password` (string, required)
- **Response (`200 OK`):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "username": "johndoe",
    "email": "johndoe@example.com",
    "id": 1,
    "is_active": true,
    "is_superuser": false
  }
}
```

---

### 1.3 Get Current Authenticated Profile
- **Method:** `GET`
- **Path:** `/api/auth/me`
- **Full URL:** `https://fastapi-media-service-production.up.railway.app/api/auth/me`
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)
- **Headers:**
  - `Authorization`: `Bearer <access_token>`

---

## 🎬 2. Media Endpoints (`/api/media` & `/api/categories`)

### 2.1 Fetch All Media Items
- **Method:** `GET`
- **Path:** `/api/media`
- **Full URL:** `https://fastapi-media-service-production.up.railway.app/api/media`
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)

---

### 2.2 Fetch Single Media Item by ID
- **Method:** `GET`
- **Path:** `/api/media/{id}`
- **Full URL:** `https://fastapi-media-service-production.up.railway.app/api/media/1`
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)

---

### 2.3 Create New Media Item
- **Method:** `POST`
- **Path:** `/api/media`
- **Full URL:** `https://fastapi-media-service-production.up.railway.app/api/media`
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)

---

### 2.4 Echo JSON Payload
- **Method:** `POST`
- **Path:** `/api/media/echo`
- **Full URL:** `https://fastapi-media-service-production.up.railway.app/api/media/echo`
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)

---

### 2.5 Fetch All Categories
- **Method:** `GET`
- **Path:** `/api/categories`
- **Full URL:** `https://fastapi-media-service-production.up.railway.app/api/categories`
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)

---

### 2.6 Fetch Media Items by Category
- **Method:** `GET`
- **Path:** `/api/categories/{category}`
- **Full URL:** `https://fastapi-media-service-production.up.railway.app/api/categories/Education`
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)

---

## 🎵 3. Songs & Artists Endpoints (`/song` & `/artist`)

### 3.1 Fetch All Songs (Audio Only)
- **Method:** `GET`
- **Path:** `/song`
- **Full URL:** `https://fastapi-media-service-production.up.railway.app/song`
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)

---

### 3.2 Fetch All Audio Artists
- **Method:** `GET`
- **Paths:** `/song/artists` OR `/song/artistg`
- **Full URL:** `https://fastapi-media-service-production.up.railway.app/song/artists`
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)

---

### 3.3 Fetch Single Song by ID
- **Method:** `GET`
- **Path:** `/song/{id}`
- **Full URL:** `https://fastapi-media-service-production.up.railway.app/song/1`
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)

---

### 3.4 Fetch Artist Detail & Songs by Artist ID
- **Method:** `GET`
- **Path:** `/artist/{id}`
- **Full URL:** `https://fastapi-media-service-production.up.railway.app/artist/1`
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)

---

## 📹 4. Videos Endpoints (`/videos` & `/video`)

### 4.1 Fetch All Videos
- **Method:** `GET`
- **Path:** `/videos`
- **Full URL:** `https://fastapi-media-service-production.up.railway.app/videos`
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)

---

### 4.2 Fetch Single Video by ID
- **Method:** `GET`
- **Path:** `/video/{id}`
- **Full URL:** `https://fastapi-media-service-production.up.railway.app/video/1`
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)

---

## ⚙️ 5. Public System Endpoints

| Path | Method | Full URL | Auth Required |
| :--- | :---: | :--- | :---: |
| `/` | `GET` | `https://fastapi-media-service-production.up.railway.app/` | No |
| `/api/health` | `GET` | `https://fastapi-media-service-production.up.railway.app/api/health` | No |
| `/docs` | `GET` | `https://fastapi-media-service-production.up.railway.app/docs` | No |
| `/demo` | `GET` | `https://fastapi-media-service-production.up.railway.app/demo` | No |
| `/openapi.json` | `GET` | `https://fastapi-media-service-production.up.railway.app/openapi.json` | No |
