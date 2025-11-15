/**
 * Unit tests for Aztec calendar day signs data
 * Tests data integrity, helper functions, and data structure validity
 */

import { describe, it, expect } from "vitest";
import { daySigns, getDaySignByPosition, getDaySignByName, getDaySignByEnglishName } from "../day-signs";

describe("Day Signs Data", () => {
  describe("Data Structure", () => {
    it("should have exactly 20 day signs", () => {
      expect(daySigns).toHaveLength(20);
    });

    it("should have all required properties for each day sign", () => {
      daySigns.forEach((sign) => {
        expect(sign).toHaveProperty("nahuatlName");
        expect(sign).toHaveProperty("englishName");
        expect(sign).toHaveProperty("glyph");
        expect(sign).toHaveProperty("pronunciation");
        expect(sign).toHaveProperty("meaning");
        expect(sign).toHaveProperty("position");
        expect(typeof sign.nahuatlName).toBe("string");
        expect(typeof sign.englishName).toBe("string");
        expect(typeof sign.glyph).toBe("string");
        expect(typeof sign.pronunciation).toBe("string");
        expect(typeof sign.meaning).toBe("string");
        expect(typeof sign.position).toBe("number");
      });
    });

    it("should have positions numbered 1-20 without gaps", () => {
      const positions = daySigns.map(sign => sign.position);
      expect(positions).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    });

    it("should have unique Nahuatl names", () => {
      const nahuatlNames = daySigns.map(sign => sign.nahuatlName);
      const uniqueNames = new Set(nahuatlNames);
      expect(uniqueNames.size).toBe(20);
    });

    it("should have unique English names", () => {
      const englishNames = daySigns.map(sign => sign.englishName);
      const uniqueNames = new Set(englishNames);
      expect(uniqueNames.size).toBe(20);
    });

    it("should have non-empty strings for text properties", () => {
      daySigns.forEach(sign => {
        expect(sign.nahuatlName.trim().length).toBeGreaterThan(0);
        expect(sign.englishName.trim().length).toBeGreaterThan(0);
        expect(sign.glyph.trim().length).toBeGreaterThan(0);
        expect(sign.pronunciation.trim().length).toBeGreaterThan(0);
        expect(sign.meaning.trim().length).toBeGreaterThan(0);
      });
    });
  });

  describe("Helper Functions", () => {
    describe("getDaySignByPosition", () => {
      it("should return correct day sign for valid positions", () => {
        expect(getDaySignByPosition(1)?.nahuatlName).toBe("Cipactli");
        expect(getDaySignByPosition(5)?.nahuatlName).toBe("Coatl");
        expect(getDaySignByPosition(20)?.nahuatlName).toBe("Xochitl");
      });

      it("should return undefined for invalid positions", () => {
        expect(getDaySignByPosition(0)).toBeUndefined();
        expect(getDaySignByPosition(21)).toBeUndefined();
        expect(getDaySignByPosition(-1)).toBeUndefined();
      });
    });

    describe("getDaySignByName", () => {
      it("should return correct day sign for valid Nahuatl names", () => {
        expect(getDaySignByName("Cipactli")?.englishName).toBe("Crocodile");
        expect(getDaySignByName("Coatl")?.englishName).toBe("Serpent");
        expect(getDaySignByName("Xochitl")?.englishName).toBe("Flower");
      });

      it("should be case insensitive", () => {
        expect(getDaySignByName("cipactli")?.englishName).toBe("Crocodile");
        expect(getDaySignByName("CIPACTLI")?.englishName).toBe("Crocodile");
      });

      it("should return undefined for invalid names", () => {
        expect(getDaySignByName("Invalid")).toBeUndefined();
        expect(getDaySignByName("")).toBeUndefined();
      });
    });

    describe("getDaySignByEnglishName", () => {
      it("should return correct day sign for valid English names", () => {
        expect(getDaySignByEnglishName("Crocodile")?.nahuatlName).toBe("Cipactli");
        expect(getDaySignByEnglishName("Serpent")?.nahuatlName).toBe("Coatl");
        expect(getDaySignByEnglishName("Flower")?.nahuatlName).toBe("Xochitl");
      });

      it("should be case insensitive", () => {
        expect(getDaySignByEnglishName("crocodile")?.nahuatlName).toBe("Cipactli");
        expect(getDaySignByEnglishName("CROCODILE")?.nahuatlName).toBe("Cipactli");
      });

      it("should return undefined for invalid names", () => {
        expect(getDaySignByEnglishName("Invalid")).toBeUndefined();
        expect(getDaySignByEnglishName("")).toBeUndefined();
      });
    });
  });

  describe("Data Content Validation", () => {
    it("should have meaningful content for major day signs", () => {
      const cipactli = getDaySignByPosition(1);
      expect(cipactli?.nahuatlName).toBe("Cipactli");
      expect(cipactli?.englishName).toBe("Crocodile");
      expect(cipactli?.direction).toBe("East");
      expect(cipactli?.deity).toBe("Tonacatecuhtli");

      const xochitl = getDaySignByPosition(20);
      expect(xochitl?.nahuatlName).toBe("Xochitl");
      expect(xochitl?.englishName).toBe("Flower");
      expect(xochitl?.direction).toBe("South");
      expect(xochitl?.deity).toBe("Xochiquetzal");
    });

    it("should have all four cardinal directions represented", () => {
      const directions = daySigns.map(sign => sign.direction).filter(Boolean);
      const uniqueDirections = new Set(directions);
      expect(uniqueDirections).toContain("East");
      expect(uniqueDirections).toContain("North");
      expect(uniqueDirections).toContain("West");
      expect(uniqueDirections).toContain("South");
    });
  });
});