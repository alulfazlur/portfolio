# Portfolio — Alul

Personal portfolio of Fazlur Rahman (Alul). Full spec: @spec.md — read it before working on any feature.

This Next.js version has breaking changes compared to older training data. Follow @AGENTS.md and check `node_modules/next/dist/docs/` before using an API.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript `strict`
- Tailwind CSS v4 — CSS-first config via `@theme` in `src/app/globals.css`. There is **no** `tailwind.config.js`.
- Motion (`motion` package, formerly framer-motion) — import from `motion/react`, not `framer-motion`. Use `m.*` components, not `motion.*`: `MotionProvider` wraps the app in `LazyMotion strict` with features loaded async.
- i18next for English/Indonesian copy (server-side, no `react-i18next`).
- Package manager: **yarn**. Do not use npm/pnpm and do not create `package-lock.json`.

## Commands

- `yarn dev` — dev server
- `yarn build` — production build
- `yarn lint` — ESLint
- `yarn typecheck` — `tsc --noEmit`
- `yarn format` — Prettier (Markdown files are ignored on purpose)

**Definition of done:** `yarn lint && yarn typecheck && yarn build` pass without errors. Do not report work as done before that.

## Structure

```
src/
  app/
    [lang]/             # all pages live under the locale segment (en, id)
      layout.tsx        # root layout: fonts, theme script, metadata, nav, footer
      page.tsx          # home: Hero → About → Skills → Experience → Projects → Contact
      projects/[slug]/  # home page under the project URL + per-project OG image
      @modal/           # case study modal: (.)projects = card click (intercepted), projects = direct load / refresh
    global-not-found.tsx  # English 404 for unmatched URLs
    icon.svg            # favicon (the `<a/>` logo)
    robots.ts
  components/
    sections/           # one file per page section (server components)
    ui/                 # small reusable pieces (ButtonLink, Tag, ProjectCard, CommandBar, ...)
    motion/             # client-side animation wrappers (Reveal, Stagger, Pressable, ...)
  content/
    types.ts            # the only source of content types (incl. `Messages`)
    locales/en.ts, id.ts  # ALL user-facing copy, one object per language
    profile.ts, socials.ts, skills.ts, experience.ts, projects.ts  # structural data
  lib/                  # pure helpers (i18n, content merging, formatting, OG image)
  proxy.ts              # redirects `/` and locale-less paths to `/en` or `/id`
public/
  images/               # profile photo, project screenshots
  doc/                  # CV (PDF)
brand/                  # exported logo (SVG + PNG), not served by the site
```

## Rules

### General
- Only do what is asked and what is in the spec. No extra features, dependencies, or "for later" abstractions.
- Keep changes minimal and focused. Do not refactor unrelated files.
- One way to do one thing. No fallbacks, no backup code.
- Ask before adding a new dependency.

### Content & i18n
- All copy lives in `src/content/locales/{en,id}.ts`. Components must never hardcode content text.
- Structural data (links, stack, years, colors, images) lives in the other `src/content/*.ts` files.
- New copy means: add the key to `Messages` in `types.ts`, then to **both** locale files. TypeScript enforces this.
- Indonesian copy is semi-formal and friendly ("aku", not "saya"). English copy is written for recruiters.
- Never invent personal data, experience, or numbers. Use a `TODO:` placeholder when information is missing.
- Server components read copy with `getT()` / `getLocale()` from `@/lib/i18n` (backed by `next/root-params`).
- Route handlers (OG images) take the locale from `params` and use `getFixedT(locale)`.
- Client components receive translated strings as props.

### React / Next.js
- Default to **Server Components**. Use `"use client"` only for state, events, or Motion.
- Wrap animation in small components under `components/motion/` so sections stay server components.
- Always use `next/image` with meaningful `alt`. Fonts via `next/font`.
- Icons: `<Icon path={mdiX} />` with paths from `@mdi/js`. Brand logos (Simple Icons) stay as inline paths.
- Project covers are statically imported in `content/projects.ts` (real dimensions + blur placeholder).
- `priority` is deprecated in Next 16. Use `loading="eager"` (and `fetchPriority="high"` for the LCP image).
- Image quality must be listed in `images.qualities` in `next.config.ts`. Screenshots use `quality={90}`.
- Dynamic routes use `generateStaticParams` with `dynamicParams = false`. Every page must be static.
- Named exports for components, one component per file, PascalCase file names.

### TypeScript
- No `any`, no `as` to silence errors. Let the types catch mistakes.
- `src/content/types.ts` is the single source of content types.

### Styling
- Tailwind utility classes only. No CSS modules, no inline styles except dynamic values.
- Colors come from `@theme` tokens (e.g. `bg-primary-700`, `bg-waves`) or the Tailwind palette, never hex in `className`.
- Per-color class sets (chip, frame, button, ...) live in `components/ui/tones.ts`. Write class names in full; Tailwind cannot detect concatenated names.
- Art direction "Spec Sheet" (see spec §7): cool paper with `bg-dotgrid`, graphite text, hairline rules (`border-slate-900/10` / `dark:border-slate-100/10`), mono lowercase labels, key/value tables, `Crosshairs` on framed blocks, soft corners (`rounded-md`–`rounded-[16px]`). Light display weights. No gradient blobs, code-editor cards, or 3D tilt.
- Palette: `slate-*` is remapped in `@theme` to cool graphite oklch neutrals. `primary-*` (soft cobalt) is the only accent; `secondary-*` (blue-cyan) only as a gradient partner; `accent-*` (amber) for tiny highlights. Components use these role scales, not `blue-*` / `indigo-*` directly (`tones.ts` excepted). Project frames: Belanjaku orange, SWIFT purple, WAVES-SSI `waves`, KlikDiabetes emerald.
- Fonts: `font-sans`/`font-display` = IBM Plex Sans (use `font-light` for display type, `italic` for accent words), `font-mono` = IBM Plex Mono.
- Dark mode uses the `dark:` variant, driven by the `.dark` class on `<html>` (`ThemeScript` + `ThemeToggle`). Light is the default; dark only applies when the visitor picks it. Dark backgrounds are soft graphite (`slate-900`), never pure black.
- Mobile-first. Check layouts at 375px and 1280px, in light and dark mode, in both languages.

### Animation
- Subtle and run-once: small fade/slide-up, short stagger. Durations 0.3–0.6s. Default easing `ease-out-expo`. No looping animations, heavy parallax, scroll-jacking, or 3D tilt. The only scroll-linked motion is the hero name drift (CSS `animation-timeline`, transform only).
- `MotionConfig reducedMotion="user"` at the root — never bypass it.
- Animate only `opacity` and `transform`.
- Hover/tap on buttons and cards goes through `Pressable` (spring presets). Large moving elements must be GPU-promoted (`will-change`), otherwise they re-rasterize every frame and stutter.

### Accessibility
- Semantic HTML (`header`, `nav`, `main`, `section`, `footer`), one `h1` per page.
- Every interactive element is keyboard-accessible with a visible focus ring. Touch targets are at least 44px.
- External links: `target="_blank" rel="noopener noreferrer"`.

## Debugging

Investigate first, then fix:
1. Reproduce the bug. A bug that cannot be reproduced does not exist yet.
2. Write down an explicit hypothesis about the cause.
3. Gather evidence (minimal, targeted logs, error messages, stack traces, measurements).
4. Fix only after the evidence confirms the hypothesis. Fix the root cause, not the symptom.
5. Remove debugging logs when done.

## Git

- Small commits per successful step, using Conventional Commits (`feat:`, `fix:`, `chore:`).
- Never commit before the definition of done passes.
