import { useAuth } from "@/features/auth/hooks";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { LogOut } from "lucide-react";

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-neutral-600 dark:text-neutral-400">
              Welcome,{" "}
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {user?.first_name} {user?.last_name}
              </span>
              !
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Email: {user?.email}
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Role: <span className="capitalize">{user?.role}</span>
            </p>
            <div className="pt-4">
              <Button onClick={logout} variant="outline" isLoading={isLoading}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
          Step 3 complete. Layout and navigation coming in Step 4.
        </div>
      </div>
    </div>
  );
}
