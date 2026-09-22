# 📁 Rama `feature/hero` — Documentación de desarrollo

> Documento de referencia para el equipo. Resume lo desarrollado en la rama **`feature/hero`**: la sección **Hero** (`#hero`, PRD sección **01**), el primer bloque visible de la landing de **TechToJob** — Torneo #02. Complementa a `docs/feature-header.md` y `docs/feature-ui-kit-footer.md` (contrato de tokens y convenciones).

---

## 1. Contexto

- **Producto:** Landing de **TechToJob**.
- **Referencia de requisitos:** `techtojob_prd_project_brief.md` (PRD, sección 01 Hero).
- **Stack:** Next.js 16.3.5 (App Router, `src/`) · React 19.2.8 · TypeScript 5 · Tailwind CSS v4.

---

## 2. Qué se desarrolló en esta rama

### 2.1 Sección Hero — `src/components/sections/Hero.tsx` ✅

Server Component sin estado. Cumple la sección **01** del PRD y la especificación del torneo:

- **Único `<h1>` de la página**: *«La comunidad donde demuestras lo que sabes»* + *«Y las empresas vienen a verte»* resaltado en `text-accent` (el acento se usa como *highlight* de titular, nunca como texto de párrafo).
- **Subtítulo** en `text-canvas/70` (contraste AA sobre fondo oscuro).
- **3 micro-badges** en lista real (`<ul>`/`<li>`): *Código evaluado en vivo*, *Sin sesgo de filtros ATS*, *Retos y premios*. Cada una con icono decorativo (`aria-hidden`) + texto.
- **Dos CTAs** (PRD): primario *Unirse al Discord* (`<a>` real vía `Button`, `SOCIAL_LINKS.discord`, `target="_blank"` y `rel="noopener noreferrer"`) y secundario *Explorar torneos* (`Button variant="secondary"`, enlace ancla interno a `#torneos`). Apilados en móvil y en fila desde `sm:`.
- **Panel derecho**: tarjeta estilo *ventana de terminal* (3 puntos tipo macOS, título monoespaciado y líneas de actividad genéricas, sin cifras inventadas).
- **Layout:** una columna en móvil/tablet → dos columnas en desktop (`lg:grid-cols-2`), texto a la izquierda y panel a la derecha.
- **Fondo:** `bg-ink` con cuadrícula teal animada (ver 2.2).

### 2.2 Toolkit de animación — `src/app/globals.css`

Nueva animación en el `@theme`:

```css
--animate-grid: ttj-grid 20s linear infinite;

@keyframes ttj-grid {
  from { background-position: 0 0; }
  to   { background-position: 64px 0; }
}
```

- Desplaza la cuadrícula de fondo **izquierda → derecha**, en bucle, a **20s** (lento, no mareante).
- La **guarda global `prefers-reduced-motion: reduce`** ya congela esta y el resto de animaciones.
- La rejilla se pinta con utilidades arbitrarias (`linear-gradient` + `background-size: 64px 64px`) y una **máscara radial** para desvanecerla hacia los bordes.
- **Excepción documentada:** es el único uso del acento `#84c0bf` como decoración no interactiva (anotado en `AGENTS.md` §4 y `docs/feature-hero.md`).

### 2.3 Iconos — `src/components/ui/icons.tsx`

Nuevos glifos genéricos (Lucide, ISC), monocromos (`currentColor`), decorativos (`aria-hidden`) y con `shrink-0`:

| Icono | Uso |
|---|---|
| `CodeGlyph` | Badge «Código evaluado en vivo» |
| `ShieldGlyph` | Badge «Sin sesgo de filtros ATS» |
| `TrophyGlyph` | Badge «Retos y premios» |

Así se respeta la regla de **no pegar SVG inline** en componentes de sección.

### 2.4 Contenido y tipos ✅

- `src/messages/es.json`: nueva sección `hero` → `title`, `titleAccent`, `subtitle`, `badges` (3), `cta`, `ctaSecondary`, `terminal` (`label`, `title`, `lines[]` con `kind`/`text`).
- `src/types/content.ts`: tipado de `hero` en el shape `Messages`.
- **Regla intacta:** todo texto visible vive en el catálogo i18n, nunca hardcodeado.

---

## 3. Accesibilidad

- HTML semántico: `<section aria-label>`, `<h1>`, `<ul>`/`<li>`, `<figure aria-label>` + `<pre><code>` para el terminal.
- Puntos tipo macOS y capa de cuadrícula decorativa con `aria-hidden="true"`.
- CTA primario con foco visible (`focus-visible:ring-canvas` sobre botón de acento) y CTA secundario con foco visible (`focus-visible:ring-accent` sobre botón claro), ambos provistos por `Button`. El secundario es un enlace ancla interno (`#torneos`), sin `target="_blank"`.
- `#hero` **sin `scroll-mt`**: el `scroll-padding-top` global compensa el header sticky.
- Contraste AA: titulares y texto secundario sobre `bg-ink`; el teal no se usa como párrafo.

---

## 4. Validación realizada

| Prueba | Resultado |
|---|---|
| `npm run lint` | ✅ exit 0 |
| `npx tsc --noEmit` | ✅ exit 0 |
| `npm run build` (Next 16.3.5) | ✅ exit 0 |
| Responsive | ✅ mobile / tablet / desktop |
| `prefers-reduced-motion: reduce` | ✅ animación congelada por la guarda global |

---

## 5. Commits de la rama

- `feat(hero): implement two-column hero with animated grid and terminal panel`
- `feat(hero): add secondary "Explorar torneos" CTA`

> Se listan por **mensaje**, no por SHA, porque los rebases de sincronización cambian los hashes.

---

*Para el equipo: si haces cambios, actualiza este documento antes de mergear.* 💜
