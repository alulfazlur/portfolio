# Portfolio Website — Spec

> Source of truth for **what** gets built. If something is not in here, it is not built.
> Every item marked `TODO` is filled in by Alul, never invented by Claude.

## 1. Goals

Alul's personal portfolio (Software Engineer), built to:

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
| `/[lang]/projects/[slug]` | Home page with the case study modal open (statically generated)        |
| Any unmatched URL        | English 404 page with a link back to `/en`                             |

Locale-less paths (e.g. `/projects/swiftoms`) are redirected by `src/proxy.ts`. Switching language keeps the current path.

## 3. Navigation

- **Command bar:** a floating bar at the bottom of the screen on every size.
  - Desktop: logo, section links with icon + label, language switcher, theme toggle, scroll progress.
  - Tablet: icons only, plus language and theme.
  - Mobile: icons only. Language and theme sit in a small top bar.
- The active section is highlighted as the user scrolls (sliding pill).

## 4. Home Sections (`/[lang]`)

### 4.1 Hero
At least one viewport tall (minus the mobile top bar), laid out like the head of a ledger sheet.
- Meta row (mono, hairline below): **Software Engineer**, location + time zone, and **5+ years of experience** (hidden on mobile). No commit counts or other vanity numbers.
- Name: **Fazlur Rahman**, full-width, two lines (second line right-aligned), ending in a vermilion period.
- One-sentence tagline, prefixed with the nickname in italic serif.
- CTAs: `View Projects` (scrolls to `#projects`) and `Download CV` (`/public/doc/Fazlur Rahman Resume.pdf`).
- Social icons (from `socials.ts`).

### 4.2 About
- First paragraph as a large lead statement; the second as regular body text.
- Profile photo (`/public/images/profile.jpeg`), 4:5 crop with a mono caption (name, location).
- Fact list with hairline rows: location (Jember, East Java, Indonesia), experience (5+ years), education.

### 4.3 Skills
One full-width row per group: mono label + count on the left, skills set in large type separated by vermilion slashes. No cards, icons, progress bars, or percentages. Only skills Alul is confident in.
- **Core:** JavaScript (ES6+), TypeScript, React, Next.js, React Native, Git
- **Styling & UI:** Tailwind CSS, Material-UI, CSS3 / SASS, HTML5
- **Data & State:** Apollo GraphQL, Redux, react-hook-form, Yup, i18next, REST APIs, Webhooks
- **Backend:** PHP, Laravel, MySQL
- **Also:** Python, Data Analysis

### 4.4 Experience
Ledger rows separated by hairlines, newest first. Per item: period (current job marked with a vermilion square), company, role (italic serif), 2–4 numbered achievements, tech stack. Source: CV.
- ICUBE — Associate Software Engineer (Jul 2025 – Nov 2026)
- ICUBE by SIRCLO — Associate Software Engineer (May 2021 – Jul 2025)
- BIT - Barito Technologies Group — Junior Frontend Engineer (Sep 2020 – Mar 2021)

### 4.5 Projects
- Grouped by product family. Each group has a name, a one-line description, and a project count.
  - **Belanjaku:** Seller Dashboard (includes the Page & Menu Builder), Belanjaku Storefront, Belanjaku Affiliate, Belanjaku Creator
  - **SWIFT:** SwiftOMS, SWIFT Hub
  - **Other work:** WAVES-SSI (freelance), KlikDiabetes
- The section is a full-bleed ink block (dark in both themes). Group header: letter + count, name, description.
- Order inside a group follows the array order in `content/projects.ts`; `featured` projects come first and span the full row. Cards sit two per row from `sm` up.
- Card (flat, no border): screenshot on a solid project-color plate, running number (01, 02, …), type (Work/Freelance), workplace, period (`<year> — <end year>`, just `<year>` when both match, `<year> — Present` when there is no end year), title, one-sentence summary, up to 4 tech tags, optional `Live site` link.
- The whole card links to `/[lang]/projects/[slug]`. On touch devices (no hover) a small "View case study →" cue shows it is tappable. On click the card itself grows and turns into the case study modal (intercepting route in the `@modal` slot); the URL changes, Back / Escape / backdrop / close button zoom it back and close it.
- White-label customers are mentioned generically ("white-labeled by several customers"), never by name.

### 4.6 Contact
- Headline with a short call to action, location and time zone (UTC+7).
- Headline accent in italic serif (vermilion). Email set very large, with `Send email` and `Copy email` buttons.
- Hairline rows for GitHub, LinkedIn, and the CV download (label, URL / action, arrow).
- **No** contact form in v1.

### 4.7 Footer
© current year + name, "Built with Next.js", then the nickname as a giant decorative wordmark cropped by the bottom edge. No social links (they are in the hero and Contact).

## 5. Case Study Modal (`/[lang]/projects/[slug]`)

There is no separate case study page. Clicking a project card opens the case study in a modal over the home page (intercepting route). Opening the URL directly (or refreshing) shows the home page with the same modal already open; closing it then goes to `/[lang]`.

Fixed structure:
1. Framed screenshot, full-width at the top of the panel like on the card (so the card → modal morph stays continuous), and a close button
2. Type chip, period, `Coming soon` badge when relevant
3. Title and summary
4. Meta: workplace (hidden for freelance), role, tech stack
5. Links: Live site / Source code (hidden when missing), next to the summary; Live site uses the project color
6. **Problem** — context and the problem
7. **What I did** — my specific contribution
8. **Result** — the impact (numbers only when real)
9. Screenshot gallery (optional)

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
  end: number | null; // end year; null = shown as "<year> — Present"
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

