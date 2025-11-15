import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Calendar from "../page";

// Mock the Aztec calendar hooks to avoid client-side rendering issues
vi.mock("@/lib/aztec-calendar", () => ({
  useAztecDate: () => ({
    aztecDate: {
      tonalpohualli: {
        number: { value: 4 },
        daySign: {
          nahuatlName: "Ehecatl",
          englishName: "Wind",
          glyph: "💨",
          pronunciation: "eh-HEH-katl",
          meaning: "The life-giving wind, breath of life, communication and movement"
        },
        dayCount: 102
      },
      xiuhpohualli: {
        day: 18,
        month: {
          nahuatlName: "Ochpaniztli",
          englishName: "Sweeping",
          season: "Autumn"
        },
        dayOfYear: 218,
        isNemontemi: false
      },
      yearInRound: 7,
      gregorianDate: new Date("2024-01-01")
    },
    isLoading: false,
    error: null
  }),
  useCurrentTrecena: () => ({
    trecena: {
      trecenaNumber: 8,
      rulingSign: {
        nahuatlName: "Coatl",
        englishName: "Serpent"
      },
      daysInTrecena: Array(13).fill(null).map((_, i) => ({
        number: { value: i + 1 },
        daySign: { glyph: "🐍" },
        dayCount: i + 1
      }))
    },
    isLoading: false,
    error: null
  }),
  useDaySigns: () => ({
    daySigns: Array(20).fill(null).map((_, i) => ({
      nahuatlName: `Sign${i + 1}`,
      englishName: `English${i + 1}`,
      glyph: "🌟",
      position: i + 1
    })),
    isLoading: false
  })
}));

describe("Calendar Page", () => {
  it("renders the page title", () => {
    render(<Calendar />);
    expect(screen.getByText(/📅 Learning Calendar/)).toBeTruthy();
  });

  it("renders the page description", () => {
    render(<Calendar />);
    expect(
      screen.getByText("Track your scheduled learning sessions and explore the Aztec calendar system")
    ).toBeTruthy();
  });

  it("renders Aztec calendar section", () => {
    render(<Calendar />);
    expect(screen.getByText("🌟 Aztec Calendar System")).toBeTruthy();
  });

  it("renders upcoming events", () => {
    render(<Calendar />);
    expect(screen.getByText("Upcoming Learning Events")).toBeTruthy();
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
