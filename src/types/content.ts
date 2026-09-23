/**
 * Shared content types.
 * Defines the PRD section identifiers and the shape of the message catalog
 * so all UI copy stays typed and decoupled from the components.
 */
export const SECTION_ORDER = [
  "header",
  "hero",
  "como-funciona",
  "talento",
  "empresas",
  "torneos",
  "comunidad",
  "testimonios",
  "noticias",
  "newsletter",
  "cierre",
  "footer",
] as const;

export type SectionId = (typeof SECTION_ORDER)[number];

export type NavItem = {
  id: SectionId;
  label: string;
  href: `#${SectionId}`;
};

export type Messages = {
  _comment?: string;
  site: {
    name: string;
  };
  nav: {
    primary: Record<string, string>;
    more: {
      label: string;
      items: Record<string, string>;
    };
    cta: string;
    aria: {
      logo: string;
      primary: string;
      more: string;
      menu: string;
      openMenu: string;
      closeMenu: string;
    };
  };
  sections: Record<SectionId, string>;
  howItWorks: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    subtitle: string;
    steps: Record<
      "01" | "02" | "03",
      { title: string; description: string; footnote: string }
    >;
    compare: {
      headerTitle: string;
      headerNote: string;
      traditional: { title: string; items: string[] };
      techtojob: { title: string; items: string[] };
    };
    banner: {
      strong: string;
      rest: string;
      cta: string;
    };
  };
  torneos: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    subtitle: string;
    highlight: {
      strong: string;
      rest: string;
    };
    current: {
      badge: string;
      status: string;
      edition: string;
      meta: string;
      title: string;
      description: string;
      period: string;
      criteria: Record<
        "criteria" | "production" | "review",
        { title: string; description: string }
      >;
      join: {
        label: string;
        description: string;
        cta: string;
      };
    };
    steps: Record<
      "01" | "02" | "03" | "04",
      { title: string; description: string }
    >;
  };
  footer: {
    tagline: string;
    labels: Record<string, string>;
    columns: { heading: string; links: string[]; note?: string }[];
    networks: Record<string, string>;
    social: string;
    copyright: string;
    accessibility: string;
  };
};
