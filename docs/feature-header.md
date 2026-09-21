# 📁 Rama `feature/header` — Documentación de desarrollo

> Documento de referencia para el equipo. Resume todo lo desarrollado y validado en la rama **`feature/header`** del repo `AnaSofia228/techtojob-landing`, y define las convenciones a seguir en las próximas secciones (especialmente el **Hero**).

---

## 1. Contexto

- **Producto:** Landing de **TechToJob**, comunidad técnica que conecta talento con oportunidades mediante participación visible (torneos, reviews, Discord). Entrega del **Torneo #02**.
- **Referencia de requisitos:** `techtojob_prd_project_brief.md` (PRD).
- **Stack:** Next.js 16.3.5 (App Router, `src/`) · React 19.2.8 · TypeScript 5 · Tailwind CSS v4.

> ⚠️ **Importante:** esta versión de Next.js (16.x) puede tener breaking changes respecto a versiones anteriores. Antes de escribir código, revisa `node_modules/next/dist/docs/` y los avisos de `AGENTS.md`.

---

## 2. Qué se desarrolló en esta rama

### 2.1 Header completo — `src/components/layout/Header.tsx` ✅

Componente cliente (`"use client"`) que cumple la sección **00** del PRD:

- **Barra sticky** (`sticky top-0 z-50`) con fondo `--color-surface` (`#2f3436`).
- **Marca**: logo tipo *prompt de terminal* («❯_») sobre baldosa en acento + nombre `TechToJob`, enlaza a `#header`.
- **Nav principal** (escritorio `lg+`): 5 enlaces — Cómo funciona, Talento, Empresas, Torneos, Comunidad — generados desde `src/data/navigation.ts` (`primaryNav`).
- **Dropdown «Más» accesible** (Testimonios, Noticias, Newsletter desde `moreNav`)*:
  - `aria-haspopup="true"`, `aria-expanded`, `aria-controls`, `aria-labelledby`.
  - Cierra con **Escape** (devuelve el foco al botón), **clic fuera** y al elegir una opción.
  - Al abrir, el **foco se mueve al primer enlace**.
- **CTA «Unirse al Discord»** → `https://discord.gg/h9FFgKdkRd` con **SVG oficial de Discord** (simple-icons, MIT). Botón `bg-accent` + texto `#111416` → **contraste ≈ 9.5:1** (WCAG AA).
- **Menú móvil** (`< lg`): botón hamburguesa ↔ X con `aria-expanded`/`aria-controls`, panel con enlaces, grupo «Más» y CTA a ancho completo. Cierra al navegar o con Escape.
- **Foco visible** en todos los interactivos (`ring-accent`; `ring-canvas` en los botones de acento).

### 2.2 Catálogo de textos i18n ✅

- `src/messages/es.json`: se añadió `nav.aria` (logo, navegación, menús, abrir/cerrar) y `sections.header` → «Encabezado».
- `src/types/content.ts`: tipado de `nav.aria` en el shape `Messages`.
- **Regla:** todo texto visible vive en el catálogo; **nunca** hardcodear texto en componentes.

### 2.3 Navegación por anclas ajustada al sticky header ✅

- `src/app/globals.css`:
  - Nuevo token `--ttj-header-offset: 5rem`.
  - `html { scroll-padding-top: var(--ttj-header-offset) }` → los anclajes aterrizan debajo del header.
  - Scroll suave **solo** dentro de `@media (prefers-reduced-motion: no-preference)` (**WCAG 2.3.3**).

---

## 3. Tokens y sistema de diseño (usa esto en tus secciones)

Definidos en `src/app/globals.css` (variables `--ttj-*` + `@theme inline`):

| Token | Valor | Uso |
|---|---|---|
| `bg-surface` | `#2f3436` | Superficie principal / barra del header |
| `bg-accent` | `#84c0bf` | **Solo interactivos**: botones, chips, tags, indicadores y outlines de foco |
| `bg-canvas` | `#ffffff` | Texto de alto contraste sobre fondos oscuros |
| `bg-ink` | `#111416` | Fondo oscuro de paneles/secciones |
| `bg-ink-alt` | `#191c1e` | Fondo oscuro alternativo |

