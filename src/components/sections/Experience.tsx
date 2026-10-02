import { Stagger } from "@/components/motion/Stagger";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { Pressable } from "@/components/motion/Pressable";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { tones } from "@/components/ui/tones";
import type { AccentColor, ExperienceId } from "@/content/types";
import { getExperience } from "@/lib/content";
import { formatPeriod } from "@/lib/format";
import { getLocale, getT } from "@/lib/i18n";

const jobTones: Record<ExperienceId, AccentColor> = {
  icube: "teal",
  "icube-sirclo": "sky",
  bit: "rose",
};

export async function Experience() {
  const t = await getT();
  const locale = await getLocale();

  return (
    <Section
      id="experience"
      index="03"
      title={t("sections.experience")}
      tone="emerald"
      layout="side"
      glow="right"
    >
      <div className="relative pl-7 sm:pl-12">
        <div
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[5px] w-0.5 rounded-full bg-linear-to-b from-teal-500 via-sky-400 to-rose-400 sm:left-[6px]"
        />
        <Stagger as="ol" className="space-y-6">
          {getExperience(t).map((job) => {
            const tone = tones[jobTones[job.id]];
            const current = job.end === null;
            return (
              <StaggerItem as="li" key={job.id} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute top-7 -left-7 size-3 rounded-full ring-4 ring-slate-50 sm:-left-12 sm:size-3.5 dark:ring-slate-900 ${tone.dot}`}
                />
                <Pressable preset="surface">
                  <article
                    className={`relative rounded-3xl border p-6 sm:p-8 ${
                      current
                        ? "border-teal-200 bg-linear-to-br from-teal-50 to-sky-50 dark:border-teal-500/30 dark:from-teal-500/10 dark:to-sky-500/5"
                        : "border-slate-200 bg-white dark:border-slate-700/60 dark:bg-slate-800"
                    }`}
                  >
                    <p
                      className={`inline-flex rounded-full px-3 py-1 font-mono text-xs ${tone.chip}`}
                    >
                      {formatPeriod(
                        locale,
                        job.start,
                        job.end,
                        t("experience.present"),
                      )}
                    </p>
                    <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl dark:text-slate-50">
                      {job.role}
                      <span className={tone.text}> · {job.company}</span>
                    </h3>
                    <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 leading-relaxed text-slate-700 marker:text-slate-400 dark:text-slate-300 dark:marker:text-slate-600">
                      {job.highlights.map((highlight) => (
                        <li key={highlight.slice(0, 24)}>{highlight}</li>
                      ))}
                    </ul>
                    <ul
                      className="mt-6 flex flex-wrap gap-1.5"
                      aria-label={t("experience.stack")}
                    >
                      {job.stack.map((tech) => (
                        <li key={tech}>
                          <Tag>{tech}</Tag>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Pressable>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}
