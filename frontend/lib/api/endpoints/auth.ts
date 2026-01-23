import api, { ApiResponse, tokenManager } from "../client";

interface LoginResponse {
  access: string;
  refresh: string;
}

interface UserResponse {
  id: number;
  username: string;
  email: string;
  role: "admin" | "bursar" | "teacher" | "student" | "parent";
  first_name?: string;
  last_name?: string;
}

export const authApi = {
  login: async (
    username: string,
    password: string
  ): Promise<ApiResponse<LoginResponse & { user: UserResponse }>> => {
    try {
      // Get tokens from Django
      const tokenResponse = await api.post<LoginResponse>("/api/token/", {
        username,
        password,
      });

      if (!tokenResponse.success || !tokenResponse.data) {
        return {
          success: false,
          error: tokenResponse.error || "Invalid credentials",
        };
      }

      const tokens = tokenResponse.data;
      tokenManager.setTokens(tokens.access, tokens.refresh);

      // Get user data
      const userResponse = await api.get<UserResponse>("/api/me/");

      if (!userResponse.success || !userResponse.data) {
        tokenManager.clearTokens();
        return {
          success: false,
          error: "Failed to fetch user data",
        };
      }

      return {
        success: true,
        data: {
          ...tokens,
          user: userResponse.data,
        },
      };
    } catch {
      return {
        success: false,
        error: "Network error",
      };
    }
  },

  logout: async (): Promise<ApiResponse> => {
    try {
      const refresh = tokenManager.getRefreshToken();
      if (refresh) {
        await api.post("/api/logout/", { refresh });
      }
    } finally {
      tokenManager.clearTokens();
      return { success: true };
    }
  },

  me: async (): Promise<ApiResponse<UserResponse>> => {
    return api.get<UserResponse>("/api/me/");
  },

  refreshToken: async (): Promise<ApiResponse<{ access: string }>> => {
    const refresh = tokenManager.getRefreshToken();
    if (!refresh) {
      return { success: false, error: "No refresh token available" };
    }

    return api.post<{ access: string }>("/api/token/refresh/", { refresh });
  },
};