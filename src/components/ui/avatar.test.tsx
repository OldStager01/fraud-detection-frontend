import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

describe("Avatar components", () => {
  describe("Avatar", () => {
    it("renders children", () => {
      render(
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>,
      );
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("applies default styles", () => {
      render(
        <Avatar data-testid="avatar">
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>,
      );
      expect(screen.getByTestId("avatar")).toHaveClass(
        "h-10",
        "w-10",
        "rounded-full",
      );
    });

    it("merges custom className", () => {
      render(
        <Avatar className="h-16 w-16" data-testid="avatar">
          <AvatarFallback>CD</AvatarFallback>
        </Avatar>,
      );
      expect(screen.getByTestId("avatar")).toHaveClass("h-16", "w-16");
    });
  });

  describe("AvatarFallback", () => {
    it("renders fallback content", () => {
      render(
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>,
      );
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("applies fallback styles", () => {
      render(
        <Avatar>
          <AvatarFallback data-testid="fallback">XY</AvatarFallback>
        </Avatar>,
      );
      expect(screen.getByTestId("fallback")).toHaveClass(
        "bg-neutral-200",
        "font-medium",
      );
    });
  });

  describe("AvatarImage", () => {
    it("renders with src attribute", () => {
      render(
        <Avatar>
          <AvatarImage src="/test.jpg" alt="Test" />
          <AvatarFallback>FB</AvatarFallback>
        </Avatar>,
      );
      // Image is rendered by Radix, fallback shows when image fails to load
      expect(screen.getByText("FB")).toBeInTheDocument();
    });
  });
});
