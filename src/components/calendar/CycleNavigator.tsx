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
    <div className="space-y-8 rounded-2xl border border-primary-100/70 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-[color:var(--color-ink)]">Cycle navigation</h3>
        <p className="text-sm text-[color:var(--color-ink-soft)]">
          Move through the calendar day by day, jump across trecenas, or select sacred pairings from the current cycle.
        </p>
      </div>

      <div className="space-y-6">
        <section aria-label="Day by day navigation" className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-primary-700">Day by day</h4>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handlePreviousDay}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
              aria-label="Go to previous day"
              type="button"
            >
              ← Previous day
            </button>
            <button
              onClick={handleNextDay}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
              aria-label="Go to next day"
              type="button"
            >
              Next day →
            </button>
          </div>
        </section>

        <section aria-label="Quick jumps" className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-primary-700">Quick jump</h4>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {[-7, -30, -260, 7, 30, 260].map((days) => (
              <button
                key={days}
                onClick={() => handleJumpDays(days)}
                className="rounded-full border border-primary-100/70 bg-white px-3 py-2 text-sm font-semibold text-primary-700 transition-colors hover:border-primary-300 hover:bg-primary-100/70 hover:text-primary-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
                aria-label={`Jump ${days > 0 ? `forward ${days}` : `back ${Math.abs(days)}`} days`}
                type="button"
              >
                {days > 0 ? `+${days}` : days} days
              </button>
            ))}
          </div>
        </section>

        {currentTrecenaNumber && (
          <section aria-label="Trecena selector" className="space-y-4">
            <div className="space-y-1 rounded-2xl border border-primary-100/70 bg-primary-50/60 p-4">
              <p className="text-sm text-[color:var(--color-ink)]">
                <span className="font-semibold text-primary-800">Current trecena:</span> {currentTrecenaNumber} of 20
              </p>
              {trecena && (
                <p className="text-xs text-[color:var(--color-ink-soft)]">
                  Ruled by {trecena.rulingSign.nahuatlName} ({trecena.rulingSign.englishName}{" "}
                  {trecena.rulingSign.glyph})
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
                    className={`rounded-xl border px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)] ${
                      isCurrent
                        ? "border-primary-500 bg-primary-600 text-white"
                        : "border-primary-100/70 bg-white text-primary-700 hover:border-primary-300 hover:bg-primary-100/70 hover:text-primary-900"
                    }`}
                    aria-label={`Jump to trecena ${number}, ruled by ${rulingSign.nahuatlName}`}
                    aria-current={isCurrent ? "true" : undefined}
                    title={`Trecena ${number}: ${rulingSign.nahuatlName} (${rulingSign.englishName})`}
                    type="button"
                  >
                    <div className="flex flex-col items-center">
                      <span>{number}</span>
                      <span className="text-xs" aria-hidden>
                        {rulingSign.glyph}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-[color:var(--color-ink-soft)] text-center">
              Each trecena spans 13 days. Jumping selects the first day of the chosen trecena.
            </p>
          </section>
        )}

        {trecena && aztecDate && (
          <section aria-label="Days in current trecena" className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-primary-700">
              Days in current trecena
            </h4>
            <div className="grid grid-cols-5 gap-1 sm:grid-cols-13">
              {trecena.daysInTrecena.map((day, index) => {
                const isCurrent = day.dayCount === aztecDate.tonalpohualli.dayCount;

                return (
                  <button
                    key={`${day.dayCount}-${index}`}
                    onClick={() => handleSelectTrecenaDay(day)}
                    className={`rounded-lg border px-2 py-2 text-center text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)] ${
                      isCurrent
                        ? "border-primary-500 bg-primary-100 text-primary-900"
                        : "border-primary-100/70 bg-white text-primary-700 hover:border-primary-300 hover:bg-primary-100/70"
                    }`}
                    aria-pressed={isCurrent}
                    aria-label={`Select ${day.number.value} ${day.daySign.nahuatlName}`}
                    type="button"
                  >
                    <div className="font-semibold">{day.number.value}</div>
                    <div aria-hidden>{day.daySign.glyph}</div>
                  </button>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
