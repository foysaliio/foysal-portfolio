import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "Foysal Hossien | Full Stack Web Developer",
  description:
    "Personal portfolio of Foysal Hossien, a Full Stack Web Developer based in Dhaka, Bangladesh. Building web applications with React, Next.js, TypeScript, and MongoDB.",
  keywords: [
    "Foysal Hossien",
    "Full Stack Developer",
    "Web Developer Dhaka",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Tailwind CSS",
    "MongoDB",
  ],
  authors: [{ name: "Foysal Hossien" }],
  openGraph: {
    title: "Foysal Hossien | Full Stack Web Developer",
    description:
      "Personal portfolio of Foysal Hossien. Building web apps with React and Next.js, with a strong focus on backend and databases.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/foysal_hossien.png",
        width: 1122,
        height: 1402,
        alt: "Foysal Hossien portrait",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';if(t==='dark'){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
