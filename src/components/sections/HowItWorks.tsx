/**
 * "How it works" section of the landing page.
 * PRD section 02 (`#como-funciona`): a 3-step progressive onboarding with a
 * low barrier to entry and zero initial bureaucratic forms.
 * Server Component: no state, no interactivity beyond plain links.
 */
import { Button } from "@/components/ui/Button";
import { DiscordGlyph } from "@/components/ui/icons";
import { messages } from "@/lib/content";
import { SOCIAL_LINKS } from "@/lib/site";

const STEP_KEYS = ["01", "02", "03"] as const;

export function HowItWorks() {
  const { eyebrow, title, subtitle, steps, noForms, cta } =
    messages.howItWorks;

  return (
    <section
      id="como-funciona"
      aria-label={messages.sections["como-funciona"]}
      className="bg-ink py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-canvas sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base text-canvas/70">{subtitle}</p>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {STEP_KEYS.map((key, index) => {
            const step = steps[key];
            return (
              <li
                key={key}
                className="rounded-xl border border-canvas/10 bg-ink-alt p-6"
              >
                <span
                  aria-hidden="true"
                  className="text-2xl font-bold text-accent"
                >
                  {key}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-canvas">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-canvas/70">
                  {step.description}
                </p>
                {index < STEP_KEYS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="mt-4 block h-px w-full bg-gradient-to-r from-accent/40 to-transparent"
                  />
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="max-w-xl text-sm text-canvas/70">{noForms}</p>
          <Button href={SOCIAL_LINKS.discord} variant="primary" size="lg">
            <DiscordGlyph className="h-4 w-4" /> {cta}
          </Button>
        </div>
      </div>
    </section>
  );
}

