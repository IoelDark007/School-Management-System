// frontend/src/lib/api-client.ts
interface ApiResponse<T> {
  responseCode: number;
  responseMessage: string;
  data: T;
}

export async function apiRequest<T>(url: string): Promise<T | null> {
  const response = await fetch(url);
  const result: ApiResponse<T> = await response.json();

  if (result.responseCode === 0) {
    return result.data; // Success path 
  } else {
    // Handle error codes 1-8 as defined in the standard [cite: 24, 62]
    console.error(`Error ${result.responseCode}: ${result.responseMessage}`);
    return null;
  }
}