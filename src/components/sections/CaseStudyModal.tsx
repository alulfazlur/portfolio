import Image from "next/image";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { tones } from "@/components/ui/tones";
import { getProject } from "@/lib/content";
import { getT } from "@/lib/i18n";

type CaseStudyModalProps = {
  slug: string;
  /** Tujuan saat ditutup bila modal dibuka langsung dari URL (tidak ada riwayat untuk `back()`). */
  closeHref?: string;
};

/** Modal case study, dipakai route yang dicegat (klik kartu) maupun buka langsung / refresh. */
export async function CaseStudyModal({ slug, closeHref }: CaseStudyModalProps) {
  const t = await getT();
  const project = getProject(t, slug);
  if (!project) notFound();
  const tone = tones[project.color];

  return (
    <ProjectModal
      labelledBy={`${project.slug}-title`}
      closeLabel={t("caseStudy.close")}
      closeHref={closeHref}
      media={
        // Proporsi dan sudutnya mengikuti kartu yang diperbesar (~2× mulai sm), agar morph menyambung.
        <div
          className={`flex items-end overflow-hidden rounded-t-3xl px-6 pt-6 sm:rounded-t-[3rem] sm:px-16 sm:pt-16 ${tone.frame}`}
        >
          <Image
            src={project.cover}
            alt={t("projects.coverAlt", { title: project.title })}
            placeholder="blur"
            quality={90}
            loading="eager"
            sizes="(min-width: 1024px) 896px, 100vw"
            className="aspect-[16/10] w-full rounded-t-xl object-cover object-left-top shadow-2xl ring-1 shadow-slate-900/15 ring-slate-900/5 sm:rounded-t-3xl dark:shadow-slate-950/50 dark:ring-white/10"
          />
        </div>
      }
    >
      <CaseStudy project={project} />
    </ProjectModal>
  );
}
