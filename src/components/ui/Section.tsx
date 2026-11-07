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
  /** "ink": blok gelap full-bleed, memutus ritme halaman kertas. */
  variant?: "paper" | "ink";
  children: ReactNode;
};

const variants = {
  paper: "",
  ink: "bg-slate-900 text-slate-100 dark:bg-slate-950",
};

export function Section({
  id,
  index,
  title,
  kicker,
  layout = "stacked",
  variant = "paper",
  children,
}: SectionProps) {
  const headingId = `${id}-heading`;
  const side = layout === "side";
  const ink = variant === "ink";
  const muted = ink ? "text-slate-400" : "text-slate-500 dark:text-slate-400";
  const rule = ink
    ? "border-slate-100/15"
    : "border-slate-900/15 dark:border-slate-100/15";

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`relative ${ink ? "py-20 sm:py-32" : "py-16 sm:py-28"} ${variants[variant]}`}
    >
      <Container>
        <Reveal
          className={`flex items-baseline justify-between gap-6 border-t pt-4 font-mono text-xs tracking-[0.08em] uppercase ${rule} ${muted}`}
        >
          <span>
            <span className="text-primary-600 dark:text-primary-400">
              ({index})
            </span>{" "}
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
              className={`font-display leading-[0.9] font-semibold tracking-[-0.04em] ${
                ink ? "text-slate-50" : "text-slate-900 dark:text-slate-50"
              } ${
                // Judul samping tetap lebar normal agar muat di kolom 4/12 ("Experience.", "Pengalaman.").
                side
                  ? "text-[clamp(2.75rem,4vw,4rem)]"
                  : "text-[clamp(3.5rem,13vw,13rem)] font-stretch-expanded"
              }`}
            >
              {title}
              <span className="text-primary-600 dark:text-primary-400">.</span>
            </h2>
          </Reveal>
          <div className={side ? "mt-10 lg:mt-0" : "mt-12 sm:mt-20"}>
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}
