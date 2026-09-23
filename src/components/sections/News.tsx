/**
 * "News" section of the landing page.
 * PRD section 07 (`#noticias`): three update cards (category chip, date,
 * excerpt and an internal CTA link) covering tournaments, community and
 * sector. Cards reuse the shared `.ttj-card` hover treatment from the UI kit
 * so the whole page keeps the same motion language.
 *
 * NOTE: the three entries shipped are the reference-design placeholders and
 * their dates belong to the mockup. Replace them with real posts (and real
 * article URLs in `href`) before going to production.
 * Server Component: no state, no interactivity beyond plain links.
 */
import { ArrowGlyph } from "@/components/ui/icons";
import { getMessages } from "next-intl/server";
import { asMessages } from "@/lib/messages";

export async function News() {
  const messages = asMessages(await getMessages());
  const { eyebrow, titleLead, titleAccent, subtitle, items } =
    messages.noticias;

  return (
    <section
      id="noticias"
      aria-label={messages.sections.noticias}
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

        {/* Tres tarjetas de noticias */}
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.title}
              className="ttj-card flex flex-col rounded-xl border border-canvas/10 bg-ink-alt p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={
                    item.highlight
                      ? "rounded-md border border-accent/40 bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent"
                      : "rounded-md border border-canvas/15 bg-canvas/5 px-2.5 py-1 text-xs font-semibold text-canvas/70"
                  }
                >
                  {item.tag}
                </span>
                <time className="font-mono text-xs text-canvas/50">
                  {item.date}
                </time>
              </div>

              <h3 className="mt-4 text-lg font-semibold text-canvas">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-canvas/70">
                {item.excerpt}
              </p>

              <div className="mt-auto pt-6">
                <div
                  aria-hidden="true"
                  className="mb-4 h-px w-full bg-canvas/10"
                />
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1.5 rounded text-sm font-medium text-accent transition-colors duration-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {item.cta}
                  <ArrowGlyph className="h-3.5 w-3.5" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
