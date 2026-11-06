"use client";

import { useEffect, useRef } from "react";

// A grid of square "pixels" that flicker on like a HUD readout.
// - Random cells spark on and fade out (ambient data noise).
// - Moving the pointer lights up the cells around it.
// - A click/tap fires a burst.
// Color follows --grain / --grain-strength, so it matches the dark/light theme.
// All randomness runs inside useEffect (browser only), so it cannot cause hydration errors.

const CELL = 14;
const BINS = 6;
const POINTER_RADIUS = 120;
const BURST_RADIUS = 180;

export default function PixelField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let level = new Float32Array(0);
    let rgb = "192, 249, 75";
    let strength = 0.6;
    const bins: number[][] = Array.from({ length: BINS }, () => []);
    const ptr = { x: -9999, y: -9999, on: false };

    const readTheme = () => {
      const cs = getComputedStyle(root);
      rgb = cs.getPropertyValue("--grain").trim() || rgb;
      strength = parseFloat(cs.getPropertyValue("--grain-strength")) || strength;
    };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CELL);
      rows = Math.ceil(h / CELL);
      level = new Float32Array(cols * rows);
      for (let i = 0; i < level.length * 0.03; i++) {
        level[Math.floor(Math.random() * level.length)] = 0.3 + Math.random() * 0.4;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      bins.forEach((b) => (b.length = 0));
      for (let i = 0; i < level.length; i++) {
        const v = level[i];
        if (v > 0.04) bins[Math.min(BINS - 1, Math.floor(v * BINS))].push(i);
      }
      bins.forEach((list, b) => {
        if (!list.length) return;
        ctx.fillStyle = `rgba(${rgb}, ${(((b + 1) / BINS) * strength).toFixed(3)})`;
        ctx.beginPath();
        for (const i of list) {
          ctx.rect((i % cols) * CELL + 2, Math.floor(i / cols) * CELL + 2, CELL - 4, CELL - 4);
        }
        ctx.fill();
      });
    };

    const light = (cx: number, cy: number, radius: number, gain: number) => {
      const c0 = Math.max(0, Math.floor((cx - radius) / CELL));
      const c1 = Math.min(cols - 1, Math.floor((cx + radius) / CELL));
      const r0 = Math.max(0, Math.floor((cy - radius) / CELL));
      const r1 = Math.min(rows - 1, Math.floor((cy + radius) / CELL));
      for (let r = r0; r <= r1; r++) {
        for (let c = c0; c <= c1; c++) {
          const d = Math.hypot(c * CELL + CELL / 2 - cx, r * CELL + CELL / 2 - cy);
          if (d < radius) {
            const v = (1 - d / radius) * (gain - 0.4 + Math.random() * 0.4);
            const i = r * cols + c;
            if (v > level[i]) level[i] = v;
          }
        }
      }
    };

    const step = () => {
      for (let i = 0; i < level.length; i++) {
        level[i] = level[i] < 0.03 ? 0 : level[i] * 0.955;
      }
      const sparks = Math.max(2, Math.floor((w * h) / 200000));
      for (let k = 0; k < sparks; k++) {
        const i = Math.floor(Math.random() * level.length);
        if (level[i] < 0.3) level[i] = 0.35 + Math.random() * 0.35;
      }
      if (ptr.on) light(ptr.x, ptr.y, POINTER_RADIUS, 1);
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
    const onDown = (e: PointerEvent) => light(e.clientX, e.clientY, BURST_RADIUS, 1.3);
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") onLeave();
    };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(loop);
    };
    let lastW = window.innerWidth;
    let lastH = window.innerHeight;
    const onResize = () => {
      // ignore small height changes (mobile address bar)
      if (window.innerWidth === lastW && Math.abs(window.innerHeight - lastH) < 150) return;
      lastW = window.innerWidth;
      lastH = window.innerHeight;
      build();
      if (reduce) draw();
    };

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
      window.addEventListener("pointerup", onUp);
      root.addEventListener("pointerleave", onLeave);
    }
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="sand" />;
}
