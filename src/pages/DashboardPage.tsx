import { useState, useMemo } from "react";
import {
  Activity,
  CheckCircle,
  AlertTriangle,
  Shield,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { useAuth } from "@/features/auth/hooks";
import {
  StatsCard,
  TransactionVolumeChart,
  RiskDistributionChart,
  RiskHeatmap,
  PeriodSelector,
  RecentTransactions,
  mockTransactions,
  calculateDashboardStats,
  generateChartData,
  generateRiskDistribution,
  generateHeatmapData,
  formatCurrency,
  formatNumber,
  type ComparisonPeriod,
} from "@/features/dashboard";

export default function DashboardPage() {
  const { user } = useAuth();
  const [period, setPeriod] = useState<ComparisonPeriod>("7d");

  // In production, this would come from useTransactions hook
  // const { data, isLoading } = useDashboardStats();
  const isLoading = false;

  const periodDays = period === "7d" ? 7 : period === "30d" ? 30 : 90;

  const stats = useMemo(() => calculateDashboardStats(mockTransactions), []);
  const chartData = useMemo(
    () => generateChartData(mockTransactions, periodDays),
    [periodDays],
  );
  const riskDistribution = useMemo(
    () => generateRiskDistribution(mockTransactions),
    [],
  );
  const heatmapData = useMemo(() => generateHeatmapData(mockTransactions), []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Welcome back, {user?.first_name}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Here's what's happening with your transactions today.
          </p>
        </div>
        <PeriodSelector value={period} onChange={setPeriod} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatsCard
          title="Total Transactions"
          value={formatNumber(stats.totalTransactions)}
          change={12.5}
          icon={Activity}
          isLoading={isLoading}
        />
        <StatsCard
          title="Successful"
          value={formatNumber(stats.successfulTransactions)}
          change={8.2}
          icon={CheckCircle}
          iconColor="text-success-600 dark:text-success-400"
          isLoading={isLoading}
        />
        <StatsCard
          title="Flagged"
          value={formatNumber(stats.flaggedTransactions)}
          change={-3.1}
          icon={AlertTriangle}
          iconColor="text-warning-600 dark:text-warning-400"
          isLoading={isLoading}
        />
        <StatsCard
          title="Blocked"
          value={formatNumber(stats.blockedTransactions)}
          change={2.4}
          icon={Shield}
          iconColor="text-danger-600 dark:text-danger-400"
          isLoading={isLoading}
        />
        <StatsCard
          title="Total Volume"
          value={formatCurrency(stats.totalVolume)}
          change={15.8}
          icon={DollarSign}
          isLoading={isLoading}
        />
        <StatsCard
          title="Success Rate"
          value={`${stats.successRate.toFixed(1)}%`}
          change={1.2}
          icon={TrendingUp}
          isLoading={isLoading}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TransactionVolumeChart data={chartData} isLoading={isLoading} />
        <RiskDistributionChart data={riskDistribution} isLoading={isLoading} />
      </div>

      {/* Heatmap & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RiskHeatmap data={heatmapData} isLoading={isLoading} />
        <RecentTransactions
          transactions={mockTransactions}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
