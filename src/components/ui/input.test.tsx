import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "./input";

describe("Input", () => {
  it("renders input element", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("applies default styles", () => {
    render(<Input data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveClass("h-10", "rounded-lg");
  });

  it("applies error styles when error prop is true", () => {
    render(<Input error data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveClass("border-danger-500");
  });

  it("applies normal border when no error", () => {
    render(<Input data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveClass("border-neutral-300");
  });

  it("handles different input types", () => {
    const { rerender } = render(<Input type="email" data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveAttribute("type", "email");

    rerender(<Input type="password" data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveAttribute("type", "password");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Input disabled data-testid="input" />);
    expect(screen.getByTestId("input")).toBeDisabled();
  });

  it("merges custom className", () => {
    render(<Input className="custom-class" data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveClass("custom-class");
  });

  it("forwards ref", () => {
    const ref = { current: null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("passes other props through", () => {
    render(<Input name="test-input" maxLength={10} data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("name", "test-input");
    expect(input).toHaveAttribute("maxLength", "10");
  });
});
