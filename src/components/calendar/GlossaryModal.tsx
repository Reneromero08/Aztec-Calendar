"use client";

import { useEffect, useRef } from "react";

interface GlossaryTerm {
  term: string;
  definition: string;
  pronunciation?: string;
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Tonalpohualli",
    pronunciation: "toh-nahl-poh-WAH-lee",
    definition:
      "The 260-day sacred calendar used for divination and ritual purposes. Combines 13 numbers with 20 day signs.",
  },
  {
    term: "Xiuhpohualli",
    pronunciation: "shee-oo-poh-WAH-lee",
    definition:
      "The 365-day solar calendar used for agricultural and administrative purposes. Consists of 18 months of 20 days plus 5 nemontemi days.",
  },
  {
    term: "Trecena",
    pronunciation: "treh-SEH-nah",
    definition:
      "A 13-day period in the tonalpohualli. There are 20 trecenas in the complete 260-day cycle. Each trecena is ruled by the day sign of its first day.",
  },
  {
    term: "Day Sign",
    definition:
      "One of 20 symbols representing natural forces and phenomena. Each day in the tonalpohualli is associated with one day sign in sequence.",
  },
  {
    term: "Nemontemi",
    pronunciation: "neh-mohn-TEH-mee",
    definition:
      "The five unlucky days at the end of the xiuhpohualli year. Considered days of rest and caution, when normal activities were avoided.",
  },
  {
    term: "Calendar Round",
    definition:
      "The 52-year cycle formed by the combination of the tonalpohualli and xiuhpohualli. A specific date combination repeats only once every 18,980 days.",
  },
  {
    term: "Veintena",
    pronunciation: "vayn-TEH-nah",
    definition:
      "A 20-day month in the xiuhpohualli solar calendar. There are 18 veintenas in the year, each dedicated to specific agricultural activities and deities.",
  },
  {
    term: "Nahuatl",
    pronunciation: "NAH-waht",
    definition:
      "The language of the Aztec people. Calendar terms and day signs are traditionally referred to by their Nahuatl names.",
  },
  {
    term: "Glyph",
    definition:
      "A symbolic representation of a day sign, number, or other calendar element. Originally depicted in codices and stone carvings.",
  },
  {
    term: "Correlation Date",
    definition:
      "A known historical date used to align the Aztec calendar with the Gregorian calendar. This tool uses August 13, 1521 CE (the fall of Tenochtitlan).",
  },
];

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlossaryModal({ isOpen, onClose }: GlossaryModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="glossary-title"
    >
      <div
        ref={modalRef}
        className="flex w-full max-w-2xl max-h-[80vh] flex-col overflow-hidden rounded-2xl border border-primary-100/70 bg-[color:var(--color-surface-strong)] shadow-elevation"
        tabIndex={-1}
      >
        <div className="flex items-center justify-between border-b border-primary-100/70 bg-[color:var(--color-surface-muted)]/70 px-6 py-4">
          <h2 id="glossary-title" className="text-2xl font-semibold text-[color:var(--color-ink)]">
            <span aria-hidden className="mr-2">📖</span>
            Calendar glossary
          </h2>
          <button
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary-100/70 text-primary-700 transition-colors hover:border-primary-300 hover:bg-primary-100/70 hover:text-primary-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
            aria-label="Close glossary"
            type="button"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 overflow-y-auto px-6 py-6 text-sm text-[color:var(--color-ink-soft)]">
          <p className="text-[color:var(--color-ink-soft)]">
            Key terms and concepts related to the Aztec calendar system.
          </p>
          {glossaryTerms.map((item) => (
            <div key={item.term} className="border-b border-primary-100/70 pb-4 last:border-0 last:pb-0">
              <div className="mb-1 flex flex-wrap items-baseline gap-2">
                <h3 className="text-lg font-semibold text-[color:var(--color-ink)]">{item.term}</h3>
                {item.pronunciation && (
                  <span className="text-xs font-medium uppercase tracking-wide text-primary-700">
                    {item.pronunciation}
                  </span>
                )}
              </div>
              <p>{item.definition}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-100/70 bg-[color:var(--color-surface-muted)]/70 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
            type="button"
          >
            Close glossary
          </button>
        </div>
      </div>
    </div>
  );
}
