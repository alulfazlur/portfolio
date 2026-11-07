import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Crosshairs } from "@/components/ui/Crosshairs";
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
        <p className="text-[clamp(1.5rem,2.5vw,2.25rem)] leading-[1.25] font-light tracking-[-0.02em] text-balance text-slate-900 dark:text-slate-50">
          {lead}
        </p>
      </Reveal>

      <div className="mt-14 grid gap-10 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-12">
        <Reveal>
          <figure>
            <div className="relative p-2">
              <Crosshairs />
              <Image
                src={profile.photo}
                alt={t("about.photoAlt", { name: profile.name })}
                loading="eager"
                placeholder="blur"
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 40vw, 100vw"
                className="aspect-[4/5] w-full rounded-md object-cover object-[center_35%]"
              />
            </div>
            <figcaption className="mt-3 flex justify-between gap-4 px-2 font-mono text-xs text-slate-500 lowercase dark:text-slate-400">
              <span>{profile.name}</span>
              <span className="text-right">{facts.location.value}</span>
            </figcaption>
          </figure>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col justify-between gap-10">
          <div className="space-y-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {rest.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <dl className="divide-y divide-slate-900/8 border-y border-slate-900/10 dark:divide-slate-100/8 dark:border-slate-100/10">
            {factIds.map((id) => (
              <div
                key={id}
                className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <dt className="font-mono text-[0.8125rem] text-slate-500 lowercase dark:text-slate-400">
                  {facts[id].label}
                </dt>
                <dd className="text-slate-800 sm:text-right dark:text-slate-100">
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
