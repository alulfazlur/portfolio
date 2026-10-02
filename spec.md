# Portfolio Website — Spec

> Source of truth for **what** gets built. If something is not in here, it is not built.
> Every item marked `TODO` is filled in by Alul, never invented by Claude.

## 1. Goals

Alul's personal portfolio (Frontend Engineer), built to:

1. Show who I am and what I'm good at within the first 10 seconds.
2. Present the projects I've worked on, with context: the problem, my role, and the result.
3. Make it easy for recruiters and clients to reach me (email, social links, CV).

**Audience:** recruiters, hiring managers, potential freelance clients.
**Content languages:** English and Indonesian (semi-formal, friendly tone).

## 2. Pages & Routing

All pages live under a locale segment: `en` or `id`.

| Route                    | Content                                                                 |
| ------------------------ | ----------------------------------------------------------------------- |
| `/`                      | Redirects to `/en` or `/id` based on the browser's `Accept-Language`   |
| `/[lang]`                | Single page: Hero → About → Skills → Experience → Projects → Contact   |
| `/[lang]/projects/[slug]` | Case study for one project (statically generated)                     |
| Any unmatched URL        | Bilingual 404 page with links back to `/en` and `/id`                  |

Locale-less paths (e.g. `/projects/swiftoms`) are redirected by `src/proxy.ts`. Switching language keeps the current path.

## 3. Navigation

- **Command bar:** a floating bar at the bottom of the screen on every size.
  - Desktop: logo, section links with icon + label, language switcher, theme toggle, scroll progress.
  - Tablet: icons only, plus language and theme.
  - Mobile: icons only. Language and theme sit in a small top bar.
- The active section is highlighted as the user scrolls (sliding pill).

## 4. Home Sections (`/[lang]`)

### 4.1 Hero
- Name: **Fazlur Rahman (Alul)**, role: **Frontend Engineer**, location.
- One-sentence tagline.
- CTAs: `View Projects` (scrolls to `#projects`) and `Download CV` (`/public/doc/Fazlur Rahman Resume.pdf`).
- Social icons (from `socials.ts`).
- Decorative code card showing the profile as a TypeScript object (name, role, location, stack).
- One highlight badge: **5+ years of experience**. No commit counts or other vanity numbers.

### 4.2 About
- Profile photo (`/public/images/profile.jpg`) in a gradient frame.
- Two short paragraphs.
- Fact cards: location (Jember, East Java, Indonesia), experience (5+ years), current role, education.

### 4.3 Skills
Grouped cards with chips — no progress bars or percentages. Only skills Alul is confident in.
- **Core:** JavaScript (ES6+), TypeScript, React, Next.js, React Native, Git
- **Styling & UI:** Tailwind CSS, Material-UI, CSS3 / SASS, HTML5
- **Data & State:** Apollo GraphQL, Redux, react-hook-form, Formik, Yup, i18next, REST APIs, Webhooks
- **Also:** Python, Data Analysis

### 4.4 Experience
Vertical timeline, newest first. Per item: company, role, period, 2–4 achievement bullets, tech stack. Source: CV.
- ICUBE — Associate Software Engineer (Jul 2025 – Present)
- ICUBE by SIRCLO — Associate Software Engineer (May 2021 – Jul 2025)
- BIT - Barito Technologies Group — Junior Frontend Engineer (Sep 2020 – Mar 2021)

### 4.5 Projects
- Grouped by product family. Each group has a name, a one-line description, and a project count.
  - **Belanjaku:** Seller Dashboard (featured, includes the Page & Menu Builder), Belanjaku Creator (coming soon), Belanjaku Affiliate, Belanjaku Storefront
  - **SWIFT:** SwiftOMS, SWIFT Hub
  - **Other work:** WAVES-SSI (freelance), KlikDiabetes
- Order inside a group follows the array order in `content/projects.ts`; `featured` projects come first and span the full row.
- Card: framed screenshot, type chip (Work/Freelance), workplace, period (`<year> — Present` for ongoing projects), title, one-sentence summary, up to 4 tech tags, optional `Live site` link.
- The whole card links to `/[lang]/projects/[slug]`.
- White-label customers are mentioned generically ("white-labeled by several customers"), never by name.

### 4.6 Contact
- Headline with a short call to action, location and time zone (UTC+7).
- Large email card with `Send email` and `Copy email` buttons.
- Cards for GitHub, LinkedIn, and the CV download.
- **No** contact form in v1.

### 4.7 Footer
© current year + name, social links, "Built with Next.js".

## 5. Case Study Page (`/[lang]/projects/[slug]`)

Fixed structure:
1. Back link, type chip, period, `Coming soon` badge when relevant
2. Title and summary
3. Meta: workplace (hidden for freelance), role, tech stack
4. Links: Live site / Source code (hidden when missing)
5. Framed screenshot
6. **Problem** — context and the problem
7. **What I did** — my specific contribution
8. **Result** — the impact (numbers only when real)
9. Screenshot gallery (optional)
10. Previous / next project navigation

