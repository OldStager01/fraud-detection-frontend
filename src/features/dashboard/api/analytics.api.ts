import { apiClient } from "@/lib";
import type { ApiResponse } from "@/types";
import type { AnalyticsResponse, AnalyticsFilters } from "../types";

export const analyticsApi = {
  getAnalytics: async (
    filters: AnalyticsFilters = {},
  ): Promise<AnalyticsResponse> => {
    const params = new URLSearchParams();

    if (filters.period) params.append("period", filters.period);
    if (filters.start_date) params.append("start_date", filters.start_date);
    if (filters.end_date) params.append("end_date", filters.end_date);
    if (filters.status) params.append("status", filters.status);
    if (filters.payment_method)
      params.append("payment_method", filters.payment_method);

    const response = await apiClient.get<ApiResponse<AnalyticsResponse>>(
      `/analytics?${params.toString()}`,
    );
    return response.data.data;
  },
};
