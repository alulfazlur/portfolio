import type { Locale } from "@/content/types";

function formatMonth(locale: Locale, value: string): string {
  const [year, month] = value.split("-").map(Number);
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1));
}

export function formatPeriod(
  locale: Locale,
  start: string,
  end: string | null,
  presentLabel: string,
): string {
  return `${formatMonth(locale, start)} — ${end ? formatMonth(locale, end) : presentLabel}`;
}

export function formatProjectPeriod(
  project: { year: number; ongoing: boolean },
  presentLabel: string,
): string {
  return project.ongoing
    ? `${project.year} — ${presentLabel}`
    : String(project.year);
}
