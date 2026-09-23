# 📁 Rama `feature/ui-kit-footer` — Documentación de desarrollo

> Documento de referencia para el equipo. Resume todo lo desarrollado y validado en la rama **`feature/ui-kit-footer`** del repo `AnaSofia228/techtojob-landing`: un **kit de UI compartido** y el **Footer** completo. Complementa a `docs/feature-header.md` (léelo primero para el contrato de tokens y convenciones).

---

## 1. Contexto

- **Producto:** Landing de **TechToJob** — Torneo #02. El **Hero** lo desarrolla AnaSofia; esta rama entrega las **piezas base reutilizables** que ella (y el resto de secciones) consumirán.
- **Referencia de requisitos:** `techtojob_prd_project_brief.md` (PRD).
- **Stack:** Next.js 16.3.5 (App Router, `src/`) · React 19.2.8 · TypeScript 5 · Tailwind CSS v4.

> ⚠️ **Importante:** antes de escribir código revisa `node_modules/next/dist/docs/` y los avisos de `AGENTS.md` (Next 16 puede tener breaking changes).

---

## 2. Qué se desarrolló en esta rama

### 2.1 Kit de UI — `src/components/ui/` ✅

Componentes **sin estado** (server-safe) y reutilizables, pensados para que cada sección no duplique markup:

#### `icons.tsx` — Set de iconos SVG
Todos: monocromos (`fill="currentColor"`), decorativos (`aria-hidden="true"`), tamaño vía `className`, con `shrink-0`.

| Icono | Origen / licencia | Uso |
|---|---|---|
| `DiscordGlyph` | simple-icons (MIT) | CTA Discord, redes |
| `LinkedInGlyph` | Font Awesome Free (CC BY 4.0) | Redes |
| `XGlyph` | simple-icons (MIT) | Redes |
| `InstagramGlyph` | simple-icons (MIT) | Redes |

```tsx
import { DiscordGlyph } from "@/components/ui/icons";
<DiscordGlyph className="h-4 w-4" />
```

#### `Button.tsx` — Botón/enlace polivalente
- **Variantes:** `primary` (fondo acento + texto `text-ink` + `animate-glow` permanente) y `secondary` (fondo blanco `bg-canvas` + `hover:animate-glow` solo al pasar el ratón).
- **Tamaños:** `md` (`px-4 py-2`) y `lg` (`px-6 py-3`, por defecto).
- **Render híbrido:** con `href` renderiza `<a>`; sin él, `<button type="button">`. Los enlaces `http(s)` abren en pestaña nueva con `rel="noopener noreferrer"` (o forzar con `external`).
- Foco visible consistente (`focus-visible:ring-*`) y micro-elevación `hover:-translate-y-0.5`.

```tsx
import { Button } from "@/components/ui/Button";

<Button href={SOCIAL_LINKS.discord} variant="primary">
  <DiscordGlyph className="h-4 w-4" /> Unirse al Discord
</Button>

<Button href="#torneos" variant="secondary">Explorar torneos</Button>
```

#### `src/lib/cn.ts` — utilidad `cn()`
Composición de clases condicionales (usada internamente por `Button`; disponible para cualquier componente).

### 2.2 Footer completo — `src/components/layout/Footer.tsx` ✅

Cumple la sección **11** del PRD (`#footer`):

- **Layout responsive:** 1 columna en móvil → 2 en tablet (`sm:`) → 5 en desktop (`lg:`), con la marca a doble ancho (`lg:col-span-2`).
- **Bloque de marca:** logotipo apilado oficial (`v2Negativo.png`, variante *Negativo*, `h-16`) + tagline + **4 redes sociales oficiales** (Discord, LinkedIn, X, Instagram) con `aria-label` por red y `target="_blank"`.
- **4 columnas de navegación** generadas desde `messages.footer.columns`: **Talento**, **Empresas**, **Comunidad** y **Legal**. Cada una es un `<nav aria-label>`. Enlaces internos a anclas; Discord externo. La columna Legal se renderiza como **texto plano** (contenido pendiente de definir).
- **Barra inferior:** copyright dinámico (`new Date().getFullYear()`) + declaración de accesibilidad.
- Fondo `bg-surface` con borde superior `border-canvas/10`, foco visible en todos los enlaces.

