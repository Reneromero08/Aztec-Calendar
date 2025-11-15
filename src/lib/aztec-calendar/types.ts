/**
 * Core types and interfaces for the Aztec calendar system
 * Includes data structures for tonalpohualli (260-day cycle) and xiuhpohualli (365-day cycle)
 */

/**
 * Represents one of the 20 day signs in the tonalpohualli
 */
export interface DaySign {
  /** Nahuatl name of the day sign */
  nahuatlName: string;
  /** English translation/meaning */
  englishName: string;
  /** Glyph symbol or reference */
  glyph: string;
  /** Phonetic pronunciation guide */
  pronunciation: string;
  /** Associated meaning and symbolism */
  meaning: string;
  /** Numerical position (1-20) */
  position: number;
  /** Associated direction/deity */
  direction?: string;
  /** Ruling deity */
  deity?: string;
}

/**
 * Represents one of the 13 numbers in the tonalpohualli cycle
 */
export interface TonalpohualliNumber {
  /** Numerical value (1-13) */
  value: number;
  /** Nahuatl name for the number */
  nahuatlName: string;
  /** Associated meaning or symbolism */
  meaning: string;
  /** Gender association (masculine/feminine/neutral) */
  gender?: string;
}

/**
 * Represents a complete tonalpohualli date (number + day sign)
 */
export interface TonalpohualliDate {
  /** Number component (1-13) */
  number: TonalpohualliNumber;
  /** Day sign component (1-20) */
  daySign: DaySign;
  /** Combined day count in the 260-day cycle (1-260) */
  dayCount: number;
}

/**
 * Represents a trecena (13-day period) in the tonalpohualli
 */
export interface Trecena {
  /** Trecena number (1-20) */
  number: number;
  /** Ruling day sign of the trecena */
  rulingSign: DaySign;
  /** Associated deity or patron */
  patron?: string;
  /** Days within this trecena */
  days: TonalpohualliDate[];
}

/**
 * Represents one of the 18 months (veintenas) in the xiuhpohualli
 */
export interface XiuhpohualliMonth {
  /** Nahuatl name of the month */
  nahuatlName: string;
  /** English translation/meaning */
  englishName: string;
  /** Number of days (always 20) */
  days: number;
  /** Position in the solar year (1-18) */
  position: number;
  /** Associated deity or patron */
  patron?: string;
  /** Seasonal association */
  season?: string;
  /** Agricultural significance */
  agricultural?: string;
}

/**
 * Represents the 5 nemontemi (unlucky days) at the end of the xiuhpohualli
 */
export interface Nemontemi {
  /** Day number (1-5) */
  day: number;
  /** Name/description */
  name: string;
  /** Associated meaning or warning */
  meaning: string;
}

/**
 * Represents a complete xiuhpohualli date
 */
export interface XiuhpohualliDate {
  /** Month component */
  month: XiuhpohualliMonth;
  /** Day within the month (1-20) */
  day: number;
  /** Day within the solar year (1-365) */
  dayOfYear: number;
  /** Whether this is a nemontemi day */
  isNemontemi: boolean;
  /** Nemontemi data if applicable */
  nemontemi?: Nemontemi;
}

/**
 * Represents a complete Aztec calendar date combining both cycles
 */
export interface AztecDate {
  /** Gregorian date representation */
  gregorianDate: Date;
  /** Tonalpohualli (260-day cycle) date */
  tonalpohualli: TonalpohualliDate;
  /** Xiuhpohualli (365-day cycle) date */
  xiuhpohualli: XiuhpohualliDate;
  /** Year count in the 52-year calendar round */
  yearInRound: number;
  /** Current year in the 52-year cycle (1-52) */
  yearName?: string;
}

/**
 * Configuration for calendar calculations
 */
export interface CalendarConfig {
  /** Correlation date between Gregorian and Aztec calendars */
  correlationDate: Date;
  /** Starting tonalpohualli date for correlation */
  correlationTonalpohualli: TonalpohualliDate;
  /** Starting xiuhpohualli date for correlation */
  correlationXiuhpohualli: XiuhpohualliDate;
}

/**
 * Validation result for calendar calculations
 */
export interface ValidationResult {
  /** Whether the calculation is valid */
  isValid: boolean;
  /** Error message if invalid */
  error?: string;
  /** Warnings about the calculation */
  warnings?: string[];
}