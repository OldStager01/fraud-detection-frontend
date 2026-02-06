import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Label,
  Textarea,
} from "@/components/ui";
import { cn } from "@/utils";
import { feedbackSchema, type FeedbackFormData } from "../schemas";
import { useSubmitFeedback } from "../hooks";
import type { Transaction } from "@/types";

interface FeedbackDialogProps {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FeedbackDialog({
  transaction,
  open,
  onOpenChange,
}: FeedbackDialogProps) {
  const { mutate: submitFeedback, isPending } = useSubmitFeedback();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      is_accurate: undefined,
      user_feedback: "",
    },
  });

  const isAccurate = watch("is_accurate");

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = (data: FeedbackFormData) => {
    if (!transaction) return;

    submitFeedback(
      {
        transactionId: transaction.id,
        payload: {
          is_accurate: data.is_accurate,
          user_feedback: data.user_feedback || undefined,
        },
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          reset();
        },
      },
    );
  };

  if (!transaction) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Feedback</DialogTitle>
          <DialogDescription>
            Was the risk assessment for this transaction accurate? Your feedback
            helps improve our detection system.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Accuracy Selection */}
          <div className="space-y-2">
            <Label>Was the risk assessment accurate?</Label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setValue("is_accurate", true)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all",
                  isAccurate === true
                    ? "border-success-500 bg-success-50 dark:bg-success-950"
                    : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600",
                )}
              >
                <ThumbsUp
                  className={cn(
                    "h-5 w-5",
                    isAccurate === true
                      ? "text-success-600"
                      : "text-neutral-400",
                  )}
                />
                <span
                  className={cn(
                    "font-medium",
                    isAccurate === true
                      ? "text-success-700 dark:text-success-300"
                      : "text-neutral-600 dark:text-neutral-400",
                  )}
                >
                  Yes, accurate
                </span>
              </button>
              <button
                type="button"
                onClick={() => setValue("is_accurate", false)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all",
                  isAccurate === false
                    ? "border-danger-500 bg-danger-50 dark:bg-danger-950"
                    : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600",
                )}
              >
                <ThumbsDown
                  className={cn(
                    "h-5 w-5",
                    isAccurate === false
                      ? "text-danger-600"
                      : "text-neutral-400",
                  )}
                />
                <span
                  className={cn(
                    "font-medium",
                    isAccurate === false
                      ? "text-danger-700 dark:text-danger-300"
                      : "text-neutral-600 dark:text-neutral-400",
                  )}
                >
                  No, inaccurate
                </span>
              </button>
            </div>
            {errors.is_accurate && (
              <p className="text-sm text-danger-600 dark:text-danger-400">
                Please select an option
              </p>
            )}
          </div>

          {/* Additional Feedback */}
          <div className="space-y-2">
            <Label htmlFor="user_feedback">
              Additional Comments (Optional)
            </Label>
            <Textarea
              id="user_feedback"
              placeholder="Provide any additional details about this transaction..."
              {...register("user_feedback")}
              error={!!errors.user_feedback}
            />
            {errors.user_feedback && (
              <p className="text-sm text-danger-600 dark:text-danger-400">
                {errors.user_feedback.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isPending}
              disabled={isAccurate === undefined}
            >
              Submit Feedback
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
