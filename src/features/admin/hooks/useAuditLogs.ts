import { useQuery } from "@tanstack/react-query";
import { adminApi, type AuditLogFilters } from "../api";

export const AUDIT_LOGS_QUERY_KEY = "admin-audit-logs";

export function useAuditLogs(filters: AuditLogFilters = {}) {
  return useQuery({
    queryKey: [AUDIT_LOGS_QUERY_KEY, filters],
    queryFn: () => adminApi.getAuditLogs(filters),
    staleTime: 1000 * 60 * 2,
  });
}
