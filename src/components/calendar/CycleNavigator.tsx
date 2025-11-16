"use client";

import { useMemo } from "react";
import {
  daySigns,
  validateDate,
  type AztecDate,
  type Trecena,
  type TonalpohualliDate,
} from "@/lib/aztec-calendar";

interface CycleNavigatorProps {
  currentDate: Date;
  aztecDate: AztecDate | null;
  trecena: Trecena | null;
  onDateChange: (date: Date) => void;
  onValidationError: (message: string | null) => void;
}

function getTrecenaStartDayCount(trecenaNumber: number): number {
  return (trecenaNumber - 1) * 13 + 1;
}

function getTrecenaNumberFromDayCount(dayCount: number): number {
  return Math.floor((dayCount - 1) / 13) + 1;
}

function getRulingSignForTrecena(trecenaNumber: number) {
  const startDayCount = getTrecenaStartDayCount(trecenaNumber);
  const position = ((startDayCount - 1) % 20) + 1;
  return daySigns[position - 1];
}

function calculateDateOffset(baseDate: Date, days: number): Date {
  const nextDate = new Date(baseDate);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

export default function CycleNavigator({
  currentDate,
  aztecDate,
  trecena,
  onDateChange,
  onValidationError,
}: CycleNavigatorProps) {
  const currentTrecenaNumber = useMemo(() => {
    if (!aztecDate) return null;
    return getTrecenaNumberFromDayCount(aztecDate.tonalpohualli.dayCount);
  }, [aztecDate]);

  const attemptDateChange = (date: Date) => {
    const validation = validateDate(date);

    if (!validation.isValid) {
      onValidationError(validation.error || "Invalid date");
      return;
    }

    onValidationError(null);
    onDateChange(date);
  };

  const handlePreviousDay = () => {
    attemptDateChange(calculateDateOffset(currentDate, -1));
  };

  const handleNextDay = () => {
    attemptDateChange(calculateDateOffset(currentDate, 1));
  };

  const handleJumpDays = (days: number) => {
    attemptDateChange(calculateDateOffset(currentDate, days));
  };

  const handleJumpToTrecena = (trecenaNumber: number) => {
    if (!aztecDate) return;

    const currentStart = getTrecenaStartDayCount(
      getTrecenaNumberFromDayCount(aztecDate.tonalpohualli.dayCount)
    );
    const targetStart = getTrecenaStartDayCount(trecenaNumber);

    let difference = targetStart - currentStart;
    if (difference > 130) difference -= 260;
    if (difference < -130) difference += 260;

    attemptDateChange(calculateDateOffset(currentDate, difference));
  };

  const handleSelectTrecenaDay = (day: TonalpohualliDate) => {
    if (!aztecDate) return;

    const difference = day.dayCount - aztecDate.tonalpohualli.dayCount;
    attemptDateChange(calculateDateOffset(currentDate, difference));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        🔄 Cycle Navigation
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Explore the Aztec calendar day by day or jump across trecenas.
      </p>

      <div className="space-y-6">
        {/* Day Navigation */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Day by Day
          </h4>
          <div className="flex gap-2">
            <button
              onClick={handlePreviousDay}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
              aria-label="Go to previous day"
            >
              ← Previous Day
            </button>
            <button
              onClick={handleNextDay}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
              aria-label="Go to next day"
            >
              Next Day →
            </button>
          </div>
        </div>

        {/* Quick Jump */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Quick Jump
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {[-7, -30, -260, 7, 30, 260].map((days) => (
              <button
                key={days}
                onClick={() => handleJumpDays(days)}
                className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label={`Jump ${days > 0 ? `forward ${days}` : `back ${Math.abs(days)}`} days`}
              >
                {days > 0 ? `+${days} days` : `${days} days`}
              </button>
            ))}
          </div>
        </div>

        {/* Trecena Selector */}
        {currentTrecenaNumber && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Trecena Selector
            </h4>
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-3 mb-3">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">Current Trecena:</span> {currentTrecenaNumber} of 20
              </p>
              {trecena && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Ruled by {trecena.rulingSign.nahuatlName} ({trecena.rulingSign.englishName} {trecena.rulingSign.glyph})
                </p>
              )}
            </div>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 20 }).map((_, index) => {
                const number = index + 1;
                const rulingSign = getRulingSignForTrecena(number);
                const isCurrent = currentTrecenaNumber === number;

                return (
                  <button
                    key={number}
                    onClick={() => handleJumpToTrecena(number)}
                    disabled={isCurrent}
                    className={`
                      px-3 py-2 text-sm rounded-lg transition-colors
                      ${
                        isCurrent
                          ? "bg-primary-600 text-white cursor-default"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30"
                      }
                    `}
                    aria-label={`Jump to trecena ${number}, ruled by ${rulingSign.nahuatlName}`}
                    aria-current={isCurrent ? "true" : undefined}
                    title={`Trecena ${number}: ${rulingSign.nahuatlName} (${rulingSign.englishName})`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="font-bold">{number}</span>
                      <span className="text-xs">{rulingSign.glyph}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              Each trecena spans 13 days. Jumping selects the first day of the chosen trecena.
            </p>
          </div>
        )}

        {/* Current Trecena Days */}
        {trecena && aztecDate && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Days in Current Trecena
            </h4>
            <div className="grid grid-cols-7 sm:grid-cols-13 gap-1">
              {trecena.daysInTrecena.map((day, index) => {
                const isCurrent = day.dayCount === aztecDate.tonalpohualli.dayCount;

                return (
                  <button
                    key={`${day.dayCount}-${index}`}
                    onClick={() => handleSelectTrecenaDay(day)}
                    className={`
                      text-center p-2 border rounded text-xs transition-colors
                      ${
                        isCurrent
                          ? "border-primary-500 bg-primary-100 dark:bg-primary-900/40 text-primary-900 dark:text-primary-100"
                          : "border-gray-200 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                      }
                    `}
                    aria-pressed={isCurrent}
                    aria-label={`Select ${day.number.value} ${day.daySign.nahuatlName}`}
                  >
                    <div className="font-bold">
                      {day.number.value}
                    </div>
                    <div>{day.daySign.glyph}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
