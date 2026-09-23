/**
 * "Testimonials" section of the landing page.
 * PRD section 06 (`#testimonios`): qualitative voices from builders inside the
 * Discord, framed as lived experience instead of inflated metrics. Cards reuse
 * the shared `.ttj-card` / `.ttj-card-icon` hover treatment from the UI kit so
 * the whole page keeps the same motion language.
 *
 * NOTE: the quotes currently shipped are the reference-design placeholders.
 * Replace them with real, consented testimonials before going to production.
 * Server Component: no state, no interactivity beyond plain markup.
 */
import { LinkedInGlyph } from "@/components/ui/icons";
import { getMessages } from "next-intl/server";
import { asMessages } from "@/lib/messages";

export async function Testimonials() {
  const messages = asMessages(await getMessages());
  const { eyebrow, titleLead, titleAccent, subtitle, items } =
    messages.testimonios;

  return (
    <section
      id="testimonios"
      aria-label={messages.sections.testimonios}
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

        {/* Voces de la comunidad */}
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li
              key={item.name}
              className="ttj-card flex flex-col rounded-xl border border-canvas/10 bg-ink-alt p-6"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-canvas/10 bg-ink text-sm font-semibold text-canvas"
                >
                  {item.initials}
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-sm font-semibold text-canvas">
                    {item.name}
                    {/* Glifo decorativo: los testimonios son placeholder y aún
                        no tienen perfil público al que enlazar. */}
                    <LinkedInGlyph className="ttj-card-icon h-3.5 w-3.5 text-canvas/40" />
                  </p>
                  <p className="mt-0.5 text-xs text-canvas/60">{item.role}</p>
                </div>
              </div>

              <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-canvas/70">
                {item.quote}
              </blockquote>

              <p className="mt-auto pt-6">
                <span className="inline-flex rounded-md border border-canvas/10 px-3 py-1 text-xs text-canvas/60">
                  {item.tag}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
