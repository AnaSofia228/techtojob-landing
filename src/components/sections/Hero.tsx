/**
 * Hero section of the landing page.
 * Renders the anchor target for the PRD-defined `#hero` section.
 */
import { messages } from "@/lib/content";

export function Hero() {
  return <section id="hero" aria-label={messages.sections.hero} />;
}
