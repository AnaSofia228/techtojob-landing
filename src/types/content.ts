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
};
