import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Transactions
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          View and manage all transactions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction List</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-500 dark:text-neutral-400">
            Coming in Step 6...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
