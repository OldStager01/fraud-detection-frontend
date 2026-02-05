// API Response Types
export interface ApiResponse<T> {
  status: "success" | "error";
  message?: string;
  data: T;
  error?: string[];
}

// Pagination
export interface PaginationMeta {
  current_page: number;
  total_pages: number;
  total_count: number;
}

// User Types
export type UserRole = "customer" | "admin" | "manager";
export type UserStatus = "active" | "suspended" | "pending";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  status: UserStatus;
  created_at?: string;
}

// Transaction Types
export type TransactionStatus = "PENDING" | "SUCCESS" | "FLAGGED" | "BLOCKED";
export type PaymentMethod = "card" | "upi" | "bank_transfer" | "wallet";

export interface Transaction {
  id: string;
  amount: number;
  payment_method: PaymentMethod;
  device_id: string;
  status: TransactionStatus;
  risk_score: number | null;
  ip_address: string;
  created_at: string;
  rules_triggered: string | null;
}

// User Stats
export interface UserStats {
  total_transactions: number;
  total_volume: number;
  average_spending: number;
  last_active: string | null;
}

// Fraud Evaluation
export interface FraudEvaluation {
  id: string;
  transaction_id: string;
  risk_score: number;
  is_accurate: boolean | null;
  user_feedback: string | null;
  updated_at: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;
}

// Transaction Create
export interface CreateTransactionPayload {
  amount: number;
  device_id: string;
  payment_method: PaymentMethod;
}

// Feedback
export interface FeedbackPayload {
  is_accurate: boolean;
  user_feedback?: string;
}

// Transactions List Response
export interface TransactionsListResponse {
  transactions: Transaction[];
  pagination: PaginationMeta;
  user_stats: UserStats | null;
}

// Re-export API types
export * from "./api.types";
