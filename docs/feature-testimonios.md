# 📁 Rama `feature/testimonios` — Documentación de desarrollo

> Documento de referencia para el equipo. Resume lo desarrollado en la rama **`feature/testimonios`**: la sección de **Testimonios** (PRD sección **06**, ancla `#testimonios`). Complementa a `docs/feature-header.md`, `docs/feature-hero.md`, `docs/feature-ui-kit-footer.md` y `docs/feature-talento-empresas.md`.

---

## 1. Contexto

- **Producto:** Landing de **TechToJob** — Torneo #02.
- **Referencia de requisitos:** `techtojob_prd_project_brief.md` (PRD, sección 06).
- **Stack:** Next.js 16.3.5 (App Router, `src/`) · React 19.2.8 · TypeScript 5 · Tailwind CSS v4.
- **Punto de partida:** `feature/talento-empresas` (el estado más avanzado del stack, que ya incluye el kit UI, el header/footer y el catálogo de mensajes). Cuando `main` reciba los merges pendientes del equipo, el diff de esta rama quedará reducido a la sección de testimonios.

---

## 2. Qué se desarrolló en esta rama

### 2.1 Sección de testimonios — `src/components/sections/Testimonials.tsx` ✅

**Server Component** (sin estado ni interactividad más allá de marcado plano) que sustituye el stub `<section id="testimonios" />` por la sección completa del diseño de referencia.

- **Encabezado alineado a la izquierda**, mismo patrón que `HowItWorks` y `Tournaments`: eyebrow con punto teal (`inline-flex rounded-full border-accent/40 bg-accent/10 text-accent`, `uppercase tracking-widest`), `<h2>` con la segunda parte en `text-accent` y subtítulo en `text-canvas/70`. El bloque usa `max-w-3xl` y el subtítulo `max-w-2xl`; la rejilla va a `mt-12`.
- **Rejilla de 4 tarjetas** en `<ul>` real: `grid gap-6 sm:grid-cols-2 lg:grid-cols-4` → una fila en escritorio como en la referencia, dos columnas en tablet y una en móvil.
- **Cada tarjeta** (`<li>`, `flex flex-col`) contiene:
  - **Avatar** con iniciales en un cuadrado redondeado (`h-11 w-11 rounded-lg border border-canvas/10 bg-ink text-canvas`), decorativo (`aria-hidden="true"`).
  - **Nombre** + `LinkedInGlyph` y **rol** debajo (`text-xs text-canvas/60`). El glifo es **decorativo y sin enlace** (los testimonios son placeholder).
  - **Cita** en `<blockquote>` con `flex-1`, con las comillas tipográficas ya incluidas en el copy del catálogo.
  - **Etiqueta** al pie anclada con `mt-auto`, tipo chip con borde: *Discord Builder*, *Torneo #01*, *Canal #devops*, *Mentora activa*.
- **Hover compartido:** las tarjetas llevan `ttj-card` y el glifo `ttj-card-icon`, es decir la misma animación que `HowItWorks` y `Tournaments` (elevación + glow teal + icono en acento, 300 ms). **No se añadió CSS nuevo**: se reutilizan las utilidades ya existentes en `globals.css`.

### 2.2 Contenido y tipos ✅

- `src/messages/es.json`: nuevo bloque `testimonios` → `eyebrow`, `titleLead`, `titleAccent`, `subtitle` e `items[]` con `initials`, `name`, `role`, `quote` y `tag`.
- `src/types/content.ts`: `testimonios` añadido al tipo `Messages`.
- Cero copy hardcodeado en el componente y cero hex sueltos (solo tokens: `bg-ink`, `bg-ink-alt`, `border-canvas/10`, `text-canvas*`, `bg-accent/*`).

### 2.3 ⚠️ Testimonios placeholder (pendiente antes de publicar)

Los cuatro testimonios (nombre, rol, cita y etiqueta) son los del **diseño de referencia**, no personas reales. Se han implementado como placeholder visible y **deben sustituirse por testimonios reales y consentidos antes del lanzamiento**, ya que el PRD prohíbe promesas falsas y métricas inventadas. El glifo de LinkedIn se mantiene decorativo (sin enlace) precisamente hasta que existan perfiles reales a los que apuntar.

---

## 3. Accesibilidad y contraste (WCAG AA)

- HTML semántico: `<section aria-label>` → `<h2>` → `<ul>`/`<li>` → `<blockquote>`.
- Avatares con iniciales y glifos decorativos marcados `aria-hidden="true"` (los glifos ya lo aplican internamente).
- Contraste medido sobre `bg-ink-alt` (`#191c1e`): cita `text-canvas/70` ≈ **8.9:1**, nombre en blanco ≈ **17:1**, rol y etiqueta `text-canvas/60` ≈ **6.9:1**, iniciales sobre `bg-ink` ≈ **18:1** → todos por encima de AA.
- No hay elementos interactivos nuevos, así que no se añade foco adicional; el hover es decorativo.
- `prefers-reduced-motion`: la guardia global ya anula el `transform` de `ttj-card` (el glow se mantiene como feedback).

---

## 4. Validación realizada

| Prueba | Resultado |
|---|---|
| `npm run lint` | ✅ exit 0 |
| `npx tsc --noEmit` | ✅ exit 0 |
| `npm run build` (Next 16.3.5) | ✅ exit 0 |
| Base de partida (antes de tocar código) | ✅ lint y tsc en 0 sobre `feature/talento-empresas` |
| Responsive | ✅ 1 columna (móvil) / 2 (tablet) / 4 (escritorio) |
| `prefers-reduced-motion` | ✅ respetado (guardia global) |

---

## 5. Commits de la rama

- `feat(testimonios): seccion de testimonios con el diseno de referencia y hover compartido`

> Se listan por **mensaje**, no por SHA, porque los rebases de sincronización cambian los hashes.

---

*Para el equipo: si haces cambios, actualiza este documento antes de mergear.* 💜
