"use client";

import { AnimatePresence, motion } from "motion/react";
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
    <motion.button
      type="button"
      onClick={copy}
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={spring}
      className="inline-flex h-12 min-w-36 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-slate-300 bg-white/70 px-6 text-sm font-medium text-slate-900 backdrop-blur transition-[border-color,color] duration-300 ease-out hover:border-teal-400 hover:text-teal-700 dark:border-slate-600 dark:bg-slate-800/70 dark:text-slate-50 dark:hover:border-teal-400 dark:hover:text-teal-300"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "copied" : "copy"}
          aria-live="polite"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {copied ? `✓ ${copiedLabel}` : label}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
