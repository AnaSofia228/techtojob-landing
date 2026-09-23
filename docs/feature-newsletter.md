# 📁 Rama `feature/subscripcion` — Documentación de desarrollo

> Documento de referencia para el equipo. Resume lo desarrollado en la rama **`feature/subscripcion`**: la sección **Newsletter / Suscripción** (`#newsletter`, PRD 09). Complementa a `docs/feature-header.md`, `docs/feature-hero.md`, `docs/feature-comunidad.md` y `docs/feature-ui-kit-footer.md`.

---

## 1. Contexto

- **Producto:** Landing de **TechToJob** — Torneo #02.
- **Referencia de requisitos:** `techtojob_prd_project_brief.md` (PRD, sección 09).
- **Stack:** Next.js 16.3.5 (App Router, `src/`) · React 19.2.8 · TypeScript 5 · Tailwind CSS v4.

---

## 2. Qué se desarrolló en esta rama

### 2.1 Sección Newsletter — `src/components/sections/Newsletter.tsx` ✅

**Client Component** (`"use client"`) que funciona como **“break” claro** entre bloques oscuros: `<section id="newsletter">` con `bg-canvas` (blanco) y `text-surface`, `py-20 sm:py-24`, contenido centrado en `mx-auto max-w-2xl`.

Estructura (de arriba a abajo, todo centrado):

1. **Badge**: pill `bg-accent/15` con punto teal y texto `SUSCRIPCIÓN` en mayúsculas (`uppercase tracking-widest text-xs`). El texto va en `text-surface` (oscuro) para cumplir AA sobre fondo claro.
2. **Título `<h2>`**: `text-3xl sm:text-4xl font-bold leading-tight`, en `text-surface` (oscuro principal, no negro puro).
3. **Subtítulo**: `text-surface/70`, `max-w-2xl`, centrado.
4. **Formulario** (`<form onSubmit>`): input controlado (`useState`) + botón en la misma fila (`sm:flex-row`), apilados en mobile.
   - **Input**: `type="email"`, `autoComplete="email"`, `required`, `bg-canvas border border-surface/20 rounded-lg`, placeholder `tu@email.com`, foco `ring-accent`. `<label>` asociado con `htmlFor`/`useId` en **`sr-only`**.
   - **Botón**: `bg-surface text-canvas rounded-lg`, con `MailGlyph` a la izquierda; hover `bg-surface/90` con transición.
   - `handleSubmit` solo hace `preventDefault()` + `// TODO` (sin lógica de envío, por ahora).
5. **Confianza**: `LockGlyph` en `text-accent` + `Cero spam…` en `text-surface/70`, en una fila (`inline-flex items-center gap-2`).

### 2.2 Iconos — `src/components/ui/icons.tsx`

Nuevos glifos genéricos (Lucide, ISC), monocromos (`currentColor`), decorativos (`aria-hidden`) y con `shrink-0`:

| Icono | Uso |
|---|---|
| `MailGlyph` | Botón «Quiero las novedades» |
| `LockGlyph` | Nota de confianza anti-spam |

### 2.3 Contenido y tipos ✅

- `src/messages/es.json`: nuevo bloque `newsletter` → `eyebrow`, `title`, `subtitle`, `emailLabel`, `emailPlaceholder`, `cta`, `trust`.
- `src/types/content.ts`: tipo `newsletter` dentro de `Messages`.
- **Regla intacta:** todo el texto vive en el catálogo i18n, nunca hardcodeado.

### 2.4 Contraste y accesibilidad (WCAG AA) ✅

- Título `text-surface` sobre blanco ≈ 12:1; subtítulo y nota de confianza `text-surface/70` ≈ 4.8:1.
- Badge: texto oscuro sobre `bg-accent/15` (alto contraste) + punto teal decorativo.
- Botón: `text-canvas` sobre `bg-surface` ≈ 12:1.
- Input con `<label>` `sr-only` asociado (`htmlFor`/`useId`) y foco visible (`ring-accent`); el botón también con foco visible.
- Nota: el PRD menciona label visible y CTA «Recibir resumen semanal»; esta rama sigue la especificación de la tarea (label `sr-only` y CTA «Quiero las novedades»).

---

## 3. Validación realizada

| Prueba | Resultado |
|---|---|
| `npm run lint` | ✅ exit 0 |
| `npx tsc --noEmit` | ✅ exit 0 |
| `npm run build` (Next 16.3.5) | ✅ exit 0 |
| Responsive | ✅ mobile (form apilado) / desktop (input + botón en fila) |

---

## 4. Commits de la rama

- `feat(newsletter): add light subscription section with controlled email form`

> Se listan por **mensaje**, no por SHA, porque los rebases de sincronización cambian los hashes.

---

*Para el equipo: si haces cambios, actualiza este documento antes de mergear.* 💜
