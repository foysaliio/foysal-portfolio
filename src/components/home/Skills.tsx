"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { SKILL_CATEGORIES, PROJECTS } from "@/data/portfolioData";
import { TechIcon } from "@/components/icons/TechIcons";
import { ArrowRightIcon } from "@/components/icons/UIIcons";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "tools", label: "Tools" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

const NOTES: Record<string, string> = {
  html: "Page structure and semantic markup.",
  css: "Layouts, responsive styles, and visual details.",
  javascript: "User interactions and application logic.",
  typescript: "Types for components, data, and functions.",
  tailwind: "Responsive layouts and reusable styles.",
  react: "Components, shared state, and interactive interfaces.",
  nextjs: "Routing, page rendering, and full stack applications.",
  nodejs: "Running JavaScript on the server.",
  express: "API routes and server middleware.",
  mongodb: "Storing and working with application data.",
  git: "Tracking changes and managing branches.",
  github: "Keeping repositories and sharing source code.",
  figma: "Working with interface designs and layouts.",
  vscode: "Writing, editing, and debugging code.",
  postman: "Sending requests and checking API responses.",
  terminal: "Working with a coding agent inside the editor.",
  bot: "Working through coding tasks with an AI assistant.",
};

const COLORS: Record<string, [string, string]> = {
  html: ["#c2410c", "#f97316"],
  css: ["#2563eb", "#60a5fa"],
  javascript: ["#a16207", "#facc15"],
  typescript: ["#2563eb", "#60a5fa"],
  tailwind: ["#0e7490", "#22d3ee"],
  react: ["#087ea4", "#61dafb"],
  nextjs: ["#171717", "#f5f5f5"],
  nodejs: ["#398127", "#83cd29"],
  express: ["#404040", "#e5e5e5"],
  mongodb: ["#15803d", "#4ade80"],
  git: ["#d43b24", "#f97360"],
  github: ["#24292f", "#f0f6fc"],
  figma: ["#7c3aed", "#c4b5fd"],
  vscode: ["#0078b8", "#38bdf8"],
  postman: ["#c2410c", "#ff8a65"],
  terminal: ["#047857", "#34d399"],
  bot: ["#047857", "#34d399"],
};

function getCategoryId(title: string): FilterId {
  const value = title.toLowerCase();

  if (value.includes("frontend")) return "frontend";
  if (value.includes("backend")) return "backend";

  return "tools";
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .replace("mongodbatlas", "mongodb");
}

const SKILLS = SKILL_CATEGORIES.flatMap((category) =>
  category.skills.map((skill) => ({
    ...skill,
    id: `${getCategoryId(category.title)}-${skill.icon}`,
    categoryId: getCategoryId(category.title),
    categoryTitle: category.title,
  })),
);

function brandStyle(icon: string): CSSProperties {
  const [light, dark] = COLORS[icon] ?? ["#047857", "#34d399"];

  return {
    "--skill-light": light,
    "--skill-dark": dark,
  } as CSSProperties;
}

