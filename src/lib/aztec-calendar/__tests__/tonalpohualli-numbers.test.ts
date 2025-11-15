/**
 * Unit tests for Aztec calendar tonalpohualli numbers data
 * Tests data integrity, helper functions, and number properties
 */

import { describe, it, expect } from "vitest";
import {
  tonalpohualliNumbers,
  getTonalpohualliNumber,
  getTonalpohualliNumberByName,
} from "../tonalpohualli-numbers";

describe("Tonalpohualli Numbers Data", () => {
  describe("Data Structure", () => {
    it("should have exactly 13 numbers", () => {
      expect(tonalpohualliNumbers).toHaveLength(13);
    });

    it("should have all required properties for each number", () => {
      tonalpohualliNumbers.forEach((number) => {
        expect(number).toHaveProperty("value");
        expect(number).toHaveProperty("nahuatlName");
        expect(number).toHaveProperty("meaning");
        expect(number).toHaveProperty("gender");
        expect(typeof number.value).toBe("number");
        expect(typeof number.nahuatlName).toBe("string");
        expect(typeof number.meaning).toBe("string");
        expect(typeof number.gender).toBe("string");
      });
    });

    it("should have values numbered 1-13 without gaps", () => {
      const values = tonalpohualliNumbers.map(num => num.value);
      expect(values).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
    });

    it("should have unique Nahuatl names", () => {
      const nahuatlNames = tonalpohualliNumbers.map(num => num.nahuatlName);
      const uniqueNames = new Set(nahuatlNames);
      expect(uniqueNames.size).toBe(13);
    });

    it("should have non-empty strings for text properties", () => {
      tonalpohualliNumbers.forEach(number => {
        expect(number.nahuatlName.trim().length).toBeGreaterThan(0);
        expect(number.meaning.trim().length).toBeGreaterThan(0);
      });
    });

    it("should have valid gender values", () => {
      tonalpohualliNumbers.forEach(number => {
        expect(["masculine", "feminine", "neutral"]).toContain(number.gender);
      });
    });
  });

  describe("Helper Functions", () => {
    describe("getTonalpohualliNumber", () => {
      it("should return correct number for valid values", () => {
        expect(getTonalpohualliNumber(1)?.nahuatlName).toBe("Ce");
        expect(getTonalpohualliNumber(7)?.nahuatlName).toBe("Chicome");
        expect(getTonalpohualliNumber(13)?.nahuatlName).toBe("Matlactli huan yei");
      });

      it("should return undefined for invalid values", () => {
        expect(getTonalpohualliNumber(0)).toBeUndefined();
        expect(getTonalpohualliNumber(14)).toBeUndefined();
        expect(getTonalpohualliNumber(-1)).toBeUndefined();
      });
    });

    describe("getTonalpohualliNumberByName", () => {
      it("should return correct number for valid Nahuatl names", () => {
        expect(getTonalpohualliNumberByName("Ce")?.value).toBe(1);
        expect(getTonalpohualliNumberByName("Ome")?.value).toBe(2);
        expect(getTonalpohualliNumberByName("Matlactli huan yei")?.value).toBe(13);
      });

      it("should be case insensitive", () => {
        expect(getTonalpohualliNumberByName("ce")?.value).toBe(1);
        expect(getTonalpohualliNumberByName("CE")?.value).toBe(1);
      });

      it("should return undefined for invalid names", () => {
        expect(getTonalpohualliNumberByName("Invalid")).toBeUndefined();
        expect(getTonalpohualliNumberByName("")).toBeUndefined();
      });
    });
  });

  describe("Data Content Validation", () => {
    it("should have correct basic number names", () => {
      expect(getTonalpohualliNumber(1)?.nahuatlName).toBe("Ce");
      expect(getTonalpohualliNumber(2)?.nahuatlName).toBe("Ome");
      expect(getTonalpohualliNumber(3)?.nahuatlName).toBe("Yei");
      expect(getTonalpohualliNumber(4)?.nahuatlName).toBe("Nahui");
      expect(getTonalpohualliNumber(5)?.nahuatlName).toBe("Macuilli");
    });

    it("should have compound names for numbers 11-13", () => {
      expect(getTonalpohualliNumber(11)?.nahuatlName).toBe("Matlactli huan ce");
      expect(getTonalpohualliNumber(12)?.nahuatlName).toBe("Matlactli huan ome");
      expect(getTonalpohualliNumber(13)?.nahuatlName).toBe("Matlactli huan yei");
    });

    it("should have alternating gender pattern", () => {
      expect(getTonalpohualliNumber(1)?.gender).toBe("masculine");
      expect(getTonalpohualliNumber(2)?.gender).toBe("feminine");
      expect(getTonalpohualliNumber(3)?.gender).toBe("masculine");
      expect(getTonalpohualliNumber(4)?.gender).toBe("feminine");
    });

    it("should have meaningful descriptions", () => {
      expect(getTonalpohualliNumber(1)?.meaning).toContain("unity");
      expect(getTonalpohualliNumber(2)?.meaning.toLowerCase()).toContain("duality");
      expect(getTonalpohualliNumber(13)?.meaning.toLowerCase()).toContain("divine");
    });
  });
});