# 📁 Rama `feature/comunidad` — Documentación de desarrollo

> Documento de referencia para el equipo. Resume lo desarrollado en la rama **`feature/comunidad`**: la sección **Comunidad** (`#comunidad`, PRD 06). Complementa a `docs/feature-header.md`, `docs/feature-hero.md`, `docs/feature-talento-empresas.md` y `docs/feature-ui-kit-footer.md`.

---

## 1. Contexto

- **Producto:** Landing de **TechToJob** — Torneo #02.
- **Referencia de requisitos:** `techtojob_prd_project_brief.md` (PRD, sección 06 *Comunidad & Networking*).
- **Stack:** Next.js 16.3.5 (App Router, `src/`) · React 19.2.8 · TypeScript 5 · Tailwind CSS v4.

---

## 2. Qué se desarrolló en esta rama

### 2.1 Sección Comunidad — `src/components/sections/Community.tsx` ✅

**Server Component** (sin estado ni interactividad, solo enlaces).

- **`<section id="comunidad">`** con `aria-label` desde el catálogo y `<h2>` propio.
- **Encabezado** alineado a la izquierda (mismo patrón que las otras secciones): badge monospace con punto teal (`06 · COMUNIDAD`), `<h2>` en dos líneas con «te enteras» en `text-accent` (highlight del PRD) y subtítulo en `text-canvas/70`.
- **Dos columnas** (`lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]`, ~35 % / 65 %, `items-start`):
  - **Izquierda:** 3 feature cards apiladas (`gap-4`), `bg-surface rounded-xl p-6`; icono en cuadrado `w-10 h-10 rounded-lg bg-accent/15 text-accent`; título `text-lg font-bold`; descripción `text-sm text-canvas/70`.
  - **Derecha:** panel «Canales de la comunidad» `bg-surface/40 rounded-xl p-6`; header tipo ventana (3 puntos macOS + título + badge `Explorador de canales` con punto `animate-pulse`); grid de canales `grid-cols-2 gap-3`, cada uno `bg-ink rounded-lg p-3` con `#` en `text-accent` + nombre `font-mono` y descripción `text-xs text-canvas/50`.
    - **Hover de cada tarjeta de canal** (`group`): borde `border-canvas/10 → hover:border-accent`, título `group-hover:text-accent`, lift de 2px y sombra teal discreta, con `transition duration-300 ease-out`. El fondo y las dimensiones no cambian (sin `scale`).
- **CTA centrado** al fondo: `Button` con overrides `rounded-full! border-accent/40! bg-accent/15! text-accent!` + `DiscordGlyph`.

### 2.2 Iconos — `src/components/ui/icons.tsx`

Nuevos glifos genéricos (Lucide, ISC), monocromos (`currentColor`), decorativos (`aria-hidden`) y con `shrink-0`:

| Icono | Uso |
|---|---|
| `HashGlyph` | Feature card «Canales temáticos especializados» |
| `BriefcaseGlyph` | Feature card «Ofertas compartidas de primera mano» |
| `CodeGlyph` (existente) | Feature card «Charlas y feedback de código» |

### 2.3 Contenido y tipos ✅

- `src/messages/es.json`: nuevo bloque `comunidad` → `eyebrow`, `titleLead`, `titleAccent`, `subtitle`, `features` (3 × `title`/`description`), `panel` (`title`/`badge`), `channels` (8 × `name`/`description`), `cta`.
- `src/types/content.ts`: tipo `comunidad` dentro de `Messages`.
- **Regla intacta:** todo el texto vive en el catálogo i18n, nunca hardcodeado.

### 2.4 Contraste y accesibilidad (WCAG AA) ✅

- Texto `text-canvas` / `text-canvas/70` sobre `bg-surface` y `bg-ink`; el teal solo en acentos (`#`, punto, badge, CTA), nunca como párrafo.
- CTA: `text-accent` sobre `bg-accent/15` (fondo oscuro) ≈ 7–8:1 → AA.
- Puntos macOS, punto pulsante e iconos son decorativos (`aria-hidden`); `animate-pulse` queda congelado por la guarda global `prefers-reduced-motion: reduce`.
- Foco visible en el CTA (provisto por `Button`).

### 2.5 Panel de canales sticky ✅

La columna derecha (panel «Canales de la comunidad») es **`sticky top-24`**: mientras las 3 feature cards de la izquierda pasan al hacer scroll, el panel se queda fijo en pantalla acompañando el movimiento.

- El grid padre usa `items-start` (no `items-center`/`stretch`), de modo que el grid item derecho no se estira y su área es más alta que el panel (la columna izquierda, con 3 cards, es más alta) → hay recorrido para el sticky.
- `top-24` (96px) deja el panel por debajo del header sticky (~60px).
- Requisito verificado: **ningún ancestro** tiene `overflow-hidden`/`clip` (el Hero lo tiene, pero no es ancestro de `#comunidad`).
- Es CSS puro: no hace falta cliente ni JS. (Se eliminó el antiguo parallax de scroll `CommunityChannelsPanel.tsx`.)

---

## 3. Validación realizada

| Prueba | Resultado |
|---|---|
| `npm run lint` | ✅ exit 0 |
| `npx tsc --noEmit` | ✅ exit 0 |
| `npm run build` (Next 16.3.5) | ✅ exit 0 |
| Responsive | ✅ mobile (1 columna) / desktop (35 % + 65 %, canales en 2 col.) |
| `prefers-reduced-motion` | ✅ respetado (guardia global) |

---

## 4. Commits de la rama

- `feat(comunidad): redesign community section with channels panel and Discord CTA`

> Se listan por **mensaje**, no por SHA, porque los rebases de sincronización cambian los hashes.

---

*Para el equipo: si haces cambios, actualiza este documento antes de mergear.* 💜
