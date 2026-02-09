import {
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, Skeleton } from "@/components/ui";
import { cn } from "@/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  isLoading?: boolean;
}

export default function StatsCard({
  title,
  value,
  change,
  changeLabel = "vs last period",
  icon: Icon,
  iconColor = "text-primary-600 dark:text-primary-400",
  isLoading = false,
}: StatsCardProps) {
  if (isLoading) {
    return (
      <Card className="min-h-[120px]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-12 w-12 rounded-lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const isNeutral = change === undefined || change === 0;

  return (
    <Card className="hover:shadow-soft-lg transition-shadow duration-200 min-h-[120px]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              {title}
            </p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {value}
            </p>
            {change !== undefined && (
              <div className="flex items-center gap-1 text-sm">
                {isPositive && (
                  <>
                    <ArrowUpRight className="h-4 w-4 text-success-500" />
                    <span className="text-success-600 dark:text-success-400">
                      +{change.toFixed(1)}%
                    </span>
                  </>
                )}
                {isNegative && (
                  <>
                    <ArrowDownRight className="h-4 w-4 text-danger-500" />
                    <span className="text-danger-600 dark:text-danger-400">
                      {change.toFixed(1)}%
                    </span>
                  </>
                )}
                {isNeutral && (
                  <>
                    <Minus className="h-4 w-4 text-neutral-400" />
                    <span className="text-neutral-500">0%</span>
                  </>
                )}
                <span className="text-neutral-400 dark:text-neutral-500">
                  {changeLabel}
                </span>
              </div>
            )}
          </div>
          <div
            className={cn(
              "h-12 w-12 rounded-lg flex items-center justify-center",
              "bg-primary-50 dark:bg-primary-950",
            )}
          >
            <Icon className={cn("h-6 w-6", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
