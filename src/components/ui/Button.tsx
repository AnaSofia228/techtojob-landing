/**
 * Shared button: primary (accent, persistent teal glow) and secondary
 * (light, glows only on hover). Renders an `<a>` when `href` is provided,
 * otherwise a `<button>`. External http(s) links open in a new tab.
 */
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "md" | "lg";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold " +
  "transition hover:-translate-y-0.5 focus-visible:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-offset-2";

const sizeClasses: Record<ButtonSize, string> = {
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-sm",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent text-ink animate-glow hover:bg-accent/90 focus-visible:ring-canvas",
  secondary:
    "bg-canvas text-ink hover:animate-glow focus-visible:ring-accent",
};

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** When provided the component renders an `<a>` instead of a `<button>`. */
  href?: string;
  /** Force open in a new tab; inferred automatically for http(s) links. */
  external?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> &
  Partial<
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href">
  >;

export function Button({
  variant = "primary",
  size = "lg",
  href,
  external,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(baseClasses, sizeClasses[size], variantClasses[variant], className);

  if (typeof href === "string") {
    const openExternal = external ?? /^https?:/.test(href);
    return (
      <a
        href={href}
        target={openExternal ? "_blank" : undefined}
        rel={openExternal ? "noopener noreferrer" : undefined}
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}