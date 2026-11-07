import { Stagger } from "@/components/motion/Stagger";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { getExperience } from "@/lib/content";
import { formatPeriod } from "@/lib/format";
import { getLocale, getT } from "@/lib/i18n";

export async function Experience() {
  const t = await getT();
  const locale = await getLocale();

  return (
    <Section
      id="experience"
      index="03"
      title={t("sections.experience")}
      layout="side"
    >
      {/* Rel vertikal dengan node per pekerjaan; node pekerjaan saat ini terisi. */}
      <div className="relative pl-8 sm:pl-12">
        <div
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[5px] w-px bg-slate-900/15 dark:bg-slate-100/15"
        />
        <Stagger as="ol" className="space-y-14 sm:space-y-16">
          {getExperience(t).map((job) => {
            const current = job.end === null;
            return (
              <StaggerItem as="li" key={job.id} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute top-1 -left-8 size-[11px] rounded-full border sm:-left-12 ${
                    current
                      ? "border-primary-600 bg-primary-600 ring-4 ring-primary-100 dark:border-primary-300 dark:bg-primary-300 dark:ring-primary-400/15"
                      : "border-slate-400 bg-slate-50 dark:border-slate-500 dark:bg-slate-900"
                  }`}
                />
                <article>
                  <p
                    className={`font-mono text-[0.8125rem] lowercase ${
                      current
                        ? "text-primary-700 dark:text-primary-300"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {formatPeriod(
                      locale,
                      job.start,
                      job.end,
                      t("experience.present"),
                    )}
                  </p>
                  <h3 className="mt-2 text-[clamp(1.6rem,2.6vw,2.25rem)] leading-tight font-normal tracking-[-0.03em] text-slate-900 dark:text-slate-50">
                    {job.company}
                    <span className="text-slate-400 dark:text-slate-500">
                      {" "}
                      —{" "}
                    </span>
                    <span className="font-light text-slate-500 italic dark:text-slate-400">
                      {job.role}
                    </span>
                  </h3>
                  <ul className="mt-5 space-y-2.5 text-base leading-relaxed text-slate-600 sm:text-[1.0625rem] dark:text-slate-300">
                    {job.highlights.map((highlight) => (
                      <li
                        key={highlight.slice(0, 24)}
                        className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2"
                      >
                        <span
                          aria-hidden="true"
                          className="font-mono text-slate-400 dark:text-slate-500"
                        >
                          ›
                        </span>
                        <span className="max-w-3xl">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <ul
                    className="mt-5 flex flex-wrap gap-1.5"
                    aria-label={t("experience.stack")}
                  >
                    {job.stack.map((tech) => (
                      <li key={tech}>
                        <Tag>{tech}</Tag>
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}
