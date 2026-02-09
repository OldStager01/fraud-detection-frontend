import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@/components/ui";
import type { ChartDataPoint } from "../types";

interface TransactionVolumeChartProps {
  data: ChartDataPoint[];
  isLoading?: boolean;
}

export default function TransactionVolumeChart({
  data,
  isLoading = false,
}: TransactionVolumeChartProps) {
  if (isLoading) {
    return (
      <Card className="min-h-[340px]">
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="min-h-[340px]">
      <CardHeader>
        <CardTitle>Transaction Volume</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorFlagged" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-neutral-200 dark:stroke-neutral-800"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                className="text-neutral-500"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                className="text-neutral-500"
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--tooltip-bg, #fff)",
                  border: "1px solid var(--tooltip-border, #e5e5e5)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                labelStyle={{ fontWeight: 600 }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="success"
                name="Successful"
                stroke="#22c55e"
                fillOpacity={1}
                fill="url(#colorSuccess)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="flagged"
                name="Flagged"
                stroke="#f59e0b"
                fillOpacity={1}
                fill="url(#colorFlagged)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="blocked"
                name="Blocked"
                stroke="#ef4444"
                fillOpacity={1}
                fill="url(#colorBlocked)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
