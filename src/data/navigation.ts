/**
 * Navigation data.
 * Derives the primary and secondary ("More") navigation items from the
 * message catalog, keeping hrefs in sync with the PRD section anchors.
 */
import { messages } from "@/lib/content";
import type { NavItem, SectionId } from "@/types/content";

function toNavItems(entries: [string, string][]): NavItem[] {
  return entries.map(([id, label]) => ({
    id: id as SectionId,
    label,
    href: `#${id}` as NavItem["href"],
  }));
}

export const primaryNav: NavItem[] = toNavItems(
  Object.entries(messages.nav.primary),
);

export const moreNav: NavItem[] = toNavItems(
  Object.entries(messages.nav.more.items),
);
