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
- **Panel derecho**: tarjeta *dashboard* estilo consola (header macOS + pill *Activo*, bloque de terminal, actividad en tiempo real y card del torneo vigente). Ver 2.5.
- **Layout:** ancho amplio centrado (`mx-auto max-w-7xl`) con padding lateral `px-4 sm:px-6 lg:px-8`; una columna en móvil/tablet → dos columnas asimétricas en desktop (`lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)]`): texto elástico a la izquierda y panel fijo a `28rem` pegado a la derecha.
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
| `TrophyGlyph` | Badge «Retos y premios» · icono del torneo en el dashboard |
| `BoltGlyph` | Badge «Comunidad verificada» del footer del dashboard |

Así se respeta la regla de **no pegar SVG inline** en componentes de sección.

### 2.4 Contenido y tipos ✅

- `src/messages/es.json`: nueva sección `hero` → `title`, `titleAccent`, `subtitle`, `badges` (3), `cta`, `ctaSecondary`, `dashboard` (`label`, `session`, `status`, `prompt`, `response`, `activityLabel`, `tournamentStatus`, `tournamentPrefix`, `tournamentName`, `tournamentSubtitle`, `tournamentTime`, `tags` (`frontend`/`stack`), `footerNote`, `footerVerified`).
- `src/types/content.ts`: tipado de `hero` en el shape `Messages`.
- **Regla intacta:** todo texto visible vive en el catálogo i18n, nunca hardcodeado.

### 2.5 Card dashboard — panel derecho ✅

Tarjeta autocontenida dentro de `Hero.tsx` (sin estado), escala compacta para la columna derecha (`max-w-md`) y centrada en su columna. Estructura de arriba a abajo:

1. **Header** (`px-4 py-3`): 3 círculos tipo macOS (`h-2.5 w-2.5`, `bg-red-500` / `bg-amber-400` / `bg-green-500`), `session: techtojob/discord-main` en `font-mono text-xs font-normal text-canvas/70 truncate` y badge *Activo* (`rounded-md border-accent/40 px-2 py-0.5 text-xs text-accent`, sin fondo sólido).
2. **Bloque de terminal** (`mt-4 mb-4 p-3 bg-ink`): `<pre><code>` monoespaciado con el prompt en `text-sm font-semibold text-canvas` y la respuesta `[OK] …` en `text-xs font-normal text-canvas/60`.
3. **Actividad en tiempo real** (`my-2`, fila `flex justify-between`): label `text-xs font-semibold uppercase tracking-widest text-canvas/40` e indicador con punto verde `bg-green-500 animate-pulse` + *Torneo #02 abierto* en `text-xs text-accent`.
4. **Card de torneo** (`rounded-xl bg-surface/50 p-3`): `TrophyGlyph` en círculo `h-8 w-8` (icono `h-4 w-4`) `bg-surface text-accent`; título `text-sm font-bold text-canvas` con `TechToJob` en `text-canvas` (ya **no** en teal); subtítulo `text-xs font-normal text-canvas/50`; timestamp `hace 1 semana` en `text-xs font-normal text-canvas/40`; pills `px-2 py-0.5 text-xs`: `FrontEnd` (`border-accent/30 bg-accent/15 text-accent`) y `Next.js + TailwindCSS` (`bg-canvas/10 text-canvas/70`).
5. **Footer** (`px-4 py-3`, con `border-t` como separador): `Sin formularios infinitos` en `text-xs text-canvas/60` y *Comunidad verificada* en `text-xs font-semibold text-canvas` con `BoltGlyph` (`h-3.5 w-3.5`) en `text-accent`.

- **Ritmo compacto:** cuerpo `px-4 pb-4`, terminal `mt-4 mb-4` y actividad `my-2`; la separación del footer respecto al torneo la aporta el `pb-4` del cuerpo junto al `border-t` existente.
- **Posición:** el card se centra en móvil (`mx-auto`) y se pega a la derecha en desktop (`lg:mx-0`) dentro de su columna de `28rem`.

- **Tokens del tema** (`bg-ink` / `bg-ink-alt` / `bg-surface` / `bg-canvas` / `text-canvas` / `text-accent`); sin hex sueltos ni `zinc`.
- **Excepción de animación:** el punto usa `animate-pulse` (utilidad por defecto de Tailwind, fuera del toolkit), congelada igualmente por la guarda global `prefers-reduced-motion: reduce`.

### 2.6 Parallax de la cuadrícula — `Hero.tsx` ✅

