import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>Status</Badge>);
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("applies default variant", () => {
    render(<Badge data-testid="badge">Default</Badge>);
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass("bg-neutral-100");
  });

  it("applies success variant", () => {
    render(
      <Badge variant="success" data-testid="badge">
        Success
      </Badge>,
    );
    expect(screen.getByTestId("badge")).toHaveClass("bg-success-100");
  });

  it("applies warning variant", () => {
    render(
      <Badge variant="warning" data-testid="badge">
        Warning
      </Badge>,
    );
    expect(screen.getByTestId("badge")).toHaveClass("bg-warning-100");
  });

  it("applies danger variant", () => {
    render(
      <Badge variant="danger" data-testid="badge">
        Danger
      </Badge>,
    );
    expect(screen.getByTestId("badge")).toHaveClass("bg-danger-100");
  });

  it("applies info variant", () => {
    render(
      <Badge variant="info" data-testid="badge">
        Info
      </Badge>,
    );
    expect(screen.getByTestId("badge")).toHaveClass("bg-primary-100");
  });

  it("applies outline variant", () => {
    render(
      <Badge variant="outline" data-testid="badge">
        Outline
      </Badge>,
    );
    expect(screen.getByTestId("badge")).toHaveClass("border");
  });

  it("merges custom className", () => {
    render(
      <Badge className="custom" data-testid="badge">
        Custom
      </Badge>,
    );
    expect(screen.getByTestId("badge")).toHaveClass("custom");
  });

  it("applies base styles", () => {
    render(<Badge data-testid="badge">Base</Badge>);
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass(
      "inline-flex",
      "rounded-full",
      "text-xs",
      "font-medium",
    );
  });
});
