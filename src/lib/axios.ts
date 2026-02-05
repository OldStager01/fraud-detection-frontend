import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { envConfig } from "@/config";

const apiClient = axios.create({
  baseURL: envConfig.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // You can add any request modifications here
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle specific error codes
    if (error.response?.status === 401) {
      // Clear any local auth state if needed
      // This will be handled by the auth slice
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }

    return Promise.reject(error);
  },
);

export default apiClient;
