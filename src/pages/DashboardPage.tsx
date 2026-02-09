import { useState, useMemo } from "react";
import {
  Activity,
  CheckCircle,
  AlertTriangle,
  Shield,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/features/auth/hooks";
import { useDashboardStats } from "@/features/transactions";
import { PageTransition } from "@/components/common";
import {
  StatsCard,
  TransactionVolumeChart,
  RiskDistributionChart,
  RiskHeatmap,
  PeriodSelector,
  RecentTransactions,
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

  const { data, isLoading } = useDashboardStats();

  const transactions = data?.transactions || [];
  const userStats = data?.user_stats;

  const periodDays = period === "7d" ? 7 : period === "30d" ? 30 : 90;

  const stats = useMemo(() => {
    if (userStats) {
      return {
        totalTransactions: userStats.total_transactions,
        successfulTransactions: transactions.filter(
          (t) => t.status.toUpperCase() === "SUCCESS",
        ).length,
        flaggedTransactions: transactions.filter(
          (t) => t.status.toUpperCase() === "FLAGGED",
        ).length,
        blockedTransactions: transactions.filter(
          (t) => t.status.toUpperCase() === "BLOCKED",
        ).length,
        totalVolume: userStats.total_volume,
        averageSpending: userStats.average_spending,
        successRate:
          userStats.total_transactions > 0
            ? (transactions.filter((t) => t.status.toUpperCase() === "SUCCESS")
                .length /
                Math.max(transactions.length, 1)) *
              100
            : 0,
        riskRate: 0,
      };
    }
    return calculateDashboardStats(transactions);
  }, [transactions, userStats]);

  const chartData = useMemo(
    () => generateChartData(transactions, periodDays),
    [transactions, periodDays],
  );
  const riskDistribution = useMemo(
    () => generateRiskDistribution(transactions),
    [transactions],
  );
  const heatmapData = useMemo(
    () => generateHeatmapData(transactions),
    [transactions],
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <PageTransition>
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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
        >
          <motion.div variants={itemVariants}>
            <StatsCard
              title="Total Transactions"
              value={formatNumber(stats.totalTransactions)}
              change={12.5}
              icon={Activity}
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatsCard
              title="Successful"
              value={formatNumber(stats.successfulTransactions)}
              change={8.2}
              icon={CheckCircle}
              iconColor="text-success-600 dark:text-success-400"
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatsCard
              title="Flagged"
              value={formatNumber(stats.flaggedTransactions)}
              change={-3.1}
              icon={AlertTriangle}
              iconColor="text-warning-600 dark:text-warning-400"
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatsCard
              title="Blocked"
              value={formatNumber(stats.blockedTransactions)}
              change={2.4}
              icon={Shield}
              iconColor="text-danger-600 dark:text-danger-400"
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatsCard
              title="Total Volume"
              value={formatCurrency(stats.totalVolume)}
              change={15.8}
              icon={DollarSign}
              isLoading={isLoading}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatsCard
              title="Success Rate"
              value={`${stats.successRate.toFixed(1)}%`}
              change={1.2}
              icon={TrendingUp}
              isLoading={isLoading}
            />
          </motion.div>
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <TransactionVolumeChart data={chartData} isLoading={isLoading} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <RiskDistributionChart
              data={riskDistribution}
              isLoading={isLoading}
            />
          </motion.div>
        </div>

        {/* Heatmap & Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <RiskHeatmap data={heatmapData} isLoading={isLoading} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <RecentTransactions
              transactions={transactions}
              isLoading={isLoading}
            />
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
