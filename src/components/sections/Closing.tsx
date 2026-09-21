/**
 * "Closing" section of the landing page.
 * Renders the anchor target for the PRD-defined `#cierre` section.
 */
import { messages } from "@/lib/content";

export function Closing() {
  return <section id="cierre" aria-label={messages.sections.cierre} />;
}
