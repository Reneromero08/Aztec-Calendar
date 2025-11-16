import Link from "next/link";
import type { DaySign } from "@/lib/aztec-calendar";

interface DaySignCardProps {
  daySign: DaySign;
  showDetailLink?: boolean;
}

export default function DaySignCard({
  daySign,
  showDetailLink = true,
}: DaySignCardProps) {
  return (
    <div
      id={`day-sign-${daySign.position}`}
      className="rounded-lg border-2 border-accent-200 bg-white p-6 shadow-md dark:border-accent-700 dark:bg-gray-800"
    >
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {daySign.glyph} {daySign.nahuatlName}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {daySign.englishName}
          </p>
        </div>
        <span className="inline-block rounded-full bg-accent-100 px-3 py-1 text-sm font-semibold text-accent-700 dark:bg-accent-900 dark:text-accent-100">
          Position {daySign.position}
        </span>
      </div>

      <p className="mb-4 text-gray-700 dark:text-gray-300">
        {daySign.meaning}
      </p>

      {(daySign.direction || daySign.deity) && (
        <div className="rounded-md bg-accent-50 p-4 dark:bg-accent-900/30">
          <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
            Symbolic Associations
          </h4>
          <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {daySign.direction ? (
              <li>
                <strong>Direction:</strong> {daySign.direction}
              </li>
            ) : null}
            {daySign.deity ? (
              <li>
                <strong>Patron Deity:</strong> {daySign.deity}
              </li>
            ) : null}
          </ul>
        </div>
      )}

      {showDetailLink ? (
        <Link
          href={`#day-sign-${daySign.position}`}
          className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
          aria-label={`Jump to ${daySign.englishName} details`}
        >
          View details →
        </Link>
      ) : null}
    </div>
  );
}
