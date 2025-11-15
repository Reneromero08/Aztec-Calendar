/**
 * Main entry point for the Aztec calendar system
 * Exports all types, data, calculations, and hooks for easy consumption
 */

// Types and interfaces
export type {
  DaySign,
  TonalpohualliNumber,
  TonalpohualliDate,
  Trecena,
  XiuhpohualliMonth,
  Nemontemi,
  XiuhpohualliDate,
  AztecDate,
  CalendarConfig,
  ValidationResult,
} from "./types";

// Core data
export {
  daySigns,
  getDaySignByPosition,
  getDaySignByName,
  getDaySignByEnglishName,
} from "./day-signs";

export {
  tonalpohualliNumbers,
  getTonalpohualliNumber,
  getTonalpohualliNumberByName,
} from "./tonalpohualli-numbers";

export {
  xiuhpohualliMonths,
  nemontemi,
  getXiuhpohualliMonth,
  getXiuhpohualliMonthByName,
  getNemontemiDay,
} from "./xiuhpohualli-months";

// Calculation utilities
export {
  calculateAztecDate,
  calculateTonalpohualli,
  calculateXiuhpohualli,
  calculateYearInRound,
  getCurrentTrecena,
  aztecToGregorian,
  validateDate,
  CALENDAR_CONFIG,
  CYCLE_LENGTHS,
} from "./calculations";

// React hooks
export {
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
} from "./hooks";

// Re-export commonly used combinations for convenience

/**
 * Quick utility to get current Aztec date
 * Convenience function for the most common use case
 */
import { calculateAztecDate, calculateTonalpohualli, calculateXiuhpohualli } from "./calculations";
import type { AztecDate, TonalpohualliDate, XiuhpohualliDate } from "./types";

export function getCurrentAztecDate(): AztecDate {
  return calculateAztecDate(new Date());
}

/**
 * Quick utility to get current tonalpohualli date
 */
export function getCurrentTonalpohualliDate(): TonalpohualliDate {
  return calculateTonalpohualli(new Date());
}

/**
 * Quick utility to get current xiuhpohualli date
 */
export function getCurrentXiuhpohualliDate(): XiuhpohualliDate {
  return calculateXiuhpohualli(new Date());
}