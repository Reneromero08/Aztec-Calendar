/**
 * Data for the 13 numbers of the Aztec tonalpohualli
 * These numbers cycle continuously through the 20 day signs
 */

import type { TonalpohualliNumber } from "./types";

/**
 * The 13 numbers of the tonalpohualli sacred calendar
 * Each number carries specific symbolic meaning and associations
 */
export const tonalpohualliNumbers: TonalpohualliNumber[] = [
  {
    value: 1,
    nahuatlName: "Ce",
    meaning: "Beginning, unity, initiation, the start of all things",
    gender: "masculine",
  },
  {
    value: 2,
    nahuatlName: "Ome",
    meaning: "Duality, balance, partnership, the cosmic principle of twoness",
    gender: "feminine",
  },
  {
    value: 3,
    nahuatlName: "Yei",
    meaning: "Creation, harmony, the triad of earth, water, and sky",
    gender: "masculine",
  },
  {
    value: 4,
    nahuatlName: "Nahui",
    meaning: "Stability, foundation, the four cardinal directions, completeness",
    gender: "feminine",
  },
  {
    value: 5,
    nahuatlName: "Macuilli",
    meaning: "Center, balance, the fifth direction (up/down), human connection",
    gender: "masculine",
  },
  {
    value: 6,
    nahuatlName: "Chicuace",
    meaning: "Movement, change, the principle of flux and transformation",
    gender: "feminine",
  },
  {
    value: 7,
    nahuatlName: "Chicome",
    meaning: "Mysticism, spirituality, the sacred number of cosmic connection",
    gender: "masculine",
  },
  {
    value: 8,
    nahuatlName: "Chicuei",
    meaning: "Abundance, material manifestation, earthly completion",
    gender: "feminine",
  },
  {
    value: 9,
    nahuatlName: "Chicnahui",
    meaning: "Divine completion, lunar cycles, emotional wisdom",
    gender: "masculine",
  },
  {
    value: 10,
    nahuatlName: "Matlactli",
    meaning: "Perfection, human completion, the sum of fingers and toes",
    gender: "feminine",
  },
  {
    value: 11,
    nahuatlName: "Matlactli huan ce",
    meaning: "Transcendence, spiritual mastery, beyond the physical",
    gender: "masculine",
  },
  {
    value: 12,
    nahuatlName: "Matlactli huan ome",
    meaning: "Cosmic order, universal harmony, the cycle of time",
    gender: "feminine",
  },
  {
    value: 13,
    nahuatlName: "Matlactli huan yei",
    meaning: "Divine completeness, highest spiritual attainment, cosmic consciousness",
    gender: "masculine",
  },
];

/**
 * Helper function to get a number by value (1-13)
 */
export function getTonalpohualliNumber(value: number): TonalpohualliNumber | undefined {
  if (value < 1 || value > 13) {
    return undefined;
  }
  return tonalpohualliNumbers[value - 1];
}

/**
 * Helper function to get a number by Nahuatl name
 */
export function getTonalpohualliNumberByName(nahuatlName: string): TonalpohualliNumber | undefined {
  return tonalpohualliNumbers.find(num => num.nahuatlName.toLowerCase() === nahuatlName.toLowerCase());
}