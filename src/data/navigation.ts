/**
 * Navigation helpers.
 * Builds the primary and "More" nav items from the localized message catalog,
 * keeping hrefs in sync with the PRD section anchors.
 */
import type { Messages, NavItem, SectionId } from "@/types/content";

function toNavItems(entries: [string, string][]): NavItem[] {
  return entries.map(([id, label]) => ({
    id: id as SectionId,
    label,
    href: `#${id}` as NavItem["href"],
  }));
}

export function getPrimaryNav(messages: Messages): NavItem[] {
  return toNavItems(Object.entries(messages.nav.primary));
}

export function getMoreNav(messages: Messages): NavItem[] {
  return toNavItems(Object.entries(messages.nav.more.items));
}
