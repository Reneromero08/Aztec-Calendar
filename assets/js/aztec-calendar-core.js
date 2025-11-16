import { daySigns } from '../data/day-signs.js';
import { tonalpohualliNumbers } from '../data/tonalpohualli-numbers.js';
import { xiuhpohualliMonths, nemontemi } from '../data/xiuhpohualli-months.js';

// Constants
export const TONALPOHUALLI_DAYS = 260;
export const XIUHPOHUALLI_DAYS = 365;
export const NEMONTEMI_DAYS = 5;
export const CIVIL_YEAR_DAYS = XIUHPOHUALLI_DAYS;
export const CALENDAR_ROUND_DAYS = 18980; // LCM of 260 and 365 (52 years)

// Reference dates
export const GREGORIAN_REFERENCE_DATE = new Date('1521-02-22'); // Aztec fall of Tenochtitlan
export const AZTEC_REFERENCE_TONALPOHUALLI = 4; // Cuetzpalin (Lizard)
export const AZTEC_REFERENCE_XIUHPOHUALLI = 2; // Tlacaxipehualiztli

// Utility functions
function mod(n, m) {
  return ((n % m) + m) % m;
}

function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}

function getDaysSinceReference(date) {
  const timeDiff = date.getTime() - GREGORIAN_REFERENCE_DATE.getTime();
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
}

// Core calculation functions
export function calculateTonalpohualli(date) {
  if (!isValidDate(date)) {
    throw new Error('Invalid date provided');
  }

  const daysSinceReference = getDaysSinceReference(date);
  const tonalpohualliDay = mod(daysSinceReference + AZTEC_REFERENCE_TONALPOHUALLI - 1, TONALPOHUALLI_DAYS);
  
  const numberIndex = mod(tonalpohualliDay, 13);
  const daySignIndex = mod(tonalpohualliDay, 20);
  
  const number = tonalpohualliNumbers[numberIndex];
  const daySign = daySigns[daySignIndex];
  
  return {
    number: number.number,
    numberName: number.name,
    daySign: daySign.name,
    daySignEnglish: daySign.englishName,
    daySignGlyph: daySign.glyph,
    daySignMeaning: daySign.meaning,
    daySignAssociations: daySign.associations,
    numberMeaning: number.meaning,
    numberAssociations: number.associations,
    tonalpohualliDay: tonalpohualliDay + 1,
    fullDate: `${number.name} ${daySign.name}`,
    fullDateEnglish: `${daySign.englishName} ${number.number}`
  };
}

export function calculateXiuhpohualli(date) {
  if (!isValidDate(date)) {
    throw new Error('Invalid date provided');
  }

  const daysSinceReference = getDaysSinceReference(date);
  const xiuhpohualliDay = mod(daysSinceReference + AZTEC_REFERENCE_XIUHPOHUALLI - 1, XIUHPOHUALLI_DAYS);
  
  // Check if it's Nemontemi (the last 5 days)
  if (xiuhpohualliDay >= 360) {
    return {
      isNemontemi: true,
      nemontemiDay: xiuhpohualliDay - 359,
      ...nemontemi,
      xiuhpohualliDay: xiuhpohualliDay + 1
    };
  }
  
  const monthIndex = Math.floor(xiuhpohualliDay / 20);
  const dayInMonth = xiuhpohualliDay % 20;
  
  const month = xiuhpohualliMonths[monthIndex];
  
  return {
    isNemontemi: false,
    monthName: month.name,
    monthEnglish: month.englishName,
    monthMeaning: month.meaning,
    season: month.season,
    associatedDeity: month.associatedDeity,
    dayInMonth: dayInMonth + 1,
    ceremonies: month.ceremonies,
    agriculturalActivity: month.agriculturalActivity,
    xiuhpohualliDay: xiuhpohualliDay + 1,
    fullDate: `${dayInMonth + 1} ${month.name}`,
    fullDateEnglish: `${month.englishName} ${dayInMonth + 1}`
  };
}

export function calculateAztecDate(date) {
  if (!isValidDate(date)) {
    throw new Error('Invalid date provided');
  }

  const tonalpohualli = calculateTonalpohualli(date);
  const xiuhpohualli = calculateXiuhpohualli(date);
  
  // Calculate year in the 52-year calendar round
  const daysSinceReference = getDaysSinceReference(date);
  const yearInCalendarRound = mod(Math.floor(daysSinceReference / XIUHPOHUALLI_DAYS), 52);
  
  return {
    gregorianDate: date.toISOString().split('T')[0],
    tonalpohualli,
    xiuhpohualli,
    yearInCalendarRound: yearInCalendarRound + 1,
    calendarRoundYear: yearInCalendarRound + 1,
    isNemontemi: xiuhpohualli.isNemontemi,
    summary: {
      sacred: `${tonalpohualli.fullDate} (${tonalpohualli.fullDateEnglish})`,
      solar: xiuhpohualli.isNemontemi 
        ? `${nemontemi.name} day ${xiuhpohualli.nemontemiDay}`
        : `${xiuhpohualli.fullDate} (${xiuhpohualli.fullDateEnglish})`
    }
  };
}

