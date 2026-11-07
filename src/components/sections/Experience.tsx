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
      <Stagger
        as="ol"
        className="border-t border-slate-900/15 dark:border-slate-100/15"
      >
        {getExperience(t).map((job) => {
          const current = job.end === null;
          return (
            <StaggerItem
              as="li"
              key={job.id}
              className="border-b border-slate-900/15 py-8 sm:py-10 dark:border-slate-100/15"
            >
              <article>
                <p className="flex items-center gap-2 font-mono text-xs tracking-[0.08em] text-slate-500 uppercase dark:text-slate-400">
                  {current && (
                    <span
                      aria-hidden="true"
                      className="size-2 bg-primary-600 dark:bg-primary-400"
                    />
                  )}
                  <span
                    className={
                      current ? "text-slate-900 dark:text-slate-100" : ""
                    }
                  >
                    {formatPeriod(
                      locale,
                      job.start,
                      job.end,
                      t("experience.present"),
                    )}
                  </span>
                </p>
                <h3 className="mt-3 text-[clamp(1.75rem,3.2vw,2.75rem)] leading-none font-semibold tracking-[-0.035em] text-slate-900 dark:text-slate-50">
                  {job.company}
                </h3>
                <p className="mt-2 font-serif text-xl text-slate-600 italic sm:text-2xl dark:text-slate-300">
                  {job.role}
                </p>
                <ol className="mt-6 space-y-3 text-base leading-relaxed text-slate-700 sm:text-[1.0625rem] dark:text-slate-300">
                  {job.highlights.map((highlight, index) => (
                    <li
                      key={highlight.slice(0, 24)}
                      className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-2"
                    >
                      <span
                        aria-hidden="true"
                        className="pt-1 font-mono text-xs text-primary-700 dark:text-primary-300"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="max-w-3xl">{highlight}</span>
                    </li>
                  ))}
                </ol>
                <ul
                  className="mt-6 flex flex-wrap gap-1.5 sm:pl-[2.75rem]"
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
    </Section>
  );
}
