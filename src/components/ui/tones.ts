import type { AccentColor } from "@/content/types";

// Class Tailwind per warna aksen. Ditulis lengkap (bukan dirangkai) agar terdeteksi Tailwind.
type Tone = {
  text: string;
  chip: string;
  dot: string;
  iconBox: string;
  card: string;
  soft: string;
  glow: string;
  /** Bingkai berwarna di belakang screenshot project. */
  frame: string;
};

export const tones: Record<AccentColor, Tone> = {
  teal: {
    text: "text-teal-700 dark:text-teal-300",
    chip: "bg-teal-50 text-teal-800 ring-1 ring-teal-200/70 ring-inset dark:bg-teal-400/10 dark:text-teal-200 dark:ring-teal-400/20",
    dot: "bg-teal-500 dark:bg-teal-400",
    iconBox:
      "bg-teal-100/70 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300",
    card: "hover:border-teal-300 dark:hover:border-teal-400/40",
    soft: "bg-teal-50/80 dark:bg-teal-400/10",
    glow: "bg-teal-200/45 dark:bg-teal-500/10",
    frame:
      "bg-linear-to-br from-teal-200 via-teal-100 to-teal-300/80 dark:from-teal-500/30 dark:via-teal-500/15 dark:to-teal-400/10",
  },
  sky: {
    text: "text-sky-700 dark:text-sky-300",
    chip: "bg-sky-50 text-sky-800 ring-1 ring-sky-200/70 ring-inset dark:bg-sky-400/10 dark:text-sky-200 dark:ring-sky-400/20",
    dot: "bg-sky-500 dark:bg-sky-400",
    iconBox: "bg-sky-100/70 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300",
    card: "hover:border-sky-300 dark:hover:border-sky-400/40",
    soft: "bg-sky-50/80 dark:bg-sky-400/10",
    glow: "bg-sky-200/45 dark:bg-sky-500/10",
    frame:
      "bg-linear-to-br from-sky-200 via-sky-100 to-sky-300/80 dark:from-sky-500/30 dark:via-sky-500/15 dark:to-sky-400/10",
  },
  indigo: {
    text: "text-indigo-700 dark:text-indigo-300",
    chip: "bg-indigo-50 text-indigo-800 ring-1 ring-indigo-200/70 ring-inset dark:bg-indigo-400/10 dark:text-indigo-200 dark:ring-indigo-400/20",
    dot: "bg-indigo-500 dark:bg-indigo-400",
    iconBox:
      "bg-indigo-100/70 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-300",
    card: "hover:border-indigo-300 dark:hover:border-indigo-400/40",
    soft: "bg-indigo-50/80 dark:bg-indigo-400/10",
    glow: "bg-indigo-200/45 dark:bg-indigo-500/10",
    frame:
      "bg-linear-to-br from-indigo-200 via-indigo-100 to-indigo-300/80 dark:from-indigo-500/30 dark:via-indigo-500/15 dark:to-indigo-400/10",
  },
  emerald: {
    text: "text-emerald-700 dark:text-emerald-300",
    chip: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200/70 ring-inset dark:bg-emerald-400/10 dark:text-emerald-200 dark:ring-emerald-400/20",
    dot: "bg-emerald-500 dark:bg-emerald-400",
    iconBox:
      "bg-emerald-100/70 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300",
    card: "hover:border-emerald-300 dark:hover:border-emerald-400/40",
    soft: "bg-emerald-50/80 dark:bg-emerald-400/10",
    glow: "bg-emerald-200/45 dark:bg-emerald-500/10",
    frame:
      "bg-linear-to-br from-emerald-200 via-emerald-100 to-emerald-300/80 dark:from-emerald-500/30 dark:via-emerald-500/15 dark:to-emerald-400/10",
  },
  amber: {
    text: "text-amber-700 dark:text-amber-300",
    chip: "bg-amber-50 text-amber-800 ring-1 ring-amber-200/70 ring-inset dark:bg-amber-400/10 dark:text-amber-200 dark:ring-amber-400/20",
    dot: "bg-amber-500 dark:bg-amber-400",
    iconBox:
      "bg-amber-100/70 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300",
    card: "hover:border-amber-300 dark:hover:border-amber-400/40",
    soft: "bg-amber-50/80 dark:bg-amber-400/10",
    glow: "bg-amber-200/45 dark:bg-amber-500/10",
    frame:
      "bg-linear-to-br from-amber-200 via-amber-100 to-amber-300/80 dark:from-amber-500/30 dark:via-amber-500/15 dark:to-amber-400/10",
  },
  rose: {
    text: "text-rose-700 dark:text-rose-300",
    chip: "bg-rose-50 text-rose-800 ring-1 ring-rose-200/70 ring-inset dark:bg-rose-400/10 dark:text-rose-200 dark:ring-rose-400/20",
    dot: "bg-rose-500 dark:bg-rose-400",
    iconBox:
      "bg-rose-100/70 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300",
    card: "hover:border-rose-300 dark:hover:border-rose-400/40",
    soft: "bg-rose-50/80 dark:bg-rose-400/10",
    glow: "bg-rose-200/45 dark:bg-rose-500/10",
    frame:
      "bg-linear-to-br from-rose-200 via-rose-100 to-rose-300/80 dark:from-rose-500/30 dark:via-rose-500/15 dark:to-rose-400/10",
  },
  orange: {
    text: "text-orange-700 dark:text-orange-300",
    chip: "bg-orange-50 text-orange-800 ring-1 ring-orange-200/70 ring-inset dark:bg-orange-400/10 dark:text-orange-200 dark:ring-orange-400/20",
    dot: "bg-orange-500 dark:bg-orange-400",
    iconBox:
      "bg-orange-100/70 text-orange-700 dark:bg-orange-400/10 dark:text-orange-300",
    card: "hover:border-orange-300 dark:hover:border-orange-400/40",
    soft: "bg-orange-50/80 dark:bg-orange-400/10",
    glow: "bg-orange-200/45 dark:bg-orange-500/10",
    frame:
      "bg-linear-to-br from-orange-200 via-orange-100 to-orange-300/80 dark:from-orange-500/30 dark:via-orange-500/15 dark:to-orange-400/10",
  },
  purple: {
    text: "text-purple-700 dark:text-purple-300",
    chip: "bg-purple-50 text-purple-800 ring-1 ring-purple-200/70 ring-inset dark:bg-purple-400/10 dark:text-purple-200 dark:ring-purple-400/20",
    dot: "bg-purple-500 dark:bg-purple-400",
    iconBox:
      "bg-purple-100/70 text-purple-700 dark:bg-purple-400/10 dark:text-purple-300",
    card: "hover:border-purple-300 dark:hover:border-purple-400/40",
    soft: "bg-purple-50/80 dark:bg-purple-400/10",
    glow: "bg-purple-200/45 dark:bg-purple-500/10",
    frame:
      "bg-linear-to-br from-purple-200 via-purple-100 to-purple-300/80 dark:from-purple-500/30 dark:via-purple-500/15 dark:to-purple-400/10",
  },
  waves: {
    text: "text-waves dark:text-sky-300",
    chip: "bg-waves/10 text-waves ring-1 ring-waves/20 ring-inset dark:bg-sky-400/10 dark:text-sky-200 dark:ring-sky-400/20",
    dot: "bg-waves dark:bg-sky-400",
    iconBox: "bg-waves/10 text-waves dark:bg-sky-400/10 dark:text-sky-300",
    card: "hover:border-waves/40 dark:hover:border-sky-400/40",
    soft: "bg-waves/5 dark:bg-sky-400/10",
    glow: "bg-waves/15 dark:bg-sky-500/10",
    frame: "bg-linear-to-br from-waves-secondary to-waves",
  },
};
