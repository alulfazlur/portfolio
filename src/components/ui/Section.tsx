import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "./Container";

type SectionProps = {
  id: string;
  index: string;
  title: string;
  /** Teks kecil di ujung kanan garis judul (mis. jumlah item). */
  kicker?: string;
  /** "side": judul menempel di kolom kiri pada desktop. "stacked": judul besar di atas konten. */
  layout?: "side" | "stacked";
  /** "panel": bidang sedikit lebih gelap full-bleed, memutus ritme halaman. */
  variant?: "plain" | "panel";
  children: ReactNode;
};

const variants = {
  plain: "",
  panel:
    "border-y border-slate-900/8 bg-slate-100/80 dark:border-slate-100/8 dark:bg-slate-950/50",
};

export function Section({
  id,
  index,
  title,
  kicker,
  layout = "stacked",
  variant = "plain",
  children,
}: SectionProps) {
  const headingId = `${id}-heading`;
  const side = layout === "side";

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`relative ${variant === "panel" ? "py-20 sm:py-32" : "py-16 sm:py-28"} ${variants[variant]}`}
    >
      <Container>
        <Reveal className="flex items-baseline justify-between gap-6 border-t border-slate-900/10 pt-4 font-mono text-[0.8125rem] text-slate-500 lowercase dark:border-slate-100/10 dark:text-slate-400">
          <span>
            <span className="text-primary-700 dark:text-primary-300">
              {index}
            </span>
            <span
              aria-hidden="true"
              className="px-2 text-slate-300 dark:text-slate-600"
            >
              /
            </span>
            {title}
          </span>
          {kicker && <span>{kicker}</span>}
        </Reveal>
        <div
          className={
            side
              ? "mt-10 lg:grid lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16"
              : "mt-8"
          }
        >
          <Reveal className={side ? "lg:sticky lg:top-12 lg:self-start" : ""}>
            <h2
              id={headingId}
              className={`font-display leading-[0.95] font-light tracking-[-0.04em] text-slate-900 dark:text-slate-50 ${
                side
                  ? "text-[clamp(2.5rem,4vw,3.75rem)]"
                  : "text-[clamp(3rem,9vw,8.5rem)]"
              }`}
            >
              {title}
            </h2>
          </Reveal>
          <div className={side ? "mt-10 lg:mt-0" : "mt-12 sm:mt-16"}>
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}
