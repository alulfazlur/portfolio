import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Poppins } from "next/font/google";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getFixedT } from "@/lib/i18n";
import { defaultLocale } from "@/lib/locales";
import { ThemeScript } from "@/components/ui/ThemeScript";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "600",
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
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
      className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-svh flex-col bg-slate-50 font-sans text-slate-900 dark:bg-slate-900 dark:text-slate-100">
        <main id="main" className="flex flex-1 items-center py-32">
          <Container>
            <p className="font-mono text-sm text-primary-700 dark:text-primary-300">
              404
            </p>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
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
