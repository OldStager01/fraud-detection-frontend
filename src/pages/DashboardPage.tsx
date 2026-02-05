import {
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Shield,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  SkeletonStats,
} from "@/components/ui";
import { useAuth } from "@/features/auth/hooks";

function StatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
}: {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ElementType;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              {title}
            </p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {value}
            </p>
            <div className="flex items-center gap-1 text-sm">
              {changeType === "positive" && (
                <>
                  <ArrowUpRight className="h-4 w-4 text-success-500" />
                  <span className="text-success-600 dark:text-success-400">
                    {change}
                  </span>
                </>
              )}
              {changeType === "negative" && (
                <>
                  <ArrowDownRight className="h-4 w-4 text-danger-500" />
                  <span className="text-danger-600 dark:text-danger-400">
                    {change}
                  </span>
                </>
              )}
              {changeType === "neutral" && (
                <span className="text-neutral-500 dark:text-neutral-400">
                  {change}
                </span>
              )}
              <span className="text-neutral-400 dark:text-neutral-500">
                vs last week
              </span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-lg bg-primary-50 dark:bg-primary-950 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Welcome back, {user?.first_name}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Here's what's happening with your transactions today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Transactions"
          value="1,234"
          change="+12.5%"
          changeType="positive"
          icon={Activity}
        />
        <StatCard
          title="Successful"
          value="1,180"
          change="+8.2%"
          changeType="positive"
          icon={CheckCircle}
        />
        <StatCard
          title="Flagged"
          value="42"
          change="-3.1%"
          changeType="positive"
          icon={AlertTriangle}
        />
        <StatCard
          title="Blocked"
          value="12"
          change="+2.4%"
          changeType="negative"
          icon={Shield}
        />
      </div>

      {/* Placeholder for charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Transaction Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-neutral-400 dark:text-neutral-500">
              Chart coming in Step 5...
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-neutral-400 dark:text-neutral-500">
              Chart coming in Step 5...
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Keyboard shortcuts hint */}
      <Card>
        <CardHeader>
          <CardTitle>Keyboard Shortcuts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800">
              <span className="text-neutral-600 dark:text-neutral-400">
                Toggle sidebar
              </span>
              <kbd className="px-2 py-1 text-xs font-mono bg-neutral-200 dark:bg-neutral-700 rounded">
                Ctrl+B
              </kbd>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800">
              <span className="text-neutral-600 dark:text-neutral-400">
                Go to Dashboard
              </span>
              <kbd className="px-2 py-1 text-xs font-mono bg-neutral-200 dark:bg-neutral-700 rounded">
                Ctrl+Shift+D
              </kbd>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800">
              <span className="text-neutral-600 dark:text-neutral-400">
                Go to Transactions
              </span>
              <kbd className="px-2 py-1 text-xs font-mono bg-neutral-200 dark:bg-neutral-700 rounded">
                Ctrl+Shift+T
              </kbd>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800">
              <span className="text-neutral-600 dark:text-neutral-400">
                New Transaction
              </span>
              <kbd className="px-2 py-1 text-xs font-mono bg-neutral-200 dark:bg-neutral-700 rounded">
                Ctrl+Shift+N
              </kbd>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800">
              <span className="text-neutral-600 dark:text-neutral-400">
                Toggle Theme
              </span>
              <kbd className="px-2 py-1 text-xs font-mono bg-neutral-200 dark:bg-neutral-700 rounded">
                Ctrl+Shift+L
              </kbd>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
