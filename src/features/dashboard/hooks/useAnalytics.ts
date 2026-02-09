import { useQuery } from "@tanstack/react-query";
import { analyticsApi } from "../api";
import type { AnalyticsFilters } from "../types";

export const ANALYTICS_QUERY_KEY = "analytics";

export function useAnalytics(filters: AnalyticsFilters = { period: "7d" }) {
  return useQuery({
    queryKey: [ANALYTICS_QUERY_KEY, filters],
    queryFn: () => analyticsApi.getAnalytics(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
