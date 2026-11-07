import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { locales } from "@/lib/locales";

const paths = ["", ...projects.map((project) => `/projects/${project.slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${profile.siteUrl}/${lang}${path}`,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [alt, `${profile.siteUrl}/${alt}${path}`]),
        ),
      },
    })),
  );
}
