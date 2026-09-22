/**
 * Hero section of the landing page.
 * Above-the-fold block (`#hero`): the page's single `<h1>`, the value
 * proposition, three micro-badges, one Discord CTA and a decorative
 * terminal-style panel. Server Component: no state, all copy from i18n.
 */
import type { ComponentType } from "react";
import { Button } from "@/components/ui/Button";
import {
  CodeGlyph,
  DiscordGlyph,
  ShieldGlyph,
  TrophyGlyph,
  type IconProps,
} from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { messages } from "@/lib/content";
import { SOCIAL_LINKS } from "@/lib/site";

type BadgeKey = keyof typeof messages.hero.badges;

const BADGE_KEYS: BadgeKey[] = ["code", "ats", "prizes"];

const BADGE_ICONS: Record<BadgeKey, ComponentType<IconProps>> = {
  code: CodeGlyph,
  ats: ShieldGlyph,
  prizes: TrophyGlyph,
};

const LINE_CLASSES: Record<string, string> = {
  channel: "text-accent",
  message: "text-canvas/80",
  system: "text-canvas/60",
};

export function Hero() {
  const { title, titleAccent, subtitle, badges, cta, ctaSecondary, terminal } =
    messages.hero;

  return (
    <section
      id="hero"
      aria-label={messages.sections.hero}
      className="relative isolate overflow-hidden bg-ink"
    >
      {/* Decorative teal grid drifting left -> right. The global
          prefers-reduced-motion guard freezes it for sensitive users. */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 animate-grid",
          "[background-image:linear-gradient(to_right,rgb(132_192_191/0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgb(132_192_191/0.12)_1px,transparent_1px)]",
          "[background-size:64px_64px]",
          "[mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black,transparent)]",
          "[-webkit-mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black,transparent)]",
        )}
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-canvas sm:text-5xl lg:text-6xl">
            {title} <span className="text-accent">{titleAccent}</span>
          </h1>

          <p className="mt-6 text-base leading-relaxed text-canvas/70 sm:text-lg">
            {subtitle}
          </p>

          <ul className="mt-8 flex flex-wrap gap-3">
            {BADGE_KEYS.map((key) => {
              const Icon = BADGE_ICONS[key];
              return (
                <li
                  key={key}
                  className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-canvas sm:text-sm"
                >
                  <Icon className="h-4 w-4 text-accent" />
                  {badges[key]}
                </li>
              );
            })}
          </ul>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Button href={SOCIAL_LINKS.discord} variant="primary" size="lg">
              <DiscordGlyph className="h-4 w-4" />
              {cta}
            </Button>
            <Button href="#torneos" variant="secondary" size="lg">
              {ctaSecondary}
            </Button>
          </div>
        </div>

        <figure aria-label={terminal.label} className="w-full">
          <div className="overflow-hidden rounded-xl border border-canvas/10 bg-ink-alt shadow-2xl">
            <div className="flex items-center gap-2 border-b border-canvas/10 bg-surface/60 px-4 py-3">
              <span aria-hidden="true" className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-green-500" />
              </span>
              <span className="ml-2 font-mono text-xs text-canvas/50">
                {terminal.title}
              </span>
            </div>
            <pre className="whitespace-pre-wrap break-words p-4 font-mono text-xs leading-relaxed sm:p-6 sm:text-sm">
              <code className="block space-y-2">
                {terminal.lines.map((line, index) => (
                  <span
                    key={`${line.kind}-${index}`}
                    className={cn("block", LINE_CLASSES[line.kind])}
                  >
                    {line.text}
                  </span>
                ))}
              </code>
            </pre>
          </div>
        </figure>
      </div>
    </section>
  );
}
