/**
 * "Tournaments" section of the landing page.
 * PRD section 05 (`#torneos`): showcases real challenges, highlights the active
 * Torneo #02 (the landing page itself), its submission timeline, the evaluation
 * rules and the live participation flow through Discord. Server Component.
 */
import { Button } from "@/components/ui/Button";
import {
  CheckGlyph,
  ClockGlyph,
  DiscordGlyph,
  GemGlyph,
  ShieldGlyph,
} from "@/components/ui/icons";
import { messages } from "@/lib/content";
import { SOCIAL_LINKS } from "@/lib/site";

export function Tournaments() {
  const t = messages.torneos;

  return (
    <section
      id="torneos"
      aria-label={messages.sections.torneos}
      className="bg-ink py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado alineado a la izquierda */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-canvas sm:text-4xl">
            {t.titleLead}
            <span className="text-accent">{t.titleAccent}</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-canvas/70">{t.subtitle}</p>
        </div>

        {/* Torneo activo destacado */}
        <div className="ttj-card mt-12 rounded-xl border border-canvas/10 bg-ink-alt p-6 shadow-none sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                <GemGlyph className="h-3.5 w-3.5" />
                {t.current.tag}
              </span>
              <span className="text-xs font-medium text-accent">
                {t.activeTag}
              </span>
            </div>
            <Button
              href={SOCIAL_LINKS.discord}
              variant="primary"
              size="md"
            >
              {t.current.cta}
            </Button>
          </div>
          <h3 className="mt-5 text-xl font-semibold text-canvas">
            {t.current.title}
          </h3>
          <p className="mt-2 max-w-3xl text-base text-canvas/80">
            {t.current.description}
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm text-canvas/60">
            <ClockGlyph className="h-4 w-4" />
            {t.current.period}
          </p>
        </div>

        {/* Reglas de evaluación */}
        <div className="ttj-card mt-12 rounded-xl border border-canvas/10 bg-ink-alt p-6 shadow-none sm:p-8">
          <h3 className="text-sm font-semibold text-canvas">
            {t.rules.headerTitle}
          </h3>
          <ul className="mt-4 space-y-3">
            {t.rules.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed text-canvas/70"
              >
                <CheckGlyph className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Banner CTA final */}
        <div className="mt-10 flex flex-col gap-6 rounded-xl border border-canvas/10 bg-ink-alt px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-3 text-sm text-canvas/80 sm:items-center">
            <ShieldGlyph className="h-5 w-5 shrink-0 text-accent" />
            <span>
              <strong className="font-semibold text-canvas">
                {t.banner.strong}
              </strong>{" "}
              {t.banner.rest}
            </span>
          </p>
          <Button
            href={SOCIAL_LINKS.discord}
            variant="primary"
            size="md"
          >
            <DiscordGlyph className="h-4 w-4" /> {t.banner.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}

