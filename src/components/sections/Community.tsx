/**
 * "Community" section of the landing page.
 * PRD section 06 (`#comunidad`): three benefit cards next to a terminal-style
 * panel with the community channels, plus a Discord CTA. Server Component: no
 * state, no interactivity beyond plain links.
 */
import type { ComponentType } from "react";
import { Button } from "@/components/ui/Button";
import {
  BriefcaseGlyph,
  CodeGlyph,
  DiscordGlyph,
  HashGlyph,
  type IconProps,
} from "@/components/ui/icons";
import { messages } from "@/lib/content";
import { SOCIAL_LINKS } from "@/lib/site";

const FEATURE_ICONS: ComponentType<IconProps>[] = [
  HashGlyph,
  BriefcaseGlyph,
  CodeGlyph,
];

export function Community() {
  const {
    eyebrow,
    titleLead,
    titleAccent,
    subtitle,
    features,
    panel,
    channels,
    cta,
  } = messages.comunidad;

  return (
    <section
      id="comunidad"
      aria-label={messages.sections.comunidad}
      className="bg-ink py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado alineado a la izquierda */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
            {eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-canvas sm:text-4xl">
            {titleLead}
            <span className="text-accent">{titleAccent}</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-canvas/70">{subtitle}</p>
        </div>

        {/* Dos columnas: features (izq, ~35%) + panel de canales (der, ~65%) */}
        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <ul className="flex flex-col gap-4">
            {features.map((feature, index) => {
              const Icon = FEATURE_ICONS[index] ?? HashGlyph;
              return (
                <li
                  key={feature.title}
                  className="rounded-xl bg-surface p-6"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-canvas">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-canvas/70">
                    {feature.description}
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="sticky top-24 rounded-xl bg-surface/40 p-6">
            {/* Header tipo ventana */}
            <div className="flex flex-col gap-3 border-b border-canvas/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 text-sm font-semibold text-canvas">
                <span aria-hidden="true" className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                {panel.title}
              </p>
              <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-accent/40 bg-ink px-3 py-1 font-mono text-xs text-accent">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"
                />
                {panel.badge}
              </span>
            </div>

            {/* Grid de canales */}
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {channels.map((channel) => (
                <li
                  key={channel.name}
                  className="group rounded-lg border border-canvas/10 bg-ink p-3 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_0_18px_rgba(132,192,191,0.12)]"
                >
                  <p className="font-mono text-sm text-canvas transition-colors duration-300 group-hover:text-accent">
                    <span className="text-accent">#</span> {channel.name}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-canvas/50">
                    {channel.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <Button
            href={SOCIAL_LINKS.discord}
            variant="primary"
            size="lg"
            className="rounded-full! border! border-accent/40! bg-accent/15! px-8! py-4! text-accent! hover:bg-accent/25!"
          >
            <DiscordGlyph className="h-5 w-5" />
            {cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