export function Skills() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("frontend");

  const [selectedId, setSelectedId] = useState<string | null>(
    SKILLS.find((skill) => skill.icon === "react")?.id ?? SKILLS[0]?.id ?? null,
  );

  const visibleSkills = SKILLS.filter(
    (skill) => activeFilter === "all" || skill.categoryId === activeFilter,
  );

  const selectedIndex = visibleSkills.findIndex(
    (skill) => skill.id === selectedId,
  );

  const selectedSkill =
    selectedIndex >= 0 ? visibleSkills[selectedIndex] : undefined;

  const relatedProjects = selectedSkill
    ? PROJECTS.filter((project) =>
        project.mainStack.some(
          (technology) =>
            normalize(technology) === normalize(selectedSkill.name),
        ),
      )
    : [];

  const panelStyle = {
    "--detail-order-mobile": Math.ceil((selectedIndex + 1) / 2) * 2,
    "--detail-order-tablet": Math.ceil((selectedIndex + 1) / 3) * 3,
    "--detail-order-desktop": Math.ceil((selectedIndex + 1) / 4) * 4,
  } as CSSProperties;

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-t border-[var(--surface-border)] bg-[var(--background)] py-16 transition-colors md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-5 sm:mb-10">
          <h2
            id="skills-heading"
            className="text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl"
          >
            Skills
            <span className="text-emerald-600 dark:text-emerald-400">.</span>
          </h2>

          <span className="pb-1 font-mono text-xs text-[var(--foreground-muted)]">
            {String(visibleSkills.length).padStart(2, "0")} skills
          </span>
        </div>

        <div
          role="group"
          aria-label="Filter skills by category"
          className="mb-10 grid grid-cols-2 gap-2 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface)] p-2 sm:flex sm:w-fit sm:flex-wrap sm:rounded-full md:mb-14"
        >
          {FILTERS.map((filter) => {
            const count = SKILLS.filter(
              (skill) => filter.id === "all" || skill.categoryId === filter.id,
            ).length;

            const active = activeFilter === filter.id;

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                aria-pressed={active}
                aria-controls="skills-shelf"
                className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 motion-reduce:transition-none sm:rounded-full ${
                  active
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
          {visibleSkills.length} skills shown.
          {selectedSkill ? ` ${selectedSkill.name} details open.` : ""}
        </p>

        <ul
          id="skills-shelf"
          className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-7 lg:grid-cols-4"
        >
          {visibleSkills.map((skill, index) => {
            const selected = selectedSkill?.id === skill.id;

            return (
              <li
                key={skill.id}
                style={{
                  ...brandStyle(skill.icon),
                  order: index + 1,
                }}
                className="relative min-w-0 pb-3"
              >
                <button
                  id={`shelf-skill-${skill.id}`}
                  type="button"
                  aria-expanded={selected}
                  aria-controls={selected ? "shelf-skill-detail" : undefined}
                  onClick={() => setSelectedId(selected ? null : skill.id)}
                  className={`group relative flex min-h-44 w-full flex-col items-center justify-center rounded-2xl px-3 py-6 text-center transition-[transform,background-color,box-shadow] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 motion-reduce:transition-none sm:min-h-48 ${
                    selected
                      ? "bg-[var(--surface)] shadow-[0_12px_28px_-18px_rgba(0,0,0,0.35)] motion-safe:-translate-y-1.5"
                      : "hover:bg-[var(--surface)] hover:shadow-[0_12px_28px_-18px_rgba(0,0,0,0.25)] motion-safe:hover:-translate-y-1.5"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-emerald-500 transition-opacity duration-[350ms] motion-reduce:transition-none ${
                      selected ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <TechIcon
                    name={skill.icon}
                    className={`h-12 w-12 transition-[color,transform] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:h-14 sm:w-14 ${
                      selected
                        ? "text-[var(--skill-light)] motion-safe:scale-105 dark:text-[var(--skill-dark)]"
                        : "text-[var(--foreground-muted)] group-hover:text-[var(--skill-light)] motion-safe:group-hover:scale-105 dark:group-hover:text-[var(--skill-dark)]"
                    }`}
                  />

                  <span className="mt-5 text-sm font-medium text-[var(--foreground)]">
                    {skill.name}
                  </span>

                  <span
                    aria-hidden="true"
                    className={`mt-2 text-xs transition-colors duration-[350ms] motion-reduce:transition-none ${
                      selected
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-[var(--foreground-muted)]"
                    }`}
                  >
                    {selected ? "−" : "+"}
                  </span>
                </button>

                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-px transition-colors duration-[350ms] motion-reduce:transition-none ${
                    selected ? "bg-emerald-500" : "bg-[var(--surface-border)]"
                  }`}
                />
              </li>
            );
          })}

          {selectedSkill && (
            <li
              key={`detail-${selectedSkill.id}`}
              style={panelStyle}
              className="col-span-full [order:var(--detail-order-mobile)] sm:[order:var(--detail-order-tablet)] lg:[order:var(--detail-order-desktop)]"
            >
              <div
                id="shelf-skill-detail"
                role="region"
                aria-labelledby={`shelf-skill-${selectedSkill.id}`}
                className="shelf-detail overflow-hidden rounded-[1.5rem] border border-[var(--surface-border)] bg-[var(--surface)] sm:rounded-[2rem]"
              >
                <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-2 md:gap-12">
                  <div>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      {selectedSkill.categoryTitle}
                    </p>

                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                      {selectedSkill.name}
                    </h3>

                    {(selectedSkill.description ||
                      NOTES[selectedSkill.icon]) && (
                      <p className="mt-3 max-w-md text-sm leading-7 text-[var(--foreground-muted)]">
                        {selectedSkill.description || NOTES[selectedSkill.icon]}
                      </p>
                    )}
                  </div>

                  {relatedProjects.length > 0 && (
                    <div className="border-t border-[var(--surface-border)] pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                      <p className="mb-3 text-xs text-[var(--foreground-muted)]">
                        Used in
                      </p>

                      <ul className="space-y-1">
                        {relatedProjects.map((project) => (
                          <li key={project.slug}>
                            <Link
                              href={`/projects/${project.slug}`}
                              className="group flex min-h-11 items-center justify-between gap-4 rounded-md py-2 text-sm font-medium text-[var(--foreground)] transition-colors duration-300 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 motion-reduce:transition-none dark:hover:text-emerald-400"
                            >
                              {project.name}

                              <ArrowRightIcon className="h-4 w-4 shrink-0 -rotate-45 transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:rotate-0 motion-reduce:transition-none" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </li>
          )}
        </ul>

        {visibleSkills.length === 0 && (
          <p className="py-12 text-center text-sm text-[var(--foreground-muted)]">
            No skills added in this category yet.
          </p>
        )}
      </div>

      <style jsx>{`
        .shelf-detail {
          animation: shelf-open 300ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes shelf-open {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .shelf-detail {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
