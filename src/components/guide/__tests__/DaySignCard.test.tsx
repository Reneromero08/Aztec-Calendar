import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DaySignCard from "../DaySignCard";
import type { DaySign } from "@/lib/aztec-calendar";

const mockDaySign: DaySign = {
  nahuatlName: "Cipactli",
  englishName: "Crocodile",
  glyph: "🐊",
  pronunciation: "see-PAK-tlee",
  meaning: "The earth monster, primordial being associated with fertility",
  position: 1,
  direction: "East",
  deity: "Tonacatecuhtli",
};

describe("DaySignCard", () => {
  it("renders the day sign name in Nahuatl and English", () => {
    render(<DaySignCard daySign={mockDaySign} />);
    expect(screen.getByText(/Cipactli/)).toBeTruthy();
    expect(screen.getByText("Crocodile")).toBeTruthy();
  });

  it("displays the glyph", () => {
    render(<DaySignCard daySign={mockDaySign} />);
    expect(screen.getByText(/🐊/)).toBeTruthy();
  });

  it("shows the position", () => {
    render(<DaySignCard daySign={mockDaySign} />);
    expect(screen.getByText("Position 1")).toBeTruthy();
  });

  it("displays the meaning", () => {
    render(<DaySignCard daySign={mockDaySign} />);
    expect(
      screen.getByText(/earth monster, primordial being/)
    ).toBeTruthy();
  });

  it("shows symbolic associations when available", () => {
    render(<DaySignCard daySign={mockDaySign} />);
    expect(screen.getByText(/Direction:/)).toBeTruthy();
    expect(screen.getByText(/East/)).toBeTruthy();
    expect(screen.getByText(/Patron Deity:/)).toBeTruthy();
    expect(screen.getByText(/Tonacatecuhtli/)).toBeTruthy();
  });

  it("displays detail link by default", () => {
    render(<DaySignCard daySign={mockDaySign} />);
    expect(
      screen.getByRole("link", {
        name: "Jump to Crocodile details",
      })
    ).toBeTruthy();
  });

  it("hides detail link when showDetailLink is false", () => {
    render(<DaySignCard daySign={mockDaySign} showDetailLink={false} />);
    expect(
      screen.queryByRole("link", {
        name: /Jump to/,
      })
    ).toBeNull();
  });

  it("has a valid anchor id for deep linking", () => {
    const { container } = render(<DaySignCard daySign={mockDaySign} />);
    const card = container.querySelector("#day-sign-1");
    expect(card).not.toBeNull();
  });
});
