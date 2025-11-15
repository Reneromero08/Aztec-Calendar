/**
 * Unit tests for Aztec calendar React hooks
 * Tests hook behavior, error handling, and data consistency
 */

import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import {
  useAztecDate,
  useTonalpohualliDate,
  useXiuhpohualliDate,
  useCurrentTrecena,
  useDaySigns,
  useTonalpohualliNumbers,
  useXiuhpohualliMonths,
  useNemontemi,
  useCalendarConfig,
  useDateValidation,
  useMultipleAztecDates,
} from "../hooks";

describe("Aztec Calendar Hooks", () => {
  describe("useAztecDate", () => {
    it("should return current Aztec date by default", () => {
      const { result } = renderHook(() => useAztecDate());
      
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(result.current.aztecDate).toBeDefined();
      expect(result.current.aztecDate?.gregorianDate).toBeInstanceOf(Date);
      expect(result.current.aztecDate?.tonalpohualli).toBeDefined();
      expect(result.current.aztecDate?.xiuhpohualli).toBeDefined();
    });

    it("should calculate Aztec date for specific date", () => {
      const testDate = new Date("2024-01-01");
      const { result } = renderHook(() => useAztecDate(testDate));
      
      expect(result.current.aztecDate?.gregorianDate).toEqual(testDate);
      expect(result.current.aztecDate?.tonalpohualli.number.value).toBeGreaterThanOrEqual(1);
      expect(result.current.aztecDate?.tonalpohualli.number.value).toBeLessThanOrEqual(13);
    });

    it("should handle invalid dates", () => {
      const invalidDate = new Date("invalid");
      const { result } = renderHook(() => useAztecDate(invalidDate));
      
      expect(result.current.aztecDate).toBe(null);
      expect(result.current.error).toBeDefined();
      expect(result.current.isLoading).toBe(false);
    });

    it("should update when date changes", () => {
      const { result, rerender } = renderHook(
        ({ date }) => useAztecDate(date),
        { initialProps: { date: new Date("2024-01-01") } }
      );
      
      const firstResult = result.current.aztecDate;
      
      rerender({ date: new Date("2024-01-02") });
      
      expect(result.current.aztecDate).not.toEqual(firstResult);
      expect(result.current.aztecDate?.gregorianDate).toEqual(new Date("2024-01-02"));
    });
  });

  describe("useTonalpohualliDate", () => {
    it("should return current tonalpohualli date by default", () => {
      const { result } = renderHook(() => useTonalpohualliDate());
      
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(result.current.tonalpohualli).toBeDefined();
      expect(result.current.tonalpohualli?.number.value).toBeGreaterThanOrEqual(1);
      expect(result.current.tonalpohualli?.number.value).toBeLessThanOrEqual(13);
      expect(result.current.tonalpohualli?.daySign.position).toBeGreaterThanOrEqual(1);
      expect(result.current.tonalpohualli?.daySign.position).toBeLessThanOrEqual(20);
    });

    it("should calculate tonalpohualli date for specific date", () => {
      const testDate = new Date("2024-06-15");
      const { result } = renderHook(() => useTonalpohualliDate(testDate));
      
      expect(result.current.tonalpohualli?.number.value).toBeGreaterThanOrEqual(1);
      expect(result.current.tonalpohualli?.dayCount).toBeGreaterThanOrEqual(1);
      expect(result.current.tonalpohualli?.dayCount).toBeLessThanOrEqual(260);
    });

    it("should handle invalid dates", () => {
      const invalidDate = new Date("invalid");
      const { result } = renderHook(() => useTonalpohualliDate(invalidDate));
      
      expect(result.current.tonalpohualli).toBe(null);
      expect(result.current.error).toBeDefined();
    });
  });

  describe("useXiuhpohualliDate", () => {
    it("should return current xiuhpohualli date by default", () => {
      const { result } = renderHook(() => useXiuhpohualliDate());
      
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(result.current.xiuhpohualli).toBeDefined();
      expect(result.current.xiuhpohualli?.month.position).toBeGreaterThanOrEqual(1);
      expect(result.current.xiuhpohualli?.month.position).toBeLessThanOrEqual(18);
      expect(result.current.xiuhpohualli?.day).toBeGreaterThanOrEqual(1);
      expect(result.current.xiuhpohualli?.day).toBeLessThanOrEqual(20);
    });

    it("should calculate xiuhpohualli date for specific date", () => {
      const testDate = new Date("2024-06-15");
      const { result } = renderHook(() => useXiuhpohualliDate(testDate));
      
      expect(result.current.xiuhpohualli?.dayOfYear).toBeGreaterThanOrEqual(1);
      expect(result.current.xiuhpohualli?.dayOfYear).toBeLessThanOrEqual(365);
    });

    it("should handle invalid dates", () => {
      const invalidDate = new Date("invalid");
      const { result } = renderHook(() => useXiuhpohualliDate(invalidDate));
      
      expect(result.current.xiuhpohualli).toBe(null);
      expect(result.current.error).toBeDefined();
    });
  });

  describe("useCurrentTrecena", () => {
    it("should return current trecena information", () => {
      const { result } = renderHook(() => useCurrentTrecena());
      
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(result.current.trecena).toBeDefined();
      expect(result.current.trecena?.trecenaNumber).toBeGreaterThanOrEqual(1);
      expect(result.current.trecena?.trecenaNumber).toBeLessThanOrEqual(20);
      expect(result.current.trecena?.rulingSign).toBeDefined();
      expect(result.current.trecena?.daysInTrecena).toHaveLength(13);
    });

    it("should have valid trecena structure", () => {
      const { result } = renderHook(() => useCurrentTrecena());
      
      const { trecena } = result.current;
      expect(trecena).toBeDefined();
      
      trecena?.daysInTrecena.forEach((day) => {
        expect(day.number.value).toBeGreaterThanOrEqual(1);
        expect(day.number.value).toBeLessThanOrEqual(13);
        expect(day.daySign.position).toBeGreaterThanOrEqual(1);
        expect(day.daySign.position).toBeLessThanOrEqual(20);
      });
    });

    it("should handle invalid dates", () => {
      const invalidDate = new Date("invalid");
      const { result } = renderHook(() => useCurrentTrecena(invalidDate));
      
      expect(result.current.trecena).toBe(null);
      expect(result.current.error).toBeDefined();
    });
  });

  describe("Data Access Hooks", () => {
    describe("useDaySigns", () => {
      it("should return all day signs", () => {
        const { result } = renderHook(() => useDaySigns());
        
        expect(result.current.isLoading).toBe(false);
        expect(result.current.daySigns).toHaveLength(20);
        
        result.current.daySigns.forEach((sign) => {
          expect(sign.nahuatlName).toBeDefined();
          expect(sign.englishName).toBeDefined();
          expect(sign.position).toBeGreaterThanOrEqual(1);
          expect(sign.position).toBeLessThanOrEqual(20);
        });
      });
    });

    describe("useTonalpohualliNumbers", () => {
      it("should return all tonalpohualli numbers", () => {
        const { result } = renderHook(() => useTonalpohualliNumbers());
        
        expect(result.current.isLoading).toBe(false);
        expect(result.current.numbers).toHaveLength(13);
        
        result.current.numbers.forEach((number) => {
          expect(number.value).toBeGreaterThanOrEqual(1);
          expect(number.value).toBeLessThanOrEqual(13);
          expect(number.nahuatlName).toBeDefined();
        });
      });
    });

    describe("useXiuhpohualliMonths", () => {
      it("should return all xiuhpohualli months", () => {
        const { result } = renderHook(() => useXiuhpohualliMonths());
        
        expect(result.current.isLoading).toBe(false);
        expect(result.current.months).toHaveLength(18);
        
        result.current.months.forEach((month) => {
          expect(month.position).toBeGreaterThanOrEqual(1);
          expect(month.position).toBeLessThanOrEqual(18);
          expect(month.days).toBe(20);
          expect(month.nahuatlName).toBeDefined();
        });
      });
    });

    describe("useNemontemi", () => {
      it("should return all nemontemi days", () => {
        const { result } = renderHook(() => useNemontemi());
        
        expect(result.current.isLoading).toBe(false);
        expect(result.current.nemontemi).toHaveLength(5);
        
        result.current.nemontemi.forEach((day) => {
          expect(day.day).toBeGreaterThanOrEqual(1);
          expect(day.day).toBeLessThanOrEqual(5);
          expect(day.name).toBeDefined();
          expect(day.meaning).toBeDefined();
        });
      });
    });

    describe("useCalendarConfig", () => {
      it("should return calendar configuration", () => {
        const { result } = renderHook(() => useCalendarConfig());
        
        expect(result.current.isLoading).toBe(false);
        expect(result.current.config).toBeDefined();
        expect(result.current.cycleLengths).toBeDefined();
        
        expect(result.current.cycleLengths.TONALPOHUALLI).toBe(260);
        expect(result.current.cycleLengths.XIUHPOHUALLI).toBe(365);
        expect(result.current.cycleLengths.CALENDAR_ROUND).toBe(18980);
      });
    });
  });

  describe("useDateValidation", () => {
    it("should validate valid dates", () => {
      const validDate = new Date("2024-01-01");
      const { result } = renderHook(() => useDateValidation(validDate));
      
      expect(result.current.isValid).toBe(true);
      expect(result.current.error).toBeUndefined();
    });

    it("should reject invalid dates", () => {
      const invalidDate = new Date("invalid");
      const { result } = renderHook(() => useDateValidation(invalidDate));
      
      expect(result.current.isValid).toBe(false);
      expect(result.current.error).toBeDefined();
    });

    it("should update when date changes", () => {
      const { result, rerender } = renderHook(
        ({ date }) => useDateValidation(date),
        { initialProps: { date: new Date("2024-01-01") } }
      );
      
      expect(result.current.isValid).toBe(true);
      
      rerender({ date: new Date("invalid") });
      
      expect(result.current.isValid).toBe(false);
    });
  });

  describe("useMultipleAztecDates", () => {
    it("should calculate multiple Aztec dates", () => {
      const dates = [
        new Date("2024-01-01"),
        new Date("2024-06-15"),
        new Date("2024-12-31"),
      ];
      
      const { result } = renderHook(() => useMultipleAztecDates(dates));
      
      expect(result.current.isLoading).toBe(false);
      expect(result.current.aztecDates).toHaveLength(3);
      expect(result.current.errors).toHaveLength(3);
      
      result.current.aztecDates.forEach((aztecDate) => {
        expect(aztecDate).toBeDefined();
        expect(aztecDate?.tonalpohualli).toBeDefined();
        expect(aztecDate?.xiuhpohualli).toBeDefined();
      });
      
      result.current.errors.forEach((error) => {
        expect(error).toBe(null);
      });
    });

    it("should handle mixed valid and invalid dates", () => {
      const dates = [
        new Date("2024-01-01"),
        new Date("invalid"),
        new Date("2024-06-15"),
      ];
      
      const { result } = renderHook(() => useMultipleAztecDates(dates));
      
      expect(result.current.aztecDates).toHaveLength(3);
      expect(result.current.errors).toHaveLength(3);
      
      expect(result.current.aztecDates[0]).toBeDefined();
      expect(result.current.aztecDates[1]).toBe(null);
      expect(result.current.aztecDates[2]).toBeDefined();
      
      expect(result.current.errors[0]).toBe(null);
      expect(result.current.errors[1]).toBeDefined();
      expect(result.current.errors[2]).toBe(null);
    });

    it("should handle empty array", () => {
      const { result } = renderHook(() => useMultipleAztecDates([]));
      
      expect(result.current.aztecDates).toHaveLength(0);
      expect(result.current.errors).toHaveLength(0);
      expect(result.current.isLoading).toBe(false);
    });

    it("should update when dates change", () => {
      const { result, rerender } = renderHook(
        ({ dates }) => useMultipleAztecDates(dates),
        { initialProps: { dates: [new Date("2024-01-01")] } }
      );
      
      expect(result.current.aztecDates).toHaveLength(1);
      
      rerender({ dates: [new Date("2024-01-01"), new Date("2024-01-02")] });
      
      expect(result.current.aztecDates).toHaveLength(2);
    });
  });

  describe("Hook Performance", () => {
    it("should not recalculate unnecessarily", () => {
      const testDate = new Date("2024-01-01");
      const { result, rerender } = renderHook(() => useAztecDate(testDate));
      
      const firstResult = result.current.aztecDate;
      
      rerender();
      
      expect(result.current.aztecDate).toBe(firstResult);
    });

    it("should recalculate when date changes", () => {
      const { result, rerender } = renderHook(
        ({ date }) => useAztecDate(date),
        { initialProps: { date: new Date("2024-01-01") } }
      );
      
      const firstResult = result.current.aztecDate;
      
      rerender({ date: new Date("2024-01-02") });
      
      expect(result.current.aztecDate).not.toBe(firstResult);
    });
  });
});