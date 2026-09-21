"use client";

/**
 * Site header.
 * Sticky navigation bar (`#header`) with the brand mark, the five primary
 * links, an accessible "Más" disclosure dropdown (`aria-haspopup` +
 * `aria-expanded` + `aria-controls`), the Discord CTA and a responsive
 * mobile menu. Outside clicks and Escape close any open menu; opening the
 * dropdown moves focus to its first link.
 */
import { useEffect, useRef, useState } from "react";
import { moreNav, primaryNav } from "@/data/navigation";
import { messages } from "@/lib/content";
import { SITE_NAME, SOCIAL_LINKS } from "@/lib/site";

const MORE_BUTTON_ID = "boton-mas";
const MORE_MENU_ID = "menu-mas";
const MOBILE_MENU_ID = "menu-movil";

const navLinkClasses =
  "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium " +
  "text-canvas transition-colors hover:bg-canvas/10 " +
  "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

/** Terminal-prompt brand mark ("❯_") on the accent tile. */
function BrandMark() {
  return (
    <svg viewBox="0 0 28 28" className="h-7 w-7 shrink-0" aria-hidden="true">
      <rect width="28" height="28" rx="7" fill="var(--color-accent)" />
      <path
        d="M9 9l6-3M9 11l6 3M8 20h12"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth={3}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Discord mark (simple-icons, MIT). */
function DiscordGlyph({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} shrink-0`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  );
}

function ChevronGlyph({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 18l3.2-3.2l3.2 3.2" />
    </svg>
  );
}

function BurgerGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="5" y1="7" x2="19" y2="7" />
      <line x1="5" y1="12" x2="19" y2="12" />
      <line x1="5" y1="17" x2="19" y2="17" />
    </svg>
  );
}

function CloseGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="6" y1="7" x2="18" y2="17" />
      <line x1="18" y1="7" x2="6" y2="17" />
    </svg>
  );
}

export function Header() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const moreRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

  // Close any open menu on outside clicks or Escape, without fighting the
  // toggle buttons themselves.
  useEffect(() => {
    if (!moreOpen && !mobileOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      const onMoreButton = moreButtonRef.current?.contains(target) ?? false;
      const onMobileButton = mobileButtonRef.current?.contains(target) ?? false;

      if (moreOpen && !onMoreButton && !moreRef.current?.contains(target)) {
        setMoreOpen(false);
        moreButtonRef.current?.focus();
      }
      if (mobileOpen && !onMobileButton && !mobileRef.current?.contains(target)) {
        setMobileOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (mobileOpen) {
        setMobileOpen(false);
        mobileButtonRef.current?.focus();
      }
      if (moreOpen) {
        setMoreOpen(false);
        moreButtonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen, mobileOpen]);

  // Move focus to the first dropdown link when the menu opens.
  useEffect(() => {
    if (!moreOpen) return;
    moreRef.current?.querySelector("a")?.focus();
  }, [moreOpen]);

  const closeMobile = () => setMobileOpen(false);
  const toggleMore = () => setMoreOpen((open) => !open);

  return (
    <header
      id="header"
      className="sticky top-0 z-50 bg-surface"
      aria-label={messages.sections.header}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#header"
          aria-label={messages.nav.aria.logo}
          className="inline-flex shrink-0 items-center gap-2 rounded-md focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <BrandMark />
          <span className="text-lg font-semibold tracking-tight text-canvas">
            {SITE_NAME}
          </span>
        </a>

        <nav
          aria-label={messages.nav.aria.primary}
          className="hidden items-center gap-1 lg:flex"
        >
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.id}>
                <a href={item.href} className={navLinkClasses}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div ref={moreRef} className="relative">
            <button
              ref={moreButtonRef}
              id={MORE_BUTTON_ID}
              type="button"
              aria-haspopup="true"
              aria-expanded={moreOpen}
              aria-controls={MORE_MENU_ID}
              onClick={toggleMore}
              className={`${navLinkClasses} gap-1.5`}
            >
              {messages.nav.more.label}
              <ChevronGlyph open={moreOpen} />
            </button>
            <ul
              id={MORE_MENU_ID}
              aria-labelledby={MORE_BUTTON_ID}
              className={`absolute right-0 top-full z-50 mt-2 w-44 rounded-md border border-canvas/10 bg-ink py-2 shadow-lg ${moreOpen ? "block" : "hidden"}`}
            >
              {moreNav.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={() => setMoreOpen(false)}
                    className="block rounded px-3 py-2 text-sm text-canvas transition-colors hover:bg-canvas/10 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SOCIAL_LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden animate-glow items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-accent/90 focus-visible:ring-2 focus-visible:ring-canvas focus-visible:ring-offset-2 sm:inline-flex"
          >
            <DiscordGlyph className="h-4 w-4" />
            <span>{messages.nav.cta}</span>
          </a>
          <a
            href={SOCIAL_LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={messages.nav.cta}
            className="inline-flex h-10 w-10 animate-glow items-center justify-center rounded-md bg-accent text-ink transition hover:-translate-y-0.5 hover:bg-accent/90 focus-visible:ring-2 focus-visible:ring-canvas focus-visible:ring-offset-2 sm:hidden"
          >
            <DiscordGlyph className="h-5 w-5" />
          </a>
          <button
            ref={mobileButtonRef}
            type="button"
            aria-label={
              mobileOpen
                ? messages.nav.aria.closeMenu
                : messages.nav.aria.openMenu
            }
            aria-expanded={mobileOpen}
            aria-controls={MOBILE_MENU_ID}
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-canvas transition-colors hover:bg-canvas/10 lg:hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {mobileOpen ? <CloseGlyph /> : <BurgerGlyph />}
          </button>
        </div>
      </div>

      <div
        id={MOBILE_MENU_ID}
        ref={mobileRef}
        className={`border-t border-canvas/10 bg-ink lg:hidden ${mobileOpen ? "block" : "hidden"}`}
      >
        <div className="px-4 py-5 sm:px-6">
          <nav aria-label={messages.nav.aria.primary}>
            <ul className="space-y-1">
              {primaryNav.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={closeMobile}
                    className="block rounded-md px-4 py-2 text-sm font-medium text-canvas transition-colors hover:bg-canvas/10 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="mt-3 px-4 text-xs font-semibold uppercase tracking-wider text-canvas/70">
            {messages.nav.more.label}
          </p>
          <ul aria-label={messages.nav.aria.more} className="mt-2 space-y-1">
            {moreNav.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={closeMobile}
                  className="block rounded-md px-4 py-2 text-sm font-medium text-canvas transition-colors hover:bg-canvas/10 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={SOCIAL_LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobile}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent/90 focus-visible:ring-2 focus-visible:ring-canvas focus-visible:ring-offset-2"
          >
            <DiscordGlyph className="h-4 w-4" />
            <span>{messages.nav.cta}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
