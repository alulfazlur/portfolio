import type { AccentColor } from "@/content/types";

// Class Tailwind per warna aksen. Ditulis lengkap (bukan dirangkai) agar terdeteksi Tailwind.
type Tone = {
  text: string;
  chip: string;
  dot: string;
  soft: string;
  /** Bingkai berwarna di belakang screenshot project. */
  frame: string;
  /** Tombol utama solid (kontras teks ≥ 4.5:1 di kedua tema). */
  button: string;
};

export const tones: Record<AccentColor, Tone> = {
  teal: {
    text: "text-teal-700 dark:text-teal-300",
    chip: "bg-teal-50 text-teal-800 ring-1 ring-teal-200/70 ring-inset dark:bg-teal-400/10 dark:text-teal-200 dark:ring-teal-400/20",
    dot: "bg-teal-500 dark:bg-teal-400",
    soft: "bg-teal-50/80 dark:bg-teal-400/10",
    frame:
      "bg-linear-to-br from-teal-200 via-teal-100 to-teal-300/80 dark:from-teal-500/30 dark:via-teal-500/15 dark:to-teal-400/10",
    button:
      "bg-teal-700 text-white shadow-md shadow-teal-900/20 hover:shadow-lg hover:shadow-teal-900/30 dark:bg-teal-400 dark:text-teal-950 dark:shadow-slate-950/40",
  },
  sky: {
    text: "text-sky-700 dark:text-sky-300",
    chip: "bg-sky-50 text-sky-800 ring-1 ring-sky-200/70 ring-inset dark:bg-sky-400/10 dark:text-sky-200 dark:ring-sky-400/20",
    dot: "bg-sky-500 dark:bg-sky-400",
    soft: "bg-sky-50/80 dark:bg-sky-400/10",
    frame:
      "bg-linear-to-br from-sky-200 via-sky-100 to-sky-300/80 dark:from-sky-500/30 dark:via-sky-500/15 dark:to-sky-400/10",
    button:
      "bg-sky-700 text-white shadow-md shadow-sky-900/20 hover:shadow-lg hover:shadow-sky-900/30 dark:bg-sky-400 dark:text-sky-950 dark:shadow-slate-950/40",
  },
  indigo: {
    text: "text-indigo-700 dark:text-indigo-300",
    chip: "bg-indigo-50 text-indigo-800 ring-1 ring-indigo-200/70 ring-inset dark:bg-indigo-400/10 dark:text-indigo-200 dark:ring-indigo-400/20",
    dot: "bg-indigo-500 dark:bg-indigo-400",
    soft: "bg-indigo-50/80 dark:bg-indigo-400/10",
    frame:
      "bg-linear-to-br from-indigo-200 via-indigo-100 to-indigo-300/80 dark:from-indigo-500/30 dark:via-indigo-500/15 dark:to-indigo-400/10",
    button:
      "bg-indigo-700 text-white shadow-md shadow-indigo-900/20 hover:shadow-lg hover:shadow-indigo-900/30 dark:bg-indigo-400 dark:text-indigo-950 dark:shadow-slate-950/40",
  },
  emerald: {
    text: "text-emerald-700 dark:text-emerald-300",
    chip: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200/70 ring-inset dark:bg-emerald-400/10 dark:text-emerald-200 dark:ring-emerald-400/20",
    dot: "bg-emerald-500 dark:bg-emerald-400",
    soft: "bg-emerald-50/80 dark:bg-emerald-400/10",
    frame: "bg-emerald-600",
    button:
      "bg-emerald-700 text-white shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/30 dark:bg-emerald-400 dark:text-emerald-950 dark:shadow-slate-950/40",
  },
  amber: {
    text: "text-amber-700 dark:text-amber-300",
    chip: "bg-amber-50 text-amber-800 ring-1 ring-amber-200/70 ring-inset dark:bg-amber-400/10 dark:text-amber-200 dark:ring-amber-400/20",
    dot: "bg-amber-500 dark:bg-amber-400",
    soft: "bg-amber-50/80 dark:bg-amber-400/10",
    frame:
      "bg-linear-to-br from-amber-200 via-amber-100 to-amber-300/80 dark:from-amber-500/30 dark:via-amber-500/15 dark:to-amber-400/10",
    button:
      "bg-amber-700 text-white shadow-md shadow-amber-900/20 hover:shadow-lg hover:shadow-amber-900/30 dark:bg-amber-400 dark:text-amber-950 dark:shadow-slate-950/40",
  },
  rose: {
    text: "text-rose-700 dark:text-rose-300",
    chip: "bg-rose-50 text-rose-800 ring-1 ring-rose-200/70 ring-inset dark:bg-rose-400/10 dark:text-rose-200 dark:ring-rose-400/20",
    dot: "bg-rose-500 dark:bg-rose-400",
    soft: "bg-rose-50/80 dark:bg-rose-400/10",
    frame:
      "bg-linear-to-br from-rose-200 via-rose-100 to-rose-300/80 dark:from-rose-500/30 dark:via-rose-500/15 dark:to-rose-400/10",
    button:
      "bg-rose-700 text-white shadow-md shadow-rose-900/20 hover:shadow-lg hover:shadow-rose-900/30 dark:bg-rose-400 dark:text-rose-950 dark:shadow-slate-950/40",
  },
  orange: {
    text: "text-orange-700 dark:text-orange-300",
    chip: "bg-orange-50 text-orange-800 ring-1 ring-orange-200/70 ring-inset dark:bg-orange-400/10 dark:text-orange-200 dark:ring-orange-400/20",
    dot: "bg-orange-500 dark:bg-orange-400",
    soft: "bg-orange-50/80 dark:bg-orange-400/10",
    frame: "bg-orange-500",
    button:
      "bg-orange-700 text-white shadow-md shadow-orange-900/20 hover:shadow-lg hover:shadow-orange-900/30 dark:bg-orange-400 dark:text-orange-950 dark:shadow-slate-950/40",
  },
  purple: {
    text: "text-purple-700 dark:text-purple-300",
    chip: "bg-purple-50 text-purple-800 ring-1 ring-purple-200/70 ring-inset dark:bg-purple-400/10 dark:text-purple-200 dark:ring-purple-400/20",
    dot: "bg-purple-500 dark:bg-purple-400",
    soft: "bg-purple-50/80 dark:bg-purple-400/10",
    frame: "bg-purple-700",
    button:
      "bg-purple-700 text-white shadow-md shadow-purple-900/20 hover:shadow-lg hover:shadow-purple-900/30 dark:bg-purple-400 dark:text-purple-950 dark:shadow-slate-950/40",
  },
  waves: {
    text: "text-waves dark:text-sky-300",
    chip: "bg-waves/10 text-waves ring-1 ring-waves/20 ring-inset dark:bg-sky-400/10 dark:text-sky-200 dark:ring-sky-400/20",
    dot: "bg-waves dark:bg-sky-400",
    soft: "bg-waves/5 dark:bg-sky-400/10",
    frame: "bg-linear-to-br from-waves-secondary to-waves",
    button:
      "bg-waves text-white shadow-md shadow-waves/25 hover:shadow-lg hover:shadow-waves/35 dark:bg-sky-400 dark:text-sky-950 dark:shadow-slate-950/40",
  },
};
