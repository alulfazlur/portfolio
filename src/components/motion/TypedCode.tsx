"use client";

import { animate, useReducedMotionConfig } from "motion/react";
import { useEffect, useState } from "react";

export type CodeToken = { text: string; className: string };
export type CodeLine = { indent: 0 | 1 | 2; tokens: CodeToken[] };

/** Kecepatan ketik per karakter. */
const CHAR_MS = 10;
/** Detik sejak load saat strip opening sudah membuka area code card (lihat Opening). */
const OPENING_END = 1.4;

const indents = { 0: "", 1: "pl-5", 2: "pl-10" } as const;

/** Posisi awal tiap token dalam urutan ketik, plus jumlah total karakter. */
function offsets(lines: CodeLine[]) {
  let position = 0;
  const starts = lines.map((line) =>
    line.tokens.map((token) => {
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
  const { starts, total } = offsets(lines);
  const [typed, setTyped] = useState(0);
  const shown = reduceMotion ? total : typed;

  useEffect(() => {
    if (reduceMotion) return;
    const opened = document.documentElement.hasAttribute("data-opened");
    const delay = opened
      ? 0.2
      : Math.max(0.2, OPENING_END - performance.now() / 1000);
    const controls = animate(0, total, {
      duration: (total * CHAR_MS) / 1000,
      delay,
      ease: "linear",
      onUpdate: (value) => setTyped(Math.round(value)),
    });
    return () => controls.stop();
  }, [reduceMotion, total]);

  return (
    <code>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className={`block ${indents[line.indent]}`}>
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
                    <span className="absolute top-[0.15em] h-[1.2em] w-0.5 bg-primary-300" />
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
