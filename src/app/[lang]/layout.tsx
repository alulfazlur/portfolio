import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Poppins } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Opening } from "@/components/motion/Opening";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/ui/Navbar";
import { profile } from "@/content/profile";
import { getLocale, getT } from "@/lib/i18n";
import { locales } from "@/lib/locales";
import { ThemeScript } from "@/components/ui/ThemeScript";
import "../globals.css";

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
      className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-svh flex-col bg-slate-50 font-sans text-slate-900 dark:bg-slate-900 dark:text-slate-100">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-20 bg-primary-700/[0.13] [mask-image:url(/images/bg/contours.svg)] [mask-size:cover] [mask-position:center] dark:bg-primary-300/[0.08]"
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
