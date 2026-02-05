import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

export default function RiskAnalysisPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Risk Analysis
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Advanced fraud detection analytics
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Risk Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-500 dark:text-neutral-400">
            Coming in Step 5...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
