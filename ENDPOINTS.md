# Media API (FastAPI) - Comprehensive Endpoint Documentation

Welcome to the full API reference for **fastapi-media-service**. This document details all available HTTP endpoints, authorization requirements, request bodies, and response schemas.

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
- **Auth Required:** Yes (`Authorization: Bearer <access_token>`)
- **Headers:**
  - `Authorization`: `Bearer <access_token>`
- **Response (`200 OK`):**
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

## 🎬 2. Media Endpoints (`/api/media` & `/api/categories`)

### 2.1 Fetch All Media Items
- **Method:** `GET`
- **Path:** `/api/media`
- **Auth Required:** No
- **Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Media items fetched successfully",
  "total": 833,
  "data": [
    {
      "id": 1,
      "title": "Sample Video 1",
      "description": "Demo MP4 video item 1",
      "mediaType": "video",
      "format": "mp4",
      "category": "Education",
      "duration": "00:05",
      "thumbnailUrl": "https://dummyimage.com/600x400/037/fff&text=Video+1",
      "mediaUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
      "artist": null,
      "views": 507,
      "likes": 22,
      "isPremium": false,
      "createdAt": "2026-07-12T15:21:26Z"
    }
  ]
}
```

---

### 2.2 Fetch Single Media Item by ID
- **Method:** `GET`
- **Path:** `/api/media/{id}`
- **Auth Required:** No
- **Response (`200 OK`):** Returns single Media Object.
- **Response (`404 Not Found`):** `{"success": false, "message": "Media item not found", "statusCode": 404}`

---

### 2.3 Create New Media Item
- **Method:** `POST`
- **Path:** `/api/media`
- **Auth Required:** Yes (`Authorization: Bearer <access_token>`)
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
- **Response (`201 Created`):** Returns created Media Object with assigned database ID.

---

### 2.4 Echo JSON Request Body
- **Method:** `POST`
- **Path:** `/api/media/echo`
- **Auth Required:** No
- **Request Body:** Any valid JSON
- **Response (`200 OK`):** Returns exact payload back.

---

### 2.5 Fetch All Categories
- **Method:** `GET`
- **Path:** `/api/categories`
- **Auth Required:** No
- **Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Categories fetched successfully",
  "total": 8,
  "data": [
    { "name": "Education", "total": 167 },
    { "name": "Entertainment", "total": 110 },
    { "name": "Instrumental", "total": 100 },
    { "name": "Music", "total": 100 },
    { "name": "Podcast", "total": 100 },
    { "name": "Relaxing", "total": 100 },
    { "name": "Streaming", "total": 56 },
    { "name": "Testing", "total": 101 }
  ]
}
```

---

### 2.6 Fetch Media Items by Category
- **Method:** `GET`
- **Path:** `/api/categories/{category}` (e.g., `/api/categories/Education`)
- **Auth Required:** No
- **Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Category media fetched successfully",
  "category": "Education",
  "total": 167,
  "data": [ ... ]
}
```

---

## 🎵 3. Songs & Artists Endpoints (`/song` & `/artist`)

### 3.1 Fetch All Songs (Audio Only)
- **Method:** `GET`
- **Path:** `/song`
- **Auth Required:** No
- **Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Songs fetched successfully",
  "total": 501,
  "data": [ ... ]
}
```

---

### 3.2 Fetch All Audio Artists
- **Method:** `GET`
- **Paths:** `/song/artists` OR `/song/artistg`
- **Auth Required:** No
- **Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Artists fetched successfully",
  "total": 5,
  "data": [
    { "id": 1, "name": "Demo Artist", "totalSongs": 142 },
    { "id": 2, "name": "FastAPI Tester", "totalSongs": 1 },
    { "id": 3, "name": "LoFi Beats", "totalSongs": 89 },
    { "id": 4, "name": "Podcast Host", "totalSongs": 100 },
    { "id": 5, "name": "Supabase Tester", "totalSongs": 1 }
  ]
}
```

---

### 3.3 Fetch Single Song by ID
- **Method:** `GET`
- **Path:** `/song/{id}`
- **Auth Required:** No
- **Response (`200 OK`):** Single Song object (`mediaType: "audio"`).

---

### 3.4 Fetch Artist Detail & Songs by Artist ID
- **Method:** `GET`
- **Path:** `/artist/{id}` (e.g., `/artist/1`)
- **Auth Required:** No
- **Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Artist fetched successfully",
  "data": {
    "id": 1,
    "name": "Demo Artist",
    "totalSongs": 142,
    "songs": [ ... ]
  }
}
```

---

## 📹 4. Videos Endpoints (`/videos` & `/video`)

### 4.1 Fetch All Videos
- **Method:** `GET`
- **Path:** `/videos`
- **Auth Required:** No
- **Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Videos fetched successfully",
  "total": 333,
  "data": [ ... ]
}
```

---

### 4.2 Fetch Single Video by ID
- **Method:** `GET`
- **Path:** `/video/{id}`
- **Auth Required:** No
- **Response (`200 OK`):** Single Video object (`mediaType: "video"`).

---

## ⚙️ 5. System & OpenAPI Endpoints

| Path | Method | Description |
| :--- | :---: | :--- |
| `/` | `GET` | API welcome endpoint & metadata |
| `/api/health` | `GET` | Health check endpoint (`{"status": "ok"}`) |
| `/docs` | `GET` | Interactive Swagger UI API documentation |
| `/redoc` | `GET` | ReDoc API documentation |
| `/openapi.json` | `GET` | Raw OpenAPI 3.0 specification |
