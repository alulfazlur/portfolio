import { Stagger } from "@/components/motion/Stagger";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { Pressable } from "@/components/motion/Pressable";
import { Section } from "@/components/ui/Section";
import { SkillIcon } from "@/components/ui/SkillIcon";
import { TechIcon } from "@/components/ui/TechIcon";
import { tones } from "@/components/ui/tones";
import { skills } from "@/content/skills";
import type { AccentColor, SkillGroupId } from "@/content/types";
import { getT } from "@/lib/i18n";

const groupStyles: Record<SkillGroupId, { tone: AccentColor; span: string }> = {
  core: { tone: "teal", span: "sm:col-span-2" },
  styling: { tone: "rose", span: "" },
  data: { tone: "sky", span: "" },
  also: { tone: "amber", span: "sm:col-span-2" },
};

export async function Skills() {
  const t = await getT();
  return (
    <Section
      id="skills"
      index="02"
      title={t("sections.skills")}
      tone="sky"
      layout="side"
      glow="left"
    >
      <Stagger as="ul" className="grid gap-4 sm:grid-cols-2">
        {skills.map((group) => {
          const { tone, span } = groupStyles[group.id];
          return (
            <StaggerItem as="li" key={group.id} className={span}>
              <Pressable preset="surface" className="h-full">
                <div className="relative h-full rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-700/60 dark:bg-slate-800">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex size-10 items-center justify-center rounded-xl ${tones[tone].iconBox}`}
                    >
                      <SkillIcon id={group.id} />
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                      {t(`skills.${group.id}`)}
                    </h3>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <li
                        key={skill}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-transform duration-200 ease-out hover:-translate-y-0.5 ${tones[tone].chip}`}
                      >
                        <TechIcon skill={skill} />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Pressable>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
