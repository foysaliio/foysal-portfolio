import { PERSONAL_INFO } from "@/data/portfolioData";
import { GraduationCapIcon } from "@/components/icons/UIIcons";

export function Education() {
  const { education } = PERSONAL_INFO;

  const result = education.cgpa.replace(/^CGPA:\s*/i, "");
  const resultParts = result.match(/^([\d.]+)\s*(?:out of|\/)\s*([\d.]+)$/i);

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="border-t border-[var(--surface-border)] bg-[var(--background)] py-16 transition-colors md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10">
          <h2
            id="education-heading"
            className="text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl"
          >
            Education
            <span className="text-emerald-600 dark:text-emerald-400">.</span>
          </h2>
        </div>

        <article
          aria-labelledby="education-degree"
          className="group overflow-hidden rounded-[1.5rem] border border-[var(--surface-border)] bg-[var(--surface)] transition-colors duration-300 hover:border-emerald-500/40 motion-reduce:transition-none sm:rounded-[2rem]"
        >
          <div className="grid lg:grid-cols-12">
            <div className="relative min-w-0 p-6 sm:p-9 lg:col-span-8 lg:p-10">
              <div className="mb-8 flex items-center gap-4 sm:mb-10">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.07] text-emerald-600 dark:text-emerald-400">
                  <GraduationCapIcon className="h-7 w-7" />
                </span>

                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-[var(--surface-border)]"
                />

                <span className="shrink-0 font-mono text-xs text-[var(--foreground-muted)]">
                  {education.period}
                </span>
              </div>

              <h3
                id="education-degree"
                className="max-w-lg text-2xl font-semibold leading-tight tracking-tight text-[var(--foreground)] sm:text-3xl lg:text-4xl"
              >
                {education.degree}
              </h3>

              <p className="mt-3 text-base font-medium text-emerald-600 sm:text-lg dark:text-emerald-400">
                {education.technology}
              </p>

              <div className="mt-8 flex items-center gap-3 border-t border-[var(--surface-border)] pt-5 sm:mt-10">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
                />

                <p className="text-sm leading-6 text-[var(--foreground-muted)] sm:text-base">
                  {education.institution}
                </p>
              </div>
            </div>

            <div className="relative flex flex-col justify-center border-t border-[var(--surface-border)] bg-[var(--surface-muted)]/30 p-6 sm:p-9 lg:col-span-4 lg:border-l lg:border-t-0 lg:p-10">
              <span
                aria-hidden="true"
                className="absolute inset-x-6 top-0 h-px bg-emerald-500/40 sm:inset-x-9 lg:inset-x-auto lg:inset-y-10 lg:left-0 lg:h-auto lg:w-px"
              />

              <p className="text-xs font-medium tracking-wide text-[var(--foreground-muted)]">
                CGPA
              </p>

              {resultParts ? (
                <>
                  <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-6xl font-medium leading-none tracking-[-0.05em] text-[var(--foreground)] sm:text-7xl">
                      {resultParts[1]}
                    </span>

                    <span className="text-lg text-[var(--foreground-muted)]">
                      / {resultParts[2]}
                    </span>
                  </p>

                  <span className="sr-only">
                    CGPA {resultParts[1]} out of {resultParts[2]}
                  </span>
                </>
              ) : (
                <p className="mt-4 text-3xl font-medium leading-tight tracking-tight text-[var(--foreground)]">
                  {result}
                </p>
              )}

              <div aria-hidden="true" className="mt-7 flex items-center gap-2">
                <span className="h-1 w-10 rounded-full bg-emerald-500" />
                <span className="h-1 w-2 rounded-full bg-[var(--surface-border)]" />
                <span className="h-1 w-2 rounded-full bg-[var(--surface-border)]" />
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
