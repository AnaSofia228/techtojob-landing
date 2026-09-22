<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Reglas del proyecto — TechToJob Landing (Torneo #02)

> Obligatorias para cualquier agente IA o humano que escriba código aquí. Fuentes de verdad: `techtojob_prd_project_brief.md` (PRD), `docs/feature-header.md`, `docs/feature-ui-kit-footer.md` y este archivo. Proyecto en español; la documentación y el copy son en español.

## 1. Stack fijo (no improvisar, no añadir dependencias)
- Next.js **16.3.5** App Router con directorio `src/`, React **19.2.8**, TypeScript 5 (`strict`), ESLint 9 (`core-web-vitals` + TS).
- Tailwind CSS **v4 CSS-first**: los tokens viven en `src/app/globals.css` (`:root` con `--ttj-*` + `@theme inline`). **No crear `tailwind.config.js`**; las directivas `@theme`/`@import` son válidas (VS Code ya silenciado en `.vscode/settings.json`).
- **Cero kits de UI externos** (nada de MUI/Ant/shadcn) y cero dependencias de runtime nuevas sin acuerdo previo. Todo componente es propio.
- Tipografía: Sora 400/600/700 vía `next/font/google` (ya cargada en `layout.tsx` como `--font-sora`).

## 2. Tokens de diseño (nunca hex sueltos en componentes)
| Utilidad | Valor | Uso |
|---|---|---|
| `bg-surface` | `#2f3436` | Superficie header/footer |
| `bg-accent` | `#84c0bf` | **Solo interactivos**: CTAs, chips, tags, foco, indicadores |
| `bg-canvas` | `#ffffff` | Texto/fondos de alto contraste sobre oscuro |
| `bg-ink` | `#111416` | Fondo oscuro principal |
| `bg-ink-alt` | `#191c1e` | Fondo oscuro alternativo |

- **Regla estricta del PRD:** `#84c0bf` **jamás como texto de párrafo** sobre fondos claros.
- Texto secundario sobre oscuro: `text-canvas/70`–`/80`. Hover de enlaces de nav: `hover:text-accent` + subrayado animado (`after:scale-x`), transición ≥ 300ms, nada brusco.

## 3. Contenido e i18n (contrato duro)
- **Todo texto visible vive en `src/messages/es.json`**, tipado en `src/types/content.ts`, accedido vía `messages` (`@/lib/content`). **Nunca hardcodear copy en componentes.** Añadir clave = añadir tipo.
- Tono: tuteo («tú»), frases cortas, directo. **Prohibidas:** sinergia, ecosistema, revolucionar, solución integral, potenciar, disrupción. **Sin promesas falsas** ni métricas inventadas. «Gratis» solo en cuerpo explicativo, nunca en titulares.
- Endpoints fijos (usar `SOCIAL_LINKS` de `src/lib/site.ts`, nunca URLs sueltas): Discord `https://discord.gg/h9FFgKdkRd`, LinkedIn, X e Instagram `techtojob`. Marca exacta: **TechToJob** (una palabra).

## 4. Estructura de código
- **Secciones** (`src/components/sections/`): stubs `<section id="..." aria-label={messages.sections.x} />`; los IDs son exactos e inmutables: `hero, como-funciona, talento, empresas, torneos, comunidad, testimonios, noticias, newsletter, cierre, footer`.
- **Kit UI** (`src/components/ui/`): `Button` (variantes `primary`/`secondary`, tamaños `md/lg`, renderiza `<a>` con `href` o `<button>`), `icons.tsx` (glifos sociales SVG; no pegar SVG inline en otros componentes) y `src/lib/cn.ts`.
- **Marca:** assets oficiales en `public/` — `Simbolo*` (isotipo), `v1*` (horizontal), `v2*` (apilado) × `Positivo/Negativo/Black/Degradado`. Sobre fondos oscuros usar la variante **Negativo** con `next/image` + `width/height` explícitos (v1: 4619×684 · v2: 2558×1418 · Símbolo: 1151×1151). Nombres ASCII siempre (nada de tildes en archivos).
- **Anclas:** no añadir `scroll-mt` a las secciones; `html { scroll-padding-top: var(--ttj-header-offset) }` ya compensa el header sticky (y el scroll suave está bajo `prefers-reduced-motion`).
- **Animaciones:** solo el toolkit de `globals.css` (`animate-caret`, `animate-glow`, `animate-float`, `animate-grid`, `hover:animate-glow`). La guarda global `prefers-reduced-motion: reduce` es inviolable.
- **Excepción documentada:** el Hero usa un degradado teal (`#84c0bf`) como cuadrícula de fondo decorativa con `animate-grid`; es lo único no interactivo que puede emplear el acento (ver `docs/feature-hero.md`).

## 5. Accesibilidad (WCAG AA — objetivo Lighthouse ≥ 90)
- HTML semántico (`header/nav/main/section/article/footer`), listas reales, jerarquía de encabezados.
- Disclosures con `aria-expanded` + `aria-haspopup` + `aria-controls`; cerrar con Escape y clic fuera; foco gestionado al abrir/cerrar.
- Foco visible en todo interactivo: `focus-visible:ring-2 focus-visible:ring-accent` (o `ring-canvas` sobre botones accent).
- SVG decorativos con `aria-hidden="true"`; imágenes de marca con `alt=""` + `aria-label` en el enlace contenedor; labels visibles en formularios.

## 6. Flujo de trabajo git y validación
- **Una rama por sección**: `feature/<seccion>`. Commits convencionales: `feat(<ámbito>): …`, `chore:`, `docs:`.
- **Antes de cada commit: `npm run lint` y `npm run build` deben terminar en exit 0** (+ `npx tsc --noEmit` si tocaste tipos). Sin excepciones.
- **Nunca commitear:** `node_modules/`, `.next/`, archivos temporales/logs (`_*`, `nul`). Borrarlos antes del commit.
- Push y PR a `main` con `gh pr create --base main`. Sincronizar ramas con rebase/merge; los PRs vivos se actualizan solos al pushear (force solo con `--force-with-lease`).
- En los docs, listar commits **por mensaje, no por SHA** (los SHAs cambian en cada rebase).
- Si cambias una convención, actualiza `docs/feature-*.md` y este archivo en el mismo cambio.

## 7. SEO (pendiente de implementar en `layout.tsx` / `site.ts`)
- `<title>` 50–60 caracteres · `<meta name="description">` 150–160 · OpenGraph + Twitter Cards con imagen 1200×630 · JSON-LD `Organization` con logo, URL y `sameAs` sociales. Objetivo: SEO Score 100.

## 8. Checklist por tarea
1. Lee el PRD (sección correspondiente) y el doc de la rama.
2. Usa tokens de tema e i18n — cero hex, cero copy duro.
3. `npm run lint` + `npm run build` en 0.
4. Repasa accesibilidad (foco, ARIA, contraste, reduced-motion).
5. Commit convencional limpio (sin temporales) + push + PR.

