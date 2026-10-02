import type { MetadataRoute } from "next";

// TODO: tambahkan `sitemap` (dan app/sitemap.ts) setelah domain Vercel final siap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
  };
}
