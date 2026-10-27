"use client";

import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiArrowUpRight, FiMail } from "react-icons/fi";
import { PERSONAL_INFO } from "@/data/portfolioData";

export function Footer() {
  function scrollToTop() {
    window.history.replaceState(
      window.history.state,
      "",
      window.location.pathname + window.location.search,
    );

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "instant" : "smooth",
    });
  }

  const socialClass =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--surface-border)] text-[var(--foreground-muted)] transition-colors hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500";

  return (
    <footer className="mt-auto overflow-hidden border-t border-[var(--surface-border)] bg-[var(--background)]">
      <div className="mx-auto max-w-6xl px-4 pt-7 sm:px-6 sm:pt-10 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile"
              className={socialClass}
            >
              <FaGithub className="h-[18px] w-[18px]" />
            </a>

            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile"
              className={socialClass}
            >
              <FaLinkedinIn className="h-[18px] w-[18px]" />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              aria-label="Send an email"
              className={socialClass}
            >
              <FiMail className="h-[18px] w-[18px]" />
            </a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            className="group inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--foreground)] text-[var(--background)] transition-colors hover:bg-emerald-500 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--background)] sm:h-16 sm:w-16"
          >
            <FiArrowUpRight
              aria-hidden="true"
              className="h-7 w-7 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
            />
          </button>
        </div>

        <Link
          href="/"
          aria-label="Foysaliio home"
          className="group my-8 flex w-full items-baseline justify-center rounded-lg text-[clamp(3rem,15vw,10rem)] font-black leading-none tracking-[-0.075em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 sm:my-12"
        >
          <span className="text-[var(--foreground)] transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
            foysal
          </span>

          <span className="text-emerald-600 dark:text-emerald-400">iio</span>

          <span
            aria-hidden="true"
            className="ml-1 text-emerald-600 dark:text-emerald-400"
          >
            .
          </span>
        </Link>

        <div className="flex items-center gap-4 pb-6">
          <span
            aria-hidden="true"
            className="h-px flex-1 bg-[var(--surface-border)]"
          />

          <p className="shrink-0 text-[11px] tracking-wide text-[var(--foreground-muted)] sm:text-xs">
            © 2026 Foysal Hossien
          </p>

          <span
            aria-hidden="true"
            className="h-px flex-1 bg-[var(--surface-border)]"
          />
        </div>
      </div>
    </footer>
  );
}
