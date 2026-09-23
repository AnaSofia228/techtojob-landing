"use client";

/**
 * Site header.
 * Sticky navigation bar (`#header`) with the official brand logo, all the
 * primary links, the Discord CTA, the locale switch and a responsive mobile
 * menu. Outside clicks and Escape close the mobile menu.
 */
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DiscordGlyph } from "@/components/ui/icons";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { getPrimaryNav } from "@/data/navigation";
import { useMessages } from "next-intl";
import { asMessages } from "@/lib/messages";
import { SOCIAL_LINKS } from "@/lib/site";

const MOBILE_MENU_ID = "menu-movil";

// Desktop nav links: on hover the text turns accent teal and an underline
// wipes in from the left (::after + scale-x), both with a soft transition.
const navLinkClasses =
  "relative inline-flex items-center whitespace-nowrap rounded-md px-2 py-2 text-sm font-medium " +
  "text-canvas transition-colors duration-300 hover:text-accent " +
  "after:absolute after:inset-x-2 after:bottom-1.5 after:h-px after:origin-left " +
  "after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 " +
  "after:ease-out hover:after:scale-x-100 " +
  "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

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
  const messages = asMessages(useMessages());
  const primaryNav = getPrimaryNav(messages);
  const [mobileOpen, setMobileOpen] = useState(false);

  const mobileRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu on outside clicks or Escape, without fighting the
  // toggle button itself.
  useEffect(() => {
    if (!mobileOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      const onMobileButton = mobileButtonRef.current?.contains(target) ?? false;

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
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

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
          className="inline-flex shrink-0 items-center rounded-md focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          {/* Official brand assets: horizontal logo (desktop) and symbol (mobile). */}
          <Image
            src="/v1Negativo.png"
            alt=""
            width={4619}
            height={684}
            priority
            className="hidden h-7 w-auto sm:block"
          />
          <Image
            src="/SimboloNegativo.png"
            alt=""
            width={1151}
            height={1151}
            priority
            className="h-7 w-7 sm:hidden"
          />
        </a>

        <nav
          aria-label={messages.nav.aria.primary}
          className="hidden items-center gap-1 xl:flex"
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
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SOCIAL_LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden animate-glow items-center gap-2 whitespace-nowrap rounded-md bg-accent px-3 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-accent/90 focus-visible:ring-2 focus-visible:ring-canvas focus-visible:ring-offset-2 sm:inline-flex"
          >
            <DiscordGlyph className="h-4 w-4" />
            <span>{messages.nav.cta}</span>
          </a>
          <LocaleSwitcher />
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-canvas transition-colors hover:bg-canvas/10 xl:hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {mobileOpen ? <CloseGlyph /> : <BurgerGlyph />}
          </button>
        </div>
      </div>

      <div
        id={MOBILE_MENU_ID}
        ref={mobileRef}
        className={`border-t border-canvas/10 bg-ink xl:hidden ${mobileOpen ? "block" : "hidden"}`}
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
