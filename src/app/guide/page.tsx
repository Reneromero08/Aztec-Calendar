import type { Metadata } from "next";
import Link from "next/link";

const guides = [
  {
    title: "Aztec Calendar Interpretation Guide",
    description:
      "Learn to read and interpret the Aztec calendar system with day signs, numbers, and cultural context.",
    level: "All Levels",
    href: "/guide/aztec-calendar",
  },
  {
    title: "Getting Started with Web Development",
    description: "Learn the fundamentals of HTML, CSS, and JavaScript.",
    level: "Beginner",
    href: null,
  },
  {
    title: "React Component Patterns",
    description: "Master advanced patterns for building scalable React applications.",
    level: "Intermediate",
    href: null,
  },
  {
    title: "Full-Stack Development with Next.js",
    description: "Build complete full-stack applications with Next.js 14.",
    level: "Advanced",
    href: null,
  },
  {
    title: "Testing Strategies",
    description: "Learn unit, integration, and end-to-end testing approaches.",
    level: "Intermediate",
    href: null,
  },
];

const levelStyles: Record<string, string> = {
  Beginner: "bg-primary-100 text-primary-900",
  Intermediate: "bg-accent-100 text-accent-900",
  Advanced: "bg-secondary-100 text-secondary-900",
  "All Levels": "bg-neutral-100 text-neutral-900",
};

export const metadata: Metadata = {
  title: "Guides | Aztec Learning Collective",
  description:
    "Browse curated learning guides spanning Aztec calendar insights and modern development skills with accessible layouts.",
  alternates: {
    canonical: "https://aztec-learning.example.com/guide",
  },
  openGraph: {
    title: "Learning Guides",
    description:
      "Structured, accessible guides blending cultural storytelling with modern practice.",
    url: "https://aztec-learning.example.com/guide",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learning Guides",
    description:
      "Structured, accessible guides blending cultural storytelling with modern practice.",
  },
};

export default function Guide() {
  return (
    <main className="bg-[color:var(--color-surface)]">
      <section className="border-b border-primary-100/60 bg-gradient-to-br from-primary-900 via-primary-700 to-accent-600 text-white">
        <div className="mx-auto w-full max-w-6xl px-gutter py-section">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.3em]">
              Learning journeys
            </span>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Guides that respect heritage and modern craft
            </h1>
            <p className="text-base leading-relaxed text-white/85">
              Curated chapters, glossaries, and practice prompts help you navigate the Aztec calendar alongside contemporary development skills, all within an accessible reading rhythm.
            </p>
            <Link
              href="/calendar"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-800 transition-colors hover:bg-primary-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore the calendar tools
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-surface-strong)]">
        <div className="mx-auto w-full max-w-6xl px-gutter py-section">
          <div className="mb-8 space-y-3">
            <h2 className="text-3xl font-semibold text-[color:var(--color-ink)] md:text-4xl">
              Featured guides
            </h2>
            <p className="max-w-2xl text-sm text-[color:var(--color-ink-soft)]">
              Each guide is optimised for readability, keyboard navigation, and high-contrast colour palettes inspired by Aztec motifs.
            </p>
          </div>
          <div className="grid gap-6">
            {guides.map((guide, index) => {
              const pillClass = levelStyles[guide.level] ?? "bg-neutral-200 text-neutral-900";
              return (
                <article
                  key={`${guide.title}-${index}`}
                  className="flex flex-col gap-4 rounded-2xl border border-primary-100/70 bg-white p-6 transition-transform duration-200 ease-soft-out hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <h3 className="text-2xl font-semibold text-[color:var(--color-ink)]">
                      {guide.title}
                    </h3>
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${pillClass}`}>
                      {guide.level}
                    </span>
                  </div>
                  <p className="text-sm text-[color:var(--color-ink-soft)] max-w-prose">
                    {guide.description}
                  </p>
                  {guide.href ? (
                    <Link
                      href={guide.href}
                      className="inline-flex items-center gap-2 self-start rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
                    >
                      Start learning
                      <span aria-hidden>→</span>
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-2 self-start rounded-full border border-primary-100 px-4 py-2 text-sm font-semibold text-primary-700 opacity-60">
                      Coming soon
                    </span>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-surface-muted)]/70">
        <div className="mx-auto w-full max-w-6xl px-gutter py-section">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-[color:var(--color-ink)] md:text-4xl">
                Reading experience commitments
              </h2>
              <ul className="space-y-3 text-sm text-[color:var(--color-ink-soft)]">
                <li className="flex items-start gap-3">
                  <span aria-hidden className="mt-1 text-primary-600">▹</span>
                  Responsive typography and spacing scale adjust gracefully across devices.
                </li>
                <li className="flex items-start gap-3">
                  <span aria-hidden className="mt-1 text-primary-600">▹</span>
                  Keyboard friendly contents lists and focus outlines keep navigation clear.
                </li>
                <li className="flex items-start gap-3">
                  <span aria-hidden className="mt-1 text-primary-600">▹</span>
                  Reduced motion preferences dial back transitions for sensitive readers.
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-primary-100/70 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[color:var(--color-ink)]">
                Cultural grounding meets modern craft
              </h3>
              <p className="mt-3 text-sm text-[color:var(--color-ink-soft)]">
                Guides weave Nahuatl terminology, iconography, and storytelling into actionable study prompts. Semantic structure keeps screen readers fluent while rich visuals honour tradition.
              </p>
              <Link
                href="/guide/aztec-calendar"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 transition-colors hover:text-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
              >
                Visit the Aztec calendar guide
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
