/**
 * "Tournaments" section of the landing page.
 * PRD section 05 (`#torneos`): the active challenge, its public criteria and
 * the four-step rhythm of every tournament. Tournament cards reuse the shared
 * `.ttj-card` / `.ttj-card-icon` hover treatment from the UI kit so the whole
 * page keeps the same motion language. Server Component: no state, no
 * interactivity beyond plain links.
 */
import { Button } from "@/components/ui/Button";
import {
  ClockGlyph,
  DiscordGlyph,
  GemGlyph,
  MonitorGlyph,
  RocketGlyph,
  ScaleGlyph,
  SettingsGlyph,
} from "@/components/ui/icons";
import { messages } from "@/lib/content";
import { SOCIAL_LINKS } from "@/lib/site";

/** Public judging criteria of the running tournament (order as designed). */
const CRITERIA = [
  { key: "criteria", Icon: ScaleGlyph },
  { key: "production", Icon: SettingsGlyph },
  { key: "review", Icon: MonitorGlyph },
] as const;

/** Numbered rhythm of every tournament. */
const STEP_KEYS = ["01", "02", "03", "04"] as const;

export function Tournaments() {
  const { eyebrow, titleLead, titleAccent, subtitle, highlight, current, steps } =
    messages.torneos;

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

        {/* Nota destacada: la prueba más real */}
        <div className="mt-10 flex items-start gap-4 rounded-xl border border-canvas/10 bg-ink-alt px-6 py-5">
          <span
            aria-hidden="true"
            className="mt-0.5 rounded-md border border-accent/40 bg-accent/10 p-2 text-accent"
          >
            <RocketGlyph className="h-4 w-4" />
          </span>
          <p className="text-sm leading-relaxed text-canvas/80">
            <strong className="font-semibold text-canvas">
              {highlight.strong}
            </strong>{" "}
            {highlight.rest}
          </p>
        </div>

        {/* Torneo activo */}
        <article className="ttj-card mt-6 rounded-xl border border-canvas/10 bg-ink-alt">
          <div className="flex flex-col gap-3 border-b border-canvas/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                <GemGlyph className="h-3.5 w-3.5" />
                {current.badge}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-canvas/15 px-3 py-1 text-xs font-medium text-canvas/80">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                />
                {current.status}
              </span>
              <span className="text-xs text-canvas/50">{current.edition}</span>
            </div>
            <p className="font-mono text-xs text-canvas/50">{current.meta}</p>
          </div>

          <div className="grid gap-6 px-6 py-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-canvas">
                {current.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-canvas/70">
                {current.description}
              </p>
              <p className="mt-3 flex items-center gap-2 text-xs text-canvas/60">
                <ClockGlyph className="ttj-card-icon h-3.5 w-3.5 text-canvas/60" />
                {current.period}
              </p>

              {/* Criterios publicos */}
              <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                {CRITERIA.map(({ key, Icon }) => (
                  <li
                    key={key}
                    className="rounded-lg border border-canvas/10 bg-ink px-4 py-3"
                  >
                    <p className="flex items-center gap-2 text-xs font-semibold text-canvas">
                      <Icon className="ttj-card-icon h-3.5 w-3.5 text-canvas/60" />
                      {current.criteria[key].title}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-canvas/60">
                      {current.criteria[key].description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna lateral: sumate al torneo en marcha */}
            <aside className="flex flex-col rounded-lg border border-canvas/10 bg-ink px-6 py-6 lg:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-canvas/50">
                {current.join.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-canvas/70">
                {current.join.description}
              </p>
              <div className="mt-6 sm:mt-auto sm:pt-6">
                <Button
                  href={SOCIAL_LINKS.discord}
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  <DiscordGlyph className="h-4 w-4" /> {current.join.cta}
                </Button>
              </div>
            </aside>
          </div>
        </article>

        {/* Ritmo de cada torneo: cuatro pasos */}
        <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEP_KEYS.map((key) => {
            const step = steps[key];
            return (
              <li
                key={key}
                className="ttj-card flex flex-col rounded-xl border border-canvas/10 bg-ink-alt p-6"
              >
                <span
                  aria-hidden="true"
                  className="w-fit rounded-md border border-accent/40 bg-accent/10 px-2 py-1 text-sm font-bold text-accent"
                >
                  {key}
                </span>
                <h3 className="mt-4 text-base font-semibold text-canvas">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-canvas/70">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