- **Concept — "The Ledger":** Alul builds order, stock, and storefront systems, so the site reads like an editorial ledger: warm paper, ink, hairline rules, numbered entries, mono metadata, and one signal color. Typography carries the design; no cards-with-shadows, gradient blobs, or pill chips.
- **Theme:** light and dark. Light is the default for every visitor; a toggle switches to dark (remembered in `localStorage`).
- **Colors (oklch, `@theme` in `globals.css`):** `slate-*` is remapped to warm paper/ink neutrals (no pure white or black). `primary` = signal vermilion, the only accent. `secondary` = rust, only as a tonal gradient partner. `accent` = amber, tiny highlights (Coming soon). Dark mode is warm ink (`slate-900`), not cold navy.
- **Project colors:** solid plates behind screenshots — Belanjaku orange, SWIFT purple, WAVES-SSI brand gradient (`#2f6875` → `#083a4f`), KlikDiabetes emerald.
- **Background:** plain paper. Corners are near-square (2–8px).
- **Layout:** content max-width 90rem (1440px), mobile-first, default Tailwind breakpoints. Rhythm varies on purpose: About, Experience, and Contact use a sticky side heading (4/12 columns); Skills and Projects use a giant stacked heading; Projects is a full-bleed ink block.
- **Fonts:** `Archivo` (variable, `wdth` axis) for headings and text — expanded width for display; `Instrument Serif` italic for accent words only; `JetBrains Mono` for labels and tags, via `next/font`.
- **Icons:** Material Design Icons (`@mdi/js`) through `components/ui/Icon.tsx`; brand logos from Simple Icons.
- **Logo:** `<a/>` mark (anchor tag + initial), ink tile with a vermilion slash. Source in `src/app/icon.svg`; exports in `/brand` (TODO: re-export the PNGs in the new colors).

## 8. Animation (Motion)

The goal is smooth, not busy.
- Sections and cards: fade + 16–24px slide-up when entering the viewport, once (`once: true`).
- Lists: 50–80ms stagger.
- Opening (every page load, skipped for reduced motion): warm ink overlay, the `<a/>` logo fills up, the nickname letters rise one by one (ending in a small vermilion period), then the overlay splits into horizontal strips that slide out right, bottom first (~1.4s). Pure CSS so it runs from the first paint.
- Hero: the name rises letter by letter as the strips clear, then the meta row, tagline and CTAs fade up. All hero entrance animations are CSS so they never wait for hydration (slow on phones).
- Hero name drift: while scrolling the first viewport, the two name lines slide apart horizontally (CSS scroll-driven animation, `transform` only). Progressive enhancement; off for reduced motion and unsupported browsers.
- Case study modal content has no `Reveal`; the morph is its entrance. Opened directly from the URL (no card to morph from), the panel fades and slides up.
- On mobile the hero tagline has no fade: it is painted from the first frame behind the opening, so it is a fast LCP element.
- Motion components are `m.*` inside `LazyMotion strict`; features (`domMax`, needed for the command bar `layoutId`) load async.
- Buttons: vermilion fill rises from the bottom on hover. Cards and icons: spring tap press (`Pressable`). Text links: underline draws in from the left. List rows: label slides right, arrow nudges.
- Case study modal: the clicked card grows into the modal panel (the card text fades out as it grows, the screenshot frame lines up with the modal cover, and the modal text fades in on top), and shrinks back into the card on close.
- Copy button: label crossfade. Theme toggle: icon rotate + fade.
- **Must** respect `prefers-reduced-motion` (`<MotionConfig reducedMotion="user">`).
- Forbidden: heavy parallax, looping animations, scroll-jacking, 3D tilt.

## 9. SEO & Metadata

- Per-page `metadata` (title, description), title template `%s — Alul`, `hreflang` alternates for `en` and `id`.
- Generated Open Graph images: `app/[lang]/opengraph-image.tsx` and one per project.
- `app/robots.ts` and `app/sitemap.ts` (with `hreflang` alternates), `metadataBase` from `profile.siteUrl` (`https://alul.vercel.app`).
- `app/icon.svg` as the favicon.

## 10. Non-Functional

- Lighthouse ≥ 95 for Performance, Accessibility, Best Practices, and SEO (mobile).
- Every image goes through `next/image` with meaningful `alt`; the LCP image loads eagerly.
- Full keyboard navigation, visible focus rings, WCAG AA color contrast, touch targets ≥ 44px.
- Every page is static (SSG). No API routes in v1.
- Screenshots must not expose personal data (blur names, emails, phone numbers of real people).
- Deploy: Vercel.
- Visitor analytics: Vercel Web Analytics (`<Analytics />` in the root layout, cookieless).

## 11. Out of Scope for v1

Blog, CMS, contact form, testimonials, auth.

## 12. Milestones

1. ✅ Setup: scaffold, Prettier, color and font tokens, base layout
2. ✅ Data: content types, structural data, bilingual copy
3. ✅ Hero + About
4. ✅ Skills + Experience
5. ✅ Projects (grouped grid)
6. ✅ Case study modal
7. ✅ Contact + Footer
8. ✅ Motion across all sections
9. ✅ SEO: metadata, OG images, robots, sitemap
10. ✅ Theme toggle, command bar navigation, logo
11. TODO: Lighthouse audit (deployed at `alul.vercel.app`)
