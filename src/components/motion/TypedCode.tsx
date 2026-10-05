"use client";

import { animate, useReducedMotionConfig } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";

export type CodeToken = { text: string; className: string };
export type CodeLine = {
  indent: 0 | 1 | 2;
  tokens: CodeToken[];
  /** Disembunyikan di bawah breakpoint `sm` (dan dilewati saat mengetik). */
  hideOnMobile?: boolean;
};

/** Kecepatan ketik per karakter. */
const CHAR_MS = 10;
/** Detik sejak load saat strip opening sudah membuka area code card (lihat Opening). */
const OPENING_END = 1.4;
/** Sama dengan breakpoint `sm` Tailwind. */
const SM = "(min-width: 40rem)";

const indents = { 0: "", 1: "pl-5", 2: "pl-10" } as const;

function subscribeWide(onChange: () => void) {
  const query = window.matchMedia(SM);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * Posisi awal tiap token dalam urutan ketik, plus jumlah total karakter.
 * Baris yang tersembunyi tidak ikut diketik (dianggap sudah selesai).
 */
function offsets(lines: CodeLine[], wide: boolean) {
  let position = 0;
  const starts = lines.map((line) =>
    line.tokens.map((token) => {
      if (line.hideOnMobile && !wide) return -Infinity;
      const start = position;
      position += token.text.length;
      return start;
    }),
  );
  return { starts, total: position };
}

/**
 * Kode yang diketik karakter per karakter sekali, mulai setelah opening (walau belum terlihat).
 * Karakter yang belum diketik tetap dirender transparan agar ukuran kartu tidak berubah.
 */
export function TypedCode({ lines }: { lines: CodeLine[] }) {
  const reduceMotion = useReducedMotionConfig();
  const wide = useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia(SM).matches,
    () => true,
  );
  const { starts, total } = offsets(lines, wide);
  const [typed, setTyped] = useState(0);
  // Setelah selesai, ganti ukuran layar tidak membuat kode diketik ulang.
  const [finished, setFinished] = useState(false);
  const shown = reduceMotion || finished ? total : typed;

  useEffect(() => {
    if (reduceMotion || finished) return;
    const opened = document.documentElement.hasAttribute("data-opened");
    const delay = opened
      ? 0.2
      : Math.max(0.2, OPENING_END - performance.now() / 1000);
    const controls = animate(0, total, {
      duration: (total * CHAR_MS) / 1000,
      delay,
      ease: "linear",
      onUpdate: (value) => setTyped(Math.round(value)),
      onComplete: () => setFinished(true),
    });
    return () => controls.stop();
  }, [reduceMotion, finished, total]);

  return (
    <code>
      {lines.map((line, lineIndex) => (
        <span
          key={lineIndex}
          className={`${line.hideOnMobile ? "hidden sm:block" : "block"} ${indents[line.indent]}`}
        >
          {line.tokens.map((token, tokenIndex) => {
            const start = starts[lineIndex][tokenIndex];
            const visible = Math.min(
              Math.max(shown - start, 0),
              token.text.length,
            );
            const caret = shown >= start && shown < start + token.text.length;
            return (
              <span key={tokenIndex} className={token.className}>
                {token.text.slice(0, visible)}
                {caret && (
                  <span className="relative">
                    <span className="absolute top-[0.15em] h-[1.2em] w-0.5 bg-teal-300" />
                  </span>
                )}
                <span className="opacity-0">{token.text.slice(visible)}</span>
              </span>
            );
          })}
        </span>
      ))}
    </code>
  );
}
