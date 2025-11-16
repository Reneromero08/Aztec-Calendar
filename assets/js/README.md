# Aztec Calendar Module Documentation

## Overview

The Aztec Calendar module provides browser-compatible ES modules for calculating and working with the Aztec calendar system (tonalpohualli and xiuhpohualli). This is a pure JavaScript implementation with no build step required.

## File Structure

```
assets/
├── data/
│   ├── day-signs.js              # 20 Aztec day signs with meanings
│   ├── tonalpohualli-numbers.js  # 13 sacred numbers
│   └── xiuhpohualli-months.js    # 18 solar months + nemontemi days
└── js/
    ├── aztec-calendar-core.js    # Main calculation engine
    └── aztec-calculator-smoke.js # Test script for verification
```

## Quick Start

### Import the Module

```javascript
import { calculateAztecDate, calculateTonalpohualli } from './assets/js/aztec-calendar-core.js';
```

### Basic Usage

```javascript
// Calculate Aztec date for today
const today = new Date();
const aztecDate = calculateAztecDate(today);

console.log(aztecDate.summary.sacred);  // e.g., "4 Cuetzpalin (Lizard)"
console.log(aztecDate.summary.solar);   // e.g., "5 Toxcatl (Drought)"
```

## API Reference

### Core Functions

#### `calculateAztecDate(date)`
Returns complete Aztec calendar information for a given date.

**Parameters:**
- `date` (Date): JavaScript Date object

**Returns:**
```javascript
{
  gregorianDate: "2024-06-21",
  tonalpohualli: {
    number: 4,
    numberName: "Nahui",
    daySign: "Cuetzpalin",
    daySignEnglish: "Lizard",
    daySignGlyph: "🦎",
    daySignMeaning: "Adaptation, survival, regeneration",
    tonalpohualliDay: 85,
    fullDate: "Nahui Cuetzpalin",
    fullDateEnglish: "Lizard 4"
  },
  xiuhpohualli: {
    monthName: "Toxcatl",
    monthEnglish: "Drought",
    dayInMonth: 5,
    season: "summer",
    associatedDeity: "Tezcatlipoca",
    xiuhpohualliDay: 125,
    fullDate: "5 Toxcatl",
    fullDateEnglish: "Drought 5"
  },
  calendarRoundYear: 42,
  summary: {
    sacred: "Nahui Cuetzpalin (Lizard 4)",
    solar: "5 Toxcatl (Drought 5)"
  }
}
```

#### `calculateTonalpohualli(date)`
Returns only the sacred calendar (tonalpohualli) information.

#### `calculateXiuhpohualli(date)`
Returns only the solar calendar (xiuhpohualli) information.

#### `getCurrentTrecena(date)`
Returns information about the current 13-day period (trecena).

**Returns:**
```javascript
{
  trecenaNumber: 7,
  dayInTrecena: 3,
  startDaySign: { /* day sign object */ },
  startNumber: { /* number object */ },
  rulingDeity: "Quetzalcoatl",
  days: [ /* array of 13 days */ ],
  summary: "Trecena of Ce Ehecatl (Wind)"
}
```

#### `validateDate(date)`
Validates if a date can be processed by the calendar system.

**Returns:**
```javascript
{
  isValid: true,
  error: null
}
```

#### `aztecToGregorian(tonalpohualliDay, xiuhpohualliDay, yearOffset)`
Converts Aztec calendar coordinates back to a Gregorian date.

**Parameters:**
- `tonalpohualliDay` (number): Day number 1-260
- `xiuhpohualliDay` (number): Day number 1-365  
- `yearOffset` (number, optional): Year offset from reference date

#### `formatDate(date)`
Formats a date in multiple ways including Aztec calendar representation.

### Data Access

Direct access to calendar data:

```javascript
import { daySigns, tonalpohualliNumbers, xiuhpohualliMonths, nemontemi } from './assets/js/aztec-calendar-core.js';

// All 20 day signs
console.log(daySigns[0]); // Cipactli (Crocodile)

// All 13 sacred numbers  
console.log(tonalpohualliNumbers[0]); // Ce (1)

// All 18 solar months
console.log(xiuhpohualliMonths[0]); // Atlcahualo

// Nemontemi (unlucky days)
console.log(nemontemi); // { name: "Nemontemi", days: 5, ... }
```

