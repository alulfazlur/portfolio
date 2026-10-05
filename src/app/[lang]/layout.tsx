import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Opening } from "@/components/motion/Opening";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/ui/Navbar";
import { profile } from "@/content/profile";
import { getLocale, getT } from "@/lib/i18n";
import { locales } from "@/lib/locales";
import { ThemeScript } from "@/components/ui/ThemeScript";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  const locale = await getLocale();
  return {
    title: {
      default: t("meta.title"),
      template: "%s — Alul",
    },
    description: t("meta.description"),
    alternates: {
      languages: Object.fromEntries(locales.map((lang) => [lang, `/${lang}`])),
    },
    openGraph: {
      type: "website",
      locale,
      siteName: "Fazlur Rahman (Alul)",
    },
  };
}

export default async function RootLayout({
  children,
  modal,
}: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  return (
    <html
      suppressHydrationWarning
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-svh flex-col bg-slate-50 font-sans text-slate-900 dark:bg-slate-900 dark:text-slate-100">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-20 bg-teal-700/[0.13] [mask-image:url(/images/bg/contours.svg)] [mask-size:cover] [mask-position:center] dark:bg-teal-300/[0.08]"
        />
        <Opening name={profile.nickname} />
        <MotionProvider>
          <Navbar />
          {children}
          <Footer />
          {modal}
        </MotionProvider>
      </body>
    </html>
  );
}
