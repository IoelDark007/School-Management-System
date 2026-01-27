// frontend/src/lib/api-client.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  // In a real app, retrieve this from a cookie or secure storage
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers = {
    "Content-Type": "application/json",
    ...(token && { "Authorization": `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  const result = await response.json();

  // Handle DRF Standard Errors vs Your Custom Standard
  if (!response.ok) {
    throw {
      code: response.status,
      message: result.detail || result.message || "An error occurred",
    };
  }

  return result;
}