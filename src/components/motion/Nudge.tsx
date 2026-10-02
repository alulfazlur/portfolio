"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { spring } from "./spring";

const offsets = {
  right: { x: 4, y: 0 },
  "up-right": { x: 3, y: -3 },
  down: { x: 0, y: 3 },
};

/** Menggeser ikon kecil (mis. panah) saat parent `Pressable` di-hover. */
export function Nudge({
  children,
  direction = "right",
}: {
  children: ReactNode;
  direction?: keyof typeof offsets;
}) {
  return (
    <motion.span
      aria-hidden="true"
      className="inline-block"
      variants={{
        rest: { x: 0, y: 0 },
        hover: offsets[direction],
        tap: offsets[direction],
      }}
      transition={spring}
    >
      {children}
    </motion.span>
  );
}
