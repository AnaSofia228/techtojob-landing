"use client";

/**
 * Hero section of the landing page.
 * Above-the-fold block (`#hero`): the page's single `<h1>`, the value
 * proposition, three micro-badges, two CTAs and a decorative
 * terminal/dashboard panel showing the active Torneo #02. Client Component:
 * owns the cursor parallax and the canvas glow/ripples over the background
 * grid; all copy from i18n.
 */
import { useEffect, useRef, type ComponentType } from "react";
import { Button } from "@/components/ui/Button";
import {
  BoltGlyph,
  DiscordGlyph,
  HeroCodeGlyph,
  HeroShieldGlyph,
  TrophyGlyph,
  type IconProps,
} from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { useMessages } from "next-intl";
import { asMessages } from "@/lib/messages";
import type { Messages } from "@/types/content";
import { SOCIAL_LINKS } from "@/lib/site";

type BadgeKey = keyof Messages["hero"]["badges"];

const BADGE_KEYS: BadgeKey[] = ["code", "ats", "prizes"];

const BADGE_ICONS: Record<BadgeKey, ComponentType<IconProps>> = {
  code: HeroCodeGlyph,
  ats: HeroShieldGlyph,
  prizes: TrophyGlyph,
};

/**
 * Canvas overlay tuning.
 * The grid geometry matches the CSS grid (`background-size: 64px`), and the
 * teal matches the project accent (#84c0bf = rgb(132,192,191)).
 */
const GRID_GAP = 64;
const GLOW_RADIUS = 80;
const GLOW_MAX_ALPHA = 0.22;
const RIPPLE_SPEED = 150; // px per second
const RIPPLE_LIFETIME = 1000; // ms
const RIPPLE_MAX_ALPHA = 0.5;
const RIPPLE_HOVER_INTERVAL = 220; // ms between hover ripples
const TEAL = "132, 192, 191";

type Ripple = { x: number; y: number; radius: number; opacity: number };

