import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { transactionsApi } from "../api";
import { TRANSACTIONS_QUERY_KEY } from "./useTransactions";
import { getErrorMessage } from "@/types";
import type { CreateTransactionPayload } from "@/types";

// Normalize status to uppercase for consistent handling
function normalizeStatus(
  status: string,
): "SUCCESS" | "FLAGGED" | "BLOCKED" | "PENDING" {
  return status.toUpperCase() as "SUCCESS" | "FLAGGED" | "BLOCKED" | "PENDING";
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTransactionPayload) =>
      transactionsApi.createTransaction(payload),
    onSuccess: (transaction) => {
      queryClient.invalidateQueries({ queryKey: [TRANSACTIONS_QUERY_KEY] });

      const normalizedStatus = normalizeStatus(transaction.status);

      switch (normalizedStatus) {
        case "SUCCESS":
          toast.success("Transaction Successful", {
            description: `Risk Score: ${transaction.risk_score ?? 0}`,
          });
          break;
        case "FLAGGED":
          toast.warning("Transaction Flagged", {
            description: `Risk Score: ${transaction.risk_score ?? 0}. Under review.`,
          });
          break;
        case "BLOCKED":
          toast.error("Transaction Blocked", {
            description: `Risk Score: ${transaction.risk_score ?? 0}. High risk detected.`,
          });
          break;
        default:
          toast.info("Transaction Pending", {
            description: `Risk Score: ${transaction.risk_score ?? 0}`,
          });
      }
    },
    onError: (error) => {
      toast.error("Transaction Failed", {
        description: getErrorMessage(error),
      });
    },
  });
}
