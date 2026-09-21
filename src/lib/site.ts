/**
 * Site-wide constants and base metadata.
 * Centralizes the brand name, canonical URL environment variable, official
 * social links from the PRD and the default Next.js metadata object.
 */
import type { Metadata } from "next";
import { messages } from "@/lib/content";

export const SITE_NAME = messages.site.name;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export const SOCIAL_LINKS = {
  discord: "https://discord.gg/h9FFgKdkRd",
  linkedin: "https://www.linkedin.com/company/techtojob/",
  x: "https://x.com/techtojob",
  instagram: "https://www.instagram.com/techtojob",
} as const;

export type SocialNetwork = keyof typeof SOCIAL_LINKS;

export const siteMetadata: Metadata = {
  title: SITE_NAME,
  description: "TODO: descripción de TechToJob (150-160 caracteres).",
};
