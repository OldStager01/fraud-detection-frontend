import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Label } from "./label";

describe("Label", () => {
  it("renders children", () => {
    render(<Label>Email</Label>);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("applies base styles", () => {
    render(<Label data-testid="label">Field</Label>);
    expect(screen.getByTestId("label")).toHaveClass("text-sm", "font-medium");
  });

  it("shows required indicator when required", () => {
    render(<Label required>Name</Label>);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("does not show required indicator when not required", () => {
    render(<Label>Name</Label>);
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("merges custom className", () => {
    render(
      <Label className="custom-class" data-testid="label">
        Field
      </Label>,
    );
    expect(screen.getByTestId("label")).toHaveClass("custom-class");
  });

  it("associates with form element via htmlFor", () => {
    render(<Label htmlFor="email-input">Email</Label>);
    expect(screen.getByText("Email")).toHaveAttribute("for", "email-input");
  });
});
