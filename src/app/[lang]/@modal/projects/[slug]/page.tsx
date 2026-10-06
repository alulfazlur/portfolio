import { CaseStudyModal } from "@/components/sections/CaseStudyModal";
import { projects } from "@/content/projects";
import { getLocale } from "@/lib/i18n";

// Buka langsung / refresh URL project: halaman utama dengan modal terbuka di atasnya.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectModalPage({
  params,
}: PageProps<"/[lang]/projects/[slug]">) {
  const { slug } = await params;
  const locale = await getLocale();
  return <CaseStudyModal slug={slug} closeHref={`/${locale}`} />;
}
