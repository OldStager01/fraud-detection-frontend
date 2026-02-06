import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { transactionsApi } from "../api";
import { TRANSACTIONS_QUERY_KEY } from "./useTransactions";
import { getErrorMessage } from "@/types";
import type { FeedbackPayload } from "@/types";

export function useSubmitFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      transactionId,
      payload,
    }: {
      transactionId: string;
      payload: FeedbackPayload;
    }) => transactionsApi.submitFeedback(transactionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TRANSACTIONS_QUERY_KEY] });
      toast.success("Feedback Submitted", {
        description: "Thank you for your feedback.",
      });
    },
    onError: (error) => {
      toast.error("Failed to submit feedback", {
        description: getErrorMessage(error),
      });
    },
  });
}
