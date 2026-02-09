import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

describe("Tooltip components", () => {
  it("renders trigger", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("renders tooltip provider and tooltip", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Button</button>
          </TooltipTrigger>
          <TooltipContent>Help text</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    expect(screen.getByRole("button", { name: "Button" })).toBeInTheDocument();
  });
});
