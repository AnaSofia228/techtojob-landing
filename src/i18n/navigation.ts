/**
 * Locale-aware navigation helpers.
 * Re-exports next-intl's `Link`, `redirect`, `usePathname` and `useRouter`
 * bound to the app routing (so paths get the `/es` or `/en` prefix).
 */
import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
