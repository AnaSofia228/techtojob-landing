/**
 * Site footer.
 * Structured 4-column layout (Talento, Empresas, Comunidad, Legal) with the
 * brand wordmark, the official social links from the PRD (Discord, LinkedIn,
 * X, Instagram), the year-based copyright and the accessibility statement.
 */
import type { ReactElement } from "react";
import {
  BrandMark,
  DiscordGlyph,
  InstagramGlyph,
  LinkedInGlyph,
  XGlyph,
  type IconProps,
} from "@/components/ui/icons";
import { messages } from "@/lib/content";
import { SITE_NAME, SOCIAL_LINKS } from "@/lib/site";

const socials: {
  name: keyof typeof messages.footer.networks;
  href: string;
  Icon: (props: IconProps) => ReactElement;
}[] = [
  { name: "discord", href: SOCIAL_LINKS.discord, Icon: DiscordGlyph },
  { name: "linkedin", href: SOCIAL_LINKS.linkedin, Icon: LinkedInGlyph },
  { name: "x", href: SOCIAL_LINKS.x, Icon: XGlyph },
  { name: "instagram", href: SOCIAL_LINKS.instagram, Icon: InstagramGlyph },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      aria-label={messages.sections.footer}
      className="border-t border-canvas/10 bg-surface"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a
              href="#header"
              aria-label={messages.nav.aria.logo}
              className="inline-flex items-center gap-2 rounded-md focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <BrandMark />
              <span className="text-lg font-semibold text-canvas">
                {SITE_NAME}
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm text-canvas/70">
              {messages.footer.tagline}
            </p>
            <h2 className="sr-only">{messages.footer.social}</h2>
            <ul className="mt-6 flex items-center gap-2">
              {socials.map(({ name, href, Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={messages.footer.networks[name]}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md text-canvas/70 transition-colors hover:bg-canvas/10 hover:text-canvas focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {messages.footer.columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-canvas/80">
                {column.heading}
              </h3>
              {column.note && (
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-accent">
                  {column.note}
                </p>
              )}
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => {
                  const label = messages.footer.labels[link];
                  if (column.note) {
                    return (
                      <li key={link}>
                        <span className="text-sm text-canvas/60">{label}</span>
                      </li>
                    );
                  }
                  const external = link === "discord";
                  return (
                    <li key={link}>
                      <a
                        href={external ? SOCIAL_LINKS.discord : `#${link}`}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="rounded text-sm text-canvas/80 transition-colors hover:text-canvas focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                      >
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-canvas/10 pt-6 text-xs text-canvas/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE_NAME}. {messages.footer.copyright}
          </p>
          <p>{messages.footer.accessibility}</p>
        </div>
      </div>
    </footer>
  );
}
