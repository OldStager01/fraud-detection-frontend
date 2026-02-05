export interface DashboardStats {
  totalTransactions: number;
  successfulTransactions: number;
  flaggedTransactions: number;
  blockedTransactions: number;
  totalVolume: number;
  averageSpending: number;
  successRate: number;
  riskRate: number;
}

export interface ChartDataPoint {
  date: string;
  success: number;
  flagged: number;
  blocked: number;
  total: number;
}

export interface RiskDistribution {
  name: string;
  value: number;
  color: string;
}

export interface HeatmapCell {
  day: string;
  hour: number;
  value: number;
  riskLevel: "low" | "medium" | "high";
}

export type ComparisonPeriod = "7d" | "30d" | "90d";