export function Hero() {
  const messages = asMessages(useMessages());
  const { title, titleAccent, subtitle, badges, cta, ctaSecondary, dashboard } =
    messages.hero;

  const gridRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Subtle parallax: the decorative grid drifts opposite to the cursor.
  // Disabled when the visitor asks for reduced motion (WCAG 2.3.3).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * -15;
      const y = (event.clientY / window.innerHeight - 0.5) * -15;
      if (gridRef.current) {
        gridRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Decorative canvas overlay: a constant glow on the grid lines near the
  // pointer plus expanding ripples on hover/click. Disabled for reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ripples: Ripple[] = [];
    const pointer = { x: -1, y: -1, inside: false };
    let width = 0;
    let height = 0;
    let rafId = 0;
    let running = false;
    let lastFrame = 0;
    let lastRippleAt = 0;

    const toLocal = (clientX: number, clientY: number) => {
      const rect = section.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const drawGlow = () => {
      if (!pointer.inside) return;
      ctx.lineWidth = 1;
      for (let x = 0; x <= width; x += GRID_GAP) {
        const distance = Math.abs(pointer.x - x);
        if (distance > GLOW_RADIUS) continue;
        ctx.strokeStyle = `rgba(${TEAL}, ${GLOW_MAX_ALPHA * (1 - distance / GLOW_RADIUS)})`;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += GRID_GAP) {
        const distance = Math.abs(pointer.y - y);
        if (distance > GLOW_RADIUS) continue;
        ctx.strokeStyle = `rgba(${TEAL}, ${GLOW_MAX_ALPHA * (1 - distance / GLOW_RADIUS)})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const drawRipples = () => {
      const half = GRID_GAP;

      const paint = (ripple: Ripple) => {
        const radius = ripple.radius;

        for (let x = 0; x <= width; x += GRID_GAP) {
          const dx = x - ripple.x;
          if (Math.abs(dx) > radius) continue;
          const dy = Math.sqrt(radius * radius - dx * dx);
          ctx.beginPath();
          ctx.moveTo(x, ripple.y - dy - half);
          ctx.lineTo(x, ripple.y - dy + half);
          ctx.stroke();
          if (dy > 1) {
            ctx.beginPath();
            ctx.moveTo(x, ripple.y + dy - half);
            ctx.lineTo(x, ripple.y + dy + half);
            ctx.stroke();
          }
        }

        for (let y = 0; y <= height; y += GRID_GAP) {
          const dy = y - ripple.y;
          if (Math.abs(dy) > radius) continue;
          const dx = Math.sqrt(radius * radius - dy * dy);
          ctx.beginPath();
          ctx.moveTo(ripple.x - dx - half, y);
          ctx.lineTo(ripple.x - dx + half, y);
          ctx.stroke();
          if (dx > 1) {
            ctx.beginPath();
            ctx.moveTo(ripple.x + dx - half, y);
            ctx.lineTo(ripple.x + dx + half, y);
            ctx.stroke();
          }
        }
      };

      ctx.lineWidth = 3;

      for (const ripple of ripples) {
        const alpha = RIPPLE_MAX_ALPHA * ripple.opacity;

        // Bloom halo: shadows only render with source-over.
        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${TEAL}, ${0.6 * ripple.opacity})`;
        ctx.strokeStyle = `rgba(${TEAL}, ${alpha})`;
        paint(ripple);
        ctx.restore();

        // Additive pass: makes the teal pop over the dark background.
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.strokeStyle = `rgba(${TEAL}, ${alpha})`;
        paint(ripple);
        ctx.restore();
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      drawGlow();
      drawRipples();
    };

    const tick = (time: number) => {
      const delta = lastFrame ? Math.min((time - lastFrame) / 1000, 0.05) : 0;
      lastFrame = time;

      for (let i = ripples.length - 1; i >= 0; i -= 1) {
        const ripple = ripples[i];
        ripple.radius += RIPPLE_SPEED * delta;
        ripple.opacity -= (delta * 1000) / RIPPLE_LIFETIME;
        if (ripple.opacity <= 0 || ripple.radius > Math.hypot(width, height)) {
          ripples.splice(i, 1);
        }
      }

      render();

      if (pointer.inside || ripples.length > 0) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        running = false;
        lastFrame = 0;
        ctx.clearRect(0, 0, width, height);
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      lastFrame = 0;
      rafId = window.requestAnimationFrame(tick);
    };

    const addRipple = (x: number, y: number) => {
      ripples.push({ x, y, radius: 0, opacity: 1 });
      start();
    };

    const resize = () => {
      const rect = section.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!running) render();
    };

    const handleMouseMove = (event: MouseEvent) => {
      const { x, y } = toLocal(event.clientX, event.clientY);
      pointer.x = x;
      pointer.y = y;
      pointer.inside = true;
      const now = performance.now();
      if (now - lastRippleAt > RIPPLE_HOVER_INTERVAL) {
        lastRippleAt = now;
        addRipple(x, y);
      }
      start();
    };

    const handleClick = (event: MouseEvent) => {
      const { x, y } = toLocal(event.clientX, event.clientY);
      addRipple(x, y);
    };

    const handleEnter = (event: MouseEvent) => {
      const { x, y } = toLocal(event.clientX, event.clientY);
      pointer.x = x;
      pointer.y = y;
      pointer.inside = true;
      start();
    };

    const handleLeave = () => {
      pointer.inside = false;
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(section);
    window.addEventListener("resize", resize);
    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("click", handleClick);
    section.addEventListener("mouseenter", handleEnter);
    section.addEventListener("mouseleave", handleLeave);

    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("click", handleClick);
      section.removeEventListener("mouseenter", handleEnter);
      section.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label={messages.sections.hero}
      className="relative isolate overflow-hidden bg-ink"
    >
      {/* Decorative teal grid drifting left -> right. The global
          prefers-reduced-motion guard freezes it for sensitive users. */}
      <div
        ref={gridRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-5 animate-grid transition-transform duration-150 ease-out",
          "[background-image:linear-gradient(to_right,rgb(132_192_191/0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgb(132_192_191/0.12)_1px,transparent_1px)]",
          "[background-size:64px_64px]",
          "[mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black,transparent)]",
          "[-webkit-mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black,transparent)]",
        )}
      />

      {/* Canvas overlay: grid-line glow + expanding ripples. Transparent, so
          the animated CSS grid underneath stays visible. */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-0",
          "[mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black,transparent)]",
          "[-webkit-mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black,transparent)]",
        )}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-center lg:gap-16 lg:px-8">
        <div className="w-full min-w-0">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-canvas sm:text-5xl lg:text-6xl">
            {title} <span className="text-accent">{titleAccent}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-canvas/70 sm:text-lg">
            {subtitle}
          </p>

          <ul className="mt-8 flex flex-wrap gap-3">
            {BADGE_KEYS.map((key) => {
              const Icon = BADGE_ICONS[key];
              return (
                <li
                  key={key}
                  className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-canvas sm:text-sm"
                >
                  <Icon className="h-4 w-4 text-accent" />
                  {badges[key]}
                </li>
              );
            })}
          </ul>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Button href={SOCIAL_LINKS.discord} variant="primary" size="lg">
              <DiscordGlyph className="h-4 w-4" />
              {cta}
            </Button>
            <Button href="#torneos" variant="secondary" size="lg">
              {ctaSecondary}
            </Button>
          </div>
        </div>

        <figure aria-label={dashboard.label} className="mx-auto w-full min-w-0 max-w-md lg:mx-0">
          <div className="cursor-default overflow-hidden rounded-2xl border border-canvas/10 bg-ink-alt shadow-2xl transition-all duration-300 ease-out hover:border-accent hover:shadow-[0_0_30px_rgba(132,192,191,0.15),0_25px_50px_-12px_rgba(0,0,0,0.45)] motion-safe:hover:-translate-y-0.5">
            {/* Header: macOS-style dots, session path and live status pill. */}
            <div className="flex items-center justify-between gap-3 border-b border-canvas/10 px-4 py-3">
              <div className="flex min-w-0 items-center gap-2">
                <span aria-hidden="true" className="flex shrink-0 gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                <span className="truncate font-mono text-xs font-normal text-canvas/70">
                  {dashboard.session}
                </span>
              </div>
              <span className="shrink-0 rounded-md border border-accent/40 px-2 py-0.5 text-xs font-medium text-accent">
                {dashboard.status}
              </span>
            </div>

            <div className="px-4 pb-4">
              {/* Terminal block */}
              <pre className="mt-4 mb-4 whitespace-pre-wrap break-words rounded-lg bg-ink p-3 font-mono leading-relaxed">
                <code className="block space-y-1">
                  <span className="block text-sm font-semibold text-canvas">
                    {dashboard.prompt}
                  </span>
                  <span className="block text-xs font-normal text-canvas/60">
                    {dashboard.response}
                  </span>
                </code>
              </pre>

              {/* Live activity row */}
              <div className="my-2 flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-canvas/40">
                  {dashboard.activityLabel}
                </span>
                <span className="inline-flex items-center gap-2 text-xs text-accent">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-green-500 animate-pulse"
                  />
                  {dashboard.tournamentStatus}
                </span>
              </div>

              {/* Tournament card */}
              <div className="rounded-xl bg-surface/50 p-3">
                <div className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface text-accent"
                  >
                    <TrophyGlyph className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-canvas">
                      {dashboard.tournamentPrefix}{" "}
                      <span className="text-canvas">
                        {dashboard.tournamentName}
                      </span>
                    </p>
                    <p className="text-xs font-normal text-canvas/50">
                      {dashboard.tournamentSubtitle}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs font-normal text-canvas/40">
                    {dashboard.tournamentTime}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-accent/30 bg-accent/15 px-2 py-0.5 text-xs text-accent">
                    {dashboard.tags.frontend}
                  </span>
                  <span className="rounded-full bg-canvas/10 px-2 py-0.5 text-xs text-canvas/70">
                    {dashboard.tags.stack}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer: anti-form note and verified community badge. */}
            <div className="flex items-center justify-between gap-3 border-t border-canvas/10 px-4 py-3">
              <span className="text-xs text-canvas/60">{dashboard.footerNote}</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-canvas">
                <BoltGlyph className="h-3.5 w-3.5 text-accent" />
                {dashboard.footerVerified}
              </span>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
