import type { ReactNode } from "react";
import { GrowLine } from "@/components/motion/GrowLine";
import { Reveal } from "@/components/motion/Reveal";
import type { AccentColor } from "@/content/types";
import { Container } from "./Container";
import { tones } from "./tones";

type SectionProps = {
  id: string;
  index: string;
  title: string;
  tone: AccentColor;
  /** "side": judul menempel di kolom kiri pada desktop. "stacked": judul di atas konten. */
  layout?: "side" | "stacked";
  glow: "left" | "right";
  children: ReactNode;
};

export function Section({
  id,
  index,
  title,
  tone,
  layout = "stacked",
  glow,
  children,
}: SectionProps) {
  const headingId = `${id}-heading`;
  const side = layout === "side";

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="relative isolate overflow-x-clip py-14 sm:py-20"
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 -z-10 size-[34rem] rounded-full blur-3xl ${tones[tone].glow} ${
          glow === "left" ? "-left-56" : "-right-56"
        }`}
      />
      <Container
        className={
          side ? "lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16" : ""
        }
      >
        <Reveal
          className={`mb-10 flex flex-col items-start gap-4 sm:mb-14 ${
            side ? "lg:sticky lg:top-28 lg:mb-0 lg:self-start" : ""
          }`}
        >
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs ${tones[tone].chip}`}
          >
            <span
              aria-hidden="true"
              className={`size-1.5 rounded-full ${tones[tone].dot}`}
            />
            {index}
          </span>
          <h2
            id={headingId}
            className={`font-semibold tracking-tight text-slate-900 dark:text-slate-50 ${
              side ? "text-4xl" : "text-4xl sm:text-5xl"
            }`}
          >
            {title}
          </h2>
          {side && (
            <GrowLine className="h-1 w-12 rounded-full bg-linear-to-r from-primary-700 to-secondary-700" />
          )}
        </Reveal>
        <div>{children}</div>
      </Container>
    </section>
  );
}
