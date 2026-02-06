import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  TrendingUp,
  Activity,
  XCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
} from "@/components/ui";
import { PageTransition } from "@/components/common";
import { useDashboardStats } from "@/features/transactions";
import {
  StatsCard,
  RiskHeatmap,
  generateHeatmapData,
  formatNumber,
} from "@/features/dashboard";
import type { Transaction } from "@/types";

// Extract triggered rules from transactions
function extractRulesData(transactions: Transaction[]) {
  const rulesCounts: Record<string, number> = {};

  transactions.forEach((txn) => {
    if (txn.rules_triggered) {
      const rules = txn.rules_triggered.split(",").filter(Boolean);
      rules.forEach((rule) => {
        rulesCounts[rule] = (rulesCounts[rule] || 0) + 1;
      });
    }
  });

  return Object.entries(rulesCounts)
    .map(([name, count]) => ({
      name: name.replace(/_/g, " "),
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
}

// Get risk score distribution
function getRiskDistribution(transactions: Transaction[]) {
  const ranges = [
    { range: "0-20", min: 0, max: 20, count: 0, color: "#22c55e" },
    { range: "21-40", min: 21, max: 40, count: 0, color: "#84cc16" },
    { range: "41-60", min: 41, max: 60, count: 0, color: "#f59e0b" },
    { range: "61-80", min: 61, max: 80, count: 0, color: "#f97316" },
    { range: "81-100", min: 81, max: 100, count: 0, color: "#ef4444" },
  ];

  transactions.forEach((txn) => {
    const score = txn.risk_score ?? 0;
    const range = ranges.find((r) => score >= r.min && score <= r.max);
    if (range) range.count++;
  });

  return ranges;
}

// Get high-risk transactions
function getHighRiskTransactions(transactions: Transaction[]) {
  return transactions
    .filter((txn) => (txn.risk_score ?? 0) >= 50)
    .sort((a, b) => (b.risk_score ?? 0) - (a.risk_score ?? 0))
    .slice(0, 5);
}

// Get status breakdown
function getStatusBreakdown(transactions: Transaction[]) {
  const success = transactions.filter(
    (t) => t.status.toUpperCase() === "SUCCESS",
  ).length;
  const flagged = transactions.filter(
    (t) => t.status.toUpperCase() === "FLAGGED",
  ).length;
  const blocked = transactions.filter(
    (t) => t.status.toUpperCase() === "BLOCKED",
  ).length;

  return [
    { name: "Success", value: success, color: "#22c55e" },
    { name: "Flagged", value: flagged, color: "#f59e0b" },
    { name: "Blocked", value: blocked, color: "#ef4444" },
  ];
}

function parseAmount(amount: number | string): number {
  return typeof amount === "string" ? parseFloat(amount) : amount;
}

export default function RiskAnalysisPage() {
  const { data, isLoading } = useDashboardStats();
  const transactions = data?.transactions || [];

  const rulesData = useMemo(
    () => extractRulesData(transactions),
    [transactions],
  );
  const riskDistribution = useMemo(
    () => getRiskDistribution(transactions),
    [transactions],
  );
  const highRiskTxns = useMemo(
    () => getHighRiskTransactions(transactions),
    [transactions],
  );
  const statusBreakdown = useMemo(
    () => getStatusBreakdown(transactions),
    [transactions],
  );
  const heatmapData = useMemo(
    () => generateHeatmapData(transactions),
    [transactions],
  );

  // Calculate stats
  const totalFlagged = transactions.filter(
    (t) => t.status.toUpperCase() === "FLAGGED",
  ).length;
  const totalBlocked = transactions.filter(
    (t) => t.status.toUpperCase() === "BLOCKED",
  ).length;
  const avgRiskScore =
    transactions.length > 0
      ? transactions.reduce((sum, t) => sum + (t.risk_score ?? 0), 0) /
        transactions.length
      : 0;
  const highRiskCount = transactions.filter(
    (t) => (t.risk_score ?? 0) >= 70,
  ).length;

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Risk Analysis
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Advanced fraud detection analytics and insights
          </p>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <StatsCard
            title="Flagged Transactions"
            value={formatNumber(totalFlagged)}
            icon={AlertTriangle}
            iconColor="text-warning-600 dark:text-warning-400"
            isLoading={isLoading}
          />
          <StatsCard
            title="Blocked Transactions"
            value={formatNumber(totalBlocked)}
            icon={XCircle}
            iconColor="text-danger-600 dark:text-danger-400"
            isLoading={isLoading}
          />
          <StatsCard
            title="Avg Risk Score"
            value={avgRiskScore.toFixed(1)}
            icon={Activity}
            isLoading={isLoading}
          />
          <StatsCard
            title="High Risk (70+)"
            value={formatNumber(highRiskCount)}
            icon={Shield}
            iconColor="text-danger-600 dark:text-danger-400"
            isLoading={isLoading}
          />
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Score Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Risk Score Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={riskDistribution}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-neutral-200 dark:stroke-neutral-800"
                      />
                      <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--tooltip-bg, #fff)",
                          border: "1px solid var(--tooltip-border, #e5e5e5)",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="count" name="Transactions">
                        {riskDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Transaction Status Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Transaction Status Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {statusBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Rules & High Risk Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Triggered Rules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Top Triggered Rules</CardTitle>
              </CardHeader>
              <CardContent>
                {rulesData.length === 0 ? (
                  <p className="text-center text-neutral-500 dark:text-neutral-400 py-8">
                    No rules triggered yet
                  </p>
                ) : (
                  <div className="space-y-3">
                    {rulesData.map((rule, index) => (
                      <div
                        key={rule.name}
                        className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 w-6">
                            #{index + 1}
                          </span>
                          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 capitalize">
                            {rule.name.toLowerCase()}
                          </span>
                        </div>
                        <Badge variant="default">{rule.count} times</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* High Risk Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>High Risk Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                {highRiskTxns.length === 0 ? (
                  <p className="text-center text-neutral-500 dark:text-neutral-400 py-8">
                    No high-risk transactions found
                  </p>
                ) : (
                  <div className="space-y-3">
                    {highRiskTxns.map((txn) => (
                      <div
                        key={txn.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-danger-200 dark:border-danger-900 bg-danger-50 dark:bg-danger-950/30"
                      >
                        <div>
                          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            ₹{parseAmount(txn.amount).toLocaleString()}
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            {txn.payment_method} • {txn.id.slice(0, 8)}...
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant="danger">
                            Score: {txn.risk_score}
                          </Badge>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 uppercase">
                            {txn.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <RiskHeatmap data={heatmapData} isLoading={isLoading} />
        </motion.div>
      </div>
    </PageTransition>
  );
}
