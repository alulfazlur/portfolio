"use client";

import { m, useScroll, useSpring } from "motion/react";

/** Bar tipis yang menunjukkan posisi scroll halaman. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.4,
  });
  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-linear-to-r from-accent to-accent-2 dark:from-accent-soft dark:to-accent-2-soft"
    />
  );
}
