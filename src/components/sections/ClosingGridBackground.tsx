"use client";

/**
 * Animated background for the Closing section.
 * Local replica of the Hero's background (the Hero is intentionally left
 * untouched): a drifting teal CSS grid (`animate-grid`) with cursor parallax,
 * plus a canvas overlay that glows the nearest grid lines and expands ripples
 * on hover/click. Disabled for users who prefer reduced motion.
 */
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

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

export function ClosingGridBackground() {
  const gridRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Subtle parallax: the decorative grid drifts opposite to the cursor.
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

  // Canvas overlay: constant glow on the nearest grid lines + expanding ripples.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const section = gridRef.current?.closest("section");
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
    <>
      {/* Cuadrícula teal que deriva izquierda -> derecha (toolkit del proyecto). */}
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

      {/* Canvas: glow de las líneas cercanas + ondas en hover/click. */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-0",
          "[mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black,transparent)]",
          "[-webkit-mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black,transparent)]",
        )}
      />
    </>
  );
}
