"use client";

import { m } from "motion/react";
import { easeOut } from "./ease";

/** Garis aksen yang tumbuh dari kiri saat masuk viewport. */
export function GrowLine({ className }: { className?: string }) {
  return (
    <m.span
      aria-hidden="true"
      className={`block origin-left ${className ?? ""}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: easeOut, delay: 0.15 }}
    />
  );
}
