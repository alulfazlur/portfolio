import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { projects } from "@/content/projects";
import { getProject } from "@/lib/content";
import { getT } from "@/lib/i18n";

// Klik kartu project (navigasi di sisi klien) dicegat ke sini dan tampil sebagai modal.
// Buka langsung / refresh URL yang sama tetap merender halaman case study penuh.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectModalPage({
  params,
}: PageProps<"/[lang]/projects/[slug]">) {
  const { slug } = await params;
  const t = await getT();
  const project = getProject(t, slug);
  if (!project) notFound();

  return (
    <ProjectModal
      labelledBy={`${project.slug}-title`}
      closeLabel={t("caseStudy.close")}
    >
      <CaseStudy project={project} level={2} />
    </ProjectModal>
  );
}
