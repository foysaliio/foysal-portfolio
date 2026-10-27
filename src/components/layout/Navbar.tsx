"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import {
  SunIcon,
  MoonIcon,
  MenuIcon,
  CloseIcon,
} from "@/components/icons/UIIcons";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Projects", href: "/#projects" },
  { name: "Education", href: "/#education" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        buttonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--surface-border)] bg-[var(--background)]/85 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={closeMenu}
          aria-label="Foysaliio home"
          className="group inline-flex shrink-0 items-baseline rounded-md py-2 text-[22px] font-semibold leading-none tracking-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <span className="text-[var(--foreground)] transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
            foysal
          </span>

          <span className="text-emerald-600 dark:text-emerald-400">iio</span>

          <span
            aria-hidden="true"
            className="ml-1 h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400"
          />
        </Link>

        <nav
          className="hidden items-center gap-1 text-sm font-medium md:flex"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-[var(--foreground-muted)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            type="button"
            aria-label={`Switch to ${
              theme === "dark" ? "light" : "dark"
            } theme`}
            className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] p-2 text-[var(--foreground)] transition-colors hover:bg-[var(--surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5 text-amber-400" />
            ) : (
              <MoonIcon className="h-5 w-5 text-slate-700" />
            )}
          </button>

          <button
            ref={buttonRef}
            onClick={() => setMobileMenuOpen((open) => !open)}
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] p-2 text-[var(--foreground)] transition-colors hover:bg-[var(--surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 md:hidden"
          >
            {mobileMenuOpen ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-[var(--surface-border)] bg-[var(--background)] shadow-xl md:hidden"
        >
          <nav
            className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-base font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-muted)] hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--surface-border)] px-4 pt-4 text-xs text-[var(--foreground-muted)]">
              <span>Dhaka, Bangladesh</span>

              <span className="font-medium text-emerald-500">
                Open to opportunities
              </span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
