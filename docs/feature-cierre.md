# 📁 Rama `feature/cierre` — Documentación de desarrollo

> Documento de referencia para el equipo. Resume lo desarrollado en la rama **`feature/cierre`**: la sección **Cierre** (`#cierre`, PRD 10). Complementa a `docs/feature-header.md`, `docs/feature-hero.md`, `docs/feature-newsletter.md` y `docs/feature-ui-kit-footer.md`.

---

## 1. Contexto

- **Producto:** Landing de **TechToJob** — Torneo #02.
- **Referencia de requisitos:** `techtojob_prd_project_brief.md` (PRD, sección 10 *Cierre*).
- **Stack:** Next.js 16.3.5 (App Router, `src/`) · React 19.2.8 · TypeScript 5 · Tailwind CSS v4.

---

## 2. Qué se desarrolló en esta rama

### 2.1 Sección Cierre — `src/components/sections/Closing.tsx` ✅

**Server Component** (sin estado, solo un enlace).

- **`<section id="cierre">`** con `aria-label` desde el catálogo, `bg-ink` y `py-20 sm:py-24`.
- **Fondo animado** (réplica local del Hero vía `ClosingGridBackground.tsx`, sin tocar `Hero.tsx`): capa de **cuadrícula teal** (`animate-grid`, `background-size: 64px`, máscara radial) con **parallax de cursor** (`translate3d ±15px`) y un **`<canvas>`** con glow de líneas cercanas + **ondas** en hover/click. Respeta `prefers-reduced-motion`, con `requestAnimationFrame` bajo demanda y cleanup. Es la **excepción documentada** de acento decorativo (como la cuadrícula del Hero).
- **Card** `rounded-3xl border border-canvas/10 bg-ink-alt` (un tono más claro que el `bg-ink` de la página), centrado y con ancho limitado (`max-w-4xl`), padding vertical mayor que horizontal (`px-6 py-12 sm:px-10 sm:py-16`). El contenido va en `relative z-10` para quedar por encima de la cuadrícula/canvas.
- **`<h2>`**: `text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight`, en `text-canvas`, con la segunda parte («es entrar a picar código») en `text-accent` (`titleAccent`).
- **Subtítulo**: `max-w-xl`, `text-canvas/70`.
- **CTA**: `Button variant="primary"` del kit (`bg-accent` + `text-ink`, con `animate-glow` y hover) reutilizado con overrides `rounded-full! px-8! py-4!` y `DiscordGlyph` a la izquierda → `SOCIAL_LINKS.discord` (`https://discord.gg/h9FFgKdkRd`).

### 2.2 Contenido y tipos ✅

- `src/messages/es.json`: nuevo bloque `cierre` → `titleLead`, `titleAccent`, `subtitle`, `cta`.
- `src/types/content.ts`: tipo `cierre` dentro de `Messages`.
- **Regla intacta:** todo el texto vive en el catálogo i18n, nunca hardcodeado.

### 2.3 Accesibilidad y contraste (WCAG AA) ✅

- Título `text-canvas` sobre `bg-ink-alt` (alto contraste).
- Subtítulo `text-canvas/70` sobre `bg-ink-alt` ≈ AA.
- CTA `text-ink` sobre `bg-accent` ≈ 9:1; foco visible (`Button`) y `rel="noopener noreferrer"` por ser enlace externo.
- Capa del radial `aria-hidden` y `pointer-events-none`; no interfiere con el foco.
- Sin lógica de tracking/analytics; solo el enlace funcional a Discord.

---

## 3. Validación realizada

| Prueba | Resultado |
|---|---|
| `npm run lint` | ✅ exit 0 |
| `npx tsc --noEmit` | ✅ exit 0 |
| `npm run build` (Next 16.3.5) | ✅ exit 0 |
| Responsive | ✅ mobile / desktop |

---

## 4. Commits de la rama

- `feat(cierre): add closing conversion card with Discord CTA`

> Se listan por **mensaje**, no por SHA, porque los rebases de sincronización cambian los hashes.

---

*Para el equipo: si haces cambios, actualiza este documento antes de mergear.* 💜