### Constants

```javascript
import { 
  TONALPOHUALLI_DAYS,    // 260
  XIUHPOHUALLI_DAYS,    // 365
  CALENDAR_ROUND_DAYS,  // 18980 (52 years)
  CALENDAR_INFO         // System information
} from './assets/js/aztec-calendar-core.js';
```

## Error Handling

All functions throw errors for invalid inputs:

```javascript
try {
  const result = calculateAztecDate(new Date('invalid'));
} catch (error) {
  console.error(error.message); // "Invalid date provided"
}
```

Common errors:
- `'Invalid date provided'` - Not a valid Date object
- `'Date year should be between 1500 and 2500'` - Date outside reasonable range
- `'No matching Gregorian date found within the calendar round'` - Conversion failed

## Testing

### Smoke Test

Run the built-in smoke test to verify functionality:

```javascript
import { runSmokeTests } from './assets/js/aztec-calculator-smoke.js';

// Run all tests
runSmokeTests();
```

The smoke test covers:
- Calendar information display
- Current date calculation
- Historical date examples
- Individual calculation functions
- Data validation
- Date validation
- Aztec to Gregorian conversion

### Browser Testing

Add to any HTML page:

```html
<script type="module">
  import './assets/js/aztec-calculator-smoke.js';
  // Tests will run automatically and log to console
</script>
```

## Browser Compatibility

- **Modern browsers**: Full ES6 module support
- **No build step**: Works directly in browser
- **No dependencies**: Pure JavaScript implementation
- **Module system**: ES6 import/export syntax

## Integration Examples

### Simple Date Converter

```javascript
import { calculateAztecDate, formatDate } from './assets/js/aztec-calendar-core.js';

function convertDate(inputDate) {
  const date = new Date(inputDate);
  const aztec = calculateAztecDate(date);
  
  return {
    gregorian: formatDate(date).us,
    sacred: aztec.summary.sacred,
    solar: aztec.summary.solar,
    year: aztec.calendarRoundYear
  };
}

// Usage
console.log(convertDate('2024-06-21'));
```

### Trecena Explorer

```javascript
import { getCurrentTrecena } from './assets/js/aztec-calendar-core.js';

function showTrecena(date = new Date()) {
  const trecena = getCurrentTrecena(date);
  
  console.log(`Current Trecena: ${trecena.summary}`);
  console.log(`Day ${trecena.dayInTrecena} of 13`);
  console.log(`Ruling deity: ${trecena.rulingDeity}`);
  
  trecena.days.forEach(day => {
    if (day.isToday) {
      console.log(`→ Today: ${day.number.name} ${day.daySign.name}`);
    }
  });
}

showTrecena();
```

### Calendar Round Calculator

```javascript
import { calculateAztecDate, CALENDAR_ROUND_DAYS } from './assets/js/aztec-calendar-core.js';

function daysUntilNextRound(date = new Date()) {
  const aztec = calculateAztecDate(date);
  const daysInYear = aztec.tonalpohualli.tonalpohualliDay;
  const daysUntilRound = CALENDAR_ROUND_DAYS - daysInYear;
  
  return {
    currentYear: aztec.calendarRoundYear,
    daysUntilNextRound: daysUntilRound,
    yearsUntilNextRound: Math.floor(daysUntilRound / 365)
  };
}

console.log(daysUntilNextRound());
```

## Performance Notes

- **No external dependencies**: Fast loading
- **Pure functions**: No side effects, easy to cache
- **Modular design**: Import only what you need
- **Browser optimized**: Uses native Date object

## Data Sources

The calendar data is based on scholarly research of Mesoamerican calendar systems:
- 20 day signs with traditional associations
- 13 sacred numbers with cosmological meanings  
- 18 solar months of 20 days each
- 5 nemontemi (unlucky) days
- 52-year calendar round cycle

## License

This module is provided for educational purposes. The calendar calculations follow established academic research on Mesoamerican timekeeping systems.