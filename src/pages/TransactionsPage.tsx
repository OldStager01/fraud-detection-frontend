import { useState } from "react";
import { Plus, Download, FileText } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { PageTransition } from "@/components/common";
import {
  TransactionFiltersComponent,
  TransactionTable,
  Pagination,
  CreateTransactionDialog,
  TransactionDetailsDialog,
  FeedbackDialog,
  exportToCSV,
  generatePDFReport,
  useTransactions,
  type TransactionFilters,
} from "@/features/transactions";
import type { Transaction } from "@/types";

const PER_PAGE = 10;

export default function TransactionsPage() {
  // Filter state
  const [filters, setFilters] = useState<TransactionFilters>({
    page: 1,
    per_page: PER_PAGE,
  });

  // Dialog state
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);

  // Fetch transactions from API with all filters (including search)
  const { data, isLoading, isError } = useTransactions(filters);

  const transactions = data?.transactions || [];
  const pagination = data?.pagination;

  const totalCount = pagination?.total_count || 0;
  const totalPages = pagination?.total_pages || 1;
  const currentPage = pagination?.current_page || 1;

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleFilterChange = (newFilters: TransactionFilters) => {
    setFilters(newFilters);
  };

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDetailsDialogOpen(true);
  };

  const handleSubmitFeedback = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setFeedbackDialogOpen(true);
  };

  const handleExportCSV = () => {
    exportToCSV(transactions);
  };

  const handleExportPDF = () => {
    generatePDFReport(transactions);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Transactions
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              View and manage all transactions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleExportCSV}
              disabled={transactions.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              CSV
            </Button>
            <Button
              variant="outline"
              onClick={handleExportPDF}
              disabled={transactions.length === 0}
            >
              <FileText className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Transaction
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <TransactionFiltersComponent
              filters={filters}
              onFilterChange={handleFilterChange}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              {isLoading
                ? "Loading..."
                : isError
                  ? "Error loading transactions"
                  : `${totalCount} Transaction${totalCount !== 1 ? "s" : ""}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isError ? (
              <div className="text-center py-12">
                <p className="text-danger-600 dark:text-danger-400">
                  Failed to load transactions. Please try again.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              </div>
            ) : (
              <>
                <TransactionTable
                  transactions={transactions}
                  isLoading={isLoading}
                  onViewDetails={handleViewDetails}
                  onSubmitFeedback={handleSubmitFeedback}
                />
                {!isLoading && totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalCount={totalCount}
                    perPage={PER_PAGE}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Dialogs */}
        <CreateTransactionDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
        />
        <TransactionDetailsDialog
          transaction={selectedTransaction}
          open={detailsDialogOpen}
          onOpenChange={setDetailsDialogOpen}
        />
        <FeedbackDialog
          transaction={selectedTransaction}
          open={feedbackDialogOpen}
          onOpenChange={setFeedbackDialogOpen}
        />
      </div>
    </PageTransition>
  );
}
