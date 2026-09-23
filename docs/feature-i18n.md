# 🌐 Internacionalización (i18n) — `next-intl`

> Documento transversal del proyecto. Describe la infraestructura de idiomas de la landing de **TechToJob**: locales **`es`** (por defecto) y **`en`**, con rutas `app/[locale]` y render estático. Creado en la rama `feature/i18n` (o la que corresponda) y aplicable a todas las secciones.

---

## 1. Stack

- **`next-intl` 4.x** (dependencia de runtime acordada; el resto sigue sin dependencias externas).
- Next.js **16.3.5** App Router (`src/`) · React **19.2.8** · TypeScript 5 · Tailwind v4.

---

## 2. Infraestructura

| Archivo | Rol |
|---|---|
| `src/i18n/routing.ts` | `defineRouting({ locales: ['es','en'], defaultLocale: 'es', localePrefix: 'always' })` + tipo `AppLocale`. |
| `src/i18n/request.ts` | `getRequestConfig` que resuelve el locale (`requestLocale` + `hasLocale`) y carga `messages/{locale}.json`. |
| `src/i18n/navigation.ts` | `createNavigation(routing)` → `Link`, `redirect`, `usePathname`, `useRouter` con prefijo de locale. |
| `src/proxy.ts` | Proxy de i18n (convención **`proxy`** de Next 16, antes `middleware`): redirige `/` → `/es`, prefija los locales y excluye assets/API/archivos. |
| `next.config.ts` | Envuelto con `createNextIntlPlugin('./src/i18n/request.ts')`. |

- `localePrefix: "always"`: todas las rutas llevan `/es` o `/en`; `/` hace **307 → `/es`**.
- `generateStaticParams()` en `src/app/[locale]/layout.tsx` devuelve `['es','en']`; ambas rutas se **prerenderizan** (SSG).

---

## 3. Rutas y layout

- `src/app/[locale]/layout.tsx` — layout raíz localizado: valida el locale (`hasLocale` → `notFound()`), llama a `setRequestLocale`, monta `<html lang>` + `<NextIntlClientProvider>`, y expone `generateMetadata` con `title`/`description` localizados y `alternates.languages` (`hreflang` `es`/`en`).
- `src/app/[locale]/page.tsx` — compone Header + secciones + Footer (Server Component async).
- `src/app/icon.png` y `src/app/apple-icon.png` se quedan en la raíz de `app/`.

---

## 4. Catálogos y acceso a textos

- `src/messages/es.json` y `src/messages/en.json` — **mismas claves** (mismo shape que el tipo `Messages` de `src/types/content.ts`).
- **Client Components:** `const messages = asMessages(useMessages());`
- **Server Components (`async`):** `const messages = asMessages(await getMessages());`
- Helper `asMessages` en `src/lib/messages.ts` (next-intl devuelve `Record<string, any>`; el helper lo estrecha a `Messages`).
- La navegación (`src/data/navigation.ts`) se construye con `getPrimaryNav(messages)` / `getMoreNav(messages)` dentro del Header.
- `src/lib/site.ts` mantiene `SITE_NAME` (constante), `SITE_URL` y `SOCIAL_LINKS` (independientes del idioma).

---

## 5. Selector de idioma (ES/EN)

- `src/components/layout/LocaleSwitcher.tsx` (`"use client"`): pill compacta `ES | EN` (`bg-accent text-ink` en activo, `text-canvas/70 hover:text-accent` inactivo, `rounded-full border-canvas/10`, foco `ring-accent`, `aria-pressed` + `aria-label`).
- Usa `useRouter`/`usePathname` de `@/i18n/navigation` y **conserva el pathname (sin el hash) con `scroll: false`**, de modo que cambiar de idioma no fuerza ningún salto a anclas de sección.
- Se ubica en el Header **justo a la derecha del CTA «Unirse al Discord»** y, en mobile, queda como pill compacta junto al icono de Discord.

---

## 6. Cómo añadir texto nuevo

1. Añade la clave en **`es.json` y `en.json`** (mismos paths) y su tipo en `src/types/content.ts`.
2. Consúmela con `messages.<bloque>.<clave>` usando `useMessages()`/`getMessages()`.
3. Nunca hardcodees copy en el JSX.

---

## 7. Validación

| Prueba | Resultado |
|---|---|
| `npm run lint` | ✅ exit 0 |
| `npx tsc --noEmit` | ✅ exit 0 |
| `npm run build` | ✅ prerenderiza `/es` y `/en` |
| `GET /` | ✅ 307 → `/es` |
| `GET /es` y `/en` | ✅ 200, `<html lang>` y copy correctos, `hreflang` presente |

---

*Para el equipo: si cambias una convención de i18n, actualiza este documento y `AGENTS.md` en el mismo cambio.*
