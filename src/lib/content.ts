import type { TFunction } from "i18next";
import { experience } from "@/content/experience";
import { projectGroups, projects } from "@/content/projects";
import type {
  Experience,
  Project,
  ProjectGroup,
  ProjectSlug,
} from "@/content/types";

export function getExperience(t: TFunction): Experience[] {
  const items = t("experience.items", { returnObjects: true });
  return experience.map((job) => ({ ...job, ...items[job.id] }));
}

function dataOrder(slug: ProjectSlug): number {
  return projects.findIndex((project) => project.slug === slug);
}

/** Urut per grup, lalu featured dulu, lalu sesuai urutan di content/projects.ts. */
export function getSortedProjects(t: TFunction): Project[] {
  const items = t("projects.items", { returnObjects: true });
  return projects
    .map((project) => ({ ...project, ...items[project.slug] }))
    .sort(
      (a, b) =>
        projectGroups.indexOf(a.group) - projectGroups.indexOf(b.group) ||
        Number(b.featured) - Number(a.featured) ||
        dataOrder(a.slug) - dataOrder(b.slug),
    );
}

export function getProjectGroups(t: TFunction): {
  id: ProjectGroup;
  name: string;
  description: string;
  projects: Project[];
}[] {
  const sorted = getSortedProjects(t);
  const copy = t("projects.groups", { returnObjects: true });
  return projectGroups.map((id) => ({
    id,
    ...copy[id],
    projects: sorted.filter((project) => project.group === id),
  }));
}

export function getProject(t: TFunction, slug: string): Project | undefined {
  return getSortedProjects(t).find((project) => project.slug === slug);
}
