/**
 * React hooks for Aztec calendar data
 * Provides convenient access to calendar calculations and metadata
 */

import { useMemo } from "react";
import type {
  AztecDate,
  TonalpohualliDate,
  XiuhpohualliDate,
  ValidationResult,
} from "./types";
import {
  calculateAztecDate,
  calculateTonalpohualli,
  calculateXiuhpohualli,
  getCurrentTrecena,
  validateDate,
  CALENDAR_CONFIG,
  CYCLE_LENGTHS,
} from "./calculations";
import { daySigns } from "./day-signs";
import { tonalpohualliNumbers } from "./tonalpohualli-numbers";
import { xiuhpohualliMonths, nemontemi } from "./xiuhpohualli-months";

/**
 * Hook to get the complete Aztec date for a given Gregorian date
 * @param date - The Gregorian date to convert (defaults to current date)
 * @returns Complete Aztec date information
 */
export function useAztecDate(date: Date = new Date()): {
  aztecDate: AztecDate | null;
  isLoading: boolean;
  error: string | null;
} {
  return useMemo(() => {
    try {
      const validation = validateDate(date);
      if (!validation.isValid) {
        return {
          aztecDate: null,
          isLoading: false,
          error: validation.error || "Invalid date",
        };
      }

      const aztecDate = calculateAztecDate(date);
      return {
        aztecDate,
        isLoading: false,
        error: null,
      };
    } catch (err) {
      return {
        aztecDate: null,
        isLoading: false,
        error: err instanceof Error ? err.message : "Unknown error occurred",
      };
    }
  }, [date]);
}

/**
 * Hook to get the tonalpohualli date for a given Gregorian date
 * @param date - The Gregorian date to convert (defaults to current date)
 * @returns Tonalpohualli date information
 */
export function useTonalpohualliDate(date: Date = new Date()): {
  tonalpohualli: TonalpohualliDate | null;
  isLoading: boolean;
  error: string | null;
} {
  return useMemo(() => {
    try {
      const validation = validateDate(date);
      if (!validation.isValid) {
        return {
          tonalpohualli: null,
          isLoading: false,
          error: validation.error || "Invalid date",
        };
      }

      const tonalpohualli = calculateTonalpohualli(date);
      return {
        tonalpohualli,
        isLoading: false,
        error: null,
      };
    } catch (err) {
      return {
        tonalpohualli: null,
        isLoading: false,
        error: err instanceof Error ? err.message : "Unknown error occurred",
      };
    }
  }, [date]);
}

/**
 * Hook to get the xiuhpohualli date for a given Gregorian date
 * @param date - The Gregorian date to convert (defaults to current date)
 * @returns Xiuhpohualli date information
 */
export function useXiuhpohualliDate(date: Date = new Date()): {
  xiuhpohualli: XiuhpohualliDate | null;
  isLoading: boolean;
  error: string | null;
} {
  return useMemo(() => {
    try {
      const validation = validateDate(date);
      if (!validation.isValid) {
        return {
          xiuhpohualli: null,
          isLoading: false,
          error: validation.error || "Invalid date",
        };
      }

      const xiuhpohualli = calculateXiuhpohualli(date);
      return {
        xiuhpohualli,
        isLoading: false,
        error: null,
      };
    } catch (err) {
      return {
        xiuhpohualli: null,
        isLoading: false,
        error: err instanceof Error ? err.message : "Unknown error occurred",
      };
    }
  }, [date]);
}

/**
 * Hook to get the current trecena (13-day period) information
 * @param date - The Gregorian date (defaults to current date)
 * @returns Trecena information including ruling sign and all days
 */
export function useCurrentTrecena(date: Date = new Date()): {
  trecena: {
    trecenaNumber: number;
    rulingSign: import("./types").DaySign;
    daysInTrecena: TonalpohualliDate[];
  } | null;
  isLoading: boolean;
  error: string | null;
} {
  return useMemo(() => {
    try {
      const validation = validateDate(date);
      if (!validation.isValid) {
        return {
          trecena: null,
          isLoading: false,
          error: validation.error || "Invalid date",
        };
      }

      const trecena = getCurrentTrecena(date);
      return {
        trecena,
        isLoading: false,
        error: null,
      };
    } catch (err) {
      return {
        trecena: null,
        isLoading: false,
        error: err instanceof Error ? err.message : "Unknown error occurred",
      };
    }
  }, [date]);
}

/**
 * Hook to get all day signs metadata
 * @returns Array of all 20 day signs
 */
export function useDaySigns(): {
  daySigns: typeof daySigns;
  isLoading: boolean;
} {
  return useMemo(() => {
    return {
      daySigns,
      isLoading: false,
    };
  }, []);
}

/**
 * Hook to get all tonalpohualli numbers metadata
 * @returns Array of all 13 numbers
 */
export function useTonalpohualliNumbers(): {
  numbers: typeof tonalpohualliNumbers;
  isLoading: boolean;
} {
  return useMemo(() => {
    return {
      numbers: tonalpohualliNumbers,
      isLoading: false,
    };
  }, []);
}

/**
 * Hook to get all xiuhpohualli months metadata
 * @returns Array of all 18 months
 */
export function useXiuhpohualliMonths(): {
  months: typeof xiuhpohualliMonths;
  isLoading: boolean;
} {
  return useMemo(() => {
    return {
      months: xiuhpohualliMonths,
      isLoading: false,
    };
  }, []);
}

/**
 * Hook to get nemontemi days metadata
 * @returns Array of all 5 nemontemi days
 */
export function useNemontemi(): {
  nemontemi: typeof nemontemi;
  isLoading: boolean;
} {
  return useMemo(() => {
    return {
      nemontemi,
      isLoading: false,
    };
  }, []);
}

/**
 * Hook to get calendar configuration and cycle information
 * @returns Calendar configuration and cycle lengths
 */
export function useCalendarConfig(): {
  config: typeof CALENDAR_CONFIG;
  cycleLengths: typeof CYCLE_LENGTHS;
  isLoading: boolean;
} {
  return useMemo(() => {
    return {
      config: CALENDAR_CONFIG,
      cycleLengths: CYCLE_LENGTHS,
      isLoading: false,
    };
  }, []);
}

/**
 * Hook to validate a date for calendar calculations
 * @param date - The date to validate
 * @returns Validation result
 */
export function useDateValidation(date: Date): ValidationResult {
  return useMemo(() => {
    return validateDate(date);
  }, [date]);
}

/**
 * Hook to get calendar information for multiple dates
 * Useful for generating calendar views or comparisons
 * @param dates - Array of Gregorian dates
 * @returns Array of Aztec dates
 */
export function useMultipleAztecDates(dates: Date[]): {
  aztecDates: (AztecDate | null)[];
  isLoading: boolean;
  errors: (string | null)[];
} {
  return useMemo(() => {
    const results = dates.map(date => {
      try {
        const validation = validateDate(date);
        if (!validation.isValid) {
          return {
            aztecDate: null,
            error: validation.error || "Invalid date",
          };
        }
        return {
          aztecDate: calculateAztecDate(date),
          error: null,
        };
      } catch (err) {
        return {
          aztecDate: null,
          error: err instanceof Error ? err.message : "Unknown error occurred",
        };
      }
    });

    return {
      aztecDates: results.map(r => r.aztecDate),
      isLoading: false,
      errors: results.map(r => r.error),
    };
  }, [dates]);
}