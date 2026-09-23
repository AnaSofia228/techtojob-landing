"use client";

/**
 * "Talent & Companies" section of the landing page.
 * PRD sections 03 & 04 (`#talento`, `#empresas`): one dual-tab card that flips
 * between the builder and the company perspective with fixed vertical tabs on
 * desktop and a horizontal pill switch on mobile. Client Component (tab state
 * + URL hash sync); all copy comes from the i18n catalog.
 */
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentType,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import {
  CheckGlyph,
  CodeGlyph,
  EyeGlyph,
  HeroCodeGlyph,
  type IconProps,
} from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { useMessages } from "next-intl";
import { asMessages } from "@/lib/messages";
import { SOCIAL_LINKS } from "@/lib/site";

type TabId = "talent" | "companies";

const TAB_ORDER: TabId[] = ["talent", "companies"];

const TAB_ICONS: Record<TabId, ComponentType<IconProps>> = {
  talent: CodeGlyph,
  companies: EyeGlyph,
};

const TAB_HASH: Record<TabId, string> = {
  talent: "#talento",
  companies: "#empresas",
};

export function TalentCompanies() {
  const messages = asMessages(useMessages());
  const { eyebrow, titleLead, titleAccent, subtitle, tabsLabel, tabs, talent, companies } =
    messages.talentCompanies;
  const [activeTab, setActiveTab] = useState<TabId>("talent");
  const tabRefs = useRef<Partial<Record<TabId, HTMLButtonElement | null>>>({});
  const baseId = useId();

  const tabId = (id: TabId) => `${baseId}-tab-${id}`;
  const panelId = (id: TabId) => `${baseId}-panel-${id}`;

  // Keep the active tab in sync with the URL hash so the nav links
  // (#talento / #empresas) select the matching panel.
  useEffect(() => {
    const applyHash = () => {
      if (window.location.hash === TAB_HASH.companies) setActiveTab("companies");
      else if (window.location.hash === TAB_HASH.talent) setActiveTab("talent");
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
    if (window.location.hash !== TAB_HASH[id]) {
      window.history.replaceState(null, "", TAB_HASH[id]);
    }
  };

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const handled = [
      "ArrowRight",
      "ArrowDown",
      "ArrowLeft",
      "ArrowUp",
      "Home",
      "End",
    ];
    if (!handled.includes(event.key)) return;
    event.preventDefault();

    let nextIndex = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % TAB_ORDER.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + TAB_ORDER.length) % TAB_ORDER.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else {
      nextIndex = TAB_ORDER.length - 1;
    }

    const nextId = TAB_ORDER[nextIndex];
    handleTabChange(nextId);
    tabRefs.current[nextId]?.focus();
  };

  return (
    <section id="talento" className="bg-ink py-20 sm:py-24">
      <span id="empresas" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-16">
        {/* Encabezado alineado a la izquierda, mismo patrón que HowItWorks. */}
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

        <div className="relative mt-12 rounded-2xl bg-canvas shadow-2xl">
          <div
            role="tablist"
            aria-label={tabsLabel}
            className="flex gap-2 p-4 lg:pointer-events-none lg:absolute lg:inset-0 lg:block lg:p-0"
          >
            {TAB_ORDER.map((id, index) => {
              const Icon = TAB_ICONS[id];
              const selected = activeTab === id;
              return (
                <button
                  key={id}
                  ref={(node) => {
                    tabRefs.current[id] = node;
                  }}
                  type="button"
                  role="tab"
                  id={tabId(id)}
                  aria-selected={selected}
                  aria-controls={panelId(id)}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => handleTabChange(id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={cn(
                    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                    selected
                      ? "bg-accent text-ink"
                      : "bg-surface text-canvas hover:bg-surface/90",
                    "lg:pointer-events-auto lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:flex-col lg:px-3 lg:py-4",
                    id === "talent"
                      ? "lg:left-0 lg:-translate-x-full lg:rounded-l-lg lg:rounded-r-none"
                      : "lg:right-0 lg:translate-x-full lg:rounded-r-lg lg:rounded-l-none",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="lg:[writing-mode:vertical-rl] lg:rotate-180">
                    {tabs[id]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid">
            {TAB_ORDER.map((id) => {
              const content = id === "talent" ? talent : companies;
              const selected = activeTab === id;
              return (
                <div
                  key={id}
                  role="tabpanel"
                  id={panelId(id)}
                  aria-labelledby={tabId(id)}
                  tabIndex={selected ? 0 : -1}
                  aria-hidden={!selected}
                  inert={!selected}
                  className={cn(
                    "col-start-1 row-start-1 grid gap-8 p-6 transition-opacity duration-300 sm:p-8 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-10 lg:py-12",
                    selected ? "opacity-100" : "pointer-events-none opacity-0",
                  )}
                >
                  <div>
                    <p className="inline-flex items-center gap-1.5 rounded-full border border-surface/15 bg-surface/[0.03] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-surface">
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 rounded-full bg-accent"
                      />
                      {content.eyebrow}
                    </p>
                    <h3 className="mt-3 text-2xl font-bold text-surface sm:text-3xl">
                      {content.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-surface">
                      {content.description}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {content.badges.map((badge) => (
                        <li
                          key={badge}
                          className="inline-flex items-center gap-2 rounded-full bg-surface/[0.05] px-3 py-1 text-xs font-semibold text-surface"
                        >
                          <CheckGlyph className="h-3.5 w-3.5 text-accent" />
                          {badge}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                      <Button
                        href={SOCIAL_LINKS.discord}
                        variant="primary"
                        size="lg"
                        className="rounded-lg! px-5!"
                      >
                        <HeroCodeGlyph className="h-4 w-4" />
                        {content.cta}
                      </Button>
                      <span className="inline-flex items-center gap-1.5 text-sm text-surface/80">
                        <CheckGlyph className="h-4 w-4 text-accent" />
                        {content.ctaNote}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-surface/10 bg-surface/[0.03] p-4 text-surface">
                    <Image
                      src={
                        id === "talent"
                          ? "/assets/talents.png"
                          : "/assets/companys.png"
                      }
                      alt=""
                      width={1536}
                      height={1024}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="h-auto w-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
