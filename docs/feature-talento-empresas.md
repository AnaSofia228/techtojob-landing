# 📁 Rama `feature/talento-empresas` — Documentación de desarrollo

> Documento de referencia para el equipo. Resume lo desarrollado en la rama **`feature/talento-empresas`**: la sección combinada **Talento y Empresas** (PRD secciones **03 & 04**, anclas `#talento` y `#empresas`). Complementa a `docs/feature-header.md`, `docs/feature-hero.md` y `docs/feature-ui-kit-footer.md`.

---

## 1. Contexto

- **Producto:** Landing de **TechToJob** — Torneo #02.
- **Referencia de requisitos:** `techtojob_prd_project_brief.md` (PRD, sección 03 & 04: componente dual-tab).
- **Stack:** Next.js 16.3.5 (App Router, `src/`) · React 19.2.8 · TypeScript 5 · Tailwind CSS v4.

---

## 2. Qué se desarrolló en esta rama

### 2.1 Sección dual-tab — `src/components/sections/TalentCompanies.tsx` ✅

Client Component (`"use client"`) que reemplaza los antiguos stubs separados `Talent.tsx` / `Companies.tsx` (eliminados) por **un único componente** con dos pestañas.

- **`<section id="talento">`** con un **ancla interna** `<span id="empresas" aria-hidden />`, de modo que ambas anclas del PRD apuntan al mismo bloque.
- **Encabezado de sección** (arriba de la tarjeta, alineado a la izquierda, mismo patrón que `HowItWorks`): eyebrow con punto + texto en mayúsculas (`border-accent/40 bg-accent/10 text-accent`, `uppercase tracking-widest`), `<h2>` con la segunda parte en `text-accent`, y subtítulo en `text-canvas/70`. El bloque usa `max-w-3xl` y el subtítulo `max-w-2xl`; la tarjeta va a `mt-12` (mismo ritmo vertical que otras secciones). La sección queda etiquetada por este `<h2>` (sin `aria-label`).
- **Ancho:** contenedor `mx-auto max-w-7xl px-4 sm:px-6 lg:px-16` (mismo ancho que el Hero); el `lg:px-16` deja aire para los tabs que sobresalen.
- **Dos estados** (`type TabId = "talent" | "companies"`) con `useState` y `handleTabChange`.
- **Desktop:** pestañas **compactas** (`absolute`, centradas en el eje Y) **pegadas al borde exterior** de la tarjeta, sobresaliendo con `-translate-x-full` / `translate-x-full`; borde redondeado solo en el extremo exterior (`rounded-l-lg` / `rounded-r-lg`). El ícono va **encima** del texto y este se rota con `[writing-mode:vertical-rl] rotate-180` (lee de abajo hacia arriba). Activa `bg-accent text-ink`; inactiva `bg-surface text-canvas`. La tarjeta es `relative` sin `overflow-hidden` para no recortarlas. Ambos tabs llevan `cursor-pointer`.
- **Mobile:** la misma `tablist` se convierte en un **switch horizontal de pastillas** ("Talento | Empresas") dentro de la tarjeta.
- **Contenido:** columna de texto (izq) + recuadro con ilustración (der) en desktop (`lg:px-10`); apilado en mobile. El badge del panel (`content.eyebrow`) es una pill con punto teal (`rounded-full border-surface/15 bg-surface/[0.03]`).
- **CTA:** `<a>` real vía `Button variant="primary"` (`text-ink` por AA) → `SOCIAL_LINKS.discord`, con ícono `<>` (`HeroCodeGlyph`) y, al lado, el texto de apoyo con check teal.
- **Features:** chips en `flex-wrap` con fondo `bg-surface/[0.05]`, texto `text-surface` y check `text-accent`.

### 2.2 Accesibilidad del patrón tabs ✅

- `role="tablist"` (con `aria-label` desde i18n) → `role="tab"` (`aria-selected`, `aria-controls`, roving `tabIndex`) → `role="tabpanel"` (`aria-labelledby`, `tabIndex`).
- **Teclado:** flechas ←→ y ↑↓ (pestañas verticales), `Home`/`End`, `Enter`/`Space`; el foco se mueve al tab seleccionado.
- El panel inactivo lleva `aria-hidden` + `inert` (no accesible ni enfocable) para que solo se anuncie el contenido visible.
- Foco visible en cada pestaña (`focus-visible:ring-2 ring-accent`) y en el CTA.

### 2.3 Sincronía con el hash ✅

- `useEffect` lee `window.location.hash` al montar y escucha `hashchange`: `#empresas` activa la pestaña Empresas, `#talento` la de Talento.
- Al cambiar de pestaña se actualiza el hash con `history.replaceState` (sin salto de scroll). Así los enlaces del nav (`#talento` / `#empresas`) seleccionan la pestaña correcta.

### 2.4 Ilustraciones ✅

Ambas pestañas usan imágenes en `public/assets/` renderizadas con `next/image` (`width={1536}` `height={1024}`, `alt=""` decorativo, `sizes="(max-width: 1024px) 100vw, 50vw"`, sin `priority` porque van bajo el pliegue); Next las optimiza y sirve `srcset` responsivo.

- **Talento:** `public/assets/talents.png`.
- **Empresas:** `public/assets/companys.png`.

El antiguo archivo SVG `TalentCompaniesArt.tsx` (con `TalentIllustration` y `CompaniesIllustration`) se eliminó al sustituirse ambas ilustraciones por los PNG.

### 2.5 Contenido y tipos ✅

- `src/messages/es.json`: bloque `talentCompanies` → `eyebrow`, `titleLead`, `titleAccent`, `subtitle`, `tabsLabel`, `tabs` (`talent`/`companies`), y `talent`/`companies` con `eyebrow`, `title`, `description`, `badges[3]`, `cta`, `ctaNote`.
- `src/types/content.ts`: tipo `PanelContent` + `talentCompanies` dentro de `Messages`.
- `src/components/sections/index.ts` y `src/app/page.tsx`: se elimina `Talent`/`Companies` y se renderiza `<TalentCompanies />` una sola vez.

### 2.6 Contraste (WCAG AA) ✅

- Párrafo y títulos: `text-surface` (`#2f3436`) sobre la tarjeta blanca ≈ **12:1**.
- Micro-etiquetas: fondo `bg-surface/[0.05]` con **texto `text-surface`** y check `text-accent` (el check es decorativo). Se evita el teal como texto (sobre blanco daría ~2:1) y así se cumple AA y la regla del PRD.
- CTA: `bg-accent` + `text-ink` ≈ **9:1**. Pestaña activa teal/ink ≈ 9:1; inactiva `bg-surface`/`text-canvas` ≈ 12:1.

---

## 3. Validación realizada

| Prueba | Resultado |
|---|---|
| `npm run lint` | ✅ exit 0 |
| `npx tsc --noEmit` | ✅ exit 0 |
| `npm run build` (Next 16.3.5) | ✅ exit 0 |
| Responsive | ✅ mobile (switch horizontal) / desktop (pestañas verticales) |
| `prefers-reduced-motion` | ✅ respetado (guardia global) |

---

## 4. Commits de la rama

- `feat(talento-empresas): add dual-tab talent and companies section`
- `feat(talento-empresas): add line-art illustrations for both tabs`
- `feat(talento-empresas): sync active tab with the URL hash`

> Se listan por **mensaje**, no por SHA, porque los rebases de sincronización cambian los hashes.

---

*Para el equipo: si haces cambios, actualiza este documento antes de mergear.* 💜
