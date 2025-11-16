import Link from "next/link";
import type { TonalpohualliNumber } from "@/lib/aztec-calendar";

interface NumberCardProps {
  number: TonalpohualliNumber;
  showDetailLink?: boolean;
}

export default function NumberCard({
  number,
  showDetailLink = true,
}: NumberCardProps) {
  return (
    <div
      id={`number-${number.value}`}
      className="rounded-lg border-2 border-primary-200 bg-white p-6 shadow-md dark:border-primary-700 dark:bg-gray-800"
    >
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {number.value} - {number.nahuatlName}
          </h3>
          {number.gender ? (
            <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">
              {number.gender} energy
            </p>
          ) : null}
        </div>
        <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-700 dark:bg-primary-900 dark:text-primary-100">
          {number.value}
        </span>
      </div>

      <p className="mb-4 text-gray-700 dark:text-gray-300">
        {number.meaning}
      </p>

      {showDetailLink ? (
        <Link
          href={`#number-${number.value}`}
          className="mt-2 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
          aria-label={`Jump to number ${number.value} details`}
        >
          View details →
        </Link>
      ) : null}
    </div>
  );
}
