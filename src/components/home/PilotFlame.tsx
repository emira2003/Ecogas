"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { siteConfig } from "@/data/site.config";
import { isPointerDevice, prefersReducedMotion, useReducedMotion } from "@/lib/motion";
import { UFO_EVENT } from "@/components/fun/UfoFlyby";

/** Easter egg: seven mouse clicks on the flame within ten seconds */
const EGG_CLICKS = 7;
const EGG_WINDOW_MS = 10_000;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  r: number;
}

const COUNT = 120;
const MAX_DPR = 1.5;

/** Pre-render a soft glowing dot so each particle is one drawImage, not one gradient. */
const makeSprite = (rgb: string) => {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, `rgba(${rgb},1)`);
  g.addColorStop(0.35, `rgba(${rgb},0.55)`);
  g.addColorStop(1, `rgba(${rgb},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return c;
};

/**
 * The pilot flame (F2-H1): ~120 particles on a 2D canvas, one requestAnimationFrame loop,
 * pixel ratio capped at 1.5, ~30fps on touch devices. Leans toward the pointer on desktop and
 * with device tilt on phones (only where no permission prompt is needed). Pauses off screen and
 * when the tab is hidden. With reduced motion it is a still SVG flame.
 */
export function PilotFlame({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clicks = useRef<number[]>([]);
  const reduced = useReducedMotion();

  // Easter egg counter: only real mouse clicks count, never touch, never scrolling
  const onPointerUp = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!siteConfig.easterEgg || e.pointerType !== "mouse") return;
    const now = Date.now();
    clicks.current = [...clicks.current.filter((t) => now - t < EGG_WINDOW_MS), now];
    if (clicks.current.length >= EGG_CLICKS) {
      clicks.current = [];
      window.dispatchEvent(new Event(UFO_EVENT));
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion()) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);
    let w = 0;
    let h = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const sprites = [makeSprite("255,214,140"), makeSprite("242,107,33"), makeSprite("194,80,15")];

    const particles: Particle[] = [];
    const spawn = (p: Particle) => {
      p.x = w / 2 + (Math.random() - 0.5) * w * 0.3;
      p.y = h * 0.9;
      p.vx = (Math.random() - 0.5) * 0.2;
      p.vy = -(0.7 + Math.random() * 1.1) * (h / 70);
      p.max = 26 + Math.random() * 24;
      p.life = p.max;
      p.r = (2.4 + Math.random() * 3.4) * (w / 48);
    };
    for (let i = 0; i < COUNT; i++) {
      const p: Particle = { x: 0, y: 0, vx: 0, vy: 0, life: 0, max: 0, r: 0 };
      spawn(p);
      p.life = Math.random() * p.max; // stagger so it doesn't start as one burst
      particles.push(p);
    }

    // Lean toward the pointer (desktop) or with device tilt (mobile, permission-free only)
    const mobile = !isPointerDevice();
    let lean = 0;
    let targetLean = 0;
    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      targetLean = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)));
    };
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma != null) targetLean = Math.max(-1, Math.min(1, e.gamma / 30));
    };
    if (!mobile) window.addEventListener("pointermove", onPointer, { passive: true });
    else if (typeof DeviceOrientationEvent !== "undefined" && !("requestPermission" in DeviceOrientationEvent)) {
      window.addEventListener("deviceorientation", onTilt, { passive: true });
    }

    let raf = 0;
    let visible = true;
    let tabVisible = document.visibilityState === "visible";
    let frame = 0;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible || !tabVisible) return;
      frame++;
      if (mobile && frame % 2) return; // ~30fps on phones

      lean += (targetLean - lean) * 0.08;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        p.life -= 1;
        if (p.life <= 0) spawn(p);
        const t = 1 - p.life / p.max; // 0 = just born, 1 = about to die
        p.x += p.vx + lean * 0.75 * t * (w / 48);
        p.y += p.vy;
        const r = p.r * (1 - t * 0.85);
        const sprite = t < 0.22 ? sprites[0] : t < 0.6 ? sprites[1] : sprites[2];
        ctx.globalAlpha = (1 - t) * 0.6;
        ctx.drawImage(sprite, p.x - r, p.y - r, r * 2, r * 2);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };
    raf = requestAnimationFrame(draw);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);
    const onVisibility = () => {
      tabVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("deviceorientation", onTilt);
    };
  }, []);

  if (reduced) return <StaticFlame className={className} />;
  return (
    <canvas
      ref={canvasRef}
      className={`pilot-flame ${siteConfig.easterEgg ? "pilot-flame--clickable" : ""} ${className}`.trim()}
      aria-hidden="true"
      onPointerUp={onPointerUp}
    />
  );
}

/** Still flame for reduced motion — same colours, no movement. */
function StaticFlame({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 72" className={`pilot-flame ${className}`.trim()} aria-hidden="true">
      <path
        d="M24 6c5 12 16 18 16 34a16 16 0 0 1-32 0c0-8 4-13 8-17 0 6 2 10 6 10 4-5 4-15 2-27z"
        fill="#f26b21"
      />
      <path d="M24 30c3 6 8 9 8 16a8 8 0 0 1-16 0c0-4 2-6 4-8 0 3 1 5 3 5 2-3 2-8 1-13z" fill="#ffd68c" />
    </svg>
  );
}
