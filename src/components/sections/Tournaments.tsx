/**
 * "Tournaments" section of the landing page.
 * Renders the anchor target for the PRD-defined `#torneos` section.
 */
import { messages } from "@/lib/content";

export function Tournaments() {
  return <section id="torneos" aria-label={messages.sections.torneos} />;
}
