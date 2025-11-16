import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Calendar from "../page";

// Mock the Aztec calendar hooks to avoid client-side rendering issues
vi.mock("@/lib/aztec-calendar", () => ({
  daySigns: Array(20).fill(null).map((_, i) => ({
    nahuatlName: `Sign${i + 1}`,
    englishName: `English${i + 1}`,
    glyph: "🌟",
    position: i + 1,
    pronunciation: `pronunciation-${i + 1}`,
    meaning: `Meaning for sign ${i + 1}`,
    direction: "East",
    deity: `Deity${i + 1}`
  })),
  tonalpohualliNumbers: Array(13).fill(null).map((_, i) => ({
    value: i + 1,
    nahuatlName: `Number${i + 1}`,
    meaning: `Meaning for number ${i + 1}`,
    gender: i % 2 === 0 ? "masculine" : "feminine"
  })),
  xiuhpohualliMonths: Array(18).fill(null).map((_, i) => ({
    nahuatlName: `Month${i + 1}`,
    englishName: `English Month ${i + 1}`,
    days: 20,
    position: i + 1,
    season: "Season",
    patron: `Patron${i + 1}`,
    agricultural: `Agriculture info ${i + 1}`
  })),
  useAztecDate: () => ({
    aztecDate: {
      tonalpohualli: {
        number: { value: 4, nahuatlName: "Nahui", meaning: "Four", gender: "feminine" },
        daySign: {
          nahuatlName: "Ehecatl",
          englishName: "Wind",
          glyph: "💨",
          pronunciation: "eh-HEH-katl",
          meaning: "The life-giving wind, breath of life, communication and movement",
          position: 2,
          direction: "North",
          deity: "Quetzalcoatl"
        },
        dayCount: 102
      },
      xiuhpohualli: {
        day: 18,
        month: {
          nahuatlName: "Ochpaniztli",
          englishName: "Sweeping",
          season: "Autumn",
          days: 20,
          position: 12,
          patron: "Toci",
          agricultural: "Harvest"
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
        englishName: "Serpent",
        meaning: "Serpent meaning",
        glyph: "🐍"
      },
      daysInTrecena: Array(13).fill(null).map((_, i) => ({
        number: { value: i + 1, nahuatlName: `Num${i + 1}`, meaning: "meaning" },
        daySign: { glyph: "🐍", nahuatlName: "Coatl", englishName: "Serpent", position: 5 },
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
      position: i + 1,
      pronunciation: `pronunciation-${i + 1}`,
      meaning: `Meaning for sign ${i + 1}`
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
    expect(screen.getByText("🌟 Aztec Calendar Details")).toBeTruthy();
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
