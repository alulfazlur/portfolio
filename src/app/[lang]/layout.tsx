import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Opening } from "@/components/motion/Opening";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/ui/Navbar";
import { profile } from "@/content/profile";
import { getLocale, getT } from "@/lib/i18n";
import { locales } from "@/lib/locales";
import { ThemeScript } from "@/components/ui/ThemeScript";
import "../globals.css";

// Satu keluarga (Plex) dengan akar engineering: Sans untuk teks & judul (light untuk display), Mono untuk label.
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

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  const locale = await getLocale();
  return {
    metadataBase: new URL(profile.siteUrl),
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
    verification: {
      google: "b8SJTNAK6PdvhwqcGp8dVqzj4r23n-w7aGVh85im7ko",
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
      className={`${plexSans.variable} ${plexMono.variable} antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-svh flex-col bg-slate-50 bg-dotgrid font-sans text-slate-900 dark:bg-slate-900 dark:text-slate-100">
        <Opening name={profile.nickname} />
        <MotionProvider>
          <Navbar />
          {children}
          <Footer />
          {modal}
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
