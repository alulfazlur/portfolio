import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Section } from "@/components/ui/Section";
import { tones } from "@/components/ui/tones";
import type { AccentColor, ProjectGroup } from "@/content/types";
import { getProjectGroups } from "@/lib/content";
import { formatProjectPeriod } from "@/lib/format";
import { getLocale, getT } from "@/lib/i18n";

const groupTones: Record<ProjectGroup, AccentColor> = {
  belanjaku: "orange",
  swift: "purple",
  other: "emerald",
};

export async function Projects() {
  const t = await getT();
  const locale = await getLocale();
  const types = t("projects.types", { returnObjects: true });

  return (
    <Section
      id="projects"
      index="04"
      title={t("sections.projects")}
      tone="amber"
      glow="left"
    >
      <div className="space-y-20">
        {getProjectGroups(t).map((group) => {
          const tone = tones[groupTones[group.id]];
          const headingId = `group-${group.id}`;
          return (
            <section key={group.id} aria-labelledby={headingId}>
              <Reveal className="mb-8 flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between dark:border-slate-700/60">
                <div>
                  <h3
                    id={headingId}
                    className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-50"
                  >
                    <span
                      aria-hidden="true"
                      className={`size-2.5 rounded-full ${tone.dot}`}
                    />
                    {group.name}
                  </h3>
                  <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
                    {group.description}
                  </p>
                </div>
                <span
                  className={`w-fit shrink-0 rounded-full px-3 py-1 font-mono text-xs ${tone.chip}`}
                >
                  {String(group.projects.length).padStart(2, "0")}
                </span>
              </Reveal>
              <Stagger
                as="ul"
                className={`grid gap-5 sm:grid-cols-2 ${group.projects.length > 2 ? "lg:grid-cols-3" : ""}`}
              >
                {group.projects.map((project) => (
                  <StaggerItem
                    as="li"
                    key={project.slug}
                    className={
                      project.featured ? "sm:col-span-2 lg:col-span-3" : ""
                    }
                  >
                    <ProjectCard
                      project={project}
                      href={`/${locale}/projects/${project.slug}`}
                      coverAlt={t("projects.coverAlt", {
                        title: project.title,
                      })}
                      typeLabel={types[project.type]}
                      period={formatProjectPeriod(
                        project,
                        t("experience.present"),
                      )}
                      stackLabel={t("projects.stack")}
                      comingSoonLabel={t("projects.comingSoon")}
                      liveLabel={t("caseStudy.live")}
                      caseStudyLabel={t("projects.viewCaseStudy")}
                    />
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          );
        })}
      </div>
    </Section>
  );
}
