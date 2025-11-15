import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Calendar from "../page";

describe("Calendar Page", () => {
  it("renders the page title", () => {
    render(<Calendar />);
    expect(screen.getByText(/📅 Learning Calendar/)).toBeTruthy();
  });

  it("renders the page description", () => {
    render(<Calendar />);
    expect(
      screen.getByText("Track your scheduled learning sessions and milestones")
    ).toBeTruthy();
  });

  it("renders upcoming events", () => {
    render(<Calendar />);
    expect(screen.getByText("TypeScript Basics")).toBeTruthy();
    expect(screen.getByText("React Fundamentals")).toBeTruthy();
    expect(screen.getByText("Next.js Deep Dive")).toBeTruthy();
    expect(screen.getByText("Testing Best Practices")).toBeTruthy();
  });

  it("renders a back to home link", () => {
    render(<Calendar />);
    expect(screen.getByText("← Back to Home")).toBeTruthy();
  });

  it("renders the how to use section", () => {
    render(<Calendar />);
    expect(screen.getByText("How to Use the Calendar")).toBeTruthy();
  });
});
