/**
 * "How it works" section of the landing page.
 * PRD section 02 (`#como-funciona`): a 3-step progressive onboarding with a
 * low barrier to entry and zero initial bureaucratic forms, plus a side-by-side
 * comparison of the traditional job hunt vs TechToJob and a closing CTA banner.
 * Server Component: no state, no interactivity beyond plain links.
 */
import { Button } from "@/components/ui/Button";
import {
  AlertGlyph,
  BranchGlyph,
  ChatGlyph,
  CheckGlyph,
  CloseGlyph,
  CodeGlyph,
  DiscordGlyph,
  EyeGlyph,
  ShieldGlyph,
} from "@/components/ui/icons";
import { messages } from "@/lib/content";
import { SOCIAL_LINKS } from "@/lib/site";

const STEPS = [
  { key: "01", Icon: ChatGlyph },
  { key: "02", Icon: CodeGlyph },
  { key: "03", Icon: EyeGlyph },
] as const;

export function HowItWorks() {
  const { eyebrow, titleLead, titleAccent, subtitle, steps, compare, banner } =
    messages.howItWorks;

  return (
    <section
      id="como-funciona"
      aria-label={messages.sections["como-funciona"]}
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

        {/* Tres pasos */}
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map(({ key, Icon }) => {
            const step = steps[key];
            return (
              <li
                key={key}
                className="flex flex-col rounded-xl border border-canvas/10 bg-ink-alt p-6"
              >
                <div className="flex items-start justify-between">
                  <span
                    aria-hidden="true"
                    className="rounded-md border border-accent/40 bg-accent/10 px-2 py-1 text-sm font-bold text-accent"
                  >
                    {key}
                  </span>
                  <Icon className="h-5 w-5 text-canvas/60" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-canvas">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-canvas/70">
                  {step.description}
                </p>
                <div className="mt-auto pt-6">
                  <div
                    aria-hidden="true"
                    className="mb-4 h-px w-full bg-canvas/10"
                  />
                  <p className="flex items-center gap-2 text-xs text-canvas/60">
                    <CheckGlyph className="h-3.5 w-3.5 text-accent" />
                    {step.footnote}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Panel comparativo */}
        <div className="mt-12 overflow-hidden rounded-xl border border-canvas/10 bg-ink-alt">
          <div className="flex flex-col gap-2 border-b border-canvas/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm font-semibold text-canvas">
              <BranchGlyph className="h-4 w-4 text-accent" />
              {compare.headerTitle}
            </p>
            <p className="font-mono text-xs text-canvas/50">
              {compare.headerNote}
            </p>
          </div>
          <div className="grid md:grid-cols-2">
            <div className="border-b border-canvas/10 px-6 py-6 md:border-b-0 md:border-r">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-canvas">
                <AlertGlyph className="h-4 w-4 text-canvas/60" />
                {compare.traditional.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {compare.traditional.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-canvas/70"
                  >
                    <CloseGlyph className="mt-0.5 h-3.5 w-3.5 shrink-0 text-canvas/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-6 py-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-canvas">
                <CheckGlyph className="h-4 w-4 text-accent" />
                {compare.techtojob.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {compare.techtojob.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-canvas/70"
                  >
                    <CheckGlyph className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Banner CTA final */}
        <div className="mt-10 flex flex-col gap-6 rounded-xl border border-canvas/10 bg-ink-alt px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-3 text-sm text-canvas/80 sm:items-center">
            <ShieldGlyph className="h-5 w-5 shrink-0 text-accent" />
            <span>
              <strong className="font-semibold text-canvas">
                {banner.strong}
              </strong>{" "}
              {banner.rest}
            </span>
          </p>
          <Button href={SOCIAL_LINKS.discord} variant="primary" size="md">
            <DiscordGlyph className="h-4 w-4" /> {banner.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}

