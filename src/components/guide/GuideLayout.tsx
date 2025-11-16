import Link from "next/link";
import type { ReactNode } from "react";

export interface GuideSection {
  id: string;
  title: string;
  description?: string;
}

interface GuideLayoutProps {
  title: string;
  intro?: string;
  sections: GuideSection[];
  children: ReactNode;
}

export default function GuideLayout({
  title,
  intro,
  sections,
  children,
}: GuideLayoutProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <header className="mb-10">
          <Link
            href="/calendar"
            className="inline-block mb-6 text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
          >
            ← Back to Calendar
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
          {intro ? (
            <p className="mt-3 max-w-3xl text-lg text-gray-700 dark:text-gray-300">
              {intro}
            </p>
          ) : null}
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_288px]">
          <article
            aria-label="Aztec calendar interpretation guide"
            className="prose prose-lg max-w-none text-gray-700 dark:prose-invert dark:text-gray-200"
          >
            {children}
          </article>

          <aside className="self-start rounded-xl bg-white/70 p-6 shadow-lg backdrop-blur dark:bg-gray-800/70">
            <nav aria-label="Guide sections" className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  On this page
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Jump directly to any section of the interpretation guide.
                </p>
              </div>
              <ul className="space-y-3">
                {sections.map((section) => (
                  <li key={section.id} className="group">
                    <Link
                      href={`#${section.id}`}
                      className="flex flex-col rounded-lg border border-transparent px-3 py-2 transition-colors group-hover:border-accent-400 group-hover:bg-accent-50 dark:group-hover:border-accent-500 dark:group-hover:bg-accent-900/30"
                    >
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {section.title}
                      </span>
                      {section.description ? (
                        <span className="text-xs text-gray-600 dark:text-gray-300">
                          {section.description}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </div>
    </main>
  );
}
