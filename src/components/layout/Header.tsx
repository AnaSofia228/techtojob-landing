/**
 * Site header.
 * Renders the sticky navigation anchor target (`#header`) and will host
 * the primary links, the "More" dropdown and the main CTA.
 */
import { messages } from "@/lib/content";

export function Header() {
  return <header id="header" aria-label={messages.sections.header} />;
}
