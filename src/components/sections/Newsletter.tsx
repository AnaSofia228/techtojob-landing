"use client";

/**
 * Newsletter section of the landing page.
 * PRD section 09 (`#newsletter`): a light "break" strip on the dark page with a
 * controlled email input and a submit button. Client Component (input state).
 * All copy comes from the i18n catalog; submit logic is intentionally pending.
 */
import { useId, useState, type FormEvent } from "react";
import { useMessages } from "next-intl";
import { asMessages } from "@/lib/messages";
import { LockGlyph, MailGlyph } from "@/components/ui/icons";

export function Newsletter() {
  const messages = asMessages(useMessages());
  const { eyebrow, title, subtitle, emailLabel, emailPlaceholder, cta, trust } =
    messages.newsletter;
  const [email, setEmail] = useState("");
  const emailId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: conectar el envío del formulario (aún sin lógica).
  };

  return (
    <section
      id="newsletter"
      aria-label={messages.sections.newsletter}
      className="bg-canvas py-20 text-surface sm:py-24"
    >
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-surface">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-accent"
          />
          {eyebrow}
        </span>

        <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {title}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-surface/70">
          {subtitle}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
        >
          <label htmlFor={emailId} className="sr-only">
            {emailLabel}
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={emailPlaceholder}
            className="w-full rounded-lg border border-surface/20 bg-canvas px-4 py-3 text-sm text-surface transition placeholder:text-surface/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-auto sm:min-w-72"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-surface px-6 py-3 text-sm font-semibold text-canvas transition-colors duration-300 hover:bg-surface/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <MailGlyph className="h-4 w-4" />
            {cta}
          </button>
        </form>

        <p className="mt-4 inline-flex items-center gap-2 text-xs text-surface/70">
          <LockGlyph className="h-3.5 w-3.5 text-accent" />
          {trust}
        </p>
      </div>
    </section>
  );
}
