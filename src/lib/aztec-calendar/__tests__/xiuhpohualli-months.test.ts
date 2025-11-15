/**
 * Unit tests for Aztec calendar xiuhpohualli months data
 * Tests data integrity, helper functions, and month properties
 */

import { describe, it, expect } from "vitest";
import {
  xiuhpohualliMonths,
  nemontemi,
  getXiuhpohualliMonth,
  getXiuhpohualliMonthByName,
  getNemontemiDay,
} from "../xiuhpohualli-months";

describe("Xiuhpohualli Months Data", () => {
  describe("Data Structure", () => {
    it("should have exactly 18 months", () => {
      expect(xiuhpohualliMonths).toHaveLength(18);
    });

    it("should have exactly 5 nemontemi days", () => {
      expect(nemontemi).toHaveLength(5);
    });

    it("should have all required properties for each month", () => {
      xiuhpohualliMonths.forEach((month) => {
        expect(month).toHaveProperty("nahuatlName");
        expect(month).toHaveProperty("englishName");
        expect(month).toHaveProperty("days");
        expect(month).toHaveProperty("position");
        expect(typeof month.nahuatlName).toBe("string");
        expect(typeof month.englishName).toBe("string");
        expect(typeof month.days).toBe("number");
        expect(typeof month.position).toBe("number");
      });
    });

    it("should have all required properties for nemontemi days", () => {
      nemontemi.forEach((day) => {
        expect(day).toHaveProperty("day");
        expect(day).toHaveProperty("name");
        expect(day).toHaveProperty("meaning");
        expect(typeof day.day).toBe("number");
        expect(typeof day.name).toBe("string");
        expect(typeof day.meaning).toBe("string");
      });
    });

    it("should have positions numbered 1-18 without gaps", () => {
      const positions = xiuhpohualliMonths.map(month => month.position);
      expect(positions).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
    });

    it("should have all months with exactly 20 days", () => {
      xiuhpohualliMonths.forEach(month => {
        expect(month.days).toBe(20);
      });
    });

    it("should have nemontemi days numbered 1-5", () => {
      const days = nemontemi.map(day => day.day);
      expect(days).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("Helper Functions", () => {
    describe("getXiuhpohualliMonth", () => {
      it("should return correct month for valid positions", () => {
        expect(getXiuhpohualliMonth(1)?.nahuatlName).toBe("Atlcahualo");
        expect(getXiuhpohualliMonth(9)?.nahuatlName).toBe("Tlaxochimaco");
        expect(getXiuhpohualliMonth(18)?.nahuatlName).toBe("Izcalli");
      });

      it("should return undefined for invalid positions", () => {
        expect(getXiuhpohualliMonth(0)).toBeUndefined();
        expect(getXiuhpohualliMonth(19)).toBeUndefined();
        expect(getXiuhpohualliMonth(-1)).toBeUndefined();
      });
    });

    describe("getXiuhpohualliMonthByName", () => {
      it("should return correct month for valid Nahuatl names", () => {
        expect(getXiuhpohualliMonthByName("Atlcahualo")?.englishName).toBe("Water Left");
        expect(getXiuhpohualliMonthByName("Tlaxochimaco")?.englishName).toBe("Giving of Flowers");
        expect(getXiuhpohualliMonthByName("Izcalli")?.englishName).toBe("Sprout");
      });

      it("should be case insensitive", () => {
        expect(getXiuhpohualliMonthByName("atlcahualo")?.englishName).toBe("Water Left");
        expect(getXiuhpohualliMonthByName("ATLCAHUALO")?.englishName).toBe("Water Left");
      });

      it("should return undefined for invalid names", () => {
        expect(getXiuhpohualliMonthByName("Invalid")).toBeUndefined();
        expect(getXiuhpohualliMonthByName("")).toBeUndefined();
      });
    });

    describe("getNemontemiDay", () => {
      it("should return correct nemontemi day for valid numbers", () => {
        expect(getNemontemiDay(1)?.name).toBe("First Nameless Day");
        expect(getNemontemiDay(3)?.name).toBe("Third Nameless Day");
        expect(getNemontemiDay(5)?.name).toBe("Fifth Nameless Day");
      });

      it("should return undefined for invalid numbers", () => {
        expect(getNemontemiDay(0)).toBeUndefined();
        expect(getNemontemiDay(6)).toBeUndefined();
        expect(getNemontemiDay(-1)).toBeUndefined();
      });
    });
  });

  describe("Data Content Validation", () => {
    it("should have unique Nahuatl names for months", () => {
      const nahuatlNames = xiuhpohualliMonths.map(month => month.nahuatlName);
      const uniqueNames = new Set(nahuatlNames);
      expect(uniqueNames.size).toBe(18);
    });

    it("should have unique English names for months", () => {
      const englishNames = xiuhpohualliMonths.map(month => month.englishName);
      const uniqueNames = new Set(englishNames);
      expect(uniqueNames.size).toBe(18);
    });

    it("should have all four seasons represented", () => {
      const seasons = xiuhpohualliMonths.map(month => month.season).filter(Boolean);
      const uniqueSeasons = new Set(seasons);
      expect(uniqueSeasons).toContain("Spring");
      expect(uniqueSeasons).toContain("Summer");
      expect(uniqueSeasons).toContain("Autumn");
      expect(uniqueSeasons).toContain("Winter");
    });

    it("should have meaningful agricultural descriptions", () => {
      xiuhpohualliMonths.forEach(month => {
        if (month.agricultural) {
          expect(month.agricultural.trim().length).toBeGreaterThan(0);
        }
      });
    });

    it("should have proper season progression", () => {
      const springMonths = xiuhpohualliMonths.filter(m => m.season === "Spring");
      const summerMonths = xiuhpohualliMonths.filter(m => m.season === "Summer");
      const autumnMonths = xiuhpohualliMonths.filter(m => m.season === "Autumn");
      const winterMonths = xiuhpohualliMonths.filter(m => m.season === "Winter");

      expect(springMonths.length).toBeGreaterThan(0);
      expect(summerMonths.length).toBeGreaterThan(0);
      expect(autumnMonths.length).toBeGreaterThan(0);
      expect(winterMonths.length).toBeGreaterThan(0);
    });

    it("should have meaningful nemontemi descriptions", () => {
      nemontemi.forEach(day => {
        expect(day.name.trim().length).toBeGreaterThan(0);
        expect(day.meaning.trim().length).toBeGreaterThan(0);
        expect(day.meaning.toLowerCase()).toMatch(/purification|danger|renewal|reflection|preparation/);
      });
    });
  });
});