# TechToJob — Landing Page

![Next.js](https://img.shields.io/badge/Next.js-16.3.5-000000)
![React](https://img.shields.io/badge/React-19.2.8-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4)
![next-intl](https://img.shields.io/badge/next--intl-4-000000)
![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3)

Bilingual (ES/EN) landing page for **TechToJob**, a builder-first technical
community. Instead of ATS filters and blind CVs, developers prove their skills
with real code — public repositories, tournaments and peer reviews — so companies
can watch them solve problems and reach out directly.

## Tech Stack

| Area       | Choice                                                                 |
| ---------- | ---------------------------------------------------------------------- |
| Framework  | Next.js 16.3.5 (App Router, `src/`)                                    |
| UI         | React 19.2.8                                                           |
| Language   | TypeScript 5 (strict)                                                  |
| Styling    | Tailwind CSS v4 (CSS-first; design tokens in `src/app/globals.css`)    |
| i18n       | next-intl 4 (`es` / `en`, routes under `app/[locale]`)                 |
| Typography | Sora via `next/font/google`                                            |
| Linting    | ESLint 9 (`eslint-config-next`)                                        |

No external UI kits: every component is built in-house.

## Requirements

- Node.js 20+ (Next.js 16)
- npm

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root redirects to the
default locale (`/es`).

## Scripts

| Command            | Description                             |
| ------------------ | --------------------------------------- |
| `npm run dev`      | Start the development server            |
| `npm run build`    | Create an optimized production build    |
| `npm run start`    | Serve the production build               |
| `npm run lint`     | Run ESLint                              |
| `npx tsc --noEmit` | Type-check the project                  |

## Project Structure

```
src/
  app/
    [locale]/           Localized route (layout + page, generateStaticParams)
    icon.png            Tab icon (TechToJob symbol)
    apple-icon.png      iOS home-screen icon
    globals.css         Tailwind v4 + design tokens + animation toolkit
  components/
    layout/             Header, Footer, LocaleSwitcher
    sections/           Landing sections (Hero, HowItWorks, …)
    ui/                 Button, icons, …
  i18n/                 routing.ts, request.ts, navigation.ts
  messages/             es.json, en.json
  types/                content.ts (Messages shape)
  data/                 navigation.ts
  lib/                  site.ts, messages.ts, cn.ts
  proxy.ts              Locale detection/redirect (Next 16 "proxy")
public/                 Brand assets (Simbolo*, v1*, v2*)
docs/                   Per-section development docs
```

## Internationalization

- Locales: `es` (default) and `en`, with `localePrefix: "always"`.
- Config: `src/i18n/routing.ts`, `src/i18n/request.ts`, `src/i18n/navigation.ts`.
- Locale detection/redirect: `src/proxy.ts`.
- All visible copy lives in `src/messages/es.json` and `src/messages/en.json`
  (same keys), typed by `src/types/content.ts`.

To add a string: add the key to **both** catalogs and to the `Messages` type,
then read it via `useMessages()` (Client Components) or `getMessages()` (Server
Components), wrapped with `asMessages()` from `src/lib/messages.ts`.

## Landing Sections

| Anchor            | Section                                    | Doc                                  |
| ----------------- | ------------------------------------------ | ------------------------------------ |
| `#header`         | Sticky header / navigation                 | `docs/feature-header.md`             |
| `#hero`           | Hero (animated grid + dashboard panel)     | `docs/feature-hero.md`               |
| `#como-funciona`  | How it works                               | —                                     |
| `#talento`        | Talent (dual-tab)                          | `docs/feature-talento-empresas.md`   |
| `#empresas`       | Companies (dual-tab)                       | `docs/feature-talento-empresas.md`   |
| `#torneos`        | Tournaments                                | —                                     |
| `#comunidad`      | Community (channels panel)                 | `docs/feature-comunidad.md`          |
| `#testimonios`    | Testimonials                               | `docs/feature-testimonios.md`        |
| `#noticias`       | News                                       | `docs/feature-noticias.md`           |
| `#newsletter`     | Newsletter                                 | `docs/feature-newsletter.md`         |
| `#cierre`         | Closing CTA                                | `docs/feature-cierre.md`             |
| `#footer`         | Footer                                     | `docs/feature-ui-kit-footer.md`      |

Sections without a dedicated doc follow this README and `AGENTS.md`.

## Design Tokens

Defined in `src/app/globals.css` (`--ttj-*` variables + Tailwind `@theme`).

| Utility      | Value     | Use                                                       |
| ------------ | --------- | --------------------------------------------------------- |
| `bg-surface` | `#2f3436` | Header/footer surfaces                                    |
| `bg-accent`  | `#84c0bf` | Interactive elements: CTAs, chips, tags, focus indicators |
| `bg-canvas`  | `#ffffff` | High-contrast text/surfaces on dark backgrounds           |
| `bg-ink`     | `#111416` | Main dark background                                      |
| `bg-ink-alt` | `#191c1e` | Alternate dark background                                 |

Strict rules: `#84c0bf` is **never** used as paragraph text on light
backgrounds, and no raw hex values in components — use theme tokens only.

## Accessibility & SEO

- Target WCAG AA: semantic HTML, visible focus, keyboard navigation and
  `prefers-reduced-motion` respected throughout.
- Localized `<title>` and description plus `<html lang>` and `hreflang`
  (`es` / `en`) via `generateMetadata`.

## Documentation

- `AGENTS.md` — project rules and conventions.
- `techtojob_prd_project_brief.md` — PRD / project brief.
- `docs/feature-*.md` — per-section development notes (header, hero, i18n,
  talent/companies, community, testimonials, news, newsletter, closing, UI kit &
  footer).

## Git Workflow

- One branch per section: `feature/<section>`.
- Conventional commits: `feat(<scope>): …`, `fix(<scope>): …`, `docs: …`, `chore:`.
- Run `npm run lint` and `npm run build` (exit 0) before committing.
- Open a PR to `main`.

## Brand Assets

Official assets live in `public/`: `Simbolo*` (symbol), `v1*` (horizontal) and
`v2*` (stacked) × `Positivo / Negativo / Black / Degradado`. Use the **Negativo**
variant on dark backgrounds. The tab icon is `src/app/icon.png`.

---

© TechToJob. All rights reserved.
