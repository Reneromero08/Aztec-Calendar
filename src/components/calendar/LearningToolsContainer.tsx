"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useAztecDate, useCurrentTrecena, validateDate } from "@/lib/aztec-calendar";
import DateLookupForm from "./DateLookupForm";
import CycleNavigator from "./CycleNavigator";
import GlossaryModal from "./GlossaryModal";
import TooltipWrapper from "./TooltipWrapper";

const AztecCalendarWheel = dynamic(() => import("@/app/calendar/aztec-calendar-wheel"), {
  ssr: false,
  loading: () => (
    <div
      role="status"
      className="grid h-72 place-items-center rounded-2xl border border-primary-100/70 bg-white text-sm text-[color:var(--color-ink-soft)]"
      aria-live="polite"
    >
      <span className="animate-pulse">Loading calendar wheel…</span>
    </div>
  ),
});

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

  const handleValidationError = useCallback((incomingError: string | null) => {
    setValidationError(incomingError);
  }, []);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 rounded-2xl border border-primary-100/70 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-[color:var(--color-ink)]">Learning tools</h2>
          <p className="text-sm text-[color:var(--color-ink-soft)]">
            Explore responsive utilities for understanding the tonalpohualli and xiuhpohualli calendars.
          </p>
        </div>
        <button
          onClick={() => setIsGlossaryOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
          aria-label="Open glossary"
          type="button"
        >
          <span aria-hidden>📖</span>
          Glossary
        </button>
      </div>

      <div className="rounded-2xl border border-accent-100/70 bg-accent-50/80 p-4 text-sm text-[color:var(--color-ink)]">
        <p>
          <span className="font-semibold text-primary-700">Tip:</span> Hover over underlined
          {" "}
          <TooltipWrapper content="Glossary terms reveal succinct descriptions when focused or hovered.">
            terms
          </TooltipWrapper>{" "}
          to learn more. The glossary button reveals extended definitions with keyboard navigation support.
        </p>
      </div>

      <DateLookupForm
        selectedDate={selectedDate}
        aztecDate={aztecDate}
        error={error}
        onDateChange={handleDateChange}
        onValidationError={handleValidationError}
      />

      <div className="rounded-2xl border border-primary-100/70 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-[color:var(--color-ink)]">Calendar visualisation</h3>
        <p className="mt-2 text-sm text-[color:var(--color-ink-soft)]">
          The
          {" "}
          <TooltipWrapper content="Interactive circular diagram showing relationships between day signs, numbers, and months.">
            calendar wheel
          </TooltipWrapper>{" "}
          responds instantly when you change dates. Select a segment to surface contextual details.
        </p>
        <div className="mt-5">
          <AztecCalendarWheel selectedDate={selectedDate} aztecDate={aztecDate} />
        </div>
      </div>

      <CycleNavigator
        currentDate={selectedDate}
        aztecDate={aztecDate}
        trecena={trecena}
        onDateChange={handleDateChange}
        onValidationError={handleValidationError}
      />

      <div className="rounded-2xl border border-primary-100/70 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-[color:var(--color-ink)]">Want to keep learning?</h3>
        <p className="mt-2 text-sm text-[color:var(--color-ink-soft)]">
          Dive into the comprehensive guide to understand the cultural significance of the
          {" "}
          <TooltipWrapper content="The 260-day sacred calendar used for ceremony and divination.">
            tonalpohualli
          </TooltipWrapper>
          {" "}
          and the
          {" "}
          <TooltipWrapper content="The 365-day solar calendar used for agricultural and civic planning.">
            xiuhpohualli
          </TooltipWrapper>
          {" "}
          calendars, complete with pronunciation notes and seasonal context.
        </p>
        <Link
          href="/guide/aztec-calendar"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
        >
          View full guide
          <span aria-hidden>→</span>
        </Link>
      </div>

      <GlossaryModal isOpen={isGlossaryOpen} onClose={() => setIsGlossaryOpen(false)} />
    </div>
  );
}
