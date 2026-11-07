import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getFixedT } from "@/lib/i18n";
import { defaultLocale } from "@/lib/locales";
import { ThemeScript } from "@/components/ui/ThemeScript";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "404 — Alul",
};

// Di luar [lang], jadi bahasanya tidak diketahui; cukup bahasa default (Inggris).
const t = getFixedT(defaultLocale);

export default function GlobalNotFound() {
  return (
    <html
      suppressHydrationWarning
      lang={defaultLocale}
      className={`${plexSans.variable} ${plexMono.variable} antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-svh flex-col bg-slate-50 bg-dotgrid font-sans text-slate-900 dark:bg-slate-900 dark:text-slate-100">
        <main id="main" className="flex flex-1 items-center py-32">
          <Container>
            <p className="font-mono text-sm text-primary-700 dark:text-primary-300">
              404
            </p>
            <h1 className="mt-6 text-4xl leading-[0.95] font-light tracking-[-0.04em] text-slate-900 sm:text-6xl dark:text-slate-50">
              {t("notFound.title")}
            </h1>
            <Link
              href={`/${defaultLocale}`}
              className="mt-3 inline-block font-mono text-sm text-slate-600 underline underline-offset-4 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
            >
              ← {t("notFound.back")}
            </Link>
          </Container>
        </main>
      </body>
    </html>
  );
}
