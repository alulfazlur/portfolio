import Image from "next/image";
import { afterOpening } from "@/components/motion/afterOpening";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Tag } from "@/components/ui/Tag";
import { tones } from "@/components/ui/tones";
import type { Project } from "@/content/types";
import { formatProjectPeriod } from "@/lib/format";
import { getT } from "@/lib/i18n";

type CaseStudyProps = {
  project: Project;
  /** 1 di halaman case study (judul = h1), 2 di dalam modal di atas halaman utama. */
  level: 1 | 2;
};

/** Isi case study: dipakai halaman /projects/[slug] dan modal-nya. */
export async function CaseStudy({ project, level }: CaseStudyProps) {
  const t = await getT();
  const tone = tones[project.color];
  const Title = level === 1 ? "h1" : "h2";
  const Heading = level === 1 ? "h2" : "h3";
  // Di modal, animasi morph-nya sudah jadi animasi masuk; animasi lain hanya di halaman penuh.
  const reveal = level === 1;
  // Bagian atas (judul, cover) pakai animasi CSS agar tidak menunggu hydration (LCP di HP).
  const enter = (ms: number) =>
    reveal
      ? {
          className: "animate-fade-up motion-reduce:animate-none",
          style: afterOpening(ms),
        }
      : {};
  const meta = [
    ...(project.workplace
      ? [{ label: t("caseStudy.workplace"), value: project.workplace }]
      : []),
    { label: t("caseStudy.role"), value: project.role },
  ];

  return (
    <>
      <div {...enter(0)}>
        <p className="flex items-center gap-2 font-mono text-xs">
          <span className={`rounded-full px-2.5 py-1 ${tone.chip}`}>
            {t(`projects.types.${project.type}`)}
          </span>
          <span className="text-slate-600 dark:text-slate-400">
            {formatProjectPeriod(project, t("experience.present"))}
          </span>
          {project.comingSoon && (
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-amber-800 ring-1 ring-amber-200/70 ring-inset dark:bg-amber-400/10 dark:text-amber-200 dark:ring-amber-400/20">
              {t("projects.comingSoon")}
            </span>
          )}
        </p>
        <Title
          id={`${project.slug}-title`}
          className="mt-4 max-w-3xl text-4xl font-semibold tracking-tighter text-balance text-slate-900 sm:text-6xl dark:text-slate-50"
        >
          {project.title}
        </Title>
        <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-400">
            {project.summary}
          </p>
          {(project.links.live || project.links.repo) && (
            <div className="flex shrink-0 flex-wrap gap-3">
              {project.links.live && (
                <ButtonLink
                  href={project.links.live}
                  tone={project.color}
                  external
                  arrow="up-right"
                >
                  {t("caseStudy.live")}
                </ButtonLink>
              )}
              {project.links.repo && (
                <ButtonLink
                  href={project.links.repo}
                  variant="secondary"
                  external
                  arrow="up-right"
                >
                  {t("caseStudy.source")}
                </ButtonLink>
              )}
            </div>
          )}
        </div>

        <dl className="mt-10 grid gap-6 rounded-3xl border border-slate-200 bg-white/80 p-6 backdrop-blur sm:grid-cols-[repeat(2,minmax(0,auto))_minmax(0,1fr)] sm:gap-10 dark:border-slate-700/60 dark:bg-slate-800/80">
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="font-mono text-xs tracking-wide text-slate-500 uppercase dark:text-slate-400">
                {item.label}
              </dt>
              <dd className="mt-1 text-slate-900 dark:text-slate-100">
                {item.value}
              </dd>
            </div>
          ))}
          <div>
            <dt className="font-mono text-xs tracking-wide text-slate-500 uppercase dark:text-slate-400">
              {t("caseStudy.stack")}
            </dt>
            <dd className="mt-2">
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-12">
        <div {...enter(100)}>
          <div
            className={`flex items-end overflow-hidden rounded-3xl border border-slate-200 px-4 pt-4 sm:px-12 sm:pt-12 dark:border-slate-700/60 ${tone.frame}`}
          >
            <Image
              src={project.cover}
              alt={t("projects.coverAlt", { title: project.title })}
              placeholder="blur"
              quality={90}
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1100px) 1052px, 100vw"
              className="max-h-[70vh] w-full rounded-t-xl object-cover object-top shadow-2xl ring-1 shadow-slate-900/15 ring-slate-900/5 dark:shadow-slate-950/50 dark:ring-white/10"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-2xl space-y-14">
        <Reveal enabled={reveal}>
          <Heading className={`font-mono text-sm ${tone.text}`}>
            {t("caseStudy.problem")}
          </Heading>
          <p className="mt-4 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            {project.problem}
          </p>
        </Reveal>
        <Reveal enabled={reveal}>
          <Heading className={`font-mono text-sm ${tone.text}`}>
            {t("caseStudy.whatIDid")}
          </Heading>
          <ul className="mt-5 space-y-4">
            {project.whatIDid.map((item) => (
              <li
                key={item.slice(0, 24)}
                className="flex gap-4 text-lg leading-relaxed text-slate-700 dark:text-slate-300"
              >
                <span
                  aria-hidden="true"
                  className={`mt-2.5 size-2 shrink-0 rounded-full ${tone.dot}`}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal enabled={reveal}>
          <div className={`rounded-3xl p-6 sm:p-8 ${tone.soft}`}>
            <Heading className={`font-mono text-sm ${tone.text}`}>
              {t("caseStudy.result")}
            </Heading>
            <p className="mt-3 text-xl leading-relaxed font-medium text-slate-900 dark:text-slate-50">
              {project.result}
            </p>
          </div>
        </Reveal>
      </div>

      {project.gallery.length > 0 && (
        <section aria-labelledby={`${project.slug}-gallery`} className="mt-20">
          <Heading
            id={`${project.slug}-gallery`}
            className="font-mono text-sm text-accent dark:text-accent-soft"
          >
            {t("caseStudy.gallery")}
          </Heading>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {project.gallery.map((src, index) => (
              <li key={src}>
                <Image
                  src={src}
                  alt={t("caseStudy.screenshotAlt", {
                    title: project.title,
                    number: index + 1,
                  })}
                  width={1200}
                  height={750}
                  quality={90}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700/60"
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
