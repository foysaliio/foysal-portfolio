import Image from "next/image";
import Link from "next/link";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { TechIcon } from "@/components/icons/TechIcons";
import {
  FileTextIcon,
  DownloadIcon,
  ArrowRightIcon,
  MapPinIcon,
} from "@/components/icons/UIIcons";

export function Hero() {
  const focusClasses =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--background)]";

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-[var(--background)] text-[var(--foreground)]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center pb-12 pt-12 text-center sm:pt-16 md:pt-20">
          {/* Portrait */}
          <div className="relative mb-7">
            <div className="rounded-full border border-emerald-600/40 p-2 dark:border-emerald-400/40">
              <div className="relative h-28 w-28 overflow-hidden rounded-full bg-[var(--surface-muted)] sm:h-32 sm:w-32">
                <Image
                  src={PERSONAL_INFO.portrait}
                  alt={`Portrait of ${PERSONAL_INFO.name}`}
                  fill
                  priority
                  sizes="(max-width: 640px) 112px, 128px"
                  className="object-cover object-[center_30%]"
                />
              </div>
            </div>

            <span
              aria-hidden="true"
              className="absolute bottom-3 right-3 h-4 w-4 rounded-full border-[3px] border-[var(--background)] bg-emerald-500"
            />
          </div>

          {/* Availability */}
          <p className="flex items-center justify-center gap-2 text-xs font-medium text-[var(--foreground-muted)] sm:text-sm">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600 dark:bg-emerald-400"
            />
            {PERSONAL_INFO.availability}
          </p>

          {/* Identity */}
          <h1
            id="hero-heading"
            className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-7xl"
          >
            {PERSONAL_INFO.name}
            <span
              aria-hidden="true"
              className="text-emerald-700 dark:text-emerald-400"
            >
              .
            </span>
          </h1>

          <p className="mt-4 text-lg font-medium tracking-tight text-emerald-700 sm:text-2xl dark:text-emerald-400">
            {PERSONAL_INFO.designation}
          </p>

          <p className="mt-6 max-w-xl text-base leading-7 text-[var(--foreground-muted)] sm:text-lg sm:leading-8">
            {PERSONAL_INFO.heroIntroduction}
          </p>

          {/* Primary actions */}
          <div className="mt-8 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row">
            <Link
              href="#projects"
              className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 dark:bg-emerald-400 dark:text-slate-950 dark:hover:bg-emerald-300 ${focusClasses}`}
            >
              View Projects
              <ArrowRightIcon className="h-4 w-4" />
            </Link>

            <a
              href={PERSONAL_INFO.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold transition-colors hover:bg-[var(--surface-muted)] ${focusClasses}`}
            >
              <FileTextIcon className="h-4 w-4" />
              View Resume
            </a>
          </div>

          {/* Secondary action */}
          <a
            href={PERSONAL_INFO.resumePath}
            download={PERSONAL_INFO.resumeDownloadName}
            className={`mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-3 text-xs font-medium text-[var(--foreground-muted)] transition-colors hover:text-[var(--foreground)] ${focusClasses}`}
          >
            <DownloadIcon className="h-3.5 w-3.5" />
            Download Resume
          </a>

          {/* Social links */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${PERSONAL_INFO.name} on GitHub`}
              className={`inline-flex min-h-11 items-center gap-2 rounded-md px-2 text-sm text-[var(--foreground-muted)] transition-colors hover:text-[var(--foreground)] ${focusClasses}`}
            >
              <TechIcon name="github" className="h-4 w-4" />
              GitHub
            </a>

            <span
              aria-hidden="true"
              className="h-4 w-px bg-[var(--surface-border)]"
            />

            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${PERSONAL_INFO.name} on LinkedIn`}
              className={`inline-flex min-h-11 items-center gap-2 rounded-md px-2 text-sm text-[var(--foreground-muted)] transition-colors hover:text-[var(--foreground)] ${focusClasses}`}
            >
              <span aria-hidden="true" className="font-bold">
                in
              </span>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
