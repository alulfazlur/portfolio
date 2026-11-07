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
 * Kartu di atas blok tinta (section Projects). Seluruh kartu bisa diklik lewat link judul
 * (pola "stretched link"), sementara link Live site tetap terpisah di atasnya.
 * Link judul membuka case study sebagai modal yang zoom dari posisi kartu; padding dan sudut
 * bingkai screenshot setengah dari milik modal (mulai sm) agar morph-nya menyambung.
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
        className={`group relative flex h-full flex-col gap-5 rounded-[4px] has-[h3_a:focus-visible]:outline-2 has-[h3_a:focus-visible]:outline-offset-8 has-[h3_a:focus-visible]:outline-primary-400 ${
          wide ? "lg:flex-row lg:gap-10" : ""
        }`}
      >
        <div
          className={`relative flex items-end overflow-hidden rounded-[4px] px-6 pt-6 sm:px-8 sm:pt-8 ${wide ? "lg:w-3/5 lg:shrink-0" : ""} ${tone.frame}`}
        >
          {project.comingSoon && (
            <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-2 rounded-[2px] bg-slate-900/85 px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.06em] text-slate-50 uppercase backdrop-blur">
              <span aria-hidden="true" className="size-1.5 bg-accent-400" />
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
                ? "(min-width: 1024px) 800px, 100vw"
                : "(min-width: 1024px) 660px, (min-width: 640px) 50vw, 100vw"
            }
            className="aspect-[16/10] w-full origin-bottom rounded-t-[2px] object-cover object-left-top shadow-2xl shadow-slate-950/30 transition-transform duration-700 ease-out-expo group-hover:-translate-y-2 group-hover:scale-[1.03]"
          />
        </div>
        <div
          data-zoom-body
          className={`flex flex-1 flex-col gap-3 ${wide ? "lg:justify-end lg:pb-2" : ""}`}
        >
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-[0.06em] text-slate-400 uppercase">
            <span className="text-primary-400">{index}</span>
            <span className="text-slate-200">{typeLabel}</span>
            {project.workplace && <span>{project.workplace}</span>}
            <span>{period}</span>
          </p>
          <h3
            className={`flex items-start justify-between gap-4 leading-[1.02] font-semibold tracking-[-0.035em] text-slate-50 ${
              wide
                ? "text-[clamp(1.9rem,3.6vw,3.5rem)]"
                : "text-[clamp(1.5rem,2.2vw,2.1rem)]"
            }`}
          >
            <ZoomLink
              href={href}
              className="after:absolute after:inset-0 after:rounded-[4px] focus-visible:outline-none"
            >
              {project.title}
            </ZoomLink>
            <span
              aria-hidden="true"
              className="shrink-0 text-primary-400 transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1"
            >
              ↗
            </span>
          </h3>
          <p className="max-w-xl leading-relaxed text-slate-400">
            {project.summary}
          </p>
          <ul
            className="mt-auto flex flex-wrap gap-1.5 pt-2 text-slate-300"
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
                className="relative z-10 inline-flex min-h-11 items-center gap-1.5 link-sweep text-sm font-medium text-slate-100"
              >
                {liveLabel}
                <span aria-hidden="true">↗</span>
              </a>
            )}
            {/* Tanpa hover di layar sentuh, ini penanda bahwa kartu bisa diketuk. Link judul sudah dibaca screen reader. */}
            <span
              aria-hidden="true"
              className="ml-auto hidden font-mono text-xs tracking-[0.06em] text-primary-400 uppercase pointer-coarse:inline"
            >
              {caseStudyLabel} →
            </span>
          </div>
        </div>
      </article>
    </Pressable>
  );
}
