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

export interface RiskScoreRange {
  range: string;
  min: number;
  max: number;
  count: number;
  color: string;
}

export interface RuleTriggered {
  name: string;
  count: number;
}

export interface HighRiskTransaction {
  id: string;
  amount: number;
  payment_method: string;
  status: string;
  risk_score: number;
}

export interface HeatmapCell {
  day: string;
  hour: number;
  value: number;
  riskLevel: "low" | "medium" | "high";
}

export type ComparisonPeriod = "7d" | "30d" | "90d";

export interface AnalyticsFilters {
  period?: ComparisonPeriod | "all";
  start_date?: string;
  end_date?: string;
  status?: string;
  payment_method?: string;
}

// Backend analytics response shape
export interface AnalyticsResponse {
  stats: {
    total_transactions: number;
    successful_transactions: number;
    flagged_transactions: number;
    blocked_transactions: number;
    total_volume: number;
    average_spending: number;
    success_rate: number;
    risk_rate: number;
    avg_risk_score: number;
    high_risk_count: number;
  };
  chart_data: ChartDataPoint[];
  risk_distribution: RiskDistribution[];
  risk_score_ranges: RiskScoreRange[];
  heatmap_data: Array<{
    day: string;
    hour: number;
    value: number;
    risk_level: "low" | "medium" | "high";
  }>;
  rules_triggered: RuleTriggered[];
  high_risk_transactions: HighRiskTransaction[];
}
