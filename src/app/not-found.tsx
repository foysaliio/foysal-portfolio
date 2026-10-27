import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeftIcon } from "@/components/icons/UIIcons";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main id="main-content" className="flex-1 flex items-center justify-center py-24 px-4 text-center">
        <div className="max-w-md mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-2">
            Error 404
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] mb-3">
            Page Not Found
          </h1>
          <p className="text-base text-[var(--foreground-muted)] mb-8">
            The page you are looking for does not exist or may have been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
