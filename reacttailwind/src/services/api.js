const DEFAULT_BASE_URL = "https://fastapi-media-service-production.up.railway.app";

export function getBaseUrl() {
  return localStorage.getItem("api_base_url") || DEFAULT_BASE_URL;
}

export function setBaseUrl(url) {
  localStorage.setItem("api_base_url", url);
}

export function getToken() {
  return localStorage.getItem("jwt_token") || "";
}

export function setToken(token) {
  if (token) {
    localStorage.setItem("jwt_token", token);
  } else {
    localStorage.removeItem("jwt_token");
  }
}

async function request(path, options = {}) {
  const baseUrl = getBaseUrl();
  const token = getToken();

  const headers = {
    "Accept": "application/json",
    ...options.headers,
  };

  if (token && !headers["Authorization"]) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers,
  });

  const timeHeader = response.headers.get("X-Process-Time");

  let data;
  try {
    data = await response.json();
  } catch (err) {
    data = { success: false, message: "Non-JSON response received" };
  }

  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    data,
    processTime: timeHeader,
  };
}

// Authentication API
export async function registerUser(username, email, password) {
  return request("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
}

export async function loginUser(username, password) {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const result = await request("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData,
  });

  if (result.ok && result.data.access_token) {
    setToken(result.data.access_token);
  }
  return result;
}

export async function getProfile() {
  return request("/api/auth/me");
}

// Media API (Requires JWT Auth)
export async function fetchAllMedia() {
  return request("/api/media");
}

export async function fetchMediaById(id) {
  return request(`/api/media/${id}`);
}

export async function createMedia(mediaItem) {
  return request("/api/media", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mediaItem),
  });
}

// Categories & Songs & Videos
export async function fetchCategories() {
  return request("/api/categories");
}

export async function fetchCategoryMedia(categoryName) {
  return request(`/api/categories/${encodeURIComponent(categoryName)}`);
}

export async function fetchSongs() {
  return request("/song");
}

export async function fetchArtists() {
  return request("/song/artists");
}

export async function fetchArtistDetail(id) {
  return request(`/artist/${id}`);
}

export async function fetchVideos() {
  return request("/videos");
}

export async function checkHealth() {
  return request("/api/health");
}
