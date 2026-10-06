import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Tag } from "@/components/ui/Tag";
import { tones } from "@/components/ui/tones";
import type { Project } from "@/content/types";
import { formatProjectPeriod } from "@/lib/format";
import { getT } from "@/lib/i18n";

type CaseStudyProps = {
  project: Project;
};

/** Isi case study di dalam modal, di atas halaman utama (judul h2). */
export async function CaseStudy({ project }: CaseStudyProps) {
  const t = await getT();
  const tone = tones[project.color];
  const meta = [
    ...(project.workplace
      ? [{ label: t("caseStudy.workplace"), value: project.workplace }]
      : []),
    { label: t("caseStudy.role"), value: project.role },
  ];

  return (
    <>
      <div>
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
        <h2
          id={`${project.slug}-title`}
          className="mt-4 max-w-3xl text-4xl font-semibold tracking-tighter text-balance text-slate-900 sm:text-6xl dark:text-slate-50"
        >
          {project.title}
        </h2>
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

      <div className="mx-auto mt-16 max-w-2xl space-y-14">
        <div>
          <h3 className={`font-mono text-sm ${tone.text}`}>
            {t("caseStudy.problem")}
          </h3>
          <p className="mt-4 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            {project.problem}
          </p>
        </div>
        <div>
          <h3 className={`font-mono text-sm ${tone.text}`}>
            {t("caseStudy.whatIDid")}
          </h3>
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
        </div>
        <div>
          <div className={`rounded-3xl p-6 sm:p-8 ${tone.soft}`}>
            <h3 className={`font-mono text-sm ${tone.text}`}>
              {t("caseStudy.result")}
            </h3>
            <p className="mt-3 text-xl leading-relaxed font-medium text-slate-900 dark:text-slate-50">
              {project.result}
            </p>
          </div>
        </div>
      </div>

      {project.gallery.length > 0 && (
        <section aria-labelledby={`${project.slug}-gallery`} className="mt-20">
          <h3
            id={`${project.slug}-gallery`}
            className="font-mono text-sm text-accent dark:text-accent-soft"
          >
            {t("caseStudy.gallery")}
          </h3>
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
