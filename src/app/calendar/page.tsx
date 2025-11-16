import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LearningToolsContainer from "@/components/calendar/LearningToolsContainer";

const upcomingEvents = [
  { date: "Dec 1", title: "Tonalpohualli day study lab", time: "10:00 AM" },
  { date: "Dec 3", title: "Sacred numbers masterclass", time: "2:00 PM" },
  { date: "Dec 5", title: "Seasonal rituals in context", time: "11:00 AM" },
  { date: "Dec 7", title: "Guided meditations on day signs", time: "3:00 PM" },
];

export const metadata: Metadata = {
  title: "Calendar | Aztec Learning Collective",
  description: "Discover responsive Aztec calendar tools, convert dates, and journey through trecenas with accessible guidance.",
  alternates: {
    canonical: "https://aztec-learning.example.com/calendar",
  },
  openGraph: {
    title: "Interactive Aztec Calendar",
    description:
      "Navigate day signs, numbers, and months with responsive controls and accessible explanations.",
    url: "https://aztec-learning.example.com/calendar",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive Aztec Calendar",
    description:
      "Navigate day signs, numbers, and months with responsive controls and accessible explanations.",
  },
};

export default function Calendar() {
  return (
    <main className="bg-[color:var(--color-surface)]">
      <section className="border-b border-primary-100/60 bg-gradient-to-br from-primary-900 via-primary-700 to-accent-600 text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-gutter py-section md:flex-row md:items-center">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.3em]">
              Sacred timekeeping
            </span>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Aztec calendar, made responsive
            </h1>
            <p className="text-base leading-relaxed text-white/85">
              Convert dates, move across trecenas, and explore visual stories through an accessible, device-friendly interface.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/guide/aztec-calendar"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-800 transition-colors hover:bg-primary-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Read the full guide
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Return home
              </Link>
            </div>
          </div>
          <div className="flex w-full justify-center md:w-auto">
            <div className="relative h-60 w-60 overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
              <Image
                src="/window.svg"
                alt="Illustration of a sun window"
                width={200}
                height={200}
                className="mx-auto h-full w-auto"
                loading="lazy"
                sizes="(min-width: 768px) 15rem, 12rem"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-surface-strong)]">
        <div className="mx-auto w-full max-w-6xl px-gutter py-section">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-3xl font-semibold text-[color:var(--color-ink)] md:text-4xl">
                Learning tools
              </h2>
              <p className="text-sm text-[color:var(--color-ink-soft)]">
                Date lookup, interactive wheels, and trecena navigation keep sacred systems approachable and richly illustrated.
              </p>
            </div>
            <Link
              href="#events"
              className="inline-flex items-center gap-2 self-start rounded-full border border-primary-200 px-4 py-2 text-sm font-semibold text-primary-700 transition-colors hover:border-primary-300 hover:bg-primary-100/70 hover:text-primary-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
            >
              Skip to upcoming sessions
              <span aria-hidden>↓</span>
            </Link>
          </div>
          <LearningToolsContainer />
        </div>
      </section>

      <section id="events" className="bg-[color:var(--color-surface-muted)]/70">
        <div className="mx-auto w-full max-w-6xl px-gutter py-section">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[color:var(--color-ink)] md:text-3xl">
                Upcoming learning sessions
              </h2>
              <p className="text-sm text-[color:var(--color-ink-soft)]">
                Join facilitated explorations to deepen your understanding of the tonalpohualli and xiuhpohualli.
              </p>
            </div>
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 rounded-full border border-primary-200 px-4 py-2 text-sm font-semibold text-primary-700 transition-colors hover:border-primary-300 hover:bg-primary-100/80 hover:text-primary-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
            >
              Browse all guides
              <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {upcomingEvents.map((event) => (
              <article
                key={`${event.date}-${event.title}`}
                className="flex h-full flex-col justify-between rounded-2xl border border-primary-100/70 bg-white p-6 shadow-sm transition-transform duration-200 ease-soft-out hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-800">
                    {event.date}
                  </span>
                  <time className="text-sm text-[color:var(--color-ink-soft)]">{event.time}</time>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[color:var(--color-ink)]">
                  {event.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-surface-strong)]">
        <div className="mx-auto w-full max-w-6xl px-gutter py-section">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-[color:var(--color-ink)] md:text-3xl">
                Tips for reading the calendar
              </h2>
              <ul className="space-y-3 text-sm text-[color:var(--color-ink-soft)]">
                <li className="flex items-start gap-3">
                  <span aria-hidden className="mt-1 text-primary-600">▹</span>
                  Review your selected date’s tonalpohualli pairing to understand sacred influences.
                </li>
                <li className="flex items-start gap-3">
                  <span aria-hidden className="mt-1 text-primary-600">▹</span>
                  Explore trecena rulers to see directional themes within 13-day cycles.
                </li>
                <li className="flex items-start gap-3">
                  <span aria-hidden className="mt-1 text-primary-600">▹</span>
                  Compare solar month context for agricultural and civic planning.
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-primary-100/70 bg-white p-6 text-sm text-[color:var(--color-ink-soft)] shadow-sm">
              <h3 className="text-xl font-semibold text-[color:var(--color-ink)]">
                Honour pacing and accessibility
              </h3>
              <p className="mt-3">
                Keyboard shortcuts and focus rings guide navigation. High-contrast modes and reduced-motion preferences are respected so every visitor can explore without fatigue.
              </p>
              <p className="mt-3">
                Need a refresher? The glossary button within the learning tools expands with descriptive definitions and close controls optimised for screen readers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
