/**
 * Newsletter section of the landing page.
 * Renders the anchor target for the PRD-defined `#newsletter` section.
 */
import { messages } from "@/lib/content";

export function Newsletter() {
  return <section id="newsletter" aria-label={messages.sections.newsletter} />;
}
