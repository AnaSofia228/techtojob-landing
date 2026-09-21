/**
 * "Testimonials" section of the landing page.
 * Renders the anchor target for the PRD-defined `#testimonios` section.
 */
import { messages } from "@/lib/content";

export function Testimonials() {
  return (
    <section id="testimonios" aria-label={messages.sections.testimonios} />
  );
}
