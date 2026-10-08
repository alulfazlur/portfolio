"use client";

import { mdiWeatherNight, mdiWhiteBalanceSunny } from "@mdi/js";
import { Icon } from "@/components/ui/Icon";

export function ThemeToggle({ label }: { label: string }) {
  function toggle() {
    const root = document.documentElement;
    const dark = !root.classList.contains("dark");
    root.classList.toggle("dark", dark);
    root.style.colorScheme = dark ? "dark" : "light";
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      // Penyimpanan diblokir browser: tema tetap berganti untuk sesi ini.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="relative inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-600 transition-colors hover:border-primary-300 hover:text-primary-700 dark:border-slate-700/60 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:border-primary-400/40 dark:hover:text-primary-300"
    >
      <Icon
        path={mdiWeatherNight}
        className="absolute size-5 rotate-0 opacity-100 transition-[transform,opacity] duration-500 ease-out dark:scale-50 dark:-rotate-90 dark:opacity-0"
      />
      <Icon
        path={mdiWhiteBalanceSunny}
        className="absolute size-5 scale-50 rotate-90 opacity-0 transition-[transform,opacity] duration-500 ease-out dark:scale-100 dark:rotate-0 dark:opacity-100"
      />
    </button>
  );
}
