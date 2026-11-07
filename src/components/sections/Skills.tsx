import { Stagger } from "@/components/motion/Stagger";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { Section } from "@/components/ui/Section";
import { skills } from "@/content/skills";
import { getT } from "@/lib/i18n";

export async function Skills() {
  const t = await getT();
  return (
    <Section id="skills" index="02" title={t("sections.skills")}>
      <Stagger
        as="ul"
        className="border-t border-slate-900/15 dark:border-slate-100/15"
      >
        {skills.map((group, groupIndex) => (
          <StaggerItem
            as="li"
            key={group.id}
            className="grid gap-3 border-b border-slate-900/15 py-6 sm:py-8 lg:grid-cols-12 lg:gap-6 dark:border-slate-100/15"
          >
            <h3 className="flex items-baseline justify-between gap-4 font-mono text-xs tracking-[0.08em] text-slate-500 uppercase lg:col-span-3 lg:flex-col lg:justify-start lg:gap-1 dark:text-slate-400">
              <span className="text-slate-900 dark:text-slate-100">
                {String.fromCharCode(97 + groupIndex)}.{" "}
                {t(`skills.${group.id}`)}
              </span>
              <span>{String(group.items.length).padStart(2, "0")}</span>
            </h3>
            <ul className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[clamp(1.6rem,3.4vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.035em] text-slate-900 lg:col-span-9 dark:text-slate-50">
              {group.items.map((skill, index) => (
                <li key={skill} className="flex items-baseline gap-3">
                  <span className="transition-colors duration-300 hover:text-primary-600 dark:hover:text-primary-400">
                    {skill}
                  </span>
                  {index < group.items.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="font-serif font-normal text-primary-600 italic dark:text-primary-400"
                    >
                      /
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
