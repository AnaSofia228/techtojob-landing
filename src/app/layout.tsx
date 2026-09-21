/**
 * Root layout for the TechToJob landing.
 * Loads the Sora font and global styles, applies base metadata and wraps
 * every route with the `<html>`/`<body>` shell.
 */
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { siteMetadata } from "@/lib/site";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${sora.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
