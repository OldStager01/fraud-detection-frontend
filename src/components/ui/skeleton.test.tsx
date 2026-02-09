import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("renders with default variant", () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("animate-pulse", "rounded-md");
  });

  it("applies circular variant", () => {
    render(<Skeleton variant="circular" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("rounded-full");
  });

  it("applies text variant", () => {
    render(<Skeleton variant="text" data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("rounded", "h-4");
  });

  it("merges custom className", () => {
    render(<Skeleton className="h-10 w-20" data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toHaveClass("h-10", "w-20");
  });

  it("applies background color", () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("bg-neutral-200");
  });
});
