/**
 * "Community" section of the landing page.
 * Renders the anchor target for the PRD-defined `#comunidad` section.
 */
import { messages } from "@/lib/content";

export function Community() {
  return <section id="comunidad" aria-label={messages.sections.comunidad} />;
}
