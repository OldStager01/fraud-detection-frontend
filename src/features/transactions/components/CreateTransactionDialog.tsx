import { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useDeviceId } from "@/features/auth/hooks";
import {
  createTransactionSchema,
  type CreateTransactionFormData,
} from "../schemas";
import { useCreateTransaction } from "../hooks";

interface CreateTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateTransactionDialog({
  open,
  onOpenChange,
}: CreateTransactionDialogProps) {
  const amountInputRef = useRef<HTMLInputElement>(null);
  const { deviceId } = useDeviceId();
  const { mutate: createTransaction, isPending } = useCreateTransaction();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateTransactionFormData>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      amount: undefined,
      payment_method: undefined,
    },
  });

  useEffect(() => {
    if (open) {
      reset();
      setTimeout(() => amountInputRef.current?.focus(), 100);
    }
  }, [open, reset]);

  const onSubmit = (data: CreateTransactionFormData) => {
    if (!deviceId) return;

    createTransaction(
      {
        amount: data.amount,
        payment_method: data.payment_method,
        device_id: deviceId,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          reset();
        },
      },
    );
  };

  const { ref: amountRef, ...amountRegister } = register("amount", {
    valueAsNumber: true,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Transaction</DialogTitle>
          <DialogDescription>
            Enter the transaction details. The system will evaluate risk in
            real-time.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount" required>
              Amount (₹)
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              error={!!errors.amount}
              {...amountRegister}
              ref={(e) => {
                amountRef(e);
                (
                  amountInputRef as React.MutableRefObject<HTMLInputElement | null>
                ).current = e;
              }}
            />
            {errors.amount && (
              <p className="text-sm text-danger-600 dark:text-danger-400">
                {errors.amount.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment_method" required>
              Payment Method
            </Label>
            <Controller
              name="payment_method"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger error={!!errors.payment_method}>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="wallet">Wallet</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.payment_method && (
              <p className="text-sm text-danger-600 dark:text-danger-400">
                {errors.payment_method.message}
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
            <Button type="submit" isLoading={isPending} disabled={!deviceId}>
              Create Transaction
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
