/**
 * Authoritative data for the 20 day signs of the Aztec tonalpohualli
 * Each day sign has rich symbolism and associations in Aztec cosmology
 */

import type { DaySign } from "./types";

/**
 * The 20 day signs of the tonalpohualli (260-day sacred calendar)
 * Data sourced from academic research on Aztec calendar systems
 * Primary sources: Codex Borbonicus, Codex Magliabechiano, and anthropological studies
 */
export const daySigns: DaySign[] = [
  {
    nahuatlName: "Cipactli",
    englishName: "Crocodile",
    glyph: "🐊",
    pronunciation: "see-PAK-tlee",
    meaning: "The earth monster, primordial being associated with fertility and the earth's surface",
    position: 1,
    direction: "East",
    deity: "Tonacatecuhtli",
  },
  {
    nahuatlName: "Ehecatl",
    englishName: "Wind",
    glyph: "💨",
    pronunciation: "eh-HEH-katl",
    meaning: "The life-giving wind, breath of life, communication and movement",
    position: 2,
    direction: "North",
    deity: "Quetzalcoatl",
  },
  {
    nahuatlName: "Calli",
    englishName: "House",
    glyph: "🏠",
    pronunciation: "KAH-yee",
    meaning: "The home, sanctuary, protection, family and community",
    position: 3,
    direction: "West",
    deity: "Tepeyollotl",
  },
  {
    nahuatlName: "Cuetzpalin",
    englishName: "Lizard",
    glyph: "🦎",
    pronunciation: "kwehts-PAH-leen",
    meaning: "Adaptation, regeneration, speed and survival instincts",
    position: 4,
    direction: "South",
    deity: "Huehuecoyotl",
  },
  {
    nahuatlName: "Coatl",
    englishName: "Serpent",
    glyph: "🐍",
    pronunciation: "KOH-ahtl",
    meaning: "Wisdom, transformation, duality, connection between earth and sky",
    position: 5,
    direction: "East",
    deity: "Chalchiuhtlicue",
  },
  {
    nahuatlName: "Miquiztli",
    englishName: "Death",
    glyph: "💀",
    pronunciation: "mee-KEEZ-tlee",
    meaning: "Transformation, endings, ancestors, the cycle of life and death",
    position: 6,
    direction: "North",
    deity: "Tecciztecatl",
  },
  {
    nahuatlName: "Mazatl",
    englishName: "Deer",
    glyph: "🦌",
    pronunciation: "mah-ZAHTL",
    meaning: "Gentleness, grace, alertness, connection to nature and hunting",
    position: 7,
    direction: "West",
    deity: "Tlaloc",
  },
  {
    nahuatlName: "Tochtli",
    englishName: "Rabbit",
    glyph: "🐰",
    pronunciation: "TOCH-tlee",
    meaning: "Fertility, abundance, playfulness, lunar associations",
    position: 8,
    direction: "South",
    deity: "Mayahuel",
  },
  {
    nahuatlName: "Atl",
    englishName: "Water",
    glyph: "💧",
    pronunciation: "AHTL",
    meaning: "Purification, emotion, healing, life-giving properties",
    position: 9,
    direction: "East",
    deity: "Xiuhtecuhtli",
  },
  {
    nahuatlName: "Itzcuintli",
    englishName: "Dog",
    glyph: "🐕",
    pronunciation: "eets-KOINT-lee",
    meaning: "Loyalty, companionship, guidance through the underworld",
    position: 10,
    direction: "North",
    deity: "Mictlantecuhtli",
  },
  {
    nahuatlName: "Ozomatli",
    englishName: "Monkey",
    glyph: "🐵",
    pronunciation: "oh-soh-MAHT-lee",
    meaning: "Playfulness, creativity, intelligence, trickster energy",
    position: 11,
    direction: "West",
    deity: "Xochipilli",
  },
  {
    nahuatlName: "Malinalli",
    englishName: "Grass",
    glyph: "🌾",
    pronunciation: "mah-lee-NAH-yee",
    meaning: "Perseverance, flexibility, growth, connection to agriculture",
    position: 12,
    direction: "South",
    deity: "Patecatl",
  },
  {
    nahuatlName: "Acatl",
    englishName: "Reed",
    glyph: "🎋",
    pronunciation: "ah-KAHTL",
    meaning: "Knowledge, communication, authority, writing and scholarship",
    position: 13,
    direction: "East",
    deity: "Tezcatlipoca",
  },
  {
    nahuatlName: "Ocelotl",
    englishName: "Jaguar",
    glyph: "🐆",
    pronunciation: "oh-seh-KOHTL",
    meaning: "Power, courage, nocturnal strength, warrior spirit",
    position: 14,
    direction: "North",
    deity: "Tlazolteotl",
  },
  {
    nahuatlName: "Quauhtli",
    englishName: "Eagle",
    glyph: "🦅",
    pronunciation: "KWAH-htlee",
    meaning: "Vision, freedom, spiritual connection, highest aspirations",
    position: 15,
    direction: "West",
    deity: "Xipe Totec",
  },
  {
    nahuatlName: "Cozcaquauhtli",
    englishName: "Buzzard",
    glyph: "🦅",
    pronunciation: "kohs-kah-KWAH-htlee",
    meaning: "Purification, transformation, clearing away what is no longer needed",
    position: 16,
    direction: "South",
    deity: "Itzpapalotl",
  },
  {
    nahuatlName: "Ollin",
    englishName: "Movement",
    glyph: "🌀",
    pronunciation: "OH-leen",
    meaning: "Change, evolution, cosmic movement, earthquakes and transformation",
    position: 17,
    direction: "East",
    deity: "Xolotl",
  },
  {
    nahuatlName: "Tecpatl",
    englishName: "Flint",
    glyph: "🔪",
    pronunciation: "tek-PAHTL",
    meaning: "Divine communication, sacrifice, technology, cutting through illusion",
    position: 18,
    direction: "North",
    deity: "Chalchiuhtotolin",
  },
  {
    nahuatlName: "Quiahuitl",
    englishName: "Rain",
    glyph: "🌧️",
    pronunciation: "kee-ah-WEETL",
    meaning: "Blessing, purification, emotional release, agricultural abundance",
    position: 19,
    direction: "West",
    deity: "Tonatiuh",
  },
  {
    nahuatlName: "Xochitl",
    englishName: "Flower",
    glyph: "🌸",
    pronunciation: "SHO-cheetl",
    meaning: "Beauty, creativity, pleasure, the flowering of consciousness",
    position: 20,
    direction: "South",
    deity: "Xochiquetzal",
  },
];

/**
 * Helper function to get a day sign by position (1-20)
 */
export function getDaySignByPosition(position: number): DaySign | undefined {
  if (position < 1 || position > 20) {
    return undefined;
  }
  return daySigns[position - 1];
}

/**
 * Helper function to get a day sign by Nahuatl name
 */
export function getDaySignByName(nahuatlName: string): DaySign | undefined {
  return daySigns.find(sign => sign.nahuatlName.toLowerCase() === nahuatlName.toLowerCase());
}

/**
 * Helper function to get a day sign by English name
 */
export function getDaySignByEnglishName(englishName: string): DaySign | undefined {
  return daySigns.find(sign => sign.englishName.toLowerCase() === englishName.toLowerCase());
}