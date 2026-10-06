import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Home from "@/app/[lang]/page";
import { projects } from "@/content/projects";
import { getProject } from "@/lib/content";
import { getT } from "@/lib/i18n";
import { locales } from "@/lib/locales";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = await getT();
  const project = getProject(t, slug);
  if (!project) notFound();
  return {
    title: project.title,
    description: project.summary,
    alternates: {
      languages: Object.fromEntries(
        locales.map((lang) => [lang, `/${lang}/projects/${project.slug}`]),
      ),
    },
  };
}

// Isi case study tampil sebagai modal lewat slot @modal; di bawahnya halaman utama.
export default Home;
