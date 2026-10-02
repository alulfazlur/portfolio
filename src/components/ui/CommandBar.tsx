"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { spring } from "@/components/motion/spring";
import { Logo } from "./Logo";
import { NavIcon, type NavId } from "./NavIcon";
import { useActiveSection } from "./useActiveSection";

type CommandBarProps = {
  homeHref: string;
  label: string;
  logoLabel: string;
  items: { id: NavId; label: string }[];
  /** Kontrol bahasa & tema, tampil di bar mulai layar md. */
  controls: ReactNode;
};

/** Navigasi mengambang di bawah layar untuk semua ukuran. */
export function CommandBar({
  homeHref,
  label,
  logoLabel,
  items,
  controls,
}: CommandBarProps) {
  const active = useActiveSection(["top", ...items.map((item) => item.id)]);

  return (
    <nav
      aria-label={label}
      className="pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex justify-center px-4"
    >
      <div className="pointer-events-auto relative flex items-center gap-1 overflow-hidden rounded-full border border-slate-200/80 bg-white/85 p-1.5 shadow-xl shadow-slate-900/10 backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-800/85 dark:shadow-slate-950/40">
        <Link
          href={homeHref}
          aria-label={logoLabel}
          className="hidden size-11 shrink-0 overflow-hidden rounded-[0.9rem] shadow-md shadow-teal-900/20 transition-transform duration-300 ease-out hover:scale-105 hover:-rotate-6 md:inline-flex"
        >
          <Logo className="size-full" gradientId="logo-gradient-bar" />
        </Link>
        <span
          aria-hidden="true"
          className="mx-1 hidden h-6 w-px bg-slate-200 md:block dark:bg-slate-700"
        />
        <ul className="flex items-center gap-1">
          {items.map((item) => {
            const current = active === item.id;
            return (
              <li key={item.id}>
                <Link
                  href={`${homeHref}#${item.id}`}
                  aria-label={item.label}
                  aria-current={current ? "location" : undefined}
                  className={`relative flex h-11 min-w-11 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium transition-colors duration-300 ${
                    current
                      ? "text-white"
                      : "text-slate-600 hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-300"
                  }`}
                >
                  {current && (
                    <motion.span
                      layoutId="bar-active"
                      transition={spring}
                      className="absolute inset-0 rounded-full bg-linear-to-br from-accent to-accent-2"
                    />
                  )}
                  <span className="relative">
                    <NavIcon id={item.id} />
                  </span>
                  <span
                    aria-hidden="true"
                    className="relative hidden lg:inline"
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <span
          aria-hidden="true"
          className="mx-1 hidden h-6 w-px bg-slate-200 md:block dark:bg-slate-700"
        />
        <div className="hidden items-center gap-1 md:flex">{controls}</div>
        <ScrollProgress />
      </div>
    </nav>
  );
}
