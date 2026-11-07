import Image from "next/image";
import { Pressable } from "@/components/motion/Pressable";
import { ZoomLink } from "@/components/motion/ZoomLink";
import type { Project } from "@/content/types";
import { Tag } from "./Tag";
import { tones } from "./tones";

type ProjectCardProps = {
  project: Project;
  /** Nomor urut di seluruh daftar project ("01", "02", ...). */
  index: string;
  href: string;
  coverAlt: string;
  typeLabel: string;
  period: string;
  stackLabel: string;
  comingSoonLabel: string;
  liveLabel: string;
  caseStudyLabel: string;
};

/**
 * Seluruh kartu bisa diklik lewat link judul (pola "stretched link"),
 * sementara link Live site tetap terpisah di atasnya.
 * Link judul membuka case study sebagai modal yang zoom dari posisi kartu; padding dan sudut
 * kartu setengah dari milik modal (mulai sm) agar morph-nya menyambung.
 */
export function ProjectCard({
  project,
  index,
  href,
  coverAlt,
  typeLabel,
  period,
  stackLabel,
  comingSoonLabel,
  liveLabel,
  caseStudyLabel,
}: ProjectCardProps) {
  const tone = tones[project.color];
  const wide = project.featured;

  return (
    <Pressable preset="card" className="h-full">
      <article
        className={`group relative flex h-full flex-col overflow-hidden rounded-[8px] border border-slate-900/10 bg-slate-50 transition-[border-color] duration-500 ease-out hover:border-primary-300 has-[h3_a:focus-visible]:outline-2 has-[h3_a:focus-visible]:outline-offset-4 has-[h3_a:focus-visible]:outline-primary-600 dark:border-slate-100/10 dark:bg-slate-900 dark:hover:border-primary-400/50 dark:has-[h3_a:focus-visible]:outline-primary-300 ${
          wide ? "lg:flex-row" : ""
        }`}
      >
        <div
          className={`relative flex items-end overflow-hidden px-6 pt-6 sm:px-8 sm:pt-8 ${wide ? "lg:w-3/5 lg:shrink-0" : ""} ${tone.frame}`}
        >
          {project.comingSoon && (
            <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-2 rounded bg-slate-50/90 px-2.5 py-1 font-mono text-xs text-slate-700 lowercase backdrop-blur dark:bg-slate-900/85 dark:text-slate-200">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-accent-500"
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
                ? "(min-width: 1024px) 760px, 100vw"
                : "(min-width: 1024px) 620px, (min-width: 640px) 50vw, 100vw"
            }
            className="aspect-[16/10] w-full origin-bottom rounded-t-[4px] object-cover object-left-top shadow-lg ring-1 shadow-slate-900/10 ring-slate-900/5 transition-transform duration-700 ease-out-expo group-hover:-translate-y-1.5 group-hover:scale-[1.02] dark:shadow-slate-950/40 dark:ring-white/10"
          />
        </div>
        <div
          data-zoom-body
          className={`flex flex-1 flex-col gap-3 p-5 sm:p-6 ${wide ? "lg:justify-end lg:p-8" : ""}`}
        >
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-slate-500 lowercase dark:text-slate-400">
            <span className="text-primary-700 dark:text-primary-300">
              {index}
            </span>
            <span aria-hidden="true">·</span>
            <span>{typeLabel}</span>
            {project.workplace && (
              <>
                <span aria-hidden="true">·</span>
                <span>{project.workplace}</span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>{period}</span>
          </p>
          <h3
            className={`flex items-start justify-between gap-4 leading-tight font-normal tracking-[-0.025em] text-slate-900 dark:text-slate-50 ${
              wide
                ? "text-[clamp(1.6rem,2.8vw,2.5rem)]"
                : "text-[clamp(1.3rem,1.8vw,1.6rem)]"
            }`}
          >
            <ZoomLink
              href={href}
              className="after:absolute after:inset-0 after:rounded-[8px] focus-visible:outline-none"
            >
              {project.title}
            </ZoomLink>
            <span
              aria-hidden="true"
              className="shrink-0 text-slate-400 transition-[transform,color] duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary-600 dark:group-hover:text-primary-300"
            >
              ↗
            </span>
          </h3>
          <p className="max-w-xl leading-relaxed text-slate-600 dark:text-slate-400">
            {project.summary}
          </p>
          <ul
            className="mt-auto flex flex-wrap gap-1.5 pt-2"
            aria-label={stackLabel}
          >
            {project.stack.slice(0, 4).map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
          {/* Baris tanpa Live site hanya perlu tampil di layar sentuh (untuk penanda kartu). */}
          <div
            className={`mt-1 items-center justify-between gap-3 ${
              project.links.live ? "flex" : "hidden pointer-coarse:flex"
            }`}
          >
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex min-h-11 items-center gap-1.5 link-sweep font-mono text-[0.8125rem] text-primary-700 lowercase dark:text-primary-300"
              >
                {liveLabel}
                <span aria-hidden="true">↗</span>
              </a>
            )}
            {/* Tanpa hover di layar sentuh, ini penanda bahwa kartu bisa diketuk. Link judul sudah dibaca screen reader. */}
            <span
              aria-hidden="true"
              className="ml-auto hidden font-mono text-xs text-primary-700 lowercase dark:text-primary-300 pointer-coarse:inline"
            >
              {caseStudyLabel} →
            </span>
          </div>
        </div>
      </article>
    </Pressable>
  );
}
