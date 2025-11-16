import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Guide from "../page";

describe("Guide Page", () => {
  it("renders the page title", () => {
    render(<Guide />);
    expect(screen.getByRole("heading", { level: 1, name: /Learning Guides/ })).toBeTruthy();
  });

  it("features the Aztec calendar guide with a direct link", () => {
    render(<Guide />);
    expect(
      screen.getByText(
        "Learn to read and interpret the Aztec calendar system with day signs, numbers, and cultural context"
      )
    ).toBeTruthy();
    const link = screen.getByRole("link", { name: /Start Learning/ });
    expect(link).toHaveAttribute("href", "/guide/aztec-calendar");
  });

  it("indicates which guides are coming soon", () => {
    render(<Guide />);
    const comingSoonButtons = screen.getAllByRole("button", { name: /Coming soon/i });
    expect(comingSoonButtons.length).toBeGreaterThan(0);
    comingSoonButtons.forEach((button) => expect(button).toBeDisabled());
  });

  it("renders guide difficulty levels", () => {
    render(<Guide />);
    expect(screen.getByText("All Levels")).toBeTruthy();
    expect(screen.getAllByText("Beginner").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Intermediate").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Advanced").length).toBeGreaterThan(0);
  });

  it("renders a back to home link", () => {
    render(<Guide />);
    expect(screen.getByRole("link", { name: "← Back to Home" })).toBeTruthy();
  });

  it("renders tips for effective learning section", () => {
    render(<Guide />);
    expect(screen.getByRole("heading", { level: 2, name: "Tips for Effective Learning" })).toBeTruthy();
  });
});
