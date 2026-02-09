import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Alert } from "./alert";

describe("Alert", () => {
  it("renders children", () => {
    render(<Alert>This is an alert message</Alert>);
    expect(screen.getByText("This is an alert message")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(<Alert title="Warning">Alert content</Alert>);
    expect(screen.getByText("Warning")).toBeInTheDocument();
  });

  it("has alert role", () => {
    render(<Alert>Alert message</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("applies default variant styles", () => {
    render(<Alert>Default alert</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("bg-neutral-50");
  });

  it("applies info variant", () => {
    render(<Alert variant="info">Info alert</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("bg-primary-50");
  });

  it("applies success variant", () => {
    render(<Alert variant="success">Success alert</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("bg-success-50");
  });

  it("applies warning variant", () => {
    render(<Alert variant="warning">Warning alert</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("bg-warning-50");
  });

  it("applies destructive variant", () => {
    render(<Alert variant="destructive">Error alert</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("bg-danger-50");
  });

  it("merges custom className", () => {
    render(<Alert className="custom-class">Alert</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("custom-class");
  });

  it("forwards ref", () => {
    const ref = { current: null };
    render(<Alert ref={ref}>Alert</Alert>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
