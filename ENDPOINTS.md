# Media API (FastAPI) - Comprehensive Endpoint Documentation

Welcome to the full API reference for **fastapi-media-service**. All media, video, song, and category endpoints require **JWT Bearer Token Authentication** (`Authorization: Bearer <access_token>`).

---

## 🔐 1. Authentication Endpoints (`/api/auth`)

### 1.1 Register User
- **Method:** `POST`
- **Path:** `/api/auth/register`
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
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)
- **Headers:**
  - `Authorization`: `Bearer <access_token>`
- **Response (`200 OK`):** Returns user profile JSON.

---

## 🎬 2. Media Endpoints (`/api/media` & `/api/categories`)

### 2.1 Fetch All Media Items
- **Method:** `GET`
- **Path:** `/api/media`
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)
- **Headers:**
  - `Authorization`: `Bearer <access_token>`
- **Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Media items fetched successfully",
  "total": 835,
  "data": [ ... ]
}
```

---

### 2.2 Fetch Single Media Item by ID
- **Method:** `GET`
- **Path:** `/api/media/{id}`
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)
- **Headers:**
  - `Authorization`: `Bearer <access_token>`
- **Response (`200 OK`):** Single Media Object.

---

### 2.3 Create New Media Item
- **Method:** `POST`
- **Path:** `/api/media`
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)
- **Headers:**
  - `Authorization`: `Bearer <access_token>`
- **Request Body (`application/json`):**
```json
{
  "title": "New Sunset Track",
  "description": "Chill music track",
  "mediaType": "audio",
  "format": "mp3",
  "category": "Relaxing",
  "duration": "04:20",
  "thumbnailUrl": "https://example.com/thumb.jpg",
  "mediaUrl": "https://example.com/audio.mp3",
  "artist": "LoFi Chill",
  "views": 0,
  "likes": 0,
  "isPremium": false,
  "createdAt": "2026-07-23T00:00:00Z"
}
```

---

### 2.4 Echo JSON Payload
- **Method:** `POST`
- **Path:** `/api/media/echo`
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)

---

### 2.5 Fetch All Categories
- **Method:** `GET`
- **Path:** `/api/categories`
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)

---

### 2.6 Fetch Media Items by Category
- **Method:** `GET`
- **Path:** `/api/categories/{category}`
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)

---

## 🎵 3. Songs & Artists Endpoints (`/song` & `/artist`)

### 3.1 Fetch All Songs (Audio Only)
- **Method:** `GET`
- **Path:** `/song`
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)

---

### 3.2 Fetch All Audio Artists
- **Method:** `GET`
- **Paths:** `/song/artists` OR `/song/artistg`
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)

---

### 3.3 Fetch Single Song by ID
- **Method:** `GET`
- **Path:** `/song/{id}`
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)

---

### 3.4 Fetch Artist Detail & Songs by Artist ID
- **Method:** `GET`
- **Path:** `/artist/{id}`
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)

---

## 📹 4. Videos Endpoints (`/videos` & `/video`)

### 4.1 Fetch All Videos
- **Method:** `GET`
- **Path:** `/videos`
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)

---

### 4.2 Fetch Single Video by ID
- **Method:** `GET`
- **Path:** `/video/{id}`
- **Auth Required:** YES (`Authorization: Bearer <access_token>`)

---

## ⚙️ 5. Public System Endpoints

| Path | Method | Description | Auth Required |
| :--- | :---: | :--- | :---: |
| `/` | `GET` | API metadata | No |
| `/api/health` | `GET` | Health check endpoint | No |
| `/docs` | `GET` | Interactive Swagger UI Docs | No |
| `/openapi.json` | `GET` | OpenAPI 3.0 specification | No |
