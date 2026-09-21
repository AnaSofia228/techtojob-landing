/**
 * "News" section of the landing page.
 * Renders the anchor target for the PRD-defined `#noticias` section.
 */
import { messages } from "@/lib/content";

export function News() {
  return <section id="noticias" aria-label={messages.sections.noticias} />;
}
