import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Section } from "@/components/ui/Section";
import { getProjectGroups } from "@/lib/content";
import { formatProjectPeriod } from "@/lib/format";
import { getLocale, getT } from "@/lib/i18n";

const pad = (n: number) => String(n).padStart(2, "0");

export async function Projects() {
  const t = await getT();
  const locale = await getLocale();
  const types = t("projects.types", { returnObjects: true });
  const groups = getProjectGroups(t);
  const total = groups.reduce((sum, group) => sum + group.projects.length, 0);
  // Nomor urut project berlanjut lintas grup.
  const offsets = groups.map((_, index) =>
    groups
      .slice(0, index)
      .reduce((sum, group) => sum + group.projects.length, 0),
  );

  return (
    <Section
      id="projects"
      index="04"
      title={t("sections.projects")}
      kicker={pad(total)}
      variant="panel"
    >
      <div className="space-y-20 sm:space-y-28">
        {groups.map((group, groupIndex) => {
          const headingId = `group-${group.id}`;
          return (
            <section key={group.id} aria-labelledby={headingId}>
              <Reveal className="mb-10 grid gap-4 border-t border-slate-900/10 pt-6 sm:mb-12 lg:grid-cols-12 lg:gap-6 dark:border-slate-100/10">
                <p className="font-mono text-[0.8125rem] text-slate-500 lowercase lg:col-span-3 dark:text-slate-400">
                  {String.fromCharCode(65 + groupIndex)} —{" "}
                  {pad(group.projects.length)}
                </p>
                <h3
                  id={headingId}
                  className="text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] font-light tracking-[-0.04em] text-slate-900 lg:col-span-5 dark:text-slate-50"
                >
                  {group.name}
                </h3>
                <p className="max-w-md self-end leading-relaxed text-slate-600 lg:col-span-4 dark:text-slate-400">
                  {group.description}
                </p>
              </Reveal>
              <Stagger as="ul" className="grid gap-5 sm:grid-cols-2 lg:gap-6">
                {group.projects.map((project, projectIndex) => {
                  return (
                    <StaggerItem
                      as="li"
                      key={project.slug}
                      className={project.featured ? "sm:col-span-2" : ""}
                    >
                      <ProjectCard
                        project={project}
                        index={pad(offsets[groupIndex] + projectIndex + 1)}
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
                  );
                })}
              </Stagger>
            </section>
          );
        })}
      </div>
    </Section>
  );
}
