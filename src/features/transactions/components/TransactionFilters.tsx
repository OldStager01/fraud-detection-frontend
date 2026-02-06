import { Search, X, Filter } from "lucide-react";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import type { TransactionFilters as Filters } from "../api";

interface TransactionFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function TransactionFilters({
  filters,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: TransactionFiltersProps) {
  const handleStatusChange = (value: string) => {
    onFilterChange({
      ...filters,
      status: value === "all" ? undefined : value,
      page: 1,
    });
  };

  const handlePaymentMethodChange = (value: string) => {
    onFilterChange({
      ...filters,
      payment_method: value === "all" ? undefined : value,
      page: 1,
    });
  };

  const clearFilters = () => {
    onFilterChange({ page: 1, per_page: filters.per_page });
    onSearchChange("");
  };

  const hasActiveFilters =
    filters.status || filters.payment_method || searchQuery;

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
        <Input
          placeholder="Search by ID or amount..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Status Filter */}
      <Select
        value={filters.status || "all"}
        onValueChange={handleStatusChange}
      >
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="SUCCESS">Success</SelectItem>
          <SelectItem value="FLAGGED">Flagged</SelectItem>
          <SelectItem value="BLOCKED">Blocked</SelectItem>
          <SelectItem value="PENDING">Pending</SelectItem>
        </SelectContent>
      </Select>

      {/* Payment Method Filter */}
      <Select
        value={filters.payment_method || "all"}
        onValueChange={handlePaymentMethodChange}
      >
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="Payment Method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Methods</SelectItem>
          <SelectItem value="card">Card</SelectItem>
          <SelectItem value="upi">UPI</SelectItem>
          <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
          <SelectItem value="wallet">Wallet</SelectItem>
        </SelectContent>
      </Select>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="icon"
          onClick={clearFilters}
          className="shrink-0"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear filters</span>
        </Button>
      )}
    </div>
  );
}
