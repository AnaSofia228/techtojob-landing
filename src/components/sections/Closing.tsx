/**
 * "Closing" section of the landing page.
 * PRD section 10 (`#cierre`): the final conversion push inside a slightly
 * lighter card over the same animated background as the Hero (drifting grid +
 * cursor parallax + canvas glow/ripples), with a single Discord CTA.
 * Server Component: the animation lives in `ClosingGridBackground`.
 */
import { Button } from "@/components/ui/Button";
import { DiscordGlyph } from "@/components/ui/icons";
import { ClosingGridBackground } from "@/components/sections/ClosingGridBackground";
import { messages } from "@/lib/content";
import { SOCIAL_LINKS } from "@/lib/site";

export function Closing() {
  const { titleLead, titleAccent, subtitle, cta } = messages.cierre;

  return (
    <section
      id="cierre"
      aria-label={messages.sections.cierre}
      className="relative isolate overflow-hidden bg-ink py-20 sm:py-24"
    >
      <ClosingGridBackground />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-canvas/10 bg-ink-alt px-6 py-12 text-center sm:px-10 sm:py-16">
          <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight tracking-tight text-canvas sm:text-4xl lg:text-5xl">
            {titleLead}
            <span className="text-accent">{titleAccent}</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-canvas/70">
            {subtitle}
          </p>

          <div className="mt-8 flex justify-center">
            <Button
              href={SOCIAL_LINKS.discord}
              variant="primary"
              size="lg"
              className="rounded-full! px-8! py-4!"
            >
              <DiscordGlyph className="h-5 w-5" />
              {cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
