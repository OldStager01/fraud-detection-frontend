import { apiClient } from "@/lib";
import type {
  ApiResponse,
  Transaction,
  TransactionsListResponse,
  CreateTransactionPayload,
  FeedbackPayload,
  FraudEvaluation,
} from "@/types";

export interface TransactionFilters {
  page?: number;
  per_page?: number;
  status?: string;
  payment_method?: string;
  start_date?: string;
  end_date?: string;
}

export const transactionsApi = {
  getTransactions: async (
    filters: TransactionFilters = {},
  ): Promise<TransactionsListResponse> => {
    const params = new URLSearchParams();
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.per_page)
      params.append("per_page", filters.per_page.toString());
    if (filters.status) params.append("status", filters.status);
    if (filters.payment_method)
      params.append("payment_method", filters.payment_method);
    if (filters.start_date) params.append("start_date", filters.start_date);
    if (filters.end_date) params.append("end_date", filters.end_date);

    const response = await apiClient.get<ApiResponse<TransactionsListResponse>>(
      `/transactions?${params.toString()}`,
    );
    return response.data.data;
  },

  createTransaction: async (
    payload: CreateTransactionPayload,
  ): Promise<Transaction> => {
    const response = await apiClient.post<ApiResponse<Transaction>>(
      "/transactions",
      {
        transaction: payload,
      },
    );
    return response.data.data;
  },

  submitFeedback: async (
    transactionId: string,
    payload: FeedbackPayload,
  ): Promise<FraudEvaluation> => {
    const response = await apiClient.post<ApiResponse<FraudEvaluation>>(
      `/transactions/${transactionId}/feedback`,
      { feedback: payload },
    );
    return response.data.data;
  },
};
