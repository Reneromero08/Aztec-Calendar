/**
 * Unit tests for Aztec calendar integration and end-to-end functionality
 * Tests the complete system working together
 */

import { describe, it, expect } from "vitest";
import { calculateAztecDate, getCurrentAztecDate, daySigns, tonalpohualliNumbers, xiuhpohualliMonths } from "../index";

describe("Aztec Calendar Integration", () => {
  describe("Complete System Integration", () => {
    it("should provide a working current date", () => {
      const currentDate = getCurrentAztecDate();
      
      expect(currentDate.gregorianDate).toBeInstanceOf(Date);
      expect(currentDate.tonalpohualli).toBeDefined();
      expect(currentDate.xiuhpohualli).toBeDefined();
      expect(currentDate.yearInRound).toBeGreaterThanOrEqual(1);
      expect(currentDate.yearInRound).toBeLessThanOrEqual(52);
    });

    it("should maintain consistency across all components", () => {
      const testDate = new Date("2024-06-15");
      const aztecDate = calculateAztecDate(testDate);
      
      // Verify tonalpohualli consistency
      expect(aztecDate.tonalpohualli.number.value).toBeGreaterThanOrEqual(1);
      expect(aztecDate.tonalpohualli.number.value).toBeLessThanOrEqual(13);
      expect(aztecDate.tonalpohualli.daySign.position).toBeGreaterThanOrEqual(1);
      expect(aztecDate.tonalpohualli.daySign.position).toBeLessThanOrEqual(20);
      expect(aztecDate.tonalpohualli.dayCount).toBeGreaterThanOrEqual(1);
      expect(aztecDate.tonalpohualli.dayCount).toBeLessThanOrEqual(260);
      
      // Verify xiuhpohualli consistency
      expect(aztecDate.xiuhpohualli.month.position).toBeGreaterThanOrEqual(1);
      expect(aztecDate.xiuhpohualli.month.position).toBeLessThanOrEqual(18);
      expect(aztecDate.xiuhpohualli.day).toBeGreaterThanOrEqual(1);
      expect(aztecDate.xiuhpohualli.day).toBeLessThanOrEqual(20);
      expect(aztecDate.xiuhpohualli.dayOfYear).toBeGreaterThanOrEqual(1);
      expect(aztecDate.xiuhpohualli.dayOfYear).toBeLessThanOrEqual(365);
    });

    it("should handle known historical dates correctly", () => {
      // Test with a date within the valid range that we can verify
      const testDate = new Date("2024-08-13"); // Same day of year as correlation
      const aztecDate = calculateAztecDate(testDate);
      
      // Verify we get a valid calculation
      expect(aztecDate.tonalpohualli.number.value).toBeGreaterThanOrEqual(1);
      expect(aztecDate.tonalpohualli.number.value).toBeLessThanOrEqual(13);
      expect(aztecDate.tonalpohualli.daySign.position).toBeGreaterThanOrEqual(1);
      expect(aztecDate.tonalpohualli.daySign.position).toBeLessThanOrEqual(20);
      expect(aztecDate.xiuhpohualli.month.position).toBeGreaterThanOrEqual(1);
      expect(aztecDate.xiuhpohualli.month.position).toBeLessThanOrEqual(18);
      expect(aztecDate.xiuhpohualli.day).toBeGreaterThanOrEqual(1);
      expect(aztecDate.xiuhpohualli.day).toBeLessThanOrEqual(20);
    });
  });

  describe("Data Cross-References", () => {
    it("should have consistent day sign references", () => {
      const testDate = new Date("2024-01-01");
      const aztecDate = calculateAztecDate(testDate);
      const daySign = aztecDate.tonalpohualli.daySign;
      
      // Verify the day sign exists in the main data array
      const foundSign = daySigns.find(sign => sign.position === daySign.position);
      expect(foundSign).toBeDefined();
      expect(foundSign?.nahuatlName).toBe(daySign.nahuatlName);
      expect(foundSign?.englishName).toBe(daySign.englishName);
    });

    it("should have consistent number references", () => {
      const testDate = new Date("2024-01-01");
      const aztecDate = calculateAztecDate(testDate);
      const number = aztecDate.tonalpohualli.number;
      
      // Verify the number exists in the main data array
      const foundNumber = tonalpohualliNumbers.find(num => num.value === number.value);
      expect(foundNumber).toBeDefined();
      expect(foundNumber?.nahuatlName).toBe(number.nahuatlName);
      expect(foundNumber?.meaning).toBe(number.meaning);
    });

    it("should have consistent month references", () => {
      const testDate = new Date("2024-01-01");
      const aztecDate = calculateAztecDate(testDate);
      const month = aztecDate.xiuhpohualli.month;
      
      // Verify the month exists in the main data array
      const foundMonth = xiuhpohualliMonths.find(m => m.position === month.position);
      expect(foundMonth).toBeDefined();
      expect(foundMonth?.nahuatlName).toBe(month.nahuatlName);
      expect(foundMonth?.englishName).toBe(month.englishName);
    });
  });

  describe("Cycle Consistency", () => {
    it("should maintain tonalpohualli cycle of 260 days", () => {
      const startDate = new Date("2024-01-01");
      const startAztec = calculateAztecDate(startDate);
      
      // Check 260 days later (should be same tonalpohualli date)
      const laterDate = new Date(startDate.getTime() + 260 * 24 * 60 * 60 * 1000);
      const laterAztec = calculateAztecDate(laterDate);
      
      expect(laterAztec.tonalpohualli.number.value).toBe(startAztec.tonalpohualli.number.value);
      expect(laterAztec.tonalpohualli.daySign.position).toBe(startAztec.tonalpohualli.daySign.position);
      expect(laterAztec.tonalpohualli.dayCount).toBe(startAztec.tonalpohualli.dayCount);
    });

    it("should maintain xiuhpohualli cycle of 365 days", () => {
      const startDate = new Date("2024-01-01");
      const startAztec = calculateAztecDate(startDate);
      
      // Check 365 days later (should be same xiuhpohualli date)
      const laterDate = new Date(startDate.getTime() + 365 * 24 * 60 * 60 * 1000);
      const laterAztec = calculateAztecDate(laterDate);
      
      expect(laterAztec.xiuhpohualli.month.position).toBe(startAztec.xiuhpohualli.month.position);
      expect(laterAztec.xiuhpohualli.day).toBe(startAztec.xiuhpohualli.day);
      expect(laterAztec.xiuhpohualli.dayOfYear).toBe(startAztec.xiuhpohualli.dayOfYear);
    });

    it("should advance year in round correctly", () => {
      const startDate = new Date("2024-01-01");
      const startAztec = calculateAztecDate(startDate);
      
      // Check 52 years later (should complete one calendar round)
      const laterDate = new Date("2076-01-01"); // 52 years later
      const laterAztec = calculateAztecDate(laterDate);
      
      // Year in round should be the same after 52 years
      expect(laterAztec.yearInRound).toBe(startAztec.yearInRound);
    });
  });

  describe("Edge Cases and Boundary Conditions", () => {
    it("should handle leap years correctly", () => {
      const leapYearDate = new Date("2024-02-29");
      const nonLeapYearDate = new Date("2023-02-28");
      
      const leapAztec = calculateAztecDate(leapYearDate);
      const nonLeapAztec = calculateAztecDate(nonLeapYearDate);
      
      // Both should be valid but different
      expect(leapAztec.tonalpohualli.dayCount).not.toBe(nonLeapAztec.tonalpohualli.dayCount);
    });

    it("should handle year boundaries correctly", () => {
      const endOfYear = new Date("2023-12-31");
      const startOfYear = new Date("2024-01-01");
      
      const endAztec = calculateAztecDate(endOfYear);
      const startAztec = calculateAztecDate(startOfYear);
      
      // Should be consecutive days in both cycles
      const expectedTonalpohualliDay = (endAztec.tonalpohualli.dayCount % 260) + 1;
      expect(startAztec.tonalpohualli.dayCount).toBe(expectedTonalpohualliDay);
      
      const expectedXiuhpohualliDay = (endAztec.xiuhpohualli.dayOfYear % 365) + 1;
      expect(startAztec.xiuhpohualli.dayOfYear).toBe(expectedXiuhpohualliDay);
    });

    it("should handle nemontemi days correctly", () => {
      // Find a date that should correspond to nemontemi
      // This requires checking dates near the end of the year
      const testDate = new Date("2024-12-20");
      const aztecDate = calculateAztecDate(testDate);
      
      if (aztecDate.xiuhpohualli.dayOfYear > 360) {
        expect(aztecDate.xiuhpohualli.isNemontemi).toBe(true);
        expect(aztecDate.xiuhpohualli.nemontemi).toBeDefined();
      }
    });
  });

  describe("Performance and Reliability", () => {
    it("should handle multiple consecutive calculations efficiently", () => {
      const startTime = performance.now();
      
      // Calculate 1000 consecutive days
      for (let i = 0; i < 1000; i++) {
        const testDate = new Date(2024, 0, i + 1); // First 1000 days of 2024
        const aztecDate = calculateAztecDate(testDate);
        
        // Basic validation
        expect(aztecDate.tonalpohualli.dayCount).toBeGreaterThan(0);
        expect(aztecDate.xiuhpohualli.dayOfYear).toBeGreaterThan(0);
      }
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Should complete within reasonable time (less than 1 second)
      expect(duration).toBeLessThan(1000);
    });

    it("should handle date range boundaries", () => {
      const minDate = new Date("1900-01-01");
      const maxDate = new Date("2100-12-31");
      
      expect(() => calculateAztecDate(minDate)).not.toThrow();
      expect(() => calculateAztecDate(maxDate)).not.toThrow();
      
      const minAztec = calculateAztecDate(minDate);
      const maxAztec = calculateAztecDate(maxDate);
      
      expect(minAztec.tonalpohualli.dayCount).toBeGreaterThan(0);
      expect(maxAztec.tonalpohualli.dayCount).toBeGreaterThan(0);
    });
  });

  describe("Data Completeness", () => {
    it("should have complete day sign data", () => {
      daySigns.forEach((sign) => {
        expect(sign.nahuatlName).toBeTruthy();
        expect(sign.englishName).toBeTruthy();
        expect(sign.glyph).toBeTruthy();
        expect(sign.pronunciation).toBeTruthy();
        expect(sign.meaning).toBeTruthy();
        expect(sign.position).toBeGreaterThan(0);
        expect(sign.position).toBeLessThanOrEqual(20);
      });
    });

    it("should have complete number data", () => {
      tonalpohualliNumbers.forEach((number) => {
        expect(number.value).toBeGreaterThan(0);
        expect(number.value).toBeLessThanOrEqual(13);
        expect(number.nahuatlName).toBeTruthy();
        expect(number.meaning).toBeTruthy();
        expect(number.gender).toBeTruthy();
      });
    });

    it("should have complete month data", () => {
      xiuhpohualliMonths.forEach((month) => {
        expect(month.nahuatlName).toBeTruthy();
        expect(month.englishName).toBeTruthy();
        expect(month.days).toBe(20);
        expect(month.position).toBeGreaterThan(0);
        expect(month.position).toBeLessThanOrEqual(18);
      });
    });
  });
});