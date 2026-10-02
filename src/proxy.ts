import { NextResponse, type NextRequest } from "next/server";
import type { Locale } from "@/content/types";
import { defaultLocale, isLocale, locales } from "@/lib/locales";

function getPreferredLocale(header: string | null): Locale {
  const ranked = (header ?? "")
    .split(",")
    .map((part) => {
      const [tag, quality] = part.trim().split(";q=");
      return {
        language: tag.split("-")[0].toLowerCase(),
        quality: quality ? Number(quality) : 1,
      };
    })
    .sort((a, b) => b.quality - a.quality);
  return ranked.map((entry) => entry.language).find(isLocale) ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  const locale = getPreferredLocale(request.headers.get("accept-language"));
  request.nextUrl.pathname =
    pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Lewati file internal Next dan file statis (yang punya ekstensi).
  matcher: ["/((?!_next|.*\\..*).*)"],
};
