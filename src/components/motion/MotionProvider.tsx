"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Fitur animasi (gesture, inView, layout) diunduh terpisah setelah halaman tampil,
// agar tidak membebani JavaScript awal. `strict` menolak `motion.*`; pakai `m.*`.
const loadFeatures = () => import("./features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
