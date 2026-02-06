import { useState, useMemo } from "react";
import { Plus, Download, FileText } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
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
  const [searchQuery, setSearchQuery] = useState("");

  // Dialog state
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);

  // Fetch transactions from API
  const { data, isLoading, isError } = useTransactions(filters);

  // Get transactions from API response
  const apiTransactions = data?.transactions || [];
  const pagination = data?.pagination;

  // Apply client-side search filter (status/payment_method filters are sent to API)
  const filteredTransactions = useMemo(() => {
    if (!searchQuery) return apiTransactions;

    const query = searchQuery.toLowerCase();
    return apiTransactions.filter(
      (t) =>
        t.id.toLowerCase().includes(query) ||
        t.amount.toString().includes(query),
    );
  }, [apiTransactions, searchQuery]);

  // Pagination from API
  const totalCount = pagination?.total_count || filteredTransactions.length;
  const totalPages =
    pagination?.total_pages || Math.ceil(totalCount / PER_PAGE);
  const currentPage = pagination?.current_page || filters.page || 1;

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
    exportToCSV(filteredTransactions);
  };

  const handleExportPDF = () => {
    generatePDFReport(filteredTransactions);
  };

  return (
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
            disabled={filteredTransactions.length === 0}
          >
            <Download className="h-4 w-4 mr-2" />
            CSV
          </Button>
          <Button
            variant="outline"
            onClick={handleExportPDF}
            disabled={filteredTransactions.length === 0}
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
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
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
                transactions={filteredTransactions}
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
  );
}