Case study copy is written as fields in the locale files (no MDX) in v1.

## 6. Data Model

All content is typed TypeScript data in `src/content/`. No CMS, no fetching.

- **Copy** (anything a visitor reads) lives in `locales/en.ts` and `locales/id.ts`, typed by `Messages`.
- **Structure** (links, years, stack, colors, images) lives in `profile.ts`, `socials.ts`, `skills.ts`, `experience.ts`, `projects.ts`.
- `src/lib/content.ts` merges both into the shapes the components use.

```ts
// src/content/types.ts (excerpt)
export type ProjectData = {
  slug: ProjectSlug;
  group: "belanjaku" | "swift" | "other";
  type: "work" | "freelance";
  workplace: string | null; // null for freelance
  color: AccentColor; // drives the card frame and chips
  year: number; // start year
  ongoing: boolean; // true = shown as "<year> — Present"
  stack: string[];
  featured: boolean;
  comingSoon: boolean;
  cover: StaticImageData; // statically imported screenshot
  gallery: string[];
  links: { live?: string; repo?: string };
};

export type ProjectCopy = {
  title: string;
  summary: string; // one sentence for the card
  role: string;
  problem: string;
  whatIDid: string[];
  result: string;
};

export type ExperienceData = {
  id: "icube" | "icube-sirclo" | "bit";
  company: string;
  role: string;
  start: string; // "2023-01"
  end: string | null; // null = Present
  stack: string[];
};
```

## 7. Design

- **Mood:** calm, clean, generous whitespace, strong typography, with a few distinctive touches.
- **Theme:** light and dark. Light is the default for every visitor; a toggle switches to dark (remembered in `localStorage`).
- **Colors:** calm teal (primary) + sky (secondary) on slate neutrals, defined as `@theme` tokens in `globals.css`. Dark mode uses slate navy, never near-black.
- **Project colors:** Belanjaku orange, SWIFT purple, WAVES-SSI brand gradient (`#2f6875` → `#083a4f`), KlikDiabetes emerald.
- **Background:** generated topographic contour lines (`/public/images/bg/contours.svg`), tinted per theme, plus a soft colored glow per section.
- **Layout:** content max-width ~1100px, mobile-first, default Tailwind breakpoints. About, Skills, Experience, and Contact use a sticky side heading on desktop.
- **Fonts:** `Geist` for text and `Geist Mono` for labels and tags, via `next/font`.
- **Logo:** `<a/>` mark (anchor tag + initial). Source in `src/app/icon.svg`; exports in `/brand`.

## 8. Animation (Motion)

The goal is smooth, not busy.
- Sections and cards: fade + 16–24px slide-up when entering the viewport, once (`once: true`).
- Lists: 50–80ms stagger.
- Hero: entrance on load, under 1s total; code card lines appear one by one.
- Buttons, cards, and icons: spring-based hover lift and tap press (`Pressable`), arrows nudge on hover.
- Copy button: label crossfade. Theme toggle: icon rotate + fade. Section accent line grows in.
- **Must** respect `prefers-reduced-motion` (`<MotionConfig reducedMotion="user">`).
- Forbidden: heavy parallax, looping animations, scroll-jacking.

## 9. SEO & Metadata

- Per-page `metadata` (title, description), title template `%s — Alul`, `hreflang` alternates for `en` and `id`.
- Generated Open Graph images: `app/[lang]/opengraph-image.tsx` and one per project.
- `app/robots.ts`.
- `app/icon.svg` as the favicon.
- TODO: once the final domain is set up on Vercel, add `metadataBase`, `app/sitemap.ts`, and the sitemap line in `robots.ts`.

## 10. Non-Functional

- Lighthouse ≥ 95 for Performance, Accessibility, Best Practices, and SEO (mobile).
- Every image goes through `next/image` with meaningful `alt`; the LCP image loads eagerly.
- Full keyboard navigation, visible focus rings, WCAG AA color contrast, touch targets ≥ 44px.
- Every page is static (SSG). No API routes in v1.
- Screenshots must not expose personal data (blur names, emails, phone numbers of real people).
- Deploy: Vercel.

## 11. Out of Scope for v1

Blog, CMS, contact form, analytics, testimonials, auth.

## 12. Milestones

1. ✅ Setup: scaffold, Prettier, color and font tokens, base layout
2. ✅ Data: content types, structural data, bilingual copy
3. ✅ Hero + About
4. ✅ Skills + Experience
5. ✅ Projects (grouped grid)
6. ✅ Case study pages
7. ✅ Contact + Footer
8. ✅ Motion across all sections
9. ✅ SEO: metadata, OG images, robots (sitemap pending the domain)
10. ✅ Theme toggle, command bar navigation, logo
11. TODO: final domain + sitemap, Lighthouse audit, deploy to Vercel
