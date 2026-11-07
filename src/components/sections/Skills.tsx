import { Stagger } from "@/components/motion/Stagger";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { Section } from "@/components/ui/Section";
import { TechIcon } from "@/components/ui/TechIcon";
import { skills } from "@/content/skills";
import { getT } from "@/lib/i18n";

const pad = (n: number) => String(n).padStart(2, "0");

export async function Skills() {
  const t = await getT();
  return (
    <Section id="skills" index="02" title={t("sections.skills")}>
      <Stagger as="ul" className="space-y-10 sm:space-y-12">
        {skills.map((group) => (
          <StaggerItem
            as="li"
            key={group.id}
            className="grid gap-4 lg:grid-cols-12 lg:gap-8"
          >
            <h3 className="flex items-baseline justify-between gap-4 font-mono text-[0.8125rem] text-slate-500 lowercase lg:col-span-3 lg:flex-col lg:justify-start lg:gap-1 lg:pt-3 dark:text-slate-400">
              <span className="text-slate-900 dark:text-slate-100">
                {t(`skills.${group.id}`)}
              </span>
              <span>[{pad(group.items.length)}]</span>
            </h3>
            {/* Matriks sel: garis kiri/atas di wadah, kanan/bawah di tiap sel. */}
            <ul className="grid grid-cols-2 border-t border-l border-slate-900/10 sm:grid-cols-3 lg:col-span-9 xl:grid-cols-4 dark:border-slate-100/10">
              {group.items.map((skill, index) => (
                <li
                  key={skill}
                  className="group flex min-h-16 flex-col justify-between gap-2 border-r border-b border-slate-900/10 px-4 py-3 transition-colors duration-300 hover:bg-primary-50 dark:border-slate-100/10 dark:hover:bg-primary-400/10"
                >
                  <span className="flex items-center justify-between gap-2">
                    <span
                      aria-hidden="true"
                      className="font-mono text-[0.6875rem] text-slate-400 dark:text-slate-500"
                    >
                      {pad(index + 1)}
                    </span>
                    <span className="text-slate-500 transition-colors duration-300 group-hover:text-primary-600 dark:text-slate-400 dark:group-hover:text-primary-300">
                      <TechIcon skill={skill} />
                    </span>
                  </span>
                  <span className="text-[1.0625rem] leading-tight text-slate-800 dark:text-slate-100">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
