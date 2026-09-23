"use client";

/**
 * Compact locale switch (ES / EN).
 * Changes the active locale on the current pathname without forcing a scroll
 * (no hash is carried over, so it never jumps to a section anchor).
 */
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import type { AppLocale } from "@/i18n/routing";

const LOCALES: AppLocale[] = ["es", "en"];

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("nav.aria");

  const switchTo = (next: AppLocale) => {
    if (next === locale) return;
    router.replace(pathname, { locale: next, scroll: false });
  };

  return (
    <div
      role="group"
      aria-label={t("language")}
      className="inline-flex items-center rounded-full border border-canvas/10 p-0.5"
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => switchTo(code)}
            aria-pressed={active}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
              active ? "bg-accent text-ink" : "text-canvas/70 hover:text-accent",
            )}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
