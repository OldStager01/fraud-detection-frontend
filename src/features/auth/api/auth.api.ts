import { apiClient } from "@/lib";
import type {
  ApiResponse,
  User,
  LoginCredentials,
  RegisterCredentials,
} from "@/types";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    const response = await apiClient.post<ApiResponse<User>>(
      "/auth/login",
      credentials,
    );
    return response.data.data;
  },

  register: async (credentials: RegisterCredentials): Promise<User> => {
    const response = await apiClient.post<ApiResponse<User>>("/auth/register", {
      user: credentials,
    });
    return response.data.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.delete("/auth/logout");
  },

  getMe: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>("/auth/me");
    return response.data.data;
  },
};
