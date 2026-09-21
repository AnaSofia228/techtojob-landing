/**
 * "How it works" section of the landing page.
 * Renders the anchor target for the PRD-defined `#como-funciona` section.
 */
import { messages } from "@/lib/content";

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      aria-label={messages.sections["como-funciona"]}
    />
  );
}
