"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/calendar", label: "Calendar" },
  { href: "/guide", label: "Guides" },
];

function isActivePath(currentPath: string, href: string) {
  if (href === "/") return currentPath === "/";
  return currentPath.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-primary-100/70 bg-[color:var(--color-surface-strong)]/95 text-[color:var(--color-ink)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-gutter py-4 md:py-5">
        <Link
          href="/"
          className="flex items-center gap-3 font-semibold tracking-tight text-primary-700 transition-colors hover:text-primary-600"
        >
          <span
            aria-hidden
            className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-lg text-white shadow-elevation"
          >
            ☀️
          </span>
          <span className="text-lg md:text-xl">Aztec Learning</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-3">
            {navItems.map((item) => {
              const active = isActivePath(pathname ?? "", item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-colors ease-soft-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)] ${
                      active
                        ? "bg-primary-600 text-white"
                        : "text-primary-700 hover:bg-primary-100/60 hover:text-primary-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/guide/aztec-calendar"
            className="hidden rounded-full border border-primary-200 px-4 py-2 text-sm font-semibold text-primary-700 transition-colors hover:border-primary-300 hover:bg-primary-100/60 hover:text-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)] md:inline-flex"
          >
            Explore the calendar
          </Link>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-primary-200 p-2 text-primary-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)] md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className={`${
          isMenuOpen ? "max-h-[400px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        } mx-auto w-full max-w-6xl overflow-hidden px-gutter transition-all duration-300 ease-soft-out md:hidden`}
      >
        <ul className="flex flex-col gap-3 pb-4">
          {navItems.map((item) => {
            const active = isActivePath(pathname ?? "", item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-lg px-4 py-3 text-base font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)] ${
                    active
                      ? "bg-primary-600 text-white"
                      : "bg-[color:var(--color-surface-muted)]/80 text-primary-800 hover:bg-primary-100/70"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/guide/aztec-calendar"
              className="block rounded-lg border border-primary-200 bg-white px-4 py-3 text-base font-semibold text-primary-700 transition-colors hover:border-primary-300 hover:bg-primary-100/70 hover:text-primary-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-focus)]"
            >
              Explore the calendar
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
