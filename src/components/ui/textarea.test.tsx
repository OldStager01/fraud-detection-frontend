import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("renders textarea element", () => {
    render(<Textarea placeholder="Enter description" />);
    expect(
      screen.getByPlaceholderText("Enter description"),
    ).toBeInTheDocument();
  });

  it("applies default styles", () => {
    render(<Textarea data-testid="textarea" />);
    const textarea = screen.getByTestId("textarea");
    expect(textarea).toHaveClass("min-h-[80px]", "rounded-lg");
  });

  it("applies error styles when error prop is true", () => {
    render(<Textarea error data-testid="textarea" />);
    expect(screen.getByTestId("textarea")).toHaveClass("border-danger-500");
  });

  it("applies normal border when no error", () => {
    render(<Textarea data-testid="textarea" />);
    expect(screen.getByTestId("textarea")).toHaveClass("border-neutral-300");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Textarea disabled data-testid="textarea" />);
    expect(screen.getByTestId("textarea")).toBeDisabled();
  });

  it("merges custom className", () => {
    render(<Textarea className="custom-class" data-testid="textarea" />);
    expect(screen.getByTestId("textarea")).toHaveClass("custom-class");
  });

  it("forwards ref", () => {
    const ref = { current: null };
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("passes other props through", () => {
    render(<Textarea rows={5} maxLength={100} data-testid="textarea" />);
    const textarea = screen.getByTestId("textarea");
    expect(textarea).toHaveAttribute("rows", "5");
    expect(textarea).toHaveAttribute("maxLength", "100");
  });
});
