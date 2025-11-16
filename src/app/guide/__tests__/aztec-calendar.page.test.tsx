import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import AztecCalendarGuidePage from "../aztec-calendar/page";

describe("Aztec Calendar Guide Page", () => {
  it("renders the main heading and introduction", () => {
    render(<AztecCalendarGuidePage />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Aztec Calendar Interpretation Guide",
      })
    ).toBeTruthy();
    expect(
      screen.getByText(
        /Explore the rich symbolism and cultural significance of the Aztec calendar system/
      )
    ).toBeTruthy();
  });

  it("provides a table of contents for navigation", () => {
    render(<AztecCalendarGuidePage />);
    const toc = screen.getByRole("navigation", { name: "Guide sections" });
    expect(toc).toBeTruthy();
    const links = within(toc).getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(6);
    expect(links[0]).toHaveAttribute("href", "#introduction");
  });

  it("displays day sign content with deep links", () => {
    render(<AztecCalendarGuidePage />);
    expect(screen.getByRole("heading", { level: 2, name: /Day Signs/ })).toBeTruthy();
    expect(screen.getByText(/Cipactli/)).toBeTruthy();
    expect(screen.getByText("Crocodile")).toBeTruthy();
  });

  it("includes actionable guidance for using the calendar", () => {
    render(<AztecCalendarGuidePage />);
    expect(screen.getByRole("heading", { name: "Try It Yourself" })).toBeTruthy();
    const link = screen.getByRole("link", { name: "Explore the Calendar →" });
    expect(link).toHaveAttribute("href", "/calendar");
  });
});