`Hero.tsx` pasa a **Client Component** (`"use client"`) para añadir un efecto decorativo de profundidad sobre la cuadrícula de fondo:

- `useRef<HTMLDivElement>` sobre la capa de la cuadrícula y un `useEffect` que suscribe `mousemove` en `window` (con limpieza en el `return`).
- Desplazamiento en **dirección opuesta** al cursor: `(clientX / innerWidth - 0.5) * -15` y su equivalente en Y (factor máximo ±15px), aplicado con `transform: translate3d(...)` para forzar capa GPU.
- `transition-transform duration-150 ease-out` para que el movimiento sea fluido, no instantáneo.
- La capa usa `-inset-5` (−20px) para cubrir el desplazamiento; la `<section>` ya tiene `overflow-hidden`, así que no se muestran bordes vacíos.
- **Accesibilidad:** si `prefers-reduced-motion: reduce` está activo, el efecto **no se registra** (además de la guarda CSS global del toolkit).

### 2.7 Canvas: glow + ondas sobre la cuadrícula — `Hero.tsx` ✅

Capa `<canvas>` absoluta (`inset-0`, `z-0`, `pointer-events-none`, `aria-hidden`) **por encima** de la cuadrícula CSS y **por debajo** del contenido (`z-10`). Es una capa **solo de efectos**: no dibuja la retícula base, así no duplica ni desalinea la CSS.

- **Resolución:** `canvas.width/height` = tamaño real × `devicePixelRatio` con `ctx.setTransform(dpr, …)`; se recalcula con `ResizeObserver` + `resize`.
- **Glow (constante):** las líneas de la retícula (paso 64px) a menos de `80px` del cursor se redibujan con alpha `0.22·(1 − dist/80)`, en el teal del proyecto `rgb(132,192,191)`.
- **Ondas (hover + click):** array de `{ x, y, radius, opacity }`; radio `+150px/s`, opacidad decreciente hasta ~1s. Se dibujan como segmentos de ~1 celda (`half = GRID_GAP`) en las intersecciones de la retícula que el anillo cruza (`cy ± √(r²−dx²)` y análogo), con alpha máximo `0.5` y `lineWidth 3`. Cada onda se pinta en **dos pasadas**: primero un halo con `shadowBlur 12` (las sombras de canvas solo se dibujan con `source-over`) y después una pasada con `globalCompositeOperation = "lighter"` para que el teal resalte sobre el fondo oscuro. El hover se limita a una onda cada `220ms`.
- **Rendimiento:** el `requestAnimationFrame` corre **bajo demanda** (solo con el cursor dentro o con ondas activas) y se detiene limpiando el canvas al quedar inactivo.
- **Accesibilidad:** con `prefers-reduced-motion: reduce` no se registra nada (ni listeners ni rAF).
- **Geometría estática:** los efectos usan posiciones fijas de 64px; como la cuadrícula CSS deriva/parallaxea, el glow puede quedar levemente desfasado de las líneas visibles en algunos instantes (asumido en la especificación).

---

## 3. Accesibilidad

- HTML semántico: `<section aria-label>`, `<h1>`, `<ul>`/`<li>`, `<figure aria-label>` + `<pre><code>` para el terminal.
- Elementos decorativos con `aria-hidden="true"`: puntos tipo macOS, capa de cuadrícula, círculo del trofeo, `BoltGlyph` y punto pulsante de actividad.
- El punto `animate-pulse` (y el resto de animaciones) queda congelado bajo `prefers-reduced-motion: reduce` por la guarda global.
- El parallax de la cuadrícula no se activa bajo `prefers-reduced-motion: reduce` (comprobación con `matchMedia` antes de registrar el listener) y la capa es decorativa (`aria-hidden`).
- El canvas de glow/ondas tampoco se inicializa bajo `prefers-reduced-motion: reduce`; es decorativo (`aria-hidden`) y no captura el puntero (`pointer-events-none`).
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
- `feat(hero): redesign right panel as live tournament dashboard`
- `style(hero): refine dashboard typography and spacing`
- `style(hero): tighten dashboard scale for two-column layout`
- `style(hero): make hero span full width`
- `style(hero): center hero content at a wider max width`
- `feat(hero): add subtle cursor parallax to background grid`
- `feat(hero): add canvas glow and ripples over the grid`
- `style(hero): make canvas ripples more visible`

> Se listan por **mensaje**, no por SHA, porque los rebases de sincronización cambian los hashes.

---

*Para el equipo: si haces cambios, actualiza este documento antes de mergear.* 💜
