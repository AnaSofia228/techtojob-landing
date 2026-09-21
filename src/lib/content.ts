/**
 * Typed accessor for the UI copy.
 * Loads the Spanish message catalog and exposes it through `getMessages()`
 * so components never hardcode text and future locales can be added.
 */
import type { Messages } from "@/types/content";
import es from "@/messages/es.json";

export const messages: Messages = es;

export function getMessages(): Messages {
  return messages;
}
