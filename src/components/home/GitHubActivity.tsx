"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { ContributionDay, GitHubActivityData } from "@/lib/github-activity";
import { TechIcon } from "@/components/icons/TechIcons";

const LEVELS = ["NONE", "FIRST_QUARTILE", "SECOND_QUARTILE", "THIRD_QUARTILE", "FOURTH_QUARTILE"];
const COLORS = [
  "bg-[var(--surface-muted)]",
  "bg-emerald-200 dark:bg-emerald-950",
  "bg-emerald-400 dark:bg-emerald-800",
  "bg-emerald-600 dark:bg-emerald-600",
  "bg-emerald-800 dark:bg-emerald-400",
];
const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]";
const dateLabel = (date: string) => new Intl.DateTimeFormat("en-US", {
  month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
}).format(new Date(date + "T00:00:00Z"));

export function GitHubActivity() {
  const [data, setData] = useState<GitHubActivityData | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [selected, setSelected] = useState<ContributionDay | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch("/api/github", { signal: controller.signal });
        if (!response.ok) throw new Error("Unavailable");
        const result: GitHubActivityData = await response.json();
        if (!Array.isArray(result.days) || !result.days.length) throw new Error("No calendar");
        setData(result);
        setSelected(result.days[result.days.length - 1]);
      } catch {
        if (!controller.signal.aborted) setError(true);
      }
    }
    void load();
    return () => controller.abort();
  }, [attempt]);

  useEffect(() => {
    if (data && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [data]);

  const weeks: ContributionDay[][] = [];
  if (data) {
    for (const day of data.days) {
      if (!weeks.length || day.weekday === 0) weeks.push([]);
      weeks[weeks.length - 1].push(day);
    }
  }
  let lastMonth = "";
  const months = weeks.map((week) => {
    const first = week[0];
    const key = first.date.slice(0, 7);
    if (key === lastMonth) return "";
    lastMonth = key;
    return new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" })
      .format(new Date(first.date + "T00:00:00Z"));
  });

  function moveToDay(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const offsets: Record<string, number> = { ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1 };
    const offset = offsets[event.key];
    if (offset === undefined || !data) return;
    event.preventDefault();
    const next = data.days[Math.max(0, Math.min(data.days.length - 1, index + offset))];
    setSelected(next);
    scrollRef.current?.querySelector<HTMLButtonElement>(`[data-date="${next.date}"]`)?.focus();
  }

  return (
    <section id="github" aria-labelledby="github-heading" className="border-t border-[var(--surface-border)] bg-[var(--background)] py-16 transition-colors md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
          <h2 id="github-heading" className="text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl">
            GitHub activity<span className="text-emerald-600 dark:text-emerald-400">.</span>
          </h2>
          <a href="https://github.com/foysaliio" target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm text-[var(--foreground-muted)] transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${focus}`}>
            <TechIcon name="github" className="h-4 w-4" /> @foysaliio <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-[var(--surface-border)] bg-[var(--surface)] sm:rounded-[2rem]">
          {!data ? (
            <div className="flex min-h-72 flex-col items-center justify-center gap-4 p-6 text-center" role="status">
              <TechIcon name="github" className="h-8 w-8 text-[var(--foreground-muted)]" />
              <p className="text-sm text-[var(--foreground-muted)]">{error ? "GitHub activity is unavailable right now." : "Loading GitHub activity…"}</p>
              {error && <button type="button" onClick={() => { setError(false); setAttempt((value) => value + 1); }} className={`min-h-11 rounded-full border border-[var(--surface-border)] px-5 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-muted)] ${focus}`}>Try again</button>}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 divide-y divide-[var(--surface-border)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {[
                  { label: "Contributions", value: data.total, unit: "in the last 365 days" },
                  { label: "Current streak", value: data.currentStreak, unit: "consecutive days" },
                  { label: "Longest streak", value: data.longestStreak, unit: "within this period" },
                ].map((stat, index) => (
                  <div key={stat.label} className="flex items-center justify-between gap-4 px-6 py-5 sm:block sm:p-7 lg:p-8">
                    <div className="text-xs font-medium text-[var(--foreground-muted)]">{stat.label}</div>
                    <div className="text-right sm:mt-3 sm:text-left">
                      <p className={`text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl ${index === 1 ? "text-emerald-700 dark:text-emerald-400" : "text-[var(--foreground)]"}`}>{stat.value.toLocaleString("en-US")}</p>
                      <p className="mt-1 text-xs text-[var(--foreground-muted)]">{stat.unit}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[var(--surface-border)] px-5 pb-5 pt-6 sm:p-8">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--foreground-muted)]">
                  <p>{dateLabel(data.from)} <span aria-hidden="true">→</span> {dateLabel(data.to)}</p>
                  <span>Daily contributions · UTC</span>
                </div>
                <div className="flex gap-2">
                  <div aria-hidden="true" className="grid shrink-0 grid-rows-7 gap-[4px] pt-7 text-[10px] leading-[12px] text-[var(--foreground-muted)]">
                    {["", "Mon", "", "Wed", "", "Fri", ""].map((label, i) => <span key={i} className="h-3">{label}</span>)}
                  </div>
                  <div ref={scrollRef} tabIndex={0} role="region" aria-label="Contribution calendar. Scroll horizontally to explore the year. Use arrow keys on a day to navigate." className={`min-w-0 flex-1 overflow-x-auto rounded py-1 ${focus}`}>
                    <div className="min-w-max pb-2">
                      <div aria-hidden="true" className="mb-2 flex h-4 gap-1 text-[10px] text-[var(--foreground-muted)]">
                        {months.map((month, i) => <span key={i} className="relative w-3 shrink-0"><span className="absolute left-0">{month}</span></span>)}
                      </div>
                      <div className="flex gap-1">
                        {weeks.map((week) => (
                          <div key={week[0].date} className="grid grid-rows-7 gap-1">
                            {week.map((day) => {
                              const active = selected?.date === day.date;
                              const label = `${day.contributionCount} contributions on ${dateLabel(day.date)}`;
                              return <button key={day.date} type="button" data-date={day.date} aria-label={label} aria-pressed={active} title={label}
                                tabIndex={active ? 0 : -1}
                                style={{ gridRow: day.weekday + 1 }}
                                onFocus={() => setSelected(day)} onMouseEnter={() => setSelected(day)} onClick={() => setSelected(day)}
                                onKeyDown={(event) => moveToDay(event, data.days.indexOf(day))}
                                className={`h-3 w-3 rounded-[3px] transition-[box-shadow,transform] duration-300 ease-out motion-safe:hover:scale-125 motion-reduce:transition-none ${COLORS[Math.max(0, LEVELS.indexOf(day.contributionLevel))]} ${active ? "ring-2 ring-[var(--foreground-muted)] ring-offset-1 ring-offset-[var(--surface)]" : ""} ${focus}`} />;
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex flex-col justify-between gap-4 border-t border-[var(--surface-border)] pt-4 text-xs text-[var(--foreground-muted)] sm:flex-row sm:items-center">
                  <p aria-live="polite" aria-atomic="true" className="min-h-4">{selected && <><strong className="font-semibold text-[var(--foreground)]">{selected.contributionCount} contributions</strong> on {dateLabel(selected.date)}</>}</p>
                  <div className="flex items-center gap-2" aria-label="Color scale from fewer to more contributions"><span>Less</span><div aria-hidden="true" className="flex gap-1">{COLORS.map((color) => <span key={color} className={`h-3 w-3 rounded-[3px] ${color}`} />)}</div><span>More</span></div>
                </div>
              </div>
              <div className="border-t border-[var(--surface-border)] bg-[var(--surface-muted)]/30 px-5 py-4 text-xs leading-5 text-[var(--foreground-muted)] sm:px-8">
                Streaks use the displayed 365 days. An inactive today keeps yesterday’s streak until the day ends. Data refreshes approximately hourly.
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
