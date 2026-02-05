import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Button,
  Skeleton,
} from "@/components/ui";
import { cn } from "@/utils";
import { formatCurrency } from "../utils";
import type { Transaction } from "@/types";

dayjs.extend(relativeTime);

interface RecentTransactionsProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

function getStatusBadgeVariant(status: Transaction["status"]) {
  switch (status) {
    case "SUCCESS":
      return "success";
    case "FLAGGED":
      return "warning";
    case "BLOCKED":
      return "danger";
    default:
      return "default";
  }
}

function getPaymentMethodLabel(method: Transaction["payment_method"]) {
  switch (method) {
    case "card":
      return "Card";
    case "upi":
      return "UPI";
    case "bank_transfer":
      return "Bank Transfer";
    case "wallet":
      return "Wallet";
    default:
      return method;
  }
}

export default function RecentTransactions({
  transactions,
  isLoading = false,
}: RecentTransactionsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-8 w-24" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/transactions">
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {transactions.slice(0, 5).map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between py-3 border-b border-neutral-100 dark:border-neutral-800 last:border-0"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-neutral-900 dark:text-neutral-100">
                    {formatCurrency(transaction.amount)}
                  </span>
                  <Badge variant={getStatusBadgeVariant(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {getPaymentMethodLabel(transaction.payment_method)} •{" "}
                  {dayjs(transaction.created_at).fromNow()}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={cn(
                    "text-sm font-medium",
                    (transaction.risk_score ?? 0) >= 70
                      ? "text-danger-600 dark:text-danger-400"
                      : (transaction.risk_score ?? 0) >= 30
                        ? "text-warning-600 dark:text-warning-400"
                        : "text-success-600 dark:text-success-400",
                  )}
                >
                  Risk: {transaction.risk_score ?? 0}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
