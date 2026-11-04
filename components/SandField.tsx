"use client";

import { useEffect, useRef } from "react";

// A field of tiny sand grains drawn on one <canvas>.
// - Grains drift slowly along an invisible wind (a flow field).
// - Moving the pointer pushes grains away; they settle back afterwards.
// - A click/tap sends a splash outward.
// - Grain color comes from the CSS variables --grain / --grain-strength,
//   so it follows the dark/light theme automatically.

type Grain = { x: number; y: number; hx: number; hy: number; vx: number; vy: number; s: number };

const LEVELS = [0.22, 0.4, 0.6, 0.85]; // 4 brightness levels, drawn in 4 batches (fast)
const PUSH_RADIUS = 130;
const SPLASH_RADIUS = 300;

export default function SandField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let t = 0;
    let raf = 0;
    let rgb = "222, 208, 178";
    let strength = 1;
    let buckets: Grain[][] = LEVELS.map(() => []);
    const ptr = { x: -9999, y: -9999, on: false };

    const readTheme = () => {
      const cs = getComputedStyle(root);
      rgb = cs.getPropertyValue("--grain").trim() || rgb;
      strength = parseFloat(cs.getPropertyValue("--grain-strength")) || 1;
    };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(2400, Math.max(500, Math.floor((w * h) / 900)));
      buckets = LEVELS.map(() => []);
      for (let i = 0; i < count; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const g: Grain = { x, y, hx: x, hy: y, vx: 0, vy: 0, s: 0.8 + Math.random() * 1.2 };
        buckets[Math.floor(Math.random() * LEVELS.length)].push(g);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      buckets.forEach((list, b) => {
        ctx.fillStyle = `rgba(${rgb}, ${Math.min(1, LEVELS[b] * strength)})`;
        ctx.beginPath();
        for (const g of list) ctx.rect(g.x, g.y, g.s, g.s);
        ctx.fill();
      });
    };

    const step = () => {
      t += 0.003;
      const R2 = PUSH_RADIUS * PUSH_RADIUS;
      for (const list of buckets) {
        for (const g of list) {
          // the "wind": each grain's home spot drifts along a gentle flow field
          const a = (Math.sin(g.hx * 0.004 + t) + Math.cos(g.hy * 0.005 - t * 0.7)) * Math.PI * 0.5;
          g.hx += Math.cos(a) * 0.18;
          g.hy += Math.sin(a) * 0.18;
          if (g.hx < 0) { g.hx += w; g.x += w; } else if (g.hx > w) { g.hx -= w; g.x -= w; }
          if (g.hy < 0) { g.hy += h; g.y += h; } else if (g.hy > h) { g.hy -= h; g.y -= h; }

          // pull gently toward home
          g.vx += (g.hx - g.x) * 0.012;
          g.vy += (g.hy - g.y) * 0.012;

          // pointer pushes grains away
          if (ptr.on) {
            const dx = g.x - ptr.x;
            const dy = g.y - ptr.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < R2) {
              const d = Math.sqrt(d2) || 1;
              const f = (1 - d / PUSH_RADIUS) * 2.2;
              g.vx += (dx / d) * f;
              g.vy += (dy / d) * f;
            }
          }

          g.vx *= 0.9;
          g.vy *= 0.9;
          g.x += g.vx;
          g.y += g.vy;
        }
      }
    };

    const loop = () => {
      step();
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      ptr.x = e.clientX;
      ptr.y = e.clientY;
      ptr.on = true;
    };
    const onLeave = () => {
      ptr.on = false;
    };
    const onDown = (e: PointerEvent) => {
      if (reduce) return;
      for (const list of buckets) {
        for (const g of list) {
          const dx = g.x - e.clientX;
          const dy = g.y - e.clientY;
          const d = Math.hypot(dx, dy) || 1;
          if (d < SPLASH_RADIUS) {
            const f = (1 - d / SPLASH_RADIUS) * 14;
            g.vx += (dx / d) * f + (Math.random() - 0.5) * 2;
            g.vy += (dy / d) * f + (Math.random() - 0.5) * 2;
          }
        }
      }
    };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(loop);
    };
    let lastW = window.innerWidth;
    let lastH = window.innerHeight;
    const onResize = () => {
      // ignore small height changes (mobile address bar) so the sand isn't reshuffled
      if (window.innerWidth === lastW && Math.abs(window.innerHeight - lastH) < 150) return;
      lastW = window.innerWidth;
      lastH = window.innerHeight;
      build();
      if (reduce) draw();
    };

    // redraw when the theme is switched
    const observer = new MutationObserver(() => {
      readTheme();
      if (reduce) draw();
    });
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    readTheme();
    build();
    draw();
    if (!reduce) {
      raf = requestAnimationFrame(loop);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerdown", onDown);
      root.addEventListener("pointerleave", onLeave);
      window.addEventListener("pointerup", (e) => e.pointerType !== "mouse" && onLeave());
    }
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="sand" />;
}
