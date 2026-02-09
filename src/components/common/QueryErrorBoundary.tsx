import { ReactNode } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
} from "react-error-boundary";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui";

interface Props {
  children: ReactNode;
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="h-12 w-12 rounded-full bg-danger-100 dark:bg-danger-900/30 flex items-center justify-center mb-4">
        <AlertCircle className="h-6 w-6 text-danger-600 dark:text-danger-400" />
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
        Failed to load data
      </h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 max-w-sm">
        {error instanceof Error
          ? error.message
          : "An error occurred while fetching the data."}
      </p>
      <Button onClick={resetErrorBoundary} size="sm">
        <RefreshCw className="h-4 w-4 mr-2" />
        Retry
      </Button>
    </div>
  );
}

export default function QueryErrorBoundary({ children }: Props) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ReactErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
          {children}
        </ReactErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
