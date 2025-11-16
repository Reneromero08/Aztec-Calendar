import Image from "next/image";
import Link from "next/link";

const featureHighlights = [
  {
    title: "Cultural context at a glance",
    description:
      "Navigate living knowledge systems with guided explanations of day signs, sacred numbers, and seasonal cycles.",
    icon: "🜂",
  },
  {
    title: "Adaptive learning journeys",
    description:
      "Responsive layouts tailor the experience across breakpoints, keeping tools readable on phones, tablets, and desktops.",
    icon: "🜃",
  },
  {
    title: "Inclusive by design",
    description:
      "Color palettes, focus states, and keyboard flows meet WCAG 2.1 AA guidance so every learner can participate.",
    icon: "🜁",
  },
];

const guidePreviews = [
  {
    href: "/calendar",
    title: "Interactive Aztec calendar",
    description: "Lookup dates, explore trecenas, and visualise the calendar round in motion.",
  },
  {
    href: "/guide",
    title: "Curated learning guides",
    description: "Follow structured paths with cultural notes, practice prompts, and further readings.",
  },
  {
    href: "/guide/aztec-calendar",
    title: "Deep dive into the tonalpohualli",
    description: "Understand sacred combinations of day signs and numbers with lore-backed insights.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-700 to-accent-600 text-white">
        <div className="absolute inset-0 bg-aztec-grid bg-grid-sm opacity-20 mix-blend-soft-light" aria-hidden />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-gutter py-section md:flex-row md:items-center">
          <div className="max-w-xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.2em]">
              Sacred learning in motion
            </span>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              A responsive learning portal inspired by Aztec artistry
            </h1>
            <p className="text-base leading-relaxed text-white/85 sm:text-lg">
              Explore calendar cycles, cultural storytelling, and practical study guides in an interface
              tuned for accessibility, performance, and beauty across every device.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/calendar"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-800 transition-colors hover:bg-primary-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                View the calendar tools
              </Link>
              <Link
                href="/guide"
                className="inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Browse learning guides
              </Link>
            </div>
          </div>

          <div className="relative flex w-full justify-center md:w-auto">
            <div className="relative h-72 w-72 max-w-full overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
                    Calendar glimpse
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    9 Quiahuitl ・ Rain
                  </p>
                  <p className="mt-3 text-sm text-white/70">
                    Sacred day pairing aligned with the tonalpohualli, offering balance and renewal.
                  </p>
                </div>
                <Image
                  src="/globe.svg"
                  alt="Stylised Aztec globe"
                  width={220}
                  height={220}
                  priority
                  className="h-32 w-auto self-end opacity-90"
                  sizes="(min-width: 768px) 18rem, 14rem"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="resources" className="bg-[color:var(--color-surface-strong)]">
        <div className="mx-auto w-full max-w-6xl px-gutter py-section">
          <div className="mb-8 max-w-2xl space-y-3">
            <h2 className="text-3xl font-semibold text-[color:var(--color-ink)] md:text-4xl">
              Designed for meaningful exploration
            </h2>
            <p className="text-base text-[color:var(--color-ink-soft)]">
              These highlights guide you through the platform’s responsive components and mindful design
              decisions.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featureHighlights.map((feature) => (
              <article
                key={feature.title}
                className="group flex h-full flex-col gap-4 rounded-2xl border border-primary-100/70 bg-white p-6 shadow-sm transition-transform duration-300 ease-soft-out hover:-translate-y-1 hover:shadow-elevation"
              >
                <span
                  aria-hidden
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-xl text-primary-700 transition-colors group-hover:bg-primary-200"
                >
                  {feature.icon}
                </span>
                <h3 className="text-xl font-semibold text-[color:var(--color-ink)]">
                  {feature.title}
                </h3>
                <p className="text-sm text-[color:var(--color-ink-soft)]">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-surface-muted)]/70">
        <div className="mx-auto w-full max-w-6xl px-gutter py-section">
          <div className="grid gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center">
            <div className="space-y-5">
              <h2 className="text-3xl font-semibold text-[color:var(--color-ink)] md:text-4xl">
                Performance tuned, story rich
              </h2>
              <p className="text-base text-[color:var(--color-ink-soft)]">
                Responsive imagery, semantic markup, and lazy-loaded visualisations keep the experience smooth while
                respecting cultural storytelling. SEO metadata shares the narrative beyond the page.
              </p>
              <ul className="space-y-3 text-sm text-[color:var(--color-ink-soft)]">
                <li className="flex items-start gap-3">
                  <span aria-hidden className="mt-1 text-primary-600">▹</span>
                  Hero and guide imagery adapts to viewport size for crisp, efficient rendering.
                </li>
                <li className="flex items-start gap-3">
                  <span aria-hidden className="mt-1 text-primary-600">▹</span>
                  Heavy visualisations load on demand, keeping initial page speeds high.
                </li>
                <li className="flex items-start gap-3">
                  <span aria-hidden className="mt-1 text-primary-600">▹</span>
                  Structured data and Open Graph support ensure guidance is discoverable.
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-primary-100/70 bg-white p-6 shadow-elevation">
              <dl className="grid gap-4 text-sm text-[color:var(--color-ink)] sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-primary-600">Accessibility checks</dt>
                  <dd className="mt-1 text-2xl font-semibold text-primary-700">AA</dd>
                  <p className="mt-1 text-xs text-[color:var(--color-ink-soft)]">
                    Color contrast, focus management & keyboard flows validated.
                  </p>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-primary-600">Lighthouse targets</dt>
                  <dd className="mt-1 text-2xl font-semibold text-primary-700">90+</dd>
                  <p className="mt-1 text-xs text-[color:var(--color-ink-soft)]">
                    Performance, SEO, and best practices tuned across breakpoints.
                  </p>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-primary-600">Keyboard coverage</dt>
                  <dd className="mt-1 text-2xl font-semibold text-primary-700">100%</dd>
                  <p className="mt-1 text-xs text-[color:var(--color-ink-soft)]">
                    All interactive components reachable without a pointer.
                  </p>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-primary-600">Motion preferences</dt>
                  <dd className="mt-1 text-2xl font-semibold text-primary-700">Respected</dd>
                  <p className="mt-1 text-xs text-[color:var(--color-ink-soft)]">
                    Reduced motion settings limit transitions and parallax.
                  </p>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section id="accessibility" className="bg-[color:var(--color-surface-strong)]">
        <div className="mx-auto w-full max-w-6xl px-gutter py-section">
          <div className="mb-8 space-y-3">
            <h2 className="text-3xl font-semibold text-[color:var(--color-ink)] md:text-4xl">
              Start your journey
            </h2>
            <p className="max-w-2xl text-base text-[color:var(--color-ink-soft)]">
              Choose a path to begin. Each resource is crafted with generous spacing, clear typography, and
              contextual storytelling rooted in Aztec heritage.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {guidePreviews.map((guide) => (
              <article
                key={guide.href}
                className="flex h-full flex-col justify-between rounded-2xl border border-primary-100/70 bg-white p-6 transition-colors duration-200 ease-soft-out hover:border-primary-300 hover:shadow-lg"
              >
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-[color:var(--color-ink)]">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-[color:var(--color-ink-soft)]">
                    {guide.description}
                  </p>
                </div>
                <Link
                  href={guide.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 transition-colors hover:text-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
                >
                  Begin exploring
                  <span aria-hidden>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