export function getCurrentTrecena(date) {
  if (!isValidDate(date)) {
    throw new Error('Invalid date provided');
  }

  const daysSinceReference = getDaysSinceReference(date);
  const tonalpohualliDay = mod(daysSinceReference + AZTEC_REFERENCE_TONALPOHUALLI - 1, TONALPOHUALLI_DAYS);
  
  // Find the start of the current trecena (13-day period)
  const trecenaStartDay = Math.floor(tonalpohualliDay / 13) * 13;
  const dayInTrecena = tonalpohualliDay % 13;
  
  const startDaySignIndex = mod(trecenaStartDay, 20);
  const startNumberIndex = mod(trecenaStartDay, 13);
  
  const startDaySign = daySigns[startDaySignIndex];
  const startNumber = tonalpohualliNumbers[startNumberIndex];
  
  // Generate all days in the trecena
  const trecenaDays = [];
  for (let i = 0; i < 13; i++) {
    const dayIndex = trecenaStartDay + i;
    const numberIndex = mod(dayIndex, 13);
    const daySignIndex = mod(dayIndex, 20);
    
    trecenaDays.push({
      position: i + 1,
      number: tonalpohualliNumbers[numberIndex],
      daySign: daySigns[daySignIndex],
      isToday: i === dayInTrecena
    });
  }
  
  return {
    trecenaNumber: Math.floor(tonalpohualliDay / 13) + 1,
    dayInTrecena: dayInTrecena + 1,
    startDaySign: startDaySign,
    startNumber: startNumber,
    rulingDeity: startDaySign.ruler,
    days: trecenaDays,
    summary: `Trecena of ${startNumber.name} ${startDaySign.name} (${startDaySign.englishName})`
  };
}

export function validateDate(date) {
  if (!isValidDate(date)) {
    return {
      isValid: false,
      error: 'Invalid date object provided'
    };
  }
  
  // Check if date is within reasonable range
  const year = date.getFullYear();
  if (year < 1500 || year > 2500) {
    return {
      isValid: false,
      error: 'Date year should be between 1500 and 2500'
    };
  }
  
  try {
    // Test calculation
    calculateAztecDate(date);
    return {
      isValid: true,
      error: null
    };
  } catch (error) {
    return {
      isValid: false,
      error: error.message
    };
  }
}

export function aztecToGregorian(tonalpohualliDay, xiuhpohualliDay, yearOffset = 0) {
  if (tonalpohualliDay < 1 || tonalpohualliDay > TONALPOHUALLI_DAYS) {
    throw new Error(`Tonalpohualli day must be between 1 and ${TONALPOHUALLI_DAYS}`);
  }
  
  if (xiuhpohualliDay < 1 || xiuhpohualliDay > XIUHPOHUALLI_DAYS) {
    throw new Error(`Xiuhpohualli day must be between 1 and ${XIUHPOHUALLI_DAYS}`);
  }
  
  // Calculate the most recent date that matches the combination
  // Start from today and search backwards
  const today = new Date();
  const startDate = new Date(today);
  startDate.setFullYear(startDate.getFullYear() + yearOffset);
  
  // Search backwards within one calendar round
  for (let days = 0; days < CALENDAR_ROUND_DAYS; days++) {
    const testDate = new Date(startDate);
    testDate.setDate(testDate.getDate() - days);
    
    const aztecDate = calculateAztecDate(testDate);
    
    if (aztecDate.tonalpohualli.tonalpohualliDay === tonalpohualliDay &&
        aztecDate.xiuhpohualli.xiuhpohualliDay === xiuhpohualliDay) {
      return testDate;
    }
  }
  
  throw new Error('No matching Gregorian date found within the calendar round');
}

// Helper function to format dates
export function formatDate(date) {
  if (!isValidDate(date)) {
    throw new Error('Invalid date provided');
  }
  
  return {
    iso: date.toISOString().split('T')[0],
    us: date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    long: date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    aztec: calculateAztecDate(date)
  };
}

// Export data for direct access
export { daySigns, tonalpohualliNumbers, xiuhpohualliMonths, nemontemi };

// Export constants for external use
export const CALENDAR_INFO = {
  tonalpohualli: {
    name: 'Tonalpohualli',
    englishName: 'Sacred Calendar',
    days: TONALPOHUALLI_DAYS,
    description: '260-day sacred and divinatory calendar combining 20 day signs with 13 numbers'
  },
  xiuhpohualli: {
    name: 'Xiuhpohualli',
    englishName: 'Solar Calendar',
    days: XIUHPOHUALLI_DAYS,
    description: '365-day solar calendar with 18 months of 20 days plus 5 nemontemi days'
  },
  calendarRound: {
    name: 'Calendar Round',
    englishName: 'Calendar Round',
    days: CALENDAR_ROUND_DAYS,
    years: 52,
    description: '52-year cycle when the tonalpohualli and xiuhpohualli align'
  }
};