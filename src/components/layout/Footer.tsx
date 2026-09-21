/**
 * Site footer.
 * Renders the footer anchor target (`#footer`) and will host the
 * structured link columns, social links and legal/accessibility notes.
 */
import { messages } from "@/lib/content";

export function Footer() {
  return <footer id="footer" aria-label={messages.sections.footer} />;
}
