import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

// Component that throws an error
function ThrowError({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error("Test error message");
  }
  return <div>Normal content</div>;
}

describe("ErrorBoundary", () => {
  // Suppress console.error during tests
  const originalError = console.error;
  beforeAll(() => {
    console.error = vi.fn();
  });
  afterAll(() => {
    console.error = originalError;
  });

  it("renders children when no error", () => {
    render(
      <ErrorBoundary>
        <div>Child content</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("renders error UI when child throws", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });

  it("renders custom fallback when provided", () => {
    render(
      <ErrorBoundary fallback={<div>Custom error page</div>}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Custom error page")).toBeInTheDocument();
  });

  it("shows Try Again button", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(
      screen.getByRole("button", { name: /try again/i }),
    ).toBeInTheDocument();
  });

  it("shows Reload Page button", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>,
    );

    expect(
      screen.getByRole("button", { name: /reload page/i }),
    ).toBeInTheDocument();
  });

  it("resets error state when Try Again is clicked", () => {
    let shouldThrow = true;

    function ConditionalError() {
      if (shouldThrow) {
        throw new Error("Test error");
      }
      return <div>Normal content</div>;
    }

    render(
      <ErrorBoundary>
        <ConditionalError />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();

    // Change the flag before clicking try again
    shouldThrow = false;
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));

    // ErrorBoundary should reset and re-render children
    expect(screen.getByText("Normal content")).toBeInTheDocument();
  });
});
