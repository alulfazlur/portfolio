import { CaseStudyModal } from "@/components/sections/CaseStudyModal";
import { projects } from "@/content/projects";

// Klik kartu project (navigasi di sisi klien) dicegat ke sini dan tampil sebagai modal.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function InterceptedProjectModalPage({
  params,
}: PageProps<"/[lang]/projects/[slug]">) {
  const { slug } = await params;
  return <CaseStudyModal slug={slug} />;
}
