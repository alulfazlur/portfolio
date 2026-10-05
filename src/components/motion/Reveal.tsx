"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import { easeOut } from "./ease";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** false = tampil langsung tanpa animasi (mis. di modal yang sudah punya animasi sendiri). */
  enabled?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  enabled = true,
}: RevealProps) {
  if (!enabled) return <div className={className}>{children}</div>;
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: easeOut, delay }}
    >
      {children}
    </m.div>
  );
}
