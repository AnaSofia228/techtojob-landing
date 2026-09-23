/**
 * Tiny className joiner (no dependencies).
 * Filters falsy values and joins the rest with a space.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}