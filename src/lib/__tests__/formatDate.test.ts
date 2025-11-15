import { describe, it, expect } from "vitest";
import { formatDate, getWeekday } from "../formatDate";

describe("formatDate utilities", () => {
  it("formats date correctly", () => {
    const date = new Date("2024-01-15");
    const result = formatDate(date);
    expect(result).toContain("January");
    expect(result).toContain("15");
    expect(result).toContain("2024");
  });

  it("returns correct weekday", () => {
    const date = new Date("2024-01-15");
    const weekday = getWeekday(date);
    expect(weekday).toBe("Monday");
  });

  it("handles different dates", () => {
    const date1 = new Date("2024-12-25");
    const date2 = new Date("2024-01-01");

    expect(formatDate(date1)).toContain("December");
    expect(formatDate(date2)).toContain("January");
  });
});
