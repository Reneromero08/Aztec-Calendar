import { 
  calculateAztecDate, 
  calculateTonalpohualli, 
  calculateXiuhpohualli, 
  getCurrentTrecena,
  validateDate,
  aztecToGregorian,
  formatDate,
  CALENDAR_INFO,
  daySigns,
  tonalpohualliNumbers,
  xiuhpohualliMonths
} from './aztec-calendar-core.js';

// Smoke test function
export function runSmokeTests() {
  console.log('🌅 Aztec Calendar Core - Smoke Tests');
  console.log('=====================================\n');

  // Test 1: Calendar information
  console.log('📋 Calendar Information:');
  console.log(`Tonalpohualli: ${CALENDAR_INFO.tonalpohualli.days} days - ${CALENDAR_INFO.tonalpohualli.description}`);
  console.log(`Xiuhpohualli: ${CALENDAR_INFO.xiuhpohualli.days} days - ${CALENDAR_INFO.xiuhpohualli.description}`);
  console.log(`Calendar Round: ${CALENDAR_INFO.calendarRound.years} years (${CALENDAR_INFO.calendarRound.days} days)`);
  console.log('');

  // Test 2: Current date
  const today = new Date();
  console.log('🗓️  Current Date Analysis:');
  console.log(`Gregorian: ${formatDate(today).long}`);
  
  try {
    const todayAztec = calculateAztecDate(today);
    console.log(`Sacred: ${todayAztec.summary.sacred}`);
    console.log(`Solar: ${todayAztec.summary.solar}`);
    console.log(`Calendar Round Year: ${todayAztec.calendarRoundYear}/52`);
  } catch (error) {
    console.error('Error calculating current date:', error.message);
  }
  console.log('');

  // Test 3: Historical dates
  const testDates = [
    new Date('1521-02-22'), // Fall of Tenochtitlan
    new Date('2020-01-01'), // Recent date
    new Date('1994-12-21'), // Winter solstice example
    new Date('2024-02-29')  // Leap year
  ];

  console.log('📅 Historical Date Tests:');
  testDates.forEach((date, index) => {
    console.log(`\nTest ${index + 1}: ${formatDate(date).us}`);
    try {
      const aztec = calculateAztecDate(date);
      const trecena = getCurrentTrecena(date);
      console.log(`  Sacred: ${aztec.summary.sacred}`);
      console.log(`  Solar: ${aztec.summary.solar}`);
      console.log(`  Trecena: ${trecena.summary}`);
      console.log(`  Day in Trecena: ${trecena.dayInTrecena}/13`);
    } catch (error) {
      console.error(`  Error: ${error.message}`);
    }
  });
  console.log('');

  // Test 4: Individual calculations
  console.log('🔢 Individual Calculation Tests:');
  const testDate = new Date('2024-06-21');
  
  try {
    const tonalpohualli = calculateTonalpohualli(testDate);
    console.log(`Tonalpohualli for ${formatDate(testDate).us}:`);
    console.log(`  Number: ${tonalpohualli.number} (${tonalpohualli.numberName})`);
    console.log(`  Day Sign: ${tonalpohualli.daySign} (${tonalpohualli.daySignEnglish})`);
    console.log(`  Meaning: ${tonalpohualli.daySignMeaning}`);
    console.log('');

    const xiuhpohualli = calculateXiuhpohualli(testDate);
    console.log(`Xiuhpohualli for ${formatDate(testDate).us}:`);
    if (xiuhpohualli.isNemontemi) {
      console.log(`  Nemontemi day ${xiuhpohualli.nemontemiDay}`);
    } else {
      console.log(`  Month: ${xiuhpohualli.monthName} (${xiuhpohualli.monthEnglish})`);
      console.log(`  Day: ${xiuhpohualli.dayInMonth}/20`);
      console.log(`  Season: ${xiuhpohualli.season}`);
      console.log(`  Deity: ${xiuhpohualli.associatedDeity}`);
    }
  } catch (error) {
    console.error('Error in individual calculations:', error.message);
  }
  console.log('');

  // Test 5: Data validation
  console.log('📊 Data Validation:');
  console.log(`Day Signs: ${daySigns.length} loaded`);
  console.log(`Tonalpohualli Numbers: ${tonalpohualliNumbers.length} loaded`);
  console.log(`Xiuhpohualli Months: ${xiuhpohualliMonths.length} loaded`);
  
  // Check first few entries
  console.log(`First day sign: ${daySigns[0]?.name} (${daySigns[0]?.englishName})`);
  console.log(`First number: ${tonalpohualliNumbers[0]?.name} (${tonalpohualliNumbers[0]?.meaning})`);
  console.log(`First month: ${xiuhpohualliMonths[0]?.name} (${xiuhpohualliMonths[0]?.englishName})`);
  console.log('');

  // Test 6: Date validation
  console.log('✅ Date Validation Tests:');
  const validDate = new Date('2024-01-01');
  const invalidDate = new Date('invalid');
  const outOfRangeDate = new Date('3000-01-01');

  console.log(`Valid date test: ${validateDate(validDate).isValid ? 'PASS' : 'FAIL'}`);
  if (!validateDate(validDate).isValid) {
    console.log(`  Error: ${validateDate(validDate).error}`);
  }

  console.log(`Invalid date test: ${!validateDate(invalidDate).isValid ? 'PASS' : 'FAIL'}`);
  if (validateDate(invalidDate).error) {
    console.log(`  Error: ${validateDate(invalidDate).error}`);
  }

  console.log(`Out of range test: ${!validateDate(outOfRangeDate).isValid ? 'PASS' : 'FAIL'}`);
  if (validateDate(outOfRangeDate).error) {
    console.log(`  Error: ${validateDate(outOfRangeDate).error}`);
  }
  console.log('');

  // Test 7: Aztec to Gregorian conversion
  console.log('🔄 Aztec to Gregorian Conversion:');
  try {
    // Convert today's date to Aztec, then back to Gregorian
    const todayAztec = calculateAztecDate(today);
    const convertedBack = aztecToGregorian(
      todayAztec.tonalpohualli.tonalpohualliDay,
      todayAztec.xiuhpohualli.xiuhpohualliDay,
      0
    );
    
    const daysDiff = Math.abs((convertedBack.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    console.log(`Original: ${formatDate(today).us}`);
    console.log(`Converted back: ${formatDate(convertedBack).us}`);
    console.log(`Days difference: ${daysDiff}`);
    console.log(`Test: ${daysDiff < 1 ? 'PASS' : 'FAIL'} (should be same or very close date)`);
  } catch (error) {
    console.error('Error in conversion test:', error.message);
  }

  console.log('\n🎉 Smoke tests completed!');
  console.log('If all tests pass, the Aztec Calendar Core is working correctly.');
}

// Auto-run if this script is executed directly
if (typeof window !== 'undefined') {
  // Browser environment - run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runSmokeTests);
  } else {
    runSmokeTests();
  }
} else if (typeof global !== 'undefined') {
  // Node.js environment - run immediately
  runSmokeTests();
}