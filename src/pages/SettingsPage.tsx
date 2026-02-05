import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Settings
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Manage your preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-neutral-900 dark:text-neutral-100">
                Theme
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Select your preferred theme
              </p>
            </div>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
