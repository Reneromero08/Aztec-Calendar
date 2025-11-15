/**
 * Example component demonstrating Aztec calendar functionality
 * Shows current date in both Aztec calendar systems
 */

"use client";

import { useAztecDate, useCurrentTrecena, useDaySigns } from "@/lib/aztec-calendar";

export default function AztecCalendarExample() {
  const { aztecDate, error, isLoading } = useAztecDate();
  const { trecena } = useCurrentTrecena();
  const { daySigns } = useDaySigns();

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="text-lg">Loading Aztec calendar data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!aztecDate) {
    return (
      <div className="p-6 text-center">
        <div className="text-lg">No calendar data available</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6 dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Aztec Calendar Date
        </h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          {/* Tonalpohualli (Sacred Calendar) */}
          <div className="border rounded-lg p-4 border-primary-200 bg-primary-50 dark:border-primary-800 dark:bg-primary-900/20">
            <h3 className="text-lg font-semibold mb-2 text-primary-900 dark:text-primary-100">
              Tonalpohualli (260-day Sacred Calendar)
            </h3>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p className="text-xl">
                <span className="font-bold text-2xl text-primary-600 dark:text-primary-400">
                  {aztecDate.tonalpohualli.number.value}
                </span>{" "}
                <span className="font-semibold text-lg">
                  {aztecDate.tonalpohualli.daySign.nahuatlName}
                </span>
              </p>
              <p className="text-sm italic">
                {aztecDate.tonalpohualli.daySign.englishName} ({aztecDate.tonalpohualli.daySign.glyph})
              </p>
              <p className="text-xs">
                {aztecDate.tonalpohualli.daySign.pronunciation}
              </p>
              <p className="text-sm mt-2">
                {aztecDate.tonalpohualli.daySign.meaning}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Day {aztecDate.tonalpohualli.dayCount} of 260
              </p>
            </div>
          </div>

          {/* Xiuhpohualli (Solar Calendar) */}
          <div className="border rounded-lg p-4 border-accent-200 bg-accent-50 dark:border-accent-800 dark:bg-accent-900/20">
            <h3 className="text-lg font-semibold mb-2 text-accent-900 dark:text-accent-100">
              Xiuhpohualli (365-day Solar Calendar)
            </h3>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p className="text-xl">
                <span className="font-bold text-2xl text-accent-600 dark:text-accent-400">
                  {aztecDate.xiuhpohualli.day}
                </span>{" "}
                <span className="font-semibold text-lg">
                  {aztecDate.xiuhpohualli.month.nahuatlName}
                </span>
              </p>
              <p className="text-sm italic">
                {aztecDate.xiuhpohualli.month.englishName}
              </p>
              <p className="text-sm mt-2">
                {aztecDate.xiuhpohualli.month.season && (
                  <span className="inline-block bg-accent-200 px-2 py-1 rounded text-xs font-medium text-accent-800 dark:bg-accent-800 dark:text-accent-200">
                    {aztecDate.xiuhpohualli.month.season}
                  </span>
                )}
              </p>
              {aztecDate.xiuhpohualli.isNemontemi ? (
                <div className="mt-2 p-2 bg-red-100 rounded text-red-800 dark:bg-red-900/30 dark:text-red-300">
                  <p className="text-sm font-semibold">Nemontemi Day</p>
                  <p className="text-xs">{aztecDate.xiuhpohualli.nemontemi?.meaning}</p>
                </div>
              ) : (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Day {aztecDate.xiuhpohualli.dayOfYear} of 365
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Calendar Round Information */}
        <div className="mt-4 p-4 bg-gray-100 rounded-lg dark:bg-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            Calendar Round
          </h4>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <p>Year in 52-year cycle: {aztecDate.yearInRound}</p>
            <p>Gregorian date: {aztecDate.gregorianDate.toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Current Trecena */}
      {trecena && (
        <div className="bg-white rounded-lg shadow-lg p-6 dark:bg-gray-800">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Current Trecena (13-day period)
          </h3>
          <div className="mb-4">
            <p className="text-lg">
              <span className="font-semibold">Trecena {trecena.trecenaNumber}</span> - 
              Ruled by {trecena.rulingSign.nahuatlName} ({trecena.rulingSign.englishName})
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {trecena.rulingSign.meaning}
            </p>
          </div>
          
          <div className="grid gap-2 grid-cols-7 md:grid-cols-13">
            {trecena.daysInTrecena.map((day, index) => (
              <div
                key={index}
                className="text-center p-2 border rounded text-xs border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700"
              >
                <div className="font-bold text-primary-600 dark:text-primary-400">
                  {day.number.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {day.daySign.glyph}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Day Signs Reference */}
      <div className="bg-white rounded-lg shadow-lg p-6 dark:bg-gray-800">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Day Signs Reference
        </h3>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {daySigns.map((sign) => (
            <div
              key={sign.position}
              className="p-3 border rounded text-center border-gray-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              <div className="text-lg mb-1">{sign.glyph}</div>
              <div className="font-semibold text-sm">{sign.nahuatlName}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {sign.englishName}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                {sign.position}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}