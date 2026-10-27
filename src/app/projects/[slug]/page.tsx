import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS } from "@/data/portfolioData";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TechIcon } from "@/components/icons/TechIcons";
import {
  ExternalLinkIcon,
  ArrowLeftIcon,
  CheckIcon,
} from "@/components/icons/UIIcons";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.name} | Projects | Foysal Hossien`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.name} - ${project.subtitle}`,
      description: project.shortDescription,
      images: [
        {
          url: project.screenshot,
          width: project.screenshotWidth,
          height: project.screenshotHeight,
          alt: `Screenshot of ${project.name}`,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const headingClasses =
    "mb-4 text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl";

  const focusClasses =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--background)]";

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      <main id="main-content" className="flex-1 py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/#projects"
              className={`inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium text-[var(--foreground-muted)] transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${focusClasses}`}
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to all projects
            </Link>
          </div>

          <header className="mb-8">
            <p className="mb-3 max-w-3xl text-xs font-medium uppercase leading-6 tracking-wider text-emerald-600 dark:text-emerald-400">
              {project.subtitle}
            </p>

            <h1 className="mb-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {project.name}
              <span className="text-emerald-600 dark:text-emerald-400">.</span>
            </h1>

            <p className="max-w-3xl text-base leading-8 text-[var(--foreground-muted)] sm:text-lg">
              {project.shortDescription}
            </p>
          </header>

          <div className="mb-10 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-800 dark:bg-emerald-400 dark:text-slate-950 dark:hover:bg-emerald-300 ${focusClasses}`}
              >
                Visit Live Website
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
            )}

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] px-5 py-3 text-sm font-medium transition-colors hover:bg-[var(--surface-muted)] ${focusClasses}`}
              >
                <TechIcon name="github" className="h-4 w-4" />
                View Repository
                <ExternalLinkIcon className="h-3.5 w-3.5 text-[var(--foreground-muted)]" />
              </a>
            )}
          </div>

          <div className="mb-12 overflow-hidden rounded-[1.5rem] border border-[var(--surface-border)] bg-[var(--surface)] p-3 sm:mb-16 sm:rounded-[2rem] sm:p-5">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[var(--surface-border)] bg-[var(--surface-muted)] sm:rounded-2xl">
              <Image
                src={project.screenshot}
                alt={`Screenshot of ${project.name} application`}
                fill
                priority
                sizes="(max-width: 1152px) 100vw, 1088px"
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="space-y-12 sm:space-y-16">
            <section aria-labelledby="section-overview">
              <h2 id="section-overview" className={headingClasses}>
                Overview
              </h2>

              <p className="max-w-3xl text-base leading-8 text-[var(--foreground-muted)] sm:text-lg">
                {project.overview}
              </p>
            </section>

            <section aria-labelledby="section-tech-stack">
              <h2 id="section-tech-stack" className={headingClasses}>
                Technology Stack
              </h2>

              <ul className="flex flex-wrap gap-2">
                {project.mainStack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="section-features">
              <h2 id="section-features" className={headingClasses}>
                Features
              </h2>

              <div className="rounded-[1.5rem] border border-[var(--surface-border)] bg-[var(--surface)] p-6 sm:rounded-[2rem] sm:p-8">
                <ul className="grid gap-x-10 gap-y-5 md:grid-cols-2">
                  {project.supportedFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      >
                        <CheckIcon className="h-3.5 w-3.5" />
                      </span>

                      <span className="text-sm leading-7 text-[var(--foreground-muted)]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section aria-labelledby="section-challenge">
              <h2 id="section-challenge" className={headingClasses}>
                Challenge and Approach
              </h2>

              <div className="border-l-2 border-emerald-500 pl-5 sm:pl-7">
                <p className="max-w-3xl text-base leading-8 text-[var(--foreground-muted)] sm:text-lg">
                  {project.challengeAndApproach}
                </p>
              </div>
            </section>

            {project.potentialImprovements.length > 0 && (
              <section aria-labelledby="section-improvements">
                <h2 id="section-improvements" className={headingClasses}>
                  Future Improvements
                </h2>

                <p className="mb-5 text-sm leading-7 text-[var(--foreground-muted)]">
                  These features are not implemented yet.
                </p>

                <ul className="max-w-3xl space-y-4">
                  {project.potentialImprovements.map((improvement) => (
                    <li key={improvement} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
                      />

                      <span className="text-sm leading-7 text-[var(--foreground-muted)] sm:text-base">
                        {improvement}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="border-t border-[var(--surface-border)] pt-7">
              <Link
                href="/#projects"
                className={`inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] px-5 py-3 text-sm font-medium transition-colors hover:bg-[var(--surface-muted)] ${focusClasses}`}
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Return to Projects
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
