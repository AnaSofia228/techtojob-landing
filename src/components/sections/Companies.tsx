/**
 * "Companies" section of the landing page.
 * Renders the anchor target for the PRD-defined `#empresas` section.
 */
import { messages } from "@/lib/content";

export function Companies() {
  return <section id="empresas" aria-label={messages.sections.empresas} />;
}
