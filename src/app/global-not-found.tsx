import type { Metadata } from "next";
import { Google_Sans, Google_Sans_Code, Montserrat } from "next/font/google";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getFixedT } from "@/lib/i18n";
import { locales } from "@/lib/locales";
import { ThemeScript } from "@/components/ui/ThemeScript";
import "./globals.css";

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});
const googleSansCode = Google_Sans_Code({
  variable: "--font-google-sans-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "404 — Alul",
};

export default function GlobalNotFound() {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${googleSans.variable} ${montserrat.variable} ${googleSansCode.variable} antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-svh flex-col bg-slate-50 font-sans text-slate-900 dark:bg-slate-900 dark:text-slate-100">
        <main id="main" className="flex flex-1 items-center py-32">
          <Container>
            <p className="font-mono text-sm text-accent dark:text-accent-soft">
              404
            </p>
            {locales.map((locale, index) => {
              const t = getFixedT(locale);
              const Heading = index === 0 ? "h1" : "p";
              return (
                <div key={locale} lang={locale} className="mt-6">
                  <Heading className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
                    {t("notFound.title")}
                  </Heading>
                  <Link
                    href={`/${locale}`}
                    className="mt-3 inline-block font-mono text-sm text-slate-600 underline underline-offset-4 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
                  >
                    ← {t("notFound.back")}
                  </Link>
                </div>
              );
            })}
          </Container>
        </main>
      </body>
    </html>
  );
}
