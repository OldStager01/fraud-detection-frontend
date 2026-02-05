import { AxiosError } from "axios";

export interface ApiErrorResponse {
  status: "error";
  message: string;
  data: null;
  error?: string[];
}

export type ApiError = AxiosError<ApiErrorResponse>;

export function isApiError(error: unknown): error is ApiError {
  return (
    error instanceof Error &&
    "isAxiosError" in error &&
    (error as AxiosError).isAxiosError === true
  );
}

export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    const apiError = error.response?.data;
    if (apiError?.message) {
      return apiError.message;
    }
    if (apiError?.error && apiError.error.length > 0) {
      return apiError.error.join(", ");
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
}
