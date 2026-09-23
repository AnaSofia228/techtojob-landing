# 📁 Rama `feature/noticias` — Documentación de desarrollo

> Documento de referencia para el equipo. Resume lo desarrollado en la rama **`feature/noticias`**: la sección de **Noticias** (PRD sección **07**, ancla `#noticias`). Complementa a `docs/feature-header.md`, `docs/feature-ui-kit-footer.md` y `docs/feature-testimonios.md`.

---

## 1. Contexto

- **Producto:** Landing de **TechToJob** — Torneo #02.
- **Referencia de requisitos:** `techtojob_prd_project_brief.md` (PRD) + diseño de referencia adjunto en la tarea.
- **Stack:** Next.js 16.3.5 (App Router, `src/`) · React 19.2.8 · TypeScript 5 · Tailwind CSS v4.
- **Punto de partida:** `feature/testimonios` (siguiente eslabón de la cadena). Cuando `main` reciba los merges pendientes del equipo, el diff de esta rama quedará reducido a la sección de noticias.

---

## 2. Qué se desarrolló en esta rama

### 2.1 Sección de noticias — `src/components/sections/News.tsx` ✅

**Server Component** (sin estado ni interactividad más allá de enlaces planos) que sustituye el stub `<section id="noticias" />` por la sección completa del diseño de referencia. Se conserva el nombre de exportación `News` (lo usan `page.tsx` y el barrel `sections/index.ts`).

- **Encabezado a la izquierda**, mismo patrón que el resto: eyebrow con punto teal, `<h2>` con la segunda parte en `text-accent` y subtítulo `max-w-2xl`.
- **Rejilla de 3 tarjetas** en `<ul>` real: `grid gap-6 md:grid-cols-3`.
- **Cada tarjeta** (`<li>`, `flex flex-col`) contiene:
  - **Chip de categoría**: `highlight ?` estilo accent (`border-accent/40 bg-accent/10 text-accent`, como la tarjeta 1 de la referencia) `:` neutro (`border-canvas/15 bg-canvas/5 text-canvas/70`).
  - **Fecha** a la derecha en `font-mono text-xs text-canvas/50`.
  - **Título** en `<h3>` y **extracto** en `text-canvas/70`.
  - **Pie con separador** (`h-px bg-canvas/10`, patrón de `HowItWorks`) y **enlace CTA** en accent con `ArrowGlyph` + foco visible (`focus-visible:ring-2 ring-accent`).
- **Hover compartido:** las tarjetas llevan `ttj-card`, la misma animación que `HowItWorks`, `Tournaments` y `Testimonials` (elevación + glow teal, 300 ms). **No se añadió CSS nuevo.**

### 2.2 Contenido, tipos e icono ✅

- `src/messages/es.json`: nuevo bloque `noticias` → `eyebrow`, `titleLead`, `titleAccent`, `subtitle` e `items[]` con `tag`, `date`, `title`, `excerpt`, `cta`, `href` y `highlight` (opcional).
- `src/types/content.ts`: `noticias` añadido al tipo `Messages`.
- `src/components/ui/icons.tsx`: nuevo `ArrowGlyph` (rutas exactas de Lucide `arrow-right`), siguiendo el patrón del catálogo.
- Cero copy hardcodeado y cero hex sueltos (solo tokens de tema).

### 2.3 Destinos de los enlaces (sin URLs inventadas)

Las tres notas del diseño no tienen artículos reales aún, así que los `href` apuntan a **anclas internas que ya existen** y se cambian en `es.json` cuando haya URLs reales:

| Tarjeta | `href` actual |
|---|---|
| Bases del Torneo #02 | `#torneos` |
| Dinámicas de code review | `#comunidad` |
| Análisis de contratación técnica | `#empresas` |

### 2.4 ⚠️ Contenido placeholder (pendiente antes de publicar)

Las 3 noticias (fechas, títulos y textos) son las del **diseño de referencia** (fechas de 2024, del mockup), no publicaciones reales. Deben sustituirse por entradas reales antes del lanzamiento, ya que el PRD prohíbe promesas falsas y métricas inventadas.

---

## 3. Accesibilidad y contraste (WCAG AA)

- HTML semántico: `<section aria-label>` → `<h2>` → `<ul>`/`<li>` → `<h3>`; la fecha usa `<time>`.
- Punto y flecha decorativos con `aria-hidden="true"` (los glifos ya lo aplican internamente).
- Contraste medido sobre `bg-ink-alt` (`#191c1e`): título ≈ **15:1**, extracto `text-canvas/70` ≈ **8.9:1**, chip neutro ≈ **6.9:1**, fecha `text-canvas/50` ≈ **4.7:1**, enlace accent ≈ **7.5:1** → todos por encima de AA.
- Enlaces con foco visible (`focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none`).
- `prefers-reduced-motion`: la guardia global anula el `transform` de `ttj-card`; la transición de color del enlace es inofensiva.

---

## 4. Validación realizada

| Prueba | Resultado |
|---|---|
| `npm run lint` | ✅ exit 0 |
| `npx tsc --noEmit` | ✅ exit 0 |
| `npm run build` (Next 16.3.5) | ✅ exit 0 |
| Base de partida (antes de tocar código) | ✅ lint y tsc en 0 sobre `feature/testimonios` |
| Responsive | ✅ 1 columna (móvil) / 3 (escritorio) |
| `prefers-reduced-motion` | ✅ respetado (guardia global) |

---

## 5. Commits de la rama

- `feat(noticias): seccion de noticias con el diseno de referencia y hover compartido`

> Se listan por **mensaje**, no por SHA, porque los rebases de sincronización cambian los hashes.

---

*Para el equipo: si haces cambios, actualiza este documento antes de mergear.* 💜