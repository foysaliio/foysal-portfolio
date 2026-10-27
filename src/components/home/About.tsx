"use client";

import { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";

const TOPICS = [
  "শুরু", // These labels below are displayed in English.
  "Learning to code",
  "How I learn",
  "My goal",
  "Outside coding",
];

TOPICS[0] = "How it started";

export function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const paragraphs = PERSONAL_INFO.aboutParagraphs;
  const total = paragraphs.length;

  const previous = () => {
    setActiveIndex((index) => (index - 1 + total) % total);
  };

  const next = () => {
    setActiveIndex((index) => (index + 1) % total);
  };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-t border-[var(--surface-border)] bg-[var(--background)] py-16 transition-colors md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-5 sm:mb-10">
          <h2
            id="about-heading"
            className="text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl"
          >
            About me
            <span className="text-emerald-600 dark:text-emerald-400">.</span>
          </h2>

          <span
            aria-hidden="true"
            className="pb-1 font-mono text-xs text-[var(--foreground-muted)]"
          >
            {String(activeIndex + 1).padStart(2, "0")}
            <span className="mx-2 opacity-40">/</span>
            {String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-[var(--surface-border)] bg-[var(--surface)] sm:rounded-[2rem]">
          <div className="grid lg:grid-cols-12">
            <div className="border-b border-[var(--surface-border)] bg-[var(--surface-muted)]/40 p-3 sm:p-5 lg:col-span-4 lg:border-b-0 lg:border-r lg:p-6">
              <div
                role="group"
                aria-label="Choose a part of my story"
                className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-3"
              >
                {paragraphs.map((_, index) => {
                  const selected = activeIndex === index;

                  return (
                    <button
                      key={index}
                      type="button"
                      aria-pressed={selected}
                      aria-controls="about-story"
                      onClick={() => setActiveIndex(index)}
                      className={`group flex min-h-14 items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 sm:px-4 lg:min-h-16 ${
                        selected
                          ? "border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground)] shadow-sm"
                          : "border-transparent text-[var(--foreground-muted)] hover:bg-[var(--surface)]/70 hover:text-[var(--foreground)]"
                      }`}
                    >
                      <span
                        className={`font-mono text-[11px] ${
                          selected
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-[var(--foreground-muted)]"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="flex-1 text-xs font-medium leading-5 sm:text-sm">
                        {TOPICS[index] ?? "More"}
                      </span>

                      <span
                        aria-hidden="true"
                        className={`hidden h-1.5 w-1.5 shrink-0 rounded-full sm:block ${
                          selected
                            ? "bg-emerald-500"
                            : "bg-[var(--surface-border)]"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative flex min-w-0 flex-col lg:col-span-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-16 right-4 select-none font-mono text-[130px] font-semibold leading-none tracking-tighter text-[var(--foreground)] opacity-[0.035] sm:right-8 sm:text-[180px]"
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </div>

              <div
                id="about-story"
                role="region"
                aria-labelledby="about-story-title"
                className="relative flex min-h-[320px] flex-1 flex-col justify-center px-6 py-9 sm:min-h-[350px] sm:px-10 sm:py-12 lg:px-12"
              >
                <div aria-live="polite" aria-atomic="true">
                  <h3
                    id="about-story-title"
                    className="mb-6 flex items-center gap-3 text-xs font-medium text-emerald-600 dark:text-emerald-400"
                  >
                    <span aria-hidden="true" className="h-px w-6 bg-current" />
                    {TOPICS[activeIndex] ?? "More about me"}
                  </h3>

                  <p className="max-w-xl text-lg leading-[1.85] tracking-[-0.015em] text-[var(--foreground)] sm:text-xl">
                    {paragraphs[activeIndex]}
                  </p>
                </div>
              </div>

              <div className="relative flex items-center justify-between border-t border-[var(--surface-border)] px-6 py-4 sm:px-10 lg:px-12">
                <div aria-hidden="true" className="flex items-center gap-1.5">
                  {paragraphs.map((_, index) => (
                    <span
                      key={index}
                      className={`h-1 rounded-full transition-all motion-reduce:transition-none ${
                        index === activeIndex
                          ? "w-7 bg-emerald-500"
                          : "w-2 bg-[var(--surface-border)]"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={previous}
                    aria-label="Previous part"
                    aria-controls="about-story"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--surface-border)] text-[var(--foreground-muted)] transition-colors hover:border-emerald-500 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:hover:text-emerald-400"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="h-4 w-4"
                    >
                      <path d="M19 12H5m6 6-6-6 6-6" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next part"
                    aria-controls="about-story"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--foreground)] text-[var(--background)] transition-colors hover:bg-emerald-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:hover:bg-emerald-400 dark:hover:text-slate-950"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="h-4 w-4"
                    >
                      <path d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
