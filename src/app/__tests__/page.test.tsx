import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../page";

describe("Home Page", () => {
  it("renders the main heading", () => {
    render(<Home />);
    expect(
      screen.getByText("Welcome to the Educational Platform")
    ).toBeTruthy();
  });

  it("renders the description text", () => {
    render(<Home />);
    expect(
      screen.getByText(
        "Explore learning guides, manage your schedule, and grow your knowledge."
      )
    ).toBeTruthy();
  });

  it("renders links to calendar and guide pages", () => {
    render(<Home />);
    expect(screen.getByText(/📅 Calendar/)).toBeTruthy();
    expect(screen.getByText(/📚 Learning Guides/)).toBeTruthy();
  });

  it("renders the getting started section", () => {
    render(<Home />);
    expect(screen.getByText("Getting Started")).toBeTruthy();
  });

  it("renders feature list items", () => {
    render(<Home />);
    expect(
      screen.getByText(/Track your learning progress with the integrated calendar/)
    ).toBeTruthy();
  });
});
