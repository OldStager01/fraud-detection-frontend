import { useQuery } from "@tanstack/react-query";
import { transactionsApi, type TransactionFilters } from "../api";

export const TRANSACTIONS_QUERY_KEY = "transactions";

export function useTransactions(filters: TransactionFilters = {}) {
  return useQuery({
    queryKey: [TRANSACTIONS_QUERY_KEY, filters],
    queryFn: () => transactionsApi.getTransactions(filters),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: [TRANSACTIONS_QUERY_KEY, "dashboard-stats"],
    queryFn: () => transactionsApi.getTransactions({ per_page: 10 }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
