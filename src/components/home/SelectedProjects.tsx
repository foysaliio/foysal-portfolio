"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS, type ProjectCategory } from "@/data/portfolioData";
import { TechIcon } from "@/components/icons/TechIcons";
import { ArrowRightIcon, ExternalLinkIcon } from "@/components/icons/UIIcons";

type ProjectFilter = "all" | ProjectCategory;

const FILTERS: {
  value: ProjectFilter;
  label: string;
}[] = [
  { value: "all", label: "All" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "fullstack", label: "Full Stack" },
];

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  fullstack: "Full Stack",
};

export function SelectedProjects() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");

  const visibleProjects = PROJECTS.filter(
    (project) => activeFilter === "all" || project.category === activeFilter,
  );

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="overflow-hidden border-t border-[var(--surface-border)] bg-[var(--background)] py-16 transition-colors md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-5 sm:mb-10">
          <h2
            id="projects-heading"
            className="text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl"
          >
            Projects
            <span className="text-emerald-600 dark:text-emerald-400">.</span>
          </h2>

          <span className="pb-1 font-mono text-xs text-[var(--foreground-muted)]">
            {String(visibleProjects.length).padStart(2, "0")} projects
          </span>
        </div>

        <div
          role="group"
          aria-label="Filter projects by category"
          className="mb-10 grid grid-cols-2 gap-2 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-2 sm:flex sm:w-fit sm:flex-wrap sm:rounded-full md:mb-14"
        >
          {FILTERS.map((filter) => {
            const count = PROJECTS.filter(
              (project) =>
                filter.value === "all" || project.category === filter.value,
            ).length;

            const selected = activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                aria-pressed={selected}
                aria-controls="project-results"
                onClick={() => setActiveFilter(filter.value)}
                className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 sm:rounded-full ${
                  selected
                    ? "bg-[var(--foreground)] text-[var(--background)]"
                    : "text-[var(--foreground-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {filter.label}

                <span className="font-mono text-[10px] opacity-65">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {visibleProjects.length} projects shown. Filter:{" "}
          {FILTERS.find((filter) => filter.value === activeFilter)?.label}.
        </p>

        <div id="project-results" className="space-y-12 md:space-y-16">
          {visibleProjects.map((project, index) => {
            const number = String(PROJECTS.indexOf(project) + 1).padStart(
              2,
              "0",
            );

            const reversed = index % 2 === 1;

            return (
              <article
                key={project.slug}
                aria-labelledby={`project-${project.slug}`}
                className="grid min-w-0 gap-6 lg:grid-cols-12 lg:items-center lg:gap-10"
              >
                <div
                  className={`min-w-0 lg:col-span-7 ${
                    reversed ? "lg:order-2" : ""
                  }`}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    aria-label={`View ${project.name} project details`}
                    className="group relative block rounded-[1.5rem] border border-[var(--surface-border)] bg-[var(--surface)] p-3 transition-colors hover:border-emerald-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 sm:rounded-[2rem] sm:p-5"
                  >
                    <div
                      aria-hidden="true"
                      className="mb-3 flex items-center justify-between gap-3 px-1 sm:mb-4"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--foreground-muted)]/40" />
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--foreground-muted)]/25" />
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--foreground-muted)]/15" />
                      </div>

                      <span className="font-mono text-[10px] text-[var(--foreground-muted)]">
                        {project.slug}
                      </span>

                      <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                        {number}
                      </span>
                    </div>

                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-[var(--surface-border)] bg-[var(--surface-muted)] sm:rounded-2xl">
                      <Image
                        src={project.screenshot}
                        alt={`${project.name} application interface`}
                        fill
                        unoptimized
                        sizes="(max-width: 1023px) 100vw, 620px"
                        className="object-cover object-top transition-transform duration-700 motion-safe:group-hover:scale-[1.03] motion-safe:group-focus-visible:scale-[1.03]"
                      />

                      <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950 px-4 py-2.5 text-xs font-medium text-white shadow-lg transition-opacity sm:bottom-4 sm:right-4 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100">
                        View project
                        <ArrowRightIcon className="h-4 w-4 -rotate-45" />
                      </span>
                    </div>
                  </Link>
                </div>

                <div
                  className={`min-w-0 lg:col-span-5 ${
                    reversed ? "lg:order-1" : ""
                  }`}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-mono text-xs text-[var(--foreground-muted)]">
                      /{number}
                    </span>

                    <span
                      aria-hidden="true"
                      className="h-px w-7 bg-[var(--surface-border)]"
                    />

                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      {CATEGORY_LABELS[project.category]}
                    </span>
                  </div>

                  <h3
                    id={`project-${project.slug}`}
                    className="text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl"
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      className="rounded transition-colors hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:hover:text-emerald-400"
                    >
                      {project.name}
                    </Link>
                  </h3>

                  <p className="mt-2 text-sm font-medium leading-6 text-[var(--foreground)]">
                    {project.subtitle}
                  </p>

                  <p className="mt-4 text-sm leading-7 text-[var(--foreground-muted)]">
                    {project.shortDescription}
                  </p>

                  <ul
                    aria-label="Technologies used"
                    className="mt-5 flex flex-wrap gap-2"
                  >
                    {project.mainStack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface)] px-2.5 py-1.5 text-[11px] font-medium text-[var(--foreground-muted)]"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-[var(--surface-border)] pt-4">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex min-h-11 items-center gap-2 rounded text-sm font-semibold text-emerald-600 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
                    >
                      Explore project
                      <ArrowRightIcon className="h-4 w-4" />
                    </Link>

                    <div className="flex flex-wrap items-center gap-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${project.name} live demo in a new tab`}
                          className="inline-flex min-h-11 items-center gap-1.5 rounded text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                        >
                          Live
                          <ExternalLinkIcon className="h-3.5 w-3.5" />
                        </a>
                      )}

                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${project.name} source code in a new tab`}
                          className="inline-flex min-h-11 items-center gap-1.5 rounded text-xs text-[var(--foreground-muted)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                        >
                          <TechIcon name="github" className="h-4 w-4" />
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {visibleProjects.length === 0 && (
            <div className="rounded-3xl border border-dashed border-[var(--surface-border)] bg-[var(--surface)] px-6 py-16 text-center">
              <h3 className="text-xl font-semibold text-[var(--foreground)]">
                No projects in this category yet.
              </h3>

              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-medium text-[var(--background)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]"
              >
                View all projects
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
