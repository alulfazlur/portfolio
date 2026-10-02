import Image from "next/image";
import Link from "next/link";
import { Nudge } from "@/components/motion/Nudge";
import { Pressable } from "@/components/motion/Pressable";
import type { Project } from "@/content/types";
import { Tag } from "./Tag";
import { tones } from "./tones";

type ProjectCardProps = {
  project: Project;
  href: string;
  coverAlt: string;
  typeLabel: string;
  period: string;
  stackLabel: string;
  comingSoonLabel: string;
  liveLabel: string;
};

/**
 * Seluruh kartu bisa diklik lewat link judul (pola "stretched link"),
 * sementara tombol Live site tetap link terpisah di atasnya.
 */
export function ProjectCard({
  project,
  href,
  coverAlt,
  typeLabel,
  period,
  stackLabel,
  comingSoonLabel,
  liveLabel,
}: ProjectCardProps) {
  const tone = tones[project.color];
  const wide = project.featured;

  return (
    <Pressable preset="card" className="h-full">
      <article
        className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-[border-color] duration-500 ease-out has-[h3_a:focus-visible]:outline-2 has-[h3_a:focus-visible]:outline-offset-4 has-[h3_a:focus-visible]:outline-accent dark:border-slate-700/60 dark:bg-slate-800 dark:has-[h3_a:focus-visible]:outline-accent-soft ${tone.card} ${
          wide ? "lg:flex-row" : ""
        }`}
      >
        <div
          className={`relative flex items-end overflow-hidden px-6 pt-6 sm:px-8 sm:pt-8 ${wide ? "lg:w-3/5 lg:shrink-0" : ""} ${tone.frame}`}
        >
          {project.comingSoon && (
            <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 font-mono text-xs text-slate-800 shadow-sm backdrop-blur dark:bg-slate-900/85 dark:text-slate-100">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-amber-500 dark:bg-amber-400"
              />
              {comingSoonLabel}
            </span>
          )}
          <Image
            src={project.cover}
            alt={coverAlt}
            placeholder="blur"
            quality={90}
            sizes={
              wide
                ? "(min-width: 1024px) 640px, 100vw"
                : "(min-width: 1024px) 350px, (min-width: 640px) 50vw, 100vw"
            }
            className="aspect-[16/10] w-full origin-bottom rounded-t-xl object-cover object-left-top shadow-xl ring-1 shadow-slate-900/15 ring-slate-900/5 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.02] dark:shadow-slate-950/50 dark:ring-white/10"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs">
              <span className={`rounded-full px-2.5 py-1 ${tone.chip}`}>
                {typeLabel}
              </span>
              {project.workplace && (
                <span className="font-sans text-sm font-medium text-slate-700 dark:text-slate-200">
                  {project.workplace}
                </span>
              )}
              <span className="text-slate-500 dark:text-slate-400">
                {period}
              </span>
            </p>
            <span
              aria-hidden="true"
              className={`inline-flex size-9 items-center justify-center rounded-full ${tone.iconBox}`}
            >
              <Nudge direction="up-right">↗</Nudge>
            </span>
          </div>
          <h3
            className={`font-semibold tracking-tight text-slate-900 dark:text-slate-50 ${
              wide ? "text-2xl" : "text-lg"
            }`}
          >
            <Link
              href={href}
              className="after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none"
            >
              {project.title}
            </Link>
          </h3>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {project.summary}
          </p>
          <ul
            className="mt-auto flex flex-wrap gap-1.5 pt-3"
            aria-label={stackLabel}
          >
            {project.stack.slice(0, 4).map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative z-10 mt-2 inline-flex w-fit items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-[transform,opacity] duration-200 ease-out hover:-translate-y-0.5 hover:opacity-90 ${tone.chip}`}
            >
              {liveLabel}
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </article>
    </Pressable>
  );
}
