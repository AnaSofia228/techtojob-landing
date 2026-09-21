# Product Requirements Document (PRD) & Project Brief: TechToJob Landing Page

---

## 1. Executive Summary & Vision

**Product Name:** TechToJob  
**Platform:** Web Landing Page (Responsive: Desktop & Mobile)  
**Initiative:** Community-Driven Talent Platform Landing (Torneo #2)  
**Primary Goal:** Position **TechToJob** as a builder-first technical community rather than a conventional corporate job board. Solve the junior catch-22 (unrealistic experience requirements vs. ignored applications) by enabling developers to prove competence through live participation, code reviews, and community tournaments.

---

## 2. Core Problem & Value Proposition

### 2.1 The Problem
- **Junior & Mid Developers:** Trapped in endless applicant tracking systems (ATS), cold CV submissions with 0% response rate, and entry-level positions requiring years of production experience.
- **Hiring Managers & Tech Leads:** Drowning in generic resume spam; cannot assess practical problem-solving capability, communication skills, or team velocity from a PDF.

### 2.2 The Value Proposition
- **Show, Don't Tell:** Opportunities emerge from tangible participation, code reviews, and tournament submissions.
- **Direct Peer-to-Peer Access:** Zero recruiters or bureaucratic filters; direct interactions between engineers, mentors, and hiring teams.
- **Proof of Work:** Real community challenges and open-source contributions serve as living portfolio evidence.

---

## 3. Brand Identity & Design System Standards

### 3.1 Color Palette
- **Dominant Dark Surface:** `#2f3436` (Slate / Terminal charcoal)
- **Primary Accent & Interactive:** `#84c0bf` (Soft Teal / Electric Cyan)
- **High-Contrast Text & Canvas:** `#ffffff` (Pure White)
- **Dark Neutral Backgrounds:** `#111416`, `#191c1e`
- **Strict Rule:** `#84c0bf` is **never** used as paragraph text over light backgrounds. It is strictly reserved for buttons, chips, tags, indicators, and focus outlines.

### 3.2 Typography & Tone
- **Typography:** **Sora** (loaded via Google Fonts with `preconnect` and `font-display: swap`). Maximum 3 font weights (`400` Regular, `600` SemiBold, `700` Bold).
- **Tone of Voice:**
  - Casual, direct, second-person singular (*Tuteo*: "tú"). No polite formalisms ("usted").
  - Short, punchy sentences. High signal-to-noise ratio.
  - **Forbidden Words:** *sinergia, ecosistema, revolucionar, solución integral, potenciar, disrupción*.
  - **Forbidden Promises:** Guaranteed job placement, arbitrary timelines ("hired in 30 days"), unverified vanity metrics (no fake member/company counts).
  - *"Gratis"* is never used in headlines; only in explanatory body copy where reassurance is necessary.

---

## 4. Architectural Structure & 11 Mandatory Sections

| # | Section | ID Anchor | Functional Scope & Acceptance Criteria |
|---|---|---|---|
| **00** | **Header & Navigation** | `#header` | Sticky top bar (`#2f3436`). Logo left, 5 primary direct links (*Cómo funciona, Talento, Empresas, Torneos, Comunidad*), a "Más" accessible dropdown button for *Testimonios, Noticias, Newsletter*, and primary CTA *«Unirse al Discord»*. |
| **01** | **Hero** | `#hero` | Single `<h1>` defining what TechToJob is and who it is for. Dual CTAs: Primary *«Unirse al Discord»* (with Discord SVG) + Secondary *«Explorar torneos»* (white button, `#111416` text). Real-time community proof badge. |
| **02** | **Cómo funciona** | `#como-funciona` | 3-step progressive onboarding (*01 Entras al Discord, 02 Participas y construyes, 03 Las oportunidades te encuentran*). Emphasizes low barrier to entry and zero initial bureaucratic forms. |
| **03 & 04** | **Talento y Empresas** | `#talento`, `#empresas` | Interactive dual-tab component: **Talento** (no experience barriers, zero gatekeeping, no ATS) and **Empresas** (observe builders solving live challenges prior to hiring). Accompanied by custom duotone technical illustrations. |
| **05** | **Torneos** | `#torneos` | Showcase of real challenges. Highlights active **Torneo #02** (the landing page itself), submission timelines, evaluation rules, and live participation flow through Discord. |
| **06** | **Comunidad & Networking** | `#comunidad` | Headline with highlighter accent on *"te enteras"*. 3 benefit cards (specialized channels, first-hand job leads, peer PR reviews) + interactive terminal-style channel grid (8 specific channels). Explicit badge: *«Sin intermediarios»*. |
| **07** | **Testimonios** | `#testimonios` | 4–5 testimonial cards featuring community member avatars, qualitative feedback on learning velocity and networking, and profile reference links. Zero exaggerated salary/hiring claims. |
| **08** | **Noticias** | `#noticias` | 3 editorial sample cards with category tags, publication dates, concise summaries, and clean internal anchor links. |
| **09** | **Newsletter** | `#newsletter` | Pre-footer conversion strip. Clear explanation of content and weekly cadence (zero spam). Accessible input with visible `<label>`, anti-bot security note, and custom CTA button text (*«Recibir resumen semanal»*). |
| **10** | **Cierre** | `#cierre` | Final high-impact conversion push before the footer. Directly tackles developer skepticism and provides one-click access to the community. |
| **11** | **Footer** | `#footer` | Structured 4-column layout (*Talento, Empresas, Comunidad, Legal*), official social links (Discord, LinkedIn, X, Instagram), copyright, and accessibility statement. |

---

## 5. Technical Specifications & Stack

- **Markup & Styling:** Semantic HTML5 (`header`, `nav`, `main`, `section`, `article`, `footer`) + Tailwind CSS.
- **Scripting:** Vanilla JavaScript (ES6+). Zero heavy runtime dependencies.
- **Localization Readiness:** UI copy structured and decoupled into semantic objects/keys for effortless i18n expansion.
- **Fixed External Entities & Endpoints:**
  - **Brand Name:** `TechToJob` (single word, exact casing)
  - **Discord Server:** `https://discord.gg/h9FFgKdkRd`
  - **LinkedIn Profile:** `https://www.linkedin.com/company/techtojob/`
  - **X / Twitter:** `https://x.com/techtojob`
  - **Instagram:** `https://www.instagram.com/techtojob`

---

## 6. Accessibility & Performance Goals (Lighthouse Targets)

- **Performance:** ≥ 90 (Mobile Lighthouse)
- **Accessibility:** ≥ 90 (WCAG AA compliant contrast on all interactive states, keyboard navigation for menus, dropdowns, tabs, and form controls, explicit `aria-expanded` and `aria-haspopup`).
- **Best Practices:** ≥ 90 (Modern WebP/SVG vector imagery, explicit `width` and `height` to prevent layout shifts, no console errors).
- **SEO Score:** 100
  - `<title>` strictly between 50 and 60 characters.
  - `<meta name="description">` between 150 and 160 characters.
  - Complete OpenGraph (`og:*`) & Twitter Cards (`twitter:*`) with 1200×630 asset reference.
  - Clean `Organization` JSON-LD schema with name, logo, URL, and social sameAs links.

---

## 7. Tournament Delivery Checklist

- [x] Public GitHub repository with clean structure and comprehensive `README.md`.
- [x] Production deployment verified (Cloudflare Pages or Vercel).
- [x] All 11 mandatory content sections implemented without omissions.
- [x] Mobile and Desktop responsive parity verified.
- [x] Lighthouse audit captures documented.