**Regla estricta del PRD:** `#84c0bf` **nunca** como texto de párrafo sobre fondos claros.
**Tipografía:** Sora (400/600/700) vía `next/font/google` (`--font-sans`).
**Tono de voz:** tuteo, frases cortas; prohibidas palabras como *sinergia, ecosistema, potenciar*…; sin promesas ni métricas inventadas.

---

## 4. Convenciones a mantener (contrato para el Hero)

1. **Componentes de sección** → `src/components/sections/<Nombre>.tsx`, con `id` de la sección + `aria-label` desde el catálogo; exportar por el barrel `src/components/sections/index.ts`.
2. **Textos** → siempre vía `import { messages } from "@/lib/content"` (tipados). Añadir claves a `src/messages/es.json` + tipo en `src/types/content.ts`.
3. **Colores** → solo token de tema (nunca valores hex sueltos).
4. **Responsive** → puntos de corte `sm:` / `lg:` como en el Header.
5. **Accesibilidad** → foco visible, `aria-*`, contraste AA, `prefers-reduced-motion`.
6. **Anclas** → ya compensadas con el header sticky (no hace falta añadir márgenes).

---

## 5. Validación realizada

| Prueba | Resultado |
|---|---|
| `npm run lint` (eslint) | ✅ exit 0 |
| `npm run build` (Next 16.3.5, Turbopack) | ✅ exit 0 |
| Utilidades de tema (Tailwind v4) en CSS generado | ✅ `bg-surface`, `bg-accent`, `ring-accent`, etc. |
| Render con servidor (`next start` + `curl`) | ✅ `#header`, ARIA, enlaces y CTA presentes |

---

## 6. Commits de la rama

- `161243b` — `feat(header): implement sticky nav, Más dropdown and Discord CTA`
- `b845e7b` — `feat(header): offset anchor targets below sticky nav`

PR abierto: **https://github.com/AnaSofia228/techtojob-landing/pull/1** (`feature/header → main`)

---

## 7. Pendientes / anotado para después

- 🌗 **Modo claro/oscuro**: anotado (botón sol/luna en el header, tokens duales, rama separada `feature/theme-toggle`, coordinado con el equipo).
- 🚧 **Hero** (`#hero`): asignado a AnaSofia — seguir el contrato de la sección 4.
- Resto de secciones del PRD (01–11) por implementar.

---

## 8. Comandos útiles

```bash
npm run dev      # servidor de desarrollo (http://localhost:3000)
npm run build    # build de producción
npm run lint     # ESLint

git checkout -b feature/<seccion>   # nueva rama de trabajo
git push -u origin feature/<seccion> # subir rama
gh pr create --base main             # abrir PR
```

---

## 9. Animaciones disponibles (toolkit) 🎬

Definidas en `src/app/globals.css` como tokens de Tailwind v4 → generan utilities `animate-*` directas. Todas sutiles, temáticas (terminal/teal) y no intrusivas.

| Utility | Efecto | Uso sugerido |
|---|---|---|
| `animate-caret` | Cursor de terminal parpadeando (1.2s) | Resaltar parte del titular o el `>_` de la marca |
| `animate-glow` | Halo teal pulsante lento (4s) | CTA primario «Unirse al Discord» |
| `animate-float` | Flotación vertical suave (6s) | Insignias/ilustraciones del Hero |

**Ejemplos para el Hero:**
```tsx
// CTA primario
<a href={SOCIAL_LINKS.discord} className="animate-glow bg-accent ... text-ink ...">
  Unirse al Discord
</a>

// Elemento de prueba social
<span className="animate-float inline-flex ...">✨ +300 devs</span>
```

**Garantías:**
- ✅ Todas las animaciones se **desactivan** con `prefers-reduced-motion: reduce` (guardia global en `globals.css`).
- ✅ Nada se mueve fuera de su zona (solo opacidad, sombra y translateY ≤ 8px).

---

*Para el equipo: si haces cambios, actualiza este documento antes de mergear.* 💜