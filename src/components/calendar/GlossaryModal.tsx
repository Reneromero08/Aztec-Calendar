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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="glossary-title"
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
        tabIndex={-1}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2
            id="glossary-title"
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            📖 Calendar Glossary
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close glossary"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Key terms and concepts related to the Aztec calendar system.
          </p>

          {glossaryTerms.map((item, index) => (
            <div
              key={index}
              className="pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
            >
              <div className="flex items-baseline gap-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.term}
                </h3>
                {item.pronunciation && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 italic">
                    ({item.pronunciation})
                  </span>
                )}
              </div>
              <p className="text-gray-700 dark:text-gray-300">{item.definition}</p>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          >
            Close Glossary
          </button>
        </div>
      </div>
    </div>
  );
}
