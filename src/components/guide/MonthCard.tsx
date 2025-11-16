import type { XiuhpohualliMonth } from "@/lib/aztec-calendar";

interface MonthCardProps {
  month: XiuhpohualliMonth;
}

export default function MonthCard({ month }: MonthCardProps) {
  return (
    <article
      id={`month-${month.position}`}
      className="rounded-lg border-2 border-emerald-200 bg-white p-6 shadow-md dark:border-emerald-700 dark:bg-gray-800"
    >
      <header className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {month.nahuatlName}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {month.englishName}
          </p>
        </div>
        <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-100">
          Month {month.position}
        </span>
      </header>

      <div className="space-y-3">
        {month.agricultural ? (
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
              Agricultural Significance:
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {month.agricultural}
            </p>
          </div>
        ) : null}

        {(month.season || month.patron) ? (
          <div className="rounded-md bg-emerald-50 p-4 dark:bg-emerald-900/30">
            <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
              Details:
            </h4>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              {month.season ? (
                <li>
                  <strong>Season:</strong> {month.season}
                </li>
              ) : null}
              {month.patron ? (
                <li>
                  <strong>Patron:</strong> {month.patron}
                </li>
              ) : null}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}
