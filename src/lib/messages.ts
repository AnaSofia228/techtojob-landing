/**
 * Typed accessor for the next-intl message catalog.
 * next-intl's runtime messages are `Record<string, any>` by default; this helper
 * narrows them to the project's `Messages` shape so components keep type-safe
 * access (`messages.hero.title`, …) for both client and server components.
 */
import type { Messages } from "@/types/content";

export function asMessages(raw: unknown): Messages {
  return raw as Messages;
}
