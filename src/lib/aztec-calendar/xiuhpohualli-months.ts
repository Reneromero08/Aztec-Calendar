/**
 * Data for the 18 months (veintenas) of the Aztec xiuhpohualli solar calendar
 * Each month is 20 days, with 5 additional nemontemi (unlucky) days
 */

import type { XiuhpohualliMonth, Nemontemi } from "./types";

/**
 * The 18 months of the xiuhpohualli (365-day solar calendar)
 * Each month represents a 20-day period with specific agricultural and ceremonial significance
 */
export const xiuhpohualliMonths: XiuhpohualliMonth[] = [
  {
    nahuatlName: "Atlcahualo",
    englishName: "Water Left",
    days: 20,
    position: 1,
    patron: "Chalchiuhtlicue",
    season: "Spring",
    agricultural: "Beginning of the agricultural cycle, preparation of fields",
  },
  {
    nahuatlName: "Tlacaxipehualiztli",
    englishName: "Flaying of Men",
    days: 20,
    position: 2,
    patron: "Xipe Totec",
    season: "Spring",
    agricultural: "Planting season, corn planting ceremonies",
  },
  {
    nahuatlName: "Tozoztontli",
    englishName: "Little Vigil",
    days: 20,
    position: 3,
    patron: "Coatlicue",
    season: "Spring",
    agricultural: "Early growth, first shoots appear",
  },
  {
    nahuatlName: "Huei Tozoztli",
    englishName: "Great Vigil",
    days: 20,
    position: 4,
    patron: "Tlaloc",
    season: "Spring",
    agricultural: "Rain prayers, ensuring crop growth",
  },
  {
    nahuatlName: "Toxcatl",
    englishName: "Dryness",
    days: 20,
    position: 5,
    patron: "Tezcatlipoca",
    season: "Summer",
    agricultural: "Dry season begins, crop monitoring",
  },
  {
    nahuatlName: "Etzal",
    englishName: "Corn",
    days: 20,
    position: 6,
    patron: "Centeotl",
    season: "Summer",
    agricultural: "Corn ripening, first harvests begin",
  },
  {
    nahuatlName: "Tecuilhuitontli",
    englishName: "Little Feast of the Lords",
    days: 20,
    position: 7,
    patron: "Huixtocihuatl",
    season: "Summer",
    agricultural: "Salt harvesting, food preservation",
  },
  {
    nahuatlName: "Huei Tecuilhuitl",
    englishName: "Great Feast of the Lords",
    days: 20,
    position: 8,
    patron: "Xilonen",
    season: "Summer",
    agricultural: "Main corn harvest begins",
  },
  {
    nahuatlName: "Tlaxochimaco",
    englishName: "Giving of Flowers",
    days: 20,
    position: 9,
    patron: "Huitzilopochtli",
    season: "Autumn",
    agricultural: "Flower offerings, harvest celebrations",
  },
  {
    nahuatlName: "Xocotlhuetzi",
    englishName: "Fruit Falls",
    days: 20,
    position: 10,
    patron: "Toci",
    season: "Autumn",
    agricultural: "Fruit harvest, preparation for storage",
  },
  {
    nahuatlName: "Ochpaniztli",
    englishName: "Sweeping",
    days: 20,
    position: 11,
    patron: "Tlazolteotl",
    season: "Autumn",
    agricultural: "Field clearing, preparation for new cycle",
  },
  {
    nahuatlName: "Teotleco",
    englishName: "Arrival of the Gods",
    days: 20,
    position: 12,
    patron: "Tezcatlipoca",
    season: "Autumn",
    agricultural: "Harvest completion, storage preparation",
  },
  {
    nahuatlName: "Tepeilhuitl",
    englishName: "Feast of the Mountains",
    days: 20,
    position: 13,
    patron: "Tlaloc",
    season: "Winter",
    agricultural: "Mountain offerings, water conservation",
  },
  {
    nahuatlName: "Quecholli",
    englishName: "Precious Feather",
    days: 20,
    position: 14,
    patron: "Mixcoatl",
    season: "Winter",
    agricultural: "Hunting season, meat preservation",
  },
  {
    nahuatlName: "Panquetzaliztli",
    englishName: "Raising of Banners",
    days: 20,
    position: 15,
    patron: "Huitzilopochtli",
    season: "Winter",
    agricultural: "War ceremonies, protection of stores",
  },
  {
    nahuatlName: "Atemoztli",
    englishName: "Descent of Water",
    days: 20,
    position: 16,
    patron: "Tlaloc",
    season: "Winter",
    agricultural: "Water ceremonies, preparation for planting",
  },
  {
    nahuatlName: "Tititl",
    englishName: "Stretch",
    days: 20,
    position: 17,
    patron: "Ilamatecuhtli",
    season: "Winter",
    agricultural: "Final preparations, year-end ceremonies",
  },
  {
    nahuatlName: "Izcalli",
    englishName: "Sprout",
    days: 20,
    position: 18,
    patron: "Xiuhtecuhtli",
    season: "Winter",
    agricultural: "New fire ceremony, preparation for renewal",
  },
];

/**
 * The 5 nemontemi (unlucky or nameless days) at the end of the xiuhpohualli
 * These days were considered dangerous and were used for purification rituals
 */
export const nemontemi: Nemontemi[] = [
  {
    day: 1,
    name: "First Nameless Day",
    meaning: "Day of purification and reflection, avoiding important decisions",
  },
  {
    day: 2,
    name: "Second Nameless Day", 
    meaning: "Continuation of purification, fasting and prayer",
  },
  {
    day: 3,
    name: "Third Nameless Day",
    meaning: "Height of danger, protective rituals performed",
  },
  {
    day: 4,
    name: "Fourth Nameless Day",
    meaning: "Preparation for renewal, clearing away the old",
  },
  {
    day: 5,
    name: "Fifth Nameless Day",
    meaning: "Final purification, preparation for the new year",
  },
];

/**
 * Helper function to get a month by position (1-18)
 */
export function getXiuhpohualliMonth(position: number): XiuhpohualliMonth | undefined {
  if (position < 1 || position > 18) {
    return undefined;
  }
  return xiuhpohualliMonths[position - 1];
}

/**
 * Helper function to get a month by Nahuatl name
 */
export function getXiuhpohualliMonthByName(nahuatlName: string): XiuhpohualliMonth | undefined {
  return xiuhpohualliMonths.find(month => month.nahuatlName.toLowerCase() === nahuatlName.toLowerCase());
}

/**
 * Helper function to get nemontemi day by number (1-5)
 */
export function getNemontemiDay(day: number): Nemontemi | undefined {
  if (day < 1 || day > 5) {
    return undefined;
  }
  return nemontemi[day - 1];
}