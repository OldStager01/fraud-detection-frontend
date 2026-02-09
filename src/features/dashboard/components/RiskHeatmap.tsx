import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import { cn } from "@/utils";
import type { HeatmapCell } from "../types";

interface RiskHeatmapProps {
  data: HeatmapCell[];
  isLoading?: boolean;
}

export default function RiskHeatmap({
  data,
  isLoading = false,
}: RiskHeatmapProps) {
  if (isLoading) {
    return (
      <Card className="min-h-[280px]">
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-48 w-full" />
        </CardContent>
      </Card>
    );
  }

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getCell = (day: string, hour: number) => {
    return data.find((cell) => cell.day === day && cell.hour === hour);
  };

  const getCellColor = (cell: HeatmapCell | undefined) => {
    if (!cell || cell.value === 0) {
      return "bg-neutral-100 dark:bg-neutral-800";
    }

    switch (cell.riskLevel) {
      case "high":
        return "bg-danger-400 dark:bg-danger-600";
      case "medium":
        return "bg-warning-400 dark:bg-warning-600";
      case "low":
        return "bg-success-400 dark:bg-success-600";
      default:
        return "bg-neutral-200 dark:bg-neutral-700";
    }
  };

  return (
    <Card className="min-h-[280px]">
      <CardHeader>
        <CardTitle>Risk Heatmap (by Day & Hour)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Hour labels */}
            <div className="flex mb-1 ml-12">
              {hours
                .filter((h) => h % 3 === 0)
                .map((hour) => (
                  <div
                    key={hour}
                    className="text-xs text-neutral-500 dark:text-neutral-400"
                    style={{ width: `${100 / 8}%` }}
                  >
                    {hour.toString().padStart(2, "0")}:00
                  </div>
                ))}
            </div>

            {/* Heatmap grid */}
            <div className="space-y-1">
              {days.map((day) => (
                <div key={day} className="flex items-center gap-2">
                  <div className="w-10 text-xs text-neutral-500 dark:text-neutral-400 text-right">
                    {day}
                  </div>
                  <div className="flex-1 flex gap-0.5">
                    {hours.map((hour) => {
                      const cell = getCell(day, hour);
                      return (
                        <Tooltip key={`${day}-${hour}`}>
                          <TooltipTrigger asChild>
                            <div
                              className={cn(
                                "flex-1 h-6 rounded-sm cursor-pointer transition-transform hover:scale-110",
                                getCellColor(cell),
                              )}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-medium">
                              {day} {hour.toString().padStart(2, "0")}:00
                            </p>
                            <p className="text-xs">
                              {cell?.value || 0} transactions
                            </p>
                            <p className="text-xs capitalize">
                              Risk: {cell?.riskLevel || "none"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 mt-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-neutral-200 dark:bg-neutral-700" />
                <span className="text-neutral-500">No data</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-success-400" />
                <span className="text-neutral-500">Low</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-warning-400" />
                <span className="text-neutral-500">Medium</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-danger-400" />
                <span className="text-neutral-500">High</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
