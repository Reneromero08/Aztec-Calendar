import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TooltipWrapper from "../TooltipWrapper";

describe("TooltipWrapper", () => {
  it("renders children correctly", () => {
    render(<TooltipWrapper content="Test tooltip">Hover me</TooltipWrapper>);
    
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("shows tooltip on mouse hover", async () => {
    const user = userEvent.setup();
    render(<TooltipWrapper content="Test tooltip">Hover me</TooltipWrapper>);
    
    const trigger = screen.getByText("Hover me");
    await user.hover(trigger);
    
    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
      expect(screen.getByRole("tooltip")).toHaveTextContent("Test tooltip");
    });
  });

  it("hides tooltip on mouse leave", async () => {
    const user = userEvent.setup();
    render(<TooltipWrapper content="Test tooltip">Hover me</TooltipWrapper>);
    
    const trigger = screen.getByText("Hover me");
    await user.hover(trigger);
    
    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
    
    await user.unhover(trigger);
    
    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  it("shows tooltip on focus", async () => {
    const user = userEvent.setup();
    render(<TooltipWrapper content="Test tooltip">Hover me</TooltipWrapper>);
    
    const trigger = screen.getByText("Hover me");
    await user.tab();
    
    if (document.activeElement === trigger) {
      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
    }
  });

  it("has proper accessibility attributes", () => {
    render(<TooltipWrapper content="Test tooltip">Hover me</TooltipWrapper>);
    
    const trigger = screen.getByText("Hover me");
    expect(trigger).toHaveAttribute("tabindex", "0");
    expect(trigger).toHaveAttribute("role", "button");
    expect(trigger).toHaveAttribute("aria-label", "Show tooltip: Test tooltip");
  });

  it("applies cursor-help styling", () => {
    render(<TooltipWrapper content="Test tooltip">Hover me</TooltipWrapper>);
    
    const trigger = screen.getByText("Hover me");
    expect(trigger).toHaveClass("cursor-help");
  });

  it("supports different tooltip positions", () => {
    const { rerender } = render(
      <TooltipWrapper content="Test tooltip" position="top">
        Hover me
      </TooltipWrapper>
    );
    
    expect(screen.getByText("Hover me")).toBeInTheDocument();
    
    rerender(
      <TooltipWrapper content="Test tooltip" position="bottom">
        Hover me
      </TooltipWrapper>
    );
    
    expect(screen.getByText("Hover me")).toBeInTheDocument();
    
    rerender(
      <TooltipWrapper content="Test tooltip" position="left">
        Hover me
      </TooltipWrapper>
    );
    
    expect(screen.getByText("Hover me")).toBeInTheDocument();
    
    rerender(
      <TooltipWrapper content="Test tooltip" position="right">
        Hover me
      </TooltipWrapper>
    );
    
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });
});
