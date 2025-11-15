import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Guide from "../page";

describe("Guide Page", () => {
  it("renders the page title", () => {
    render(<Guide />);
    expect(screen.getByText(/📚 Learning Guides/)).toBeTruthy();
  });

  it("renders the page description", () => {
    render(<Guide />);
    expect(
      screen.getByText("Comprehensive guides to help you master essential skills")
    ).toBeTruthy();
  });

  it("renders all learning guides", () => {
    render(<Guide />);
    expect(
      screen.getByText("Getting Started with Web Development")
    ).toBeTruthy();
    expect(screen.getByText("React Component Patterns")).toBeTruthy();
    expect(
      screen.getByText("Full-Stack Development with Next.js")
    ).toBeTruthy();
    expect(screen.getByText("Testing Strategies")).toBeTruthy();
  });

  it("renders difficulty levels", () => {
    render(<Guide />);
    expect(screen.getAllByText("Beginner").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Intermediate").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Advanced").length).toBeGreaterThan(0);
  });

  it("renders a back to home link", () => {
    render(<Guide />);
    expect(screen.getByText("← Back to Home")).toBeTruthy();
  });

  it("renders tips for effective learning section", () => {
    render(<Guide />);
    expect(screen.getByText("Tips for Effective Learning")).toBeTruthy();
  });
});
