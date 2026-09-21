/**
 * "Talent" section of the landing page.
 * Renders the anchor target for the PRD-defined `#talento` section.
 */
import { messages } from "@/lib/content";

export function Talent() {
  return <section id="talento" aria-label={messages.sections.talento} />;
}
