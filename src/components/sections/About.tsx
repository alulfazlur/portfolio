import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { tones } from "@/components/ui/tones";
import { profile } from "@/content/profile";
import type { AccentColor, FactId } from "@/content/types";
import { getT } from "@/lib/i18n";

const factTones: Record<FactId, AccentColor> = {
  location: "sky",
  experience: "teal",
  current: "indigo",
  education: "amber",
};

export async function About() {
  const t = await getT();
  const paragraphs = t("profile.about", { returnObjects: true });
  const facts = t("profile.facts", { returnObjects: true });
  const factIds: FactId[] = ["location", "experience", "current", "education"];

  return (
    <Section
      id="about"
      index="01"
      title={t("sections.about")}
      tone="teal"
      layout="side"
      glow="right"
    >
      <div className="grid gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-16">
        <Reveal>
          <div className="group relative isolate mx-4 max-w-sm sm:mx-auto md:mx-0">
            <div
              aria-hidden="true"
              className="absolute -inset-2 -z-10 rotate-2 rounded-[2rem] bg-linear-to-br from-accent via-accent-2 to-accent-3 opacity-90 transition-transform duration-500 ease-out group-hover:rotate-6 sm:-inset-3 sm:rotate-3 sm:group-hover:rotate-6"
            />
            <Image
              src={profile.photo}
              alt={t("about.photoAlt", { name: profile.name })}
              loading="eager"
              width={500}
              height={500}
              sizes="(min-width: 768px) 400px, 100vw"
              className="aspect-square w-full rounded-3xl object-cover ring-4 ring-slate-50 transition-transform duration-500 ease-out group-hover:-rotate-1 dark:ring-slate-900"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-5 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <dl className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {factIds.map((id) => (
              <div
                key={id}
                className={`rounded-2xl p-4 ${tones[factTones[id]].soft}`}
              >
                <dt
                  className={`font-mono text-xs tracking-wide uppercase ${tones[factTones[id]].text}`}
                >
                  {facts[id].label}
                </dt>
                <dd className="mt-1 font-medium text-slate-900 dark:text-slate-100">
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
