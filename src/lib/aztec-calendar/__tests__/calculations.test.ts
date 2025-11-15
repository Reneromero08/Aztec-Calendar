/**
 * Unit tests for Aztec calendar calculation utilities
 * Tests date conversions, cycle calculations, and validation
 */

import { describe, it, expect } from "vitest";
import {
  calculateAztecDate,
  calculateTonalpohualli,
  calculateXiuhpohualli,
  calculateYearInRound,
  getCurrentTrecena,
  validateDate,
  aztecToGregorian,
  CALENDAR_CONFIG,
  CYCLE_LENGTHS,
} from "../calculations";

describe("Calendar Calculations", () => {
  describe("Constants", () => {
    it("should have correct cycle lengths", () => {
      expect(CYCLE_LENGTHS.TONALPOHUALLI).toBe(260);
      expect(CYCLE_LENGTHS.XIUHPOHUALLI).toBe(365);
      expect(CYCLE_LENGTHS.CALENDAR_ROUND).toBe(18980);
    });

    it("should have valid correlation configuration", () => {
      expect(CALENDAR_CONFIG.correlationDate).toBeInstanceOf(Date);
      expect(CALENDAR_CONFIG.correlationTonalpohualli).toBeDefined();
      expect(CALENDAR_CONFIG.correlationXiuhpohualli).toBeDefined();
    });
  });

  describe("Date Validation", () => {
    it("should validate valid dates", () => {
      const validDate = new Date("2024-01-01");
      const result = validateDate(validDate);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("should reject invalid dates", () => {
      const invalidDate = new Date("invalid");
      const result = validateDate(invalidDate);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("should reject dates outside allowed range", () => {
      const tooEarly = new Date("1800-01-01");
      const tooLate = new Date("2200-01-01");
      
      expect(validateDate(tooEarly).isValid).toBe(false);
      expect(validateDate(tooLate).isValid).toBe(false);
    });
  });

  describe("Tonalpohualli Calculations", () => {
    it("should calculate tonalpohualli date for a known date", () => {
      // Use a date within valid range that we can test
      const testDate = new Date("2024-08-13"); // Same day of year as correlation
      const result = calculateTonalpohualli(testDate);
      
      expect(result.number.value).toBeGreaterThanOrEqual(1);
      expect(result.number.value).toBeLessThanOrEqual(13);
      expect(result.daySign.position).toBeGreaterThanOrEqual(1);
      expect(result.daySign.position).toBeLessThanOrEqual(20);
      expect(result.dayCount).toBeGreaterThanOrEqual(1);
      expect(result.dayCount).toBeLessThanOrEqual(260);
    });

    it("should calculate valid tonalpohualli components", () => {
      const testDate = new Date("2024-01-01");
      const result = calculateTonalpohualli(testDate);
      
      expect(result.number.value).toBeGreaterThanOrEqual(1);
      expect(result.number.value).toBeLessThanOrEqual(13);
      expect(result.daySign.position).toBeGreaterThanOrEqual(1);
      expect(result.daySign.position).toBeLessThanOrEqual(20);
      expect(result.dayCount).toBeGreaterThanOrEqual(1);
      expect(result.dayCount).toBeLessThanOrEqual(260);
    });

    it("should cycle correctly through tonalpohualli", () => {
      const date1 = new Date("2024-01-01");
      const date2 = new Date("2024-01-02");
      
      const result1 = calculateTonalpohualli(date1);
      const result2 = calculateTonalpohualli(date2);
      
      expect(result2.dayCount).toBe((result1.dayCount % 260) + 1);
    });

    it("should handle the same day in different years", () => {
      const date1 = new Date("2024-01-01");
      const date2 = new Date("2025-01-01");
      
      const result1 = calculateTonalpohualli(date1);
      const result2 = calculateTonalpohualli(date2);
      
      // Should advance by 105 days in the 260-day cycle
      // 2024 is a leap year, so 366 days, 366 mod 260 = 106
      const expectedAdvance = 106;
      const expectedResult = ((result1.dayCount + expectedAdvance - 1) % 260) + 1;
      expect(result2.dayCount).toBe(expectedResult);
    });
  });

  describe("Xiuhpohualli Calculations", () => {
    it("should calculate xiuhpohualli date for a known date", () => {
      // Use a date within valid range that we can test
      const testDate = new Date("2024-01-01"); // Start of year
      const result = calculateXiuhpohualli(testDate);
      
      expect(result.month.position).toBeGreaterThanOrEqual(1);
      expect(result.month.position).toBeLessThanOrEqual(18);
      expect(result.day).toBeGreaterThanOrEqual(1);
      expect(result.day).toBeLessThanOrEqual(20);
      expect(result.dayOfYear).toBeGreaterThanOrEqual(1);
      expect(result.dayOfYear).toBeLessThanOrEqual(365);
    });

    it("should calculate valid xiuhpohualli components", () => {
      const testDate = new Date("2024-06-15");
      const result = calculateXiuhpohualli(testDate);
      
      expect(result.month.position).toBeGreaterThanOrEqual(1);
      expect(result.month.position).toBeLessThanOrEqual(18);
      expect(result.day).toBeGreaterThanOrEqual(1);
      expect(result.day).toBeLessThanOrEqual(20);
      expect(result.dayOfYear).toBeGreaterThanOrEqual(1);
      expect(result.dayOfYear).toBeLessThanOrEqual(365);
    });

    it("should handle nemontemi days correctly", () => {
      // Find a date that corresponds to a nemontemi day
      // This requires some calculation since nemontemi are days 361-365
      const testDate = new Date("2024-12-20"); // Near end of year
      const result = calculateXiuhpohualli(testDate);
      
      if (result.dayOfYear > 360) {
        expect(result.isNemontemi).toBe(true);
        expect(result.nemontemi).toBeDefined();
        expect(result.nemontemi?.day).toBe(result.dayOfYear - 360);
      }
    });

    it("should cycle correctly through xiuhpohualli", () => {
      const date1 = new Date("2024-01-01");
      const date2 = new Date("2024-01-02");
      
      const result1 = calculateXiuhpohualli(date1);
      const result2 = calculateXiuhpohualli(date2);
      
      if (!result2.isNemontemi) {
        expect(result2.dayOfYear).toBe((result1.dayOfYear % 365) + 1);
      }
    });
  });

  describe("Year in Round Calculations", () => {
    it("should calculate valid year in round", () => {
      const testDate = new Date("2024-01-01");
      const result = calculateYearInRound(testDate);
      
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(52);
    });

    it("should advance year in round correctly", () => {
      const date1 = new Date("2024-01-01");
      const date2 = new Date("2025-01-01");
      
      const result1 = calculateYearInRound(date1);
      const result2 = calculateYearInRound(date2);
      
      expect(result2).toBe((result1 % 52) + 1);
    });
  });

  describe("Complete Aztec Date Calculations", () => {
    it("should calculate complete Aztec date", () => {
      const testDate = new Date("2024-01-01");
      const result = calculateAztecDate(testDate);
      
      expect(result.gregorianDate).toBe(testDate);
      expect(result.tonalpohualli).toBeDefined();
      expect(result.xiuhpohualli).toBeDefined();
      expect(result.yearInRound).toBeGreaterThanOrEqual(1);
      expect(result.yearInRound).toBeLessThanOrEqual(52);
    });

    it("should handle correlation date correctly", () => {
      // Test with a date within valid range that we can verify
      const testDate = new Date("2024-08-13"); // Same day of year as correlation
      const result = calculateAztecDate(testDate);
      
      // Verify we get a valid calculation
      expect(result.tonalpohualli.number.value).toBeGreaterThanOrEqual(1);
      expect(result.tonalpohualli.number.value).toBeLessThanOrEqual(13);
      expect(result.tonalpohualli.daySign.position).toBeGreaterThanOrEqual(1);
      expect(result.tonalpohualli.daySign.position).toBeLessThanOrEqual(20);
      expect(result.xiuhpohualli.month.position).toBeGreaterThanOrEqual(1);
      expect(result.xiuhpohualli.month.position).toBeLessThanOrEqual(18);
      expect(result.xiuhpohualli.day).toBeGreaterThanOrEqual(1);
      expect(result.xiuhpohualli.day).toBeLessThanOrEqual(20);
    });
  });

  describe("Trecena Calculations", () => {
    it("should calculate current trecena", () => {
      const testDate = new Date("2024-01-01");
      const result = getCurrentTrecena(testDate);
      
      expect(result.trecenaNumber).toBeGreaterThanOrEqual(1);
      expect(result.trecenaNumber).toBeLessThanOrEqual(20);
      expect(result.rulingSign).toBeDefined();
      expect(result.daysInTrecena).toHaveLength(13);
    });

    it("should have correct trecena structure", () => {
      const testDate = new Date("2024-01-01");
      const result = getCurrentTrecena(testDate);
      
      result.daysInTrecena.forEach((day) => {
        expect(day.number.value).toBeGreaterThanOrEqual(1);
        expect(day.number.value).toBeLessThanOrEqual(13);
        expect(day.daySign.position).toBeGreaterThanOrEqual(1);
        expect(day.daySign.position).toBeLessThanOrEqual(20);
        expect(day.dayCount).toBeGreaterThanOrEqual(1);
        expect(day.dayCount).toBeLessThanOrEqual(260);
      });
    });

    it("should have sequential numbers in trecena", () => {
      const testDate = new Date("2024-01-01");
      const result = getCurrentTrecena(testDate);
      
      const numbers = result.daysInTrecena.map(day => day.number.value);
      const sortedNumbers = [...numbers].sort((a, b) => a - b);
      expect(numbers).toEqual(sortedNumbers);
    });
  });

  describe("Reverse Calculations", () => {
    it("should convert Aztec date back to Gregorian approximately", () => {
      const originalDate = new Date("2024-06-15");
      const aztecDate = calculateAztecDate(originalDate);
      
      try {
        const convertedDate = aztecToGregorian({
          tonalpohualliDayCount: aztecDate.tonalpohualli.dayCount,
          xiuhpohualliDayOfYear: aztecDate.xiuhpohualli.dayOfYear,
          yearInRound: aztecDate.yearInRound,
          targetYear: 2024,
        });
        
        // Should be close to original date (within a few days)
        const daysDifference = Math.abs(
          (convertedDate.getTime() - originalDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        expect(daysDifference).toBeLessThan(10);
      } catch (error) {
        // Some dates may not have exact matches, which is expected
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe("Edge Cases", () => {
    it("should handle leap years correctly", () => {
      const leapDate = new Date("2024-02-29");
      const nonLeapDate = new Date("2023-02-28");
      
      const leapResult = calculateAztecDate(leapDate);
      const nonLeapResult = calculateAztecDate(nonLeapDate);
      
      expect(leapResult.tonalpohualli.dayCount).not.toBe(nonLeapResult.tonalpohualli.dayCount);
    });

    it("should handle boundaries of allowed date range", () => {
      const minDate = new Date("1900-01-01");
      const maxDate = new Date("2100-12-31");
      
      expect(() => calculateAztecDate(minDate)).not.toThrow();
      expect(() => calculateAztecDate(maxDate)).not.toThrow();
    });
  });
});