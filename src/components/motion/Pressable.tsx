"use client";

import { m, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { softSpring, spring } from "./spring";

type Preset = "button" | "icon" | "card" | "surface";

const presets: Record<Preset, Variants> = {
  button: {
    rest: { y: 0, scale: 1 },
    hover: { y: -2, scale: 1.02 },
    tap: { y: 0, scale: 0.97 },
  },
  icon: {
    rest: { y: 0, scale: 1 },
    hover: { y: -2, scale: 1.12 },
    tap: { y: 0, scale: 0.9 },
  },
  card: { rest: { y: 0 }, hover: { y: -6 }, tap: { y: -3 } },
  surface: { rest: { y: 0 }, hover: { y: -3 }, tap: { y: -3 } },
};

/** Kartu (card/surface) punya lapisan bayangan sendiri yang di-fade lewat opacity. */
const hasShadowLayer = (preset: Preset) =>
  preset === "card" || preset === "surface";

type PressableProps = {
  children: ReactNode;
  preset?: Preset;
  className?: string;
};

/** Efek hover/tap berbasis spring. Anak `Nudge` ikut bereaksi lewat variant "hover". */
export function Pressable({
  children,
  preset = "button",
  className,
}: PressableProps) {
  const shadow = hasShadowLayer(preset);
  return (
    <m.div
      // Tanpa tabIndex, Motion memberi tabindex="0" pada pembungkus whileTap, sehingga
      // tiap tombol/link punya tab stop kosong tambahan. Yang difokus cukup elemen di dalamnya.
      tabIndex={-1}
      className={`${shadow ? "group/press relative will-change-transform" : ""} ${className ?? ""}`}
      variants={presets[preset]}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap="tap"
      transition={shadow ? softSpring : spring}
    >
      {shadow && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 shadow-2xl shadow-slate-900/10 transition-opacity duration-500 ease-out will-change-[opacity] group-hover/press:opacity-100 dark:shadow-slate-950/50"
        />
      )}
      {children}
    </m.div>
  );
}
