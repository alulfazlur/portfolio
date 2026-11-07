"use client";

import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import { spring } from "@/components/motion/spring";

type CopyEmailButtonProps = {
  email: string;
  label: string;
  copiedLabel: string;
};

export function CopyEmailButton({
  email,
  label,
  copiedLabel,
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <m.button
      type="button"
      onClick={copy}
      whileTap={{ scale: 0.97 }}
      transition={spring}
      className="inline-flex h-12 cursor-pointer items-center justify-center overflow-hidden rounded-[2px] border border-slate-900/80 px-5 text-sm font-medium whitespace-nowrap text-slate-900 transition-[border-color,color] duration-300 ease-out hover:border-primary-600 hover:text-primary-700 sm:min-w-36 sm:px-6 dark:border-slate-100/70 dark:text-slate-50 dark:hover:border-primary-400 dark:hover:text-primary-300"
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={copied ? "copied" : "copy"}
          aria-live="polite"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {copied ? `✓ ${copiedLabel}` : label}
        </m.span>
      </AnimatePresence>
    </m.button>
  );
}
