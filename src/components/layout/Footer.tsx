import Link from "next/link";

const resourceLinks = [
  { href: "/calendar", label: "Interactive calendar" },
  { href: "/guide", label: "Learning guides" },
  { href: "/guide/aztec-calendar", label: "Aztec calendar deep dive" },
];

const supportLinks = [
  { href: "#accessibility", label: "Accessibility" },
  { href: "#resources", label: "Resource library" },
  { href: "mailto:hello@aztec-learning.example.com", label: "Contact" },
];

const socialLinks = [
  {
    href: "https://www.linkedin.com",
    label: "LinkedIn",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <path d="M4.98 3.5a2.5 2.5 0 1 1-.02 5 2.5 2.5 0 0 1 .02-5Zm-.69 6.75h3.38V20h-3.38V10.25ZM10.5 10.25h3.25v1.36c.45-.87 1.6-1.67 3.3-1.67 3.22 0 3.82 2.12 3.82 4.88V20h-3.38v-4.66c0-1.11-.02-2.54-1.55-2.54-1.56 0-1.8 1.21-1.8 2.46V20H10.5V10.25Z" />
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com",
    label: "YouTube",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <path d="M21.6 6.2a2.5 2.5 0 0 0-1.76-1.77C18.04 4 12 4 12 4s-6.04 0-7.84.43A2.5 2.5 0 0 0 2.4 6.2C2 8.07 2 12 2 12s0 3.93.4 5.8a2.5 2.5 0 0 0 1.76 1.76C6 20 12 20 12 20s6.04 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.76C22 15.93 22 12 22 12s0-3.93-.4-5.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
      </svg>
    ),
  },
];

function renderSupportLink(link: { href: string; label: string }) {
  const baseClass =
    "inline-flex items-center gap-2 text-primary-700 transition-colors hover:text-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]";

  if (link.href.startsWith("/")) {
    return (
      <Link href={link.href} className={baseClass}>
        <span aria-hidden className="text-xs">
          ▹
        </span>
        {link.label}
      </Link>
    );
  }

  return (
    <a href={link.href} className={baseClass}>
      <span aria-hidden className="text-xs">
        ▹
      </span>
      {link.label}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-primary-100/60 bg-[color:var(--color-surface-muted)]/60 text-[color:var(--color-ink-soft)]">
      <div className="mx-auto w-full max-w-6xl px-gutter py-section">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-primary-700">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-lg text-white shadow-elevation" aria-hidden>
                ☀️
              </span>
              <div>
                <p className="text-lg font-semibold text-[color:var(--color-ink)]">
                  Aztec Learning Collective
                </p>
                <p className="text-sm text-[color:var(--color-ink-soft)]">
                  Blending ritual calendars with modern learning journeys.
                </p>
              </div>
            </div>
            <p className="max-w-prose text-sm leading-relaxed">
              Dive into responsive guides, culturally grounded visuals, and interactive tools that keep
              learners focused and inspired. Crafted with care for accessibility and performance.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
                Explore
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-2 text-primary-700 transition-colors hover:text-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
                    >
                      <span aria-hidden className="text-xs">▹</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
                Support
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {supportLinks.map((link) => (
                  <li key={link.href}>{renderSupportLink(link)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-primary-100/60 pt-6 text-xs text-primary-700/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Aztec Learning Collective. Crafted for inclusive, curious learners.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary-200 text-primary-700 transition-colors hover:border-primary-300 hover:bg-primary-100/60 hover:text-primary-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
