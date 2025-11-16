"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useAztecDate, useCurrentTrecena, validateDate } from "@/lib/aztec-calendar";
import DateLookupForm from "./DateLookupForm";
import CycleNavigator from "./CycleNavigator";
import GlossaryModal from "./GlossaryModal";
import TooltipWrapper from "./TooltipWrapper";
import AztecCalendarWheel from "@/app/calendar/aztec-calendar-wheel";

export default function LearningToolsContainer() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  const { aztecDate, error: conversionError } = useAztecDate(selectedDate);
  const { trecena } = useCurrentTrecena(selectedDate);

  const error = validationError || conversionError;

  const handleDateChange = useCallback((date: Date) => {
    const validation = validateDate(date);
    if (validation.isValid) {
      setSelectedDate(date);
      setValidationError(null);
    } else {
      setValidationError(validation.error || "Invalid date");
    }
  }, []);

  const handleValidationError = useCallback((error: string | null) => {
    setValidationError(error);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header with Glossary Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Learning Tools
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Explore the Aztec calendar with interactive tools and explanations
          </p>
        </div>
        <button
          onClick={() => setIsGlossaryOpen(true)}
          className="px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 transition-colors"
          aria-label="Open glossary"
        >
          📖 Glossary
        </button>
      </div>

      {/* Tooltips Guide */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <p className="text-sm text-amber-900 dark:text-amber-100">
          <span className="font-semibold">💡 Tip:</span> Hover over underlined{" "}
          <TooltipWrapper content="This is an example tooltip explaining a term or concept.">
            terms
          </TooltipWrapper>{" "}
          to see definitions. Click the Glossary button above for a complete reference of calendar
          terminology.
        </p>
      </div>

      {/* Date Lookup Form */}
      <DateLookupForm
        selectedDate={selectedDate}
        aztecDate={aztecDate}
        error={error}
        onDateChange={handleDateChange}
        onValidationError={handleValidationError}
      />

      {/* Calendar Visualization */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          🌞 Calendar Visualization
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          The{" "}
          <TooltipWrapper content="Interactive circular diagram showing the relationships between day signs, numbers, and months.">
            calendar wheel
          </TooltipWrapper>{" "}
          updates automatically as you change dates. Click segments to learn more about each
          calendar element.
        </p>
        <AztecCalendarWheel selectedDate={selectedDate} aztecDate={aztecDate} />
      </div>

      {/* Cycle Navigator */}
      <CycleNavigator
        currentDate={selectedDate}
        aztecDate={aztecDate}
        trecena={trecena}
        onDateChange={handleDateChange}
        onValidationError={handleValidationError}
      />

      {/* Learn More Section */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-lg border-2 border-primary-200 dark:border-primary-800 p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          📚 Want to Learn More?
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Explore our comprehensive guide to understand the cultural significance and deeper
          meanings of the{" "}
          <TooltipWrapper content="The 260-day sacred calendar used for divination and ritual purposes.">
            tonalpohualli
          </TooltipWrapper>{" "}
          and{" "}
          <TooltipWrapper content="The 365-day solar calendar used for agricultural and administrative purposes.">
            xiuhpohualli
          </TooltipWrapper>{" "}
          calendars.
        </p>
        <Link
          href="/guide/aztec-calendar"
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
        >
          View Full Guide →
        </Link>
      </div>

      {/* Glossary Modal */}
      <GlossaryModal isOpen={isGlossaryOpen} onClose={() => setIsGlossaryOpen(false)} />
    </div>
  );
}
