import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { afterOpening } from "@/components/motion/afterOpening";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { Container } from "@/components/ui/Container";
import { tones } from "@/components/ui/tones";
import { projects } from "@/content/projects";
import { getAdjacentProjects, getProject } from "@/lib/content";
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
          <div
            className="animate-fade-up motion-reduce:animate-none"
            style={afterOpening(0)}
          >
            <Link
              href={`/${locale}#projects`}
              className="font-mono text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
            >
              ← {t("caseStudy.back")}
            </Link>
          </div>
          <div className="mt-8">
            <CaseStudy project={project} level={1} />
          </div>
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