### 2.3 Contenido y tipos ✅

- `src/messages/es.json`: nueva sección `footer` → `tagline`, `social`, `networks` (4), `columns` (4 con `heading`, `note?`, `links[]`), `labels`, `copyright`, `accessibility`.
- `src/types/content.ts`: tipado del catálogo `footer` en el shape `Messages`.
- **Regla intacta:** todo texto vive en el catálogo i18n, nunca hardcodeado.

### 2.4 Refactor del Header ✅

- `Header.tsx` ahora importa `DiscordGlyph` desde el kit y usa el logotipo oficial (`v1Negativo.png` / `SimboloNegativo.png` vía `next/image`). Sin cambios de comportamiento.

---

## 3. Cómo usar el kit en tu sección (guía rápida)

```tsx
// Ejemplo: CTA de una sección
import { Button } from "@/components/ui/Button";
import { DiscordGlyph } from "@/components/ui/icons";

<Button href="https://discord.gg/h9FFgKdkRd" variant="primary" size="lg">
  <DiscordGlyph className="h-4 w-4" /> Unirse al Discord
</Button>
```

**Recuerda (contrato de `docs/feature-header.md`):**
1. Tokens de tema (`bg-surface`, `text-canvas`, `bg-accent`…), nunca hex sueltos.
2. Textos desde `messages/es.json` (añade la clave + su tipo si falta).
3. Foco visible y `aria-*` en todo interactivo.
4. Animaciones discretas del toolkit (`animate-glow/caret/float`) — ya integradas en `Button`.



---

## 4. Validación realizada

| Prueba | Resultado |
|---|---|
| `npm run lint` | ✅ exit 0 |
| `npx tsc --noEmit` | ✅ exit 0 |
| `npm run build` (Next 16.3.5) | ✅ exit 0 |
| Render (`next start` + curl) | ✅ footer con las 4 redes y columnas visibles |

---

## 5. Commits de la rama

- `feat(ui): extract shared brand and social icons`
- `feat(ui): add Button component with primary and secondary variants`
- `feat(footer): implement structured 4-column footer`

> Los commits de documentación (`docs: …`) no se listan para evitar referencias circulares. Se listan por **mensaje**, no por SHA, porque los rebases de sincronización cambian los hashes.
> ℹ️ **Nota de autoría:** los commits de las ramas `feature/*` son de Rubén D. Guerrero N. (`rudargeneira@gmail.com`); el commit inicial de `main` (`fc9c245`) conserva su autoría original de AnaSofia, que arrancó el proyecto.

PR abierto: **https://github.com/AnaSofia228/techtojob-landing/pull/2** (`feature/ui-kit-footer → main`)
PR relacionado: **https://github.com/AnaSofia228/techtojob-landing/pull/1** (`feature/header → main`)

---

## 6. Pendientes / anotado para después

- 🚧 **Hero** (`#hero`): asignado a AnaSofia — ya tiene `Button`, iconos y animaciones listas.
- 🌗 **Modo claro/oscuro**: anotado (rama futura `feature/theme-toggle`, decidir alcance con el equipo).
- Resto de secciones del PRD (01–10) por implementar.
- Contenido real de la columna **Legal** del footer (ahora en texto plano).

---

## 7. Comandos útiles

```bash
npm run dev      # servidor de desarrollo (http://localhost:3000)
npm run build    # build de producción
npm run lint     # ESLint
npx tsc --noEmit # chequeo de tipos

git checkout -b feature/<seccion>    # nueva rama de trabajo
git push -u origin feature/<seccion> # subir rama
gh pr create --base main             # abrir PR
```

---

*Para el equipo: si haces cambios, actualiza este documento antes de mergear.* 💜
