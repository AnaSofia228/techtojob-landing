/**
 * Localized root layout.
 * Loads the Sora font and global styles, resolves the active locale (`/es`,
 * `/en`), provides next-intl to Client Components and exposes localized
 * metadata (title, description and `hreflang` alternates).
 */
import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import {
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });

  return {
    metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
    title: t("name"),
    description: t("description"),
    alternates: {
      languages: {
        es: "/es",
        en: "/en",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${sora.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
