"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/content/types";

type LanguageSwitcherProps = {
  current: Locale;
  label: string;
  languages: Record<Locale, string>;
};

export function LanguageSwitcher({
  current,
  label,
  languages,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <ul
      aria-label={label}
      className="flex items-center rounded-full border border-slate-200 bg-white/70 p-1 dark:border-slate-700/60 dark:bg-slate-800/70"
    >
      {Object.entries(languages).map(([locale, name]) => {
        const active = locale === current;
        return (
          <li key={locale}>
            <Link
              href={rest ? `/${locale}/${rest}` : `/${locale}`}
              hrefLang={locale}
              lang={locale}
              // Teks yang terlihat ("ID") harus ikut jadi bagian nama aksesibel (WCAG 2.5.3).
              aria-label={`${locale.toUpperCase()}, ${name}`}
              aria-current={active ? "true" : undefined}
              className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full px-2.5 font-mono text-xs uppercase transition-colors ${
                active
                  ? "bg-linear-to-r from-accent to-accent-2 text-white"
                  : "text-slate-600 hover:text-teal-700 dark:text-slate-400 dark:hover:text-teal-300"
              }`}
            >
              {locale}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
