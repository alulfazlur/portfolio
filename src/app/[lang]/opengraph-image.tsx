import { notFound } from "next/navigation";
import { profile } from "@/content/profile";
import { getFixedT } from "@/lib/i18n";
import { isLocale, locales } from "@/lib/locales";
import { ogSize, renderOgImage } from "@/lib/og-image";

export const alt = `${profile.name} (${profile.nickname}) — ${profile.role}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getFixedT(lang);
  return renderOgImage({
    eyebrow: `${profile.role} · ${t("profile.location")}`,
    title: `${profile.name} (${profile.nickname})`,
    subtitle: t("profile.tagline"),
  });
}
