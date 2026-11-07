"use client";

import { m } from "motion/react";
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
      <div className="pointer-events-auto relative flex items-center gap-1 overflow-hidden rounded-xl border border-slate-900/10 bg-slate-50/85 p-1.5 shadow-xl shadow-slate-900/10 backdrop-blur-md dark:border-slate-100/10 dark:bg-slate-800/85 dark:shadow-slate-950/50">
        <Link
          href={homeHref}
          aria-label={logoLabel}
          className="hidden size-11 shrink-0 overflow-hidden rounded-lg transition-transform duration-300 ease-out hover:-rotate-6 md:inline-flex"
        >
          <Logo className="size-full" gradientId="logo-gradient-bar" />
        </Link>
        <span
          aria-hidden="true"
          className="mx-1 hidden h-6 w-px bg-slate-900/10 md:block dark:bg-slate-100/10"
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
                  className={`relative flex h-11 min-w-11 items-center justify-center gap-2 rounded-lg px-3 font-mono text-[0.8125rem] lowercase transition-colors duration-300 ${
                    current
                      ? "text-slate-50 dark:text-slate-900"
                      : "text-slate-600 hover:text-primary-700 dark:text-slate-300 dark:hover:text-primary-300"
                  }`}
                >
                  {current && (
                    <m.span
                      layoutId="bar-active"
                      transition={spring}
                      className="absolute inset-0 rounded-lg bg-slate-900 dark:bg-slate-100"
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
          className="mx-1 hidden h-6 w-px bg-slate-900/10 md:block dark:bg-slate-100/10"
        />
        <div className="hidden items-center gap-1 md:flex">{controls}</div>
        <ScrollProgress />
      </div>
    </nav>
  );
}
