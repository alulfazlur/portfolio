import { notFound } from "next/navigation";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { getProject } from "@/lib/content";
import { getFixedT } from "@/lib/i18n";
import { isLocale } from "@/lib/locales";
import { ogSize, renderOgImage } from "@/lib/og-image";

export const alt = "Project case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const t = getFixedT(lang);
  const project = getProject(t, slug);
  if (!project) notFound();
  return renderOgImage({
    eyebrow: `${profile.name} (${profile.nickname}) · ${t("meta.caseStudy")}`,
    title: project.title,
    subtitle: project.summary,
  });
}
