import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { tones } from "@/components/ui/tones";
import { projects } from "@/content/projects";
import { getAdjacentProjects, getProject } from "@/lib/content";
import { formatProjectPeriod } from "@/lib/format";
import { getLocale, getT } from "@/lib/i18n";
import { locales } from "@/lib/locales";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = await getT();
  const project = getProject(t, slug);
  if (!project) notFound();
  return {
    title: project.title,
    description: project.summary,
    alternates: {
      languages: Object.fromEntries(
        locales.map((lang) => [lang, `/${lang}/projects/${project.slug}`]),
      ),
    },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/[lang]/projects/[slug]">) {
  const { slug } = await params;
  const t = await getT();
  const locale = await getLocale();
  const project = getProject(t, slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(t, project.slug);
  const tone = tones[project.color];
  const meta = [
    ...(project.workplace
      ? [{ label: t("caseStudy.workplace"), value: project.workplace }]
      : []),
    { label: t("caseStudy.role"), value: project.role },
  ];

  return (
    <main
      id="main"
      className="relative isolate flex-1 overflow-hidden pt-12 pb-24 sm:pt-20"
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -top-40 left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full opacity-70 blur-3xl ${tone.soft}`}
      />
      <Container>
        <article>
          <Reveal>
            <Link
              href={`/${locale}#projects`}
              className="font-mono text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
            >
              ← {t("caseStudy.back")}
            </Link>
            <p className="mt-8 flex items-center gap-2 font-mono text-xs">
              <span className={`rounded-full px-2.5 py-1 ${tone.chip}`}>
                {t(`projects.types.${project.type}`)}
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                {formatProjectPeriod(project, t("experience.present"))}
              </span>
              {project.comingSoon && (
                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-amber-800 ring-1 ring-amber-200/70 ring-inset dark:bg-amber-400/10 dark:text-amber-200 dark:ring-amber-400/20">
                  {t("projects.comingSoon")}
                </span>
              )}
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tighter text-balance text-slate-900 sm:text-6xl dark:text-slate-50">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-400">
              {project.summary}
            </p>

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

            {(project.links.live || project.links.repo) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.links.live && (
                  <ButtonLink
                    href={project.links.live}
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
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
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
          </Reveal>

          <div className="mx-auto mt-16 max-w-2xl space-y-14">
            <Reveal>
              <h2 className={`font-mono text-sm ${tone.text}`}>
                {t("caseStudy.problem")}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                {project.problem}
              </p>
            </Reveal>
            <Reveal>
              <h2 className={`font-mono text-sm ${tone.text}`}>
                {t("caseStudy.whatIDid")}
              </h2>
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
            <Reveal>
              <div className={`rounded-3xl p-6 sm:p-8 ${tone.soft}`}>
                <h2 className={`font-mono text-sm ${tone.text}`}>
                  {t("caseStudy.result")}
                </h2>
                <p className="mt-3 text-xl leading-relaxed font-medium text-slate-900 dark:text-slate-50">
                  {project.result}
                </p>
              </div>
            </Reveal>
          </div>

          {project.gallery.length > 0 && (
            <section aria-labelledby="gallery-heading" className="mt-20">
              <h2
                id="gallery-heading"
                className="font-mono text-sm text-accent dark:text-accent-soft"
              >
                {t("caseStudy.gallery")}
              </h2>
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
        </article>

        <nav
          aria-label={t("caseStudy.moreProjects")}
          className="mt-24 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2 dark:border-slate-700/60"
        >
          {previous ? (
            <Link
              href={`/${locale}/projects/${previous.slug}`}
              className="rounded-3xl border border-slate-200 bg-white p-5 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-teal-300 dark:border-slate-700/60 dark:bg-slate-800 dark:hover:border-teal-500/40"
            >
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                ← {t("caseStudy.previous")}
              </span>
              <span className="mt-2 block font-semibold text-slate-900 dark:text-slate-50">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/${locale}/projects/${next.slug}`}
              className="rounded-3xl border border-slate-200 bg-white p-5 text-right transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-teal-300 dark:border-slate-700/60 dark:bg-slate-800 dark:hover:border-teal-500/40"
            >
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                {t("caseStudy.next")} →
              </span>
              <span className="mt-2 block font-semibold text-slate-900 dark:text-slate-50">
                {next.title}
              </span>
            </Link>
          )}
        </nav>
      </Container>
    </main>
  );
}
