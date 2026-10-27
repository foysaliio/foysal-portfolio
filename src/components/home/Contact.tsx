"use client";

import { useEffect, useRef, useState } from "react";
import { FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { TechIcon } from "@/components/icons/TechIcons";
import {
  MailIcon,
  PhoneIcon,
  CopyIcon,
  CheckIcon,
  ArrowRightIcon,
} from "@/components/icons/UIIcons";

type CopyStatus = "idle" | "copying" | "copied" | "error";

const CONTACT_LINKS = [
  {
    label: "Phone",
    description: PERSONAL_INFO.phoneDisplay,
    href: PERSONAL_INFO.phoneLink,
    external: false,
    icon: <PhoneIcon className="h-5 w-5" />,
  },
  {
    label: "WhatsApp",
    description: "Chat on WhatsApp",
    href: PERSONAL_INFO.whatsappUrl,
    external: true,
    icon: <FaWhatsapp className="h-5 w-5" />,
  },
  {
    label: "GitHub",
    description: "View profile",
    href: PERSONAL_INFO.githubUrl,
    external: true,
    icon: <TechIcon name="github" className="h-5 w-5" />,
  },
  {
    label: "LinkedIn",
    description: "View profile",
    href: PERSONAL_INFO.linkedinUrl,
    external: true,
    icon: <FaLinkedinIn className="h-5 w-5" />,
  },
];

export function Contact() {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");

  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    };
  }, []);

  async function copyEmail() {
    if (copyStatus === "copying") return;

    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }

    setCopyStatus("copying");

    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);

      setCopyStatus("copied");

      resetTimer.current = setTimeout(() => {
        setCopyStatus("idle");
      }, 2500);
    } catch {
      setCopyStatus("error");
    }
  }

  const focusClasses =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--surface)]";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-[var(--surface-border)] bg-[var(--background)] py-16 transition-colors md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10">
          <h2
            id="contact-heading"
            className="text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl"
          >
            Contact
            <span className="text-emerald-600 dark:text-emerald-400">.</span>
          </h2>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-[var(--surface-border)] bg-[var(--surface)] sm:rounded-[2rem]">
          <div className="grid lg:grid-cols-12">
            <div className="flex min-w-0 flex-col justify-between p-6 sm:p-9 lg:col-span-7 lg:p-10">
              <div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.07] text-emerald-600 dark:text-emerald-400">
                    <MailIcon className="h-6 w-6" />
                  </span>

                  <p className="text-sm font-medium text-[var(--foreground-muted)]">
                    Email
                  </p>
                </div>

                <p className="mt-8 w-full max-w-none text-sm leading-7 text-[var(--foreground-muted)] sm:text-base">
                  {PERSONAL_INFO.contactIntro}
                </p>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className={`mt-5 block w-fit max-w-full rounded-md text-xl font-semibold leading-relaxed tracking-tight text-[var(--foreground)] underline decoration-[var(--surface-border)] underline-offset-8 transition-colors duration-300 [overflow-wrap:anywhere] hover:text-emerald-600 hover:decoration-emerald-500/50 motion-reduce:transition-none sm:text-2xl ${focusClasses} dark:hover:text-emerald-400`}
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>

              <div className="mt-8 sm:mt-10">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className={`group inline-flex min-h-12 items-center justify-center gap-4 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition-colors duration-300 hover:bg-emerald-700 hover:text-white motion-reduce:transition-none dark:hover:bg-emerald-400 dark:hover:text-slate-950 ${focusClasses}`}
                  >
                    Send email
                    <ArrowRightIcon className="h-4 w-4 -rotate-45 transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:rotate-0 motion-reduce:transition-none" />
                  </a>

                  <button
                    type="button"
                    onClick={copyEmail}
                    disabled={copyStatus === "copying"}
                    aria-label={
                      copyStatus === "copied"
                        ? "Email address copied"
                        : "Copy email address"
                    }
                    className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--surface-border)] px-4 py-3 text-sm font-medium transition-colors duration-300 hover:border-emerald-500/50 hover:bg-[var(--surface-muted)] disabled:opacity-60 motion-reduce:transition-none ${
                      copyStatus === "copied"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-[var(--foreground-muted)]"
                    } ${focusClasses}`}
                  >
                    {copyStatus === "copied" ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      <CopyIcon className="h-4 w-4" />
                    )}

                    {copyStatus === "copied"
                      ? "Copied"
                      : copyStatus === "copying"
                        ? "Copying…"
                        : "Copy email"}
                  </button>
                </div>

                <p
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                  className={`mt-3 min-h-5 text-xs leading-5 ${
                    copyStatus === "error"
                      ? "text-[var(--foreground)]"
                      : "text-emerald-600 dark:text-emerald-400"
                  }`}
                >
                  {copyStatus === "copied"
                    ? "Email address copied."
                    : copyStatus === "error"
                      ? "Couldn’t copy. You can select the email address above and copy it."
                      : ""}
                </p>
              </div>
            </div>

            <div className="border-t border-[var(--surface-border)] bg-[var(--surface-muted)]/25 lg:col-span-5 lg:border-l lg:border-t-0">
              <ul className="divide-y divide-[var(--surface-border)]">
                {CONTACT_LINKS.map((contact) => (
                  <li key={contact.label}>
                    <a
                      href={contact.href}
                      target={contact.external ? "_blank" : undefined}
                      rel={contact.external ? "noopener noreferrer" : undefined}
                      aria-label={
                        contact.external
                          ? `${contact.label}: ${contact.description}, opens in a new tab`
                          : `Call ${PERSONAL_INFO.phoneDisplay}`
                      }
                      className="group flex min-h-28 items-center gap-4 px-6 py-6 transition-colors duration-[350ms] hover:bg-[var(--surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500 motion-reduce:transition-none sm:px-9 lg:px-8"
                    >
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--foreground-muted)] transition-colors duration-[350ms] group-hover:border-emerald-500/30 group-hover:bg-emerald-500/[0.07] group-hover:text-emerald-600 motion-reduce:transition-none dark:group-hover:text-emerald-400">
                        {contact.icon}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-base font-medium tracking-tight text-[var(--foreground)]">
                          {contact.label}
                        </span>

                        <span className="mt-1 block text-xs leading-5 text-[var(--foreground-muted)] [overflow-wrap:anywhere]">
                          {contact.description}
                        </span>
                      </span>

                      <ArrowRightIcon className="h-4 w-4 shrink-0 -rotate-45 text-[var(--foreground-muted)] transition-[color,transform] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-emerald-600 motion-safe:group-hover:rotate-0 motion-reduce:transition-none dark:group-hover:text-emerald-400" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
