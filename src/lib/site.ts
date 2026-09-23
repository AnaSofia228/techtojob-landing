/**
 * Site-wide constants.
 * Centralizes the brand name, canonical URL and the official social links
 * from the PRD. Locale-dependent metadata lives in the app layout.
 */

export const SITE_NAME = "TechToJob";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export const SOCIAL_LINKS = {
  discord: "https://discord.gg/h9FFgKdkRd",
  linkedin: "https://www.linkedin.com/company/techtojob/",
  x: "https://x.com/techtojob",
  instagram: "https://www.instagram.com/techtojob",
} as const;

export type SocialNetwork = keyof typeof SOCIAL_LINKS;
