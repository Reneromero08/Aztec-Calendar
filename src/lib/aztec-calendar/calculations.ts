/**
 * Core calendar calculation utilities for converting between Gregorian and Aztec calendars
 * Implements the mathematical foundations for both tonalpohualli and xiuhpohualli cycles
 */

import type {
  AztecDate,
  CalendarConfig,
  TonalpohualliDate,
  XiuhpohualliDate,
  ValidationResult,
} from "./types";
import { daySigns, getDaySignByPosition } from "./day-signs";
import { tonalpohualliNumbers, getTonalpohualliNumber } from "./tonalpohualli-numbers";
import { xiuhpohualliMonths, getXiuhpohualliMonth, getNemontemiDay } from "./xiuhpohualli-months";

/**
 * Calendar correlation configuration
 * Uses the Goodman-Martínez-Thompson (GMT) correlation as the most widely accepted
 * August 11, 3114 BCE (Julian) = 0.0.0.0.0 in Mayan Long Count
 * For Aztec calendar, we use a well-documented correlation point
 */
export const CALENDAR_CONFIG: CalendarConfig = {
  /**
   * Correlation date: August 13, 1521 CE
   * The fall of Tenochtitlan, a well-documented historical event
   * This corresponds to 1 Coatl in tonalpohualli and 1 Atlcahualo in xiuhpohualli
   */
  correlationDate: new Date("1521-08-13"),
  
  /**
   * Starting tonalpohualli date for correlation
   * 1 Coatl (1 Serpent) - day 5 in the 260-day cycle
   */
  correlationTonalpohualli: {
    number: tonalpohualliNumbers[0], // 1 Ce
    daySign: daySigns[4], // Coatl (position 5)
    dayCount: 5,
  },
  
  /**
   * Starting xiuhpohualli date for correlation
   * 1 Atlcahualo (first day of the solar year)
   */
  correlationXiuhpohualli: {
    month: xiuhpohualliMonths[0], // Atlcahualo
    day: 1,
    dayOfYear: 1,
    isNemontemi: false,
  },
};

/**
 * Number of days in each calendar cycle
 */
export const CYCLE_LENGTHS = {
  TONALPOHUALLI: 260, // 13 numbers × 20 day signs
  XIUHPOHUALLI: 365, // 18 months × 20 days + 5 nemontemi
  CALENDAR_ROUND: 18980, // Least common multiple of 260 and 365 (52 years)
} as const;

/**
 * Validates a date for calendar calculations
 */
export function validateDate(date: Date): ValidationResult {
  const minDate = new Date("1900-01-01");
  const maxDate = new Date("2100-12-31");

  if (isNaN(date.getTime())) {
    return { isValid: false, error: "Invalid date object" };
  }

  if (date < minDate || date > maxDate) {
    return {
      isValid: false,
      error: "Date must be between 1900 and 2100",
    };
  }

  return { isValid: true };
}

/**
 * Calculates the tonalpohualli date for a given Gregorian date
 */
export function calculateTonalpohualli(date: Date): TonalpohualliDate {
  const validation = validateDate(date);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  // Calculate days since correlation date
  const daysSinceCorrelation = Math.floor(
    (date.getTime() - CALENDAR_CONFIG.correlationDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Calculate position in 260-day cycle
  const correlationDayCount = CALENDAR_CONFIG.correlationTonalpohualli.dayCount;
  const dayCount = ((daysSinceCorrelation + correlationDayCount - 1) % CYCLE_LENGTHS.TONALPOHUALLI) + 1;

  // Calculate number (1-13) and day sign (1-20)
  const numberValue = ((dayCount - 1) % 13) + 1;
  const daySignPosition = ((dayCount - 1) % 20) + 1;

  const number = getTonalpohualliNumber(numberValue);
  const daySign = getDaySignByPosition(daySignPosition);

  if (!number || !daySign) {
    throw new Error("Failed to calculate tonalpohualli date components");
  }

  return {
    number,
    daySign,
    dayCount,
  };
}

/**
 * Calculates the xiuhpohualli date for a given Gregorian date
 */
export function calculateXiuhpohualli(date: Date): XiuhpohualliDate {
  const validation = validateDate(date);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  // Calculate days since correlation date
  const daysSinceCorrelation = Math.floor(
    (date.getTime() - CALENDAR_CONFIG.correlationDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Calculate position in 365-day cycle
  const correlationDayOfYear = CALENDAR_CONFIG.correlationXiuhpohualli.dayOfYear;
  const dayOfYear = ((daysSinceCorrelation + correlationDayOfYear - 1) % CYCLE_LENGTHS.XIUHPOHUALLI) + 1;

  // Check if it's a nemontemi day (days 361-365)
  if (dayOfYear > 360) {
    const nemontemiDay = dayOfYear - 360;
    const nemontemiData = getNemontemiDay(nemontemiDay);
    
    if (!nemontemiData) {
      throw new Error("Failed to get nemontemi day data");
    }

    return {
      month: xiuhpohualliMonths[17], // Izcalli (last month)
      day: 20 + nemontemiDay,
      dayOfYear,
      isNemontemi: true,
      nemontemi: nemontemiData,
    };
  }

  // Regular month day
  const monthPosition = Math.floor((dayOfYear - 1) / 20) + 1;
  const dayInMonth = ((dayOfYear - 1) % 20) + 1;

  const month = getXiuhpohualliMonth(monthPosition);
  
  if (!month) {
    throw new Error("Failed to calculate xiuhpohualli month");
  }

  return {
    month,
    day: dayInMonth,
    dayOfYear,
    isNemontemi: false,
  };
}

/**
 * Calculates the year in the 52-year calendar round
 */
export function calculateYearInRound(date: Date): number {
  const validation = validateDate(date);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  // Calculate days since correlation date
  const daysSinceCorrelation = Math.floor(
    (date.getTime() - CALENDAR_CONFIG.correlationDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Calculate year position in 52-year cycle
  const yearsSinceCorrelation = Math.floor(daysSinceCorrelation / 365);
  const yearInRound = (yearsSinceCorrelation % 52) + 1;

  return yearInRound;
}

/**
 * Main function to calculate complete Aztec date from Gregorian date
 */
export function calculateAztecDate(date: Date): AztecDate {
  const validation = validateDate(date);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  const tonalpohualli = calculateTonalpohualli(date);
  const xiuhpohualli = calculateXiuhpohualli(date);
  const yearInRound = calculateYearInRound(date);

  return {
    gregorianDate: date,
    tonalpohualli,
    xiuhpohualli,
    yearInRound,
  };
}

/**
 * Converts an Aztec date back to Gregorian (approximate)
 * Note: This is an approximation due to calendar complexities
 */
export function aztecToGregorian(aztecDate: {
  tonalpohualliDayCount: number;
  xiuhpohualliDayOfYear: number;
  yearInRound: number;
  targetYear?: number;
}): Date {
  const { tonalpohualliDayCount, xiuhpohualliDayOfYear, yearInRound, targetYear } = aztecDate;

  // Use target year if provided, otherwise use current year
  const baseYear = targetYear || new Date().getFullYear();
  
  // Find a date that matches the Aztec date pattern
  // This is a simplified approach - in practice, this would require more complex calculations
  const testDate = new Date(baseYear, 0, 1); // Start of year
  
  // Search for matching date within a reasonable range
  for (let offset = 0; offset < 365; offset++) {
    const candidateDate = new Date(testDate.getTime() + offset * 24 * 60 * 60 * 1000);
    const candidateAztec = calculateAztecDate(candidateDate);
    
    if (
      candidateAztec.tonalpohualli.dayCount === tonalpohualliDayCount &&
      candidateAztec.xiuhpohualli.dayOfYear === xiuhpohualliDayOfYear &&
      candidateAztec.yearInRound === yearInRound
    ) {
      return candidateDate;
    }
  }

  // If no exact match found, return the closest approximation
  throw new Error("Could not find matching Gregorian date for Aztec date");
}

/**
 * Gets information about the current trecena (13-day period)
 */
export function getCurrentTrecena(date: Date): {
  trecenaNumber: number;
  rulingSign: import("./types").DaySign;
  daysInTrecena: TonalpohualliDate[];
} {
  const tonalpohualli = calculateTonalpohualli(date);
  
  // Calculate trecena number (1-20)
  const trecenaNumber = Math.floor((tonalpohualli.dayCount - 1) / 13) + 1;
  
  // Get ruling sign (first day of the trecena)
  const trecenaStartDayCount = (trecenaNumber - 1) * 13 + 1;
  const rulingSignPosition = ((trecenaStartDayCount - 1) % 20) + 1;
  const rulingSign = getDaySignByPosition(rulingSignPosition);
  
  if (!rulingSign) {
    throw new Error("Failed to determine trecena ruling sign");
  }

  // Calculate all days in this trecena
  const daysInTrecena: TonalpohualliDate[] = [];
  for (let i = 0; i < 13; i++) {
    const dayInTrecena = trecenaStartDayCount + i;
    const numberValue = ((dayInTrecena - 1) % 13) + 1;
    const daySignPosition = ((dayInTrecena - 1) % 20) + 1;
    
    const number = getTonalpohualliNumber(numberValue);
    const daySign = getDaySignByPosition(daySignPosition);
    
    if (number && daySign) {
      daysInTrecena.push({
        number,
        daySign,
        dayCount: dayInTrecena,
      });
    }
  }

  return {
    trecenaNumber,
    rulingSign,
    daysInTrecena,
  };
}