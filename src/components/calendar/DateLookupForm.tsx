"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import type { AztecDate } from "@/lib/aztec-calendar";

interface DateLookupFormProps {
  selectedDate: Date;
  aztecDate: AztecDate | null;
  error: string | null;
  onDateChange: (date: Date) => void;
  onValidationError: (error: string | null) => void;
}

export default function DateLookupForm({
  selectedDate,
  aztecDate,
  error,
  onDateChange,
  onValidationError,
}: DateLookupFormProps) {
  const [inputValue, setInputValue] = useState(selectedDate.toISOString().split("T")[0]);

  useEffect(() => {
    const nextValue = selectedDate.toISOString().split("T")[0];
    setInputValue(nextValue);
  }, [selectedDate]);

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (!value) {
      onValidationError("Please enter a date");
      return;
    }

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
      onValidationError("Invalid date format");
      return;
    }

    onValidationError(null);
    onDateChange(parsedDate);
  };

  const handleTodayClick = () => {
    const today = new Date();
    onValidationError(null);
    onDateChange(today);
  };

  return (
    <div className="rounded-2xl border border-primary-100/70 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-[color:var(--color-ink)]">Date lookup</h3>
      <p className="mt-2 text-sm text-[color:var(--color-ink-soft)]">
        Enter a Gregorian date to discover its Aztec calendar equivalent.
      </p>

      <div className="mt-5 space-y-4">
        <div className="space-y-2">
          <label htmlFor="date-input" className="block text-sm font-semibold text-[color:var(--color-ink)]">
            Select date
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="date-input"
              type="date"
              value={inputValue}
              onChange={handleDateChange}
              min="1900-01-01"
              max="2100-12-31"
              className="w-full flex-1 rounded-full border border-primary-100/70 bg-white px-4 py-2 text-sm text-[color:var(--color-ink)] transition-shadow focus:border-primary-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
              aria-describedby={error ? "date-error" : undefined}
              aria-invalid={error ? "true" : "false"}
            />
            <button
              onClick={handleTodayClick}
              className="inline-flex items-center justify-center rounded-full border border-primary-200 px-5 py-2 text-sm font-semibold text-primary-700 transition-colors hover:border-primary-300 hover:bg-primary-100/60 hover:text-primary-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
              aria-label="Set to today's date"
              type="button"
            >
              Today
            </button>
          </div>
          {error && (
            <p id="date-error" className="text-sm text-secondary-600" role="alert">
              {error}
            </p>
          )}
        </div>

        {aztecDate && !error && (
          <div
            className="space-y-5 rounded-2xl border border-primary-100/70 bg-primary-50/60 p-5"
            role="region"
            aria-label="Aztec calendar conversion results"
          >
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-primary-700">
                Tonalpohualli (260-day sacred calendar)
              </h4>
              <p className="text-2xl font-semibold text-primary-800">
                {aztecDate.tonalpohualli.number.value} {aztecDate.tonalpohualli.daySign.nahuatlName}
              </p>
              <p className="text-sm text-[color:var(--color-ink-soft)]">
                <span className="font-medium text-[color:var(--color-ink)]">
                  {aztecDate.tonalpohualli.daySign.englishName}
                </span>{" "}
                <span className="text-lg" aria-hidden>
                  {aztecDate.tonalpohualli.daySign.glyph}
                </span>
              </p>
              <p className="text-xs text-[color:var(--color-ink-soft)]">
                {aztecDate.tonalpohualli.daySign.meaning}
              </p>
              <dl className="grid gap-2 text-xs sm:grid-cols-2">
                <div>
                  <dt className="text-[color:var(--color-ink-soft)]">Day</dt>
                  <dd className="font-semibold text-[color:var(--color-ink)]">
                    {aztecDate.tonalpohualli.dayCount} of 260
                  </dd>
                </div>
                <div>
                  <dt className="text-[color:var(--color-ink-soft)]">Number</dt>
                  <dd className="font-semibold text-[color:var(--color-ink)]">
                    {aztecDate.tonalpohualli.number.nahuatlName}
                  </dd>
                </div>
                <div>
                  <dt className="text-[color:var(--color-ink-soft)]">Direction</dt>
                  <dd className="font-semibold text-[color:var(--color-ink)]">
                    {aztecDate.tonalpohualli.daySign.direction || "N/A"}
                  </dd>
                </div>
                <div>
                  <dt className="text-[color:var(--color-ink-soft)]">Deity</dt>
                  <dd className="font-semibold text-[color:var(--color-ink)]">
                    {aztecDate.tonalpohualli.daySign.deity || "N/A"}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-accent-100/80 bg-accent-50/80 p-4">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-accent-700">
                Xiuhpohualli (365-day solar calendar)
              </h4>
              <div className="mt-3 space-y-2 text-sm">
                {aztecDate.xiuhpohualli.isNemontemi ? (
                  <div className="space-y-2">
                    <p className="text-2xl font-semibold text-secondary-700">
                      Nemontemi Day {aztecDate.xiuhpohualli.day - 20}
                    </p>
                    <div className="rounded-lg border border-secondary-200 bg-secondary-50/80 p-3 text-xs text-secondary-900">
                      <span className="font-semibold">Unlucky days:</span> {aztecDate.xiuhpohualli.nemontemi?.meaning}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-2xl font-semibold text-accent-800">
                      {aztecDate.xiuhpohualli.day} {aztecDate.xiuhpohualli.month.nahuatlName}
                    </p>
                    <p className="text-[color:var(--color-ink-soft)]">
                      <span className="font-medium text-[color:var(--color-ink)]">
                        {aztecDate.xiuhpohualli.month.englishName}
                      </span>
                    </p>
                    {aztecDate.xiuhpohualli.month.season && (
                      <span className="inline-flex items-center rounded-full bg-accent-200/70 px-3 py-1 text-xs font-semibold text-accent-900">
                        {aztecDate.xiuhpohualli.month.season}
                      </span>
                    )}
                    <dl className="grid gap-2 text-xs sm:grid-cols-2">
                      <div>
                        <dt className="text-[color:var(--color-ink-soft)]">Day of year</dt>
                        <dd className="font-semibold text-[color:var(--color-ink)]">
                          {aztecDate.xiuhpohualli.dayOfYear} of 365
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[color:var(--color-ink-soft)]">Month</dt>
                        <dd className="font-semibold text-[color:var(--color-ink)]">
                          {aztecDate.xiuhpohualli.month.position} of 18
                        </dd>
                      </div>
                      {aztecDate.xiuhpohualli.month.patron && (
                        <div className="sm:col-span-2">
                          <dt className="text-[color:var(--color-ink-soft)]">Patron</dt>
                          <dd className="font-semibold text-[color:var(--color-ink)]">
                            {aztecDate.xiuhpohualli.month.patron}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-primary-100/60 bg-white/80 p-4 text-xs text-[color:var(--color-ink-soft)]">
              <div className="flex items-center justify-between">
                <span>Calendar round year</span>
                <span className="font-semibold text-[color:var(--color-ink)]">
                  {aztecDate.yearInRound} of 52
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span>Gregorian date</span>
                <time className="font-semibold text-[color:var(--color-ink)]">
                  {selectedDate.toLocaleDateString()}
                </time>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
