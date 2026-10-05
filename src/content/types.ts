import type { StaticImageData } from "next/image";

export type Locale = "en" | "id";

export type Social = {
  label: "GitHub" | "LinkedIn" | "X" | "Instagram" | "Email";
  href: string;
};

export type Profile = {
  name: string;
  nickname: string;
  role: string;
  stack: string[];
  email: string;
  cvHref: string;
  photo: StaticImageData;
};

export type FactId = "location" | "experience" | "current" | "education";

export type SkillGroupId = "core" | "styling" | "data" | "also";

export type Skill =
  | "JavaScript (ES6+)"
  | "TypeScript"
  | "React"
  | "Next.js"
  | "React Native"
  | "Git"
  | "Tailwind CSS"
  | "Material-UI"
  | "CSS3 / SASS"
  | "HTML5"
  | "Apollo GraphQL"
  | "Redux"
  | "react-hook-form"
  | "Yup"
  | "i18next"
  | "REST APIs"
  | "Webhooks"
  | "Python"
  | "Data Analysis";

export type SkillGroup = {
  id: SkillGroupId;
  items: Skill[];
};

export type ExperienceId = "icube" | "icube-sirclo" | "bit";

export type ExperienceData = {
  id: ExperienceId;
  company: string;
  role: string;
  start: string; // "2023-01"
  end: string | null; // null = Present
  stack: string[];
};

export type Experience = ExperienceData & {
  highlights: string[];
};

export type ProjectSlug =
  | "belanjaku-seller-dashboard"
  | "belanjaku-storefront"
  | "belanjaku-affiliate"
  | "belanjaku-creator"
  | "swiftoms"
  | "swift-hub"
  | "waves-ssi"
  | "klikdiabetes";

export type AccentColor =
  | "teal"
  | "sky"
  | "indigo"
  | "emerald"
  | "amber"
  | "rose"
  | "orange"
  | "purple"
  | "waves";

export type ProjectType = "work" | "freelance";

export type ProjectGroup = "belanjaku" | "swift" | "other";

export type ProjectData = {
  slug: ProjectSlug;
  group: ProjectGroup;
  type: ProjectType;
  /** Tempat kerja saat mengerjakan project; null untuk freelance. */
  workplace: string | null;
  color: AccentColor;
  year: number; // tahun mulai
  ongoing: boolean; // true = tampil "<year> — Present"
  stack: string[];
  featured: boolean;
  comingSoon: boolean;
  cover: StaticImageData;
  gallery: string[];
  links: { live?: string; repo?: string };
};

export type ProjectCopy = {
  title: string;
  summary: string; // 1 kalimat untuk kartu
  role: string;
  problem: string;
  whatIDid: string[];
  result: string;
};

export type Project = ProjectData & ProjectCopy;

export type Messages = {
  meta: {
    title: string;
    description: string;
    caseStudy: string;
  };
  nav: {
    label: string;
    skipToContent: string;
    about: string;
    skills: string;
    experience: string;
    projects: string;
    contact: string;
    language: string;
    theme: string;
  };
  languages: Record<Locale, string>;
  profile: {
    location: string;
    tagline: string;
    about: string[];
    facts: Record<FactId, { label: string; value: string }>;
    contactBlurb: string;
  };
  hero: {
    label: string;
    stats: { value: string; label: string }[];
    viewProjects: string;
    downloadCv: string;
  };
  sections: {
    about: string;
    skills: string;
    experience: string;
    projects: string;
    contact: string;
  };
  about: {
    photoAlt: string;
  };
  skills: Record<SkillGroupId, string>;
  experience: {
    present: string;
    stack: string;
    items: Record<ExperienceId, { highlights: string[] }>;
  };
  projects: {
    comingSoon: string;
    viewCaseStudy: string;
    groups: Record<ProjectGroup, { name: string; description: string }>;
    types: Record<ProjectType, string>;
    coverAlt: string;
    stack: string;
    items: Record<ProjectSlug, ProjectCopy>;
  };
  caseStudy: {
    back: string;
    close: string;
    role: string;
    stack: string;
    workplace: string;
    live: string;
    source: string;
    problem: string;
    whatIDid: string;
    result: string;
    gallery: string;
    screenshotAlt: string;
    moreProjects: string;
    previous: string;
    next: string;
  };
  contact: {
    heading: string;
    headingAccent: string;
    location: string;
    email: string;
    send: string;
    copy: string;
    copied: string;
    cv: string;
    cvAction: string;
  };
  footer: {
    builtWith: string;
  };
  notFound: {
    title: string;
    back: string;
  };
};
