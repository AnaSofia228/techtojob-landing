/**
 * i18n proxy (Next 16's `proxy` convention, formerly `middleware`).
 * Detects/redirects to the locale prefix (`/es`, `/en`) and keeps the rest of
 * the app untouched (static assets, API routes and files with an extension).
 */
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
