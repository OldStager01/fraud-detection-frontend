import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Separator } from "./separator";

describe("Separator", () => {
  it("renders separator element", () => {
    render(<Separator data-testid="separator" />);
    expect(screen.getByTestId("separator")).toBeInTheDocument();
  });

  it("applies horizontal styles by default", () => {
    render(<Separator data-testid="separator" />);
    const separator = screen.getByTestId("separator");
    expect(separator).toHaveClass("h-[1px]", "w-full");
  });

  it("applies vertical styles when orientation is vertical", () => {
    render(<Separator orientation="vertical" data-testid="separator" />);
    const separator = screen.getByTestId("separator");
    expect(separator).toHaveClass("h-full", "w-[1px]");
  });

  it("merges custom className", () => {
    render(<Separator className="my-4" data-testid="separator" />);
    expect(screen.getByTestId("separator")).toHaveClass("my-4");
  });

  it("applies base styles", () => {
    render(<Separator data-testid="separator" />);
    expect(screen.getByTestId("separator")).toHaveClass(
      "shrink-0",
      "bg-neutral-200",
    );
  });
});
