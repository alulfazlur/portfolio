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
  project: { year: number; end: number | null },
  presentLabel: string,
): string {
  if (project.end === project.year) return String(project.year);
  return `${project.year} — ${project.end ?? presentLabel}`;
}
