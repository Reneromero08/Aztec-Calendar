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
  const [inputValue, setInputValue] = useState(
    selectedDate.toISOString().split("T")[0]
  );

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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        📅 Date Lookup
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Enter a Gregorian date to see its Aztec calendar equivalent.
      </p>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="date-input"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Select Date
          </label>
          <div className="flex gap-2">
            <input
              id="date-input"
              type="date"
              value={inputValue}
              onChange={handleDateChange}
              min="1900-01-01"
              max="2100-12-31"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              aria-describedby={error ? "date-error" : undefined}
              aria-invalid={error ? "true" : "false"}
            />
            <button
              onClick={handleTodayClick}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
              aria-label="Set to today's date"
              type="button"
            >
              Today
            </button>
          </div>
          {error && (
            <p
              id="date-error"
              className="mt-2 text-sm text-red-600 dark:text-red-400"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>

        {aztecDate && !error && (
          <div
            className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700"
            role="region"
            aria-label="Aztec calendar conversion results"
          >
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 border-2 border-primary-200 dark:border-primary-800">
              <h4 className="text-sm font-semibold text-primary-900 dark:text-primary-100 mb-2">
                Tonalpohualli (260-day Sacred Calendar)
              </h4>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-primary-700 dark:text-primary-300">
                  {aztecDate.tonalpohualli.number.value} {aztecDate.tonalpohualli.daySign.nahuatlName}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">
                    {aztecDate.tonalpohualli.daySign.englishName}
                  </span>{" "}
                  <span className="text-lg">{aztecDate.tonalpohualli.daySign.glyph}</span>
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {aztecDate.tonalpohualli.daySign.meaning}
                </p>
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Day:</span>{" "}
                    <span className="font-medium text-gray-900 dark:text-white">
                      {aztecDate.tonalpohualli.dayCount} of 260
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Number:</span>{" "}
                    <span className="font-medium text-gray-900 dark:text-white">
                      {aztecDate.tonalpohualli.number.nahuatlName}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Direction:</span>{" "}
                    <span className="font-medium text-gray-900 dark:text-white">
                      {aztecDate.tonalpohualli.daySign.direction || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Deity:</span>{" "}
                    <span className="font-medium text-gray-900 dark:text-white">
                      {aztecDate.tonalpohualli.daySign.deity || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-accent-50 dark:bg-accent-900/20 rounded-lg p-4 border-2 border-accent-200 dark:border-accent-800">
              <h4 className="text-sm font-semibold text-accent-900 dark:text-accent-100 mb-2">
                Xiuhpohualli (365-day Solar Calendar)
              </h4>
              <div className="space-y-2">
                {aztecDate.xiuhpohualli.isNemontemi ? (
                  <>
                    <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                      Nemontemi Day {aztecDate.xiuhpohualli.day - 20}
                    </p>
                    <div className="bg-red-100 dark:bg-red-900/30 rounded p-2">
                      <p className="text-xs text-red-800 dark:text-red-200">
                        <span className="font-semibold">Unlucky Days:</span>{" "}
                        {aztecDate.xiuhpohualli.nemontemi?.meaning}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-2xl font-bold text-accent-700 dark:text-accent-300">
                      {aztecDate.xiuhpohualli.day} {aztecDate.xiuhpohualli.month.nahuatlName}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">
                        {aztecDate.xiuhpohualli.month.englishName}
                      </span>
                    </p>
                    {aztecDate.xiuhpohualli.month.season && (
                      <p className="text-xs">
                        <span className="inline-block bg-accent-200 dark:bg-accent-800 px-2 py-1 rounded text-accent-800 dark:text-accent-200">
                          {aztecDate.xiuhpohualli.month.season}
                        </span>
                      </p>
                    )}
                    <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Day of Year:</span>{" "}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {aztecDate.xiuhpohualli.dayOfYear} of 365
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Month:</span>{" "}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {aztecDate.xiuhpohualli.month.position} of 18
                        </span>
                      </div>
                      {aztecDate.xiuhpohualli.month.patron && (
                        <div className="col-span-2">
                          <span className="text-gray-500 dark:text-gray-400">Patron:</span>{" "}
                          <span className="font-medium text-gray-900 dark:text-white">
                            {aztecDate.xiuhpohualli.month.patron}
                          </span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">Calendar Round Year:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {aztecDate.yearInRound} of 52
                </span>
              </div>
              <div className="flex justify-between items-center text-sm mt-1">
                <span className="text-gray-600 dark:text-gray-400">Gregorian:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {selectedDate.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
