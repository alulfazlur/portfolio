import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { profile } from "@/content/profile";
import type { FactId } from "@/content/types";
import { getT } from "@/lib/i18n";

export async function About() {
  const t = await getT();
  const [lead, ...rest] = t("profile.about", { returnObjects: true });
  const facts = t("profile.facts", { returnObjects: true });
  const factIds: FactId[] = ["location", "experience", "education"];

  return (
    <Section id="about" index="01" title={t("sections.about")} layout="side">
      <Reveal>
        <p className="text-[clamp(1.5rem,2.7vw,2.5rem)] leading-[1.15] font-medium tracking-[-0.025em] text-balance text-slate-900 dark:text-slate-50">
          {lead}
        </p>
      </Reveal>

      <div className="mt-14 grid gap-10 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-12">
        <Reveal>
          <figure>
            <Image
              src={profile.photo}
              alt={t("about.photoAlt", { name: profile.name })}
              loading="eager"
              placeholder="blur"
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 40vw, 100vw"
              className="aspect-[4/5] w-full rounded-[2px] object-cover object-[center_35%]"
            />
            <figcaption className="mt-3 flex justify-between gap-4 font-mono text-xs tracking-[0.06em] text-slate-500 uppercase dark:text-slate-400">
              <span>{profile.name}</span>
              <span className="text-right">{facts.location.value}</span>
            </figcaption>
          </figure>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col justify-between gap-10">
          <div className="space-y-5 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            {rest.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <dl className="border-t border-slate-900/15 dark:border-slate-100/15">
            {factIds.map((id) => (
              <div
                key={id}
                className="flex flex-col gap-1 border-b border-slate-900/15 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 dark:border-slate-100/15"
              >
                <dt className="font-mono text-xs tracking-[0.08em] text-slate-500 uppercase dark:text-slate-400">
                  {facts[id].label}
                </dt>
                <dd className="font-medium text-slate-900 sm:text-right dark:text-slate-100">
                  {facts[id].value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
