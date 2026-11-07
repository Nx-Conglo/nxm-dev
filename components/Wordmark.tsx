"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const ACCENTS = Array(6).fill("var(--accent-ink)"); // lime in dark, deep green in light

// Each letter starts as a pixel "X" (the "encrypted" look from the reference video),
// then its slot rolls like a reel and lands on the real letter.
const FILLER = ["0", "1", "#", "$", "%", "&", "/", "@"];
const REEL = 9; // 8 filler items + the real letter
const ROLL_START = 0.7; // seconds before the first letter starts rolling
const ROLL_STAGGER = 0.18; // seconds between letters
const ROLL_TIME = 1.2; // seconds each roll takes

function XGlyph() {
  return (
    <span className="x-glyph" aria-hidden="true">
      {(
        [
          [1, 1],
          [3, 1],
          [2, 2],
          [1, 3],
          [3, 3],
        ] as const
      ).map(([c, r], i) => (
        <i key={i} style={{ gridColumn: c, gridRow: r }} />
      ))}
    </span>
  );
}

function Letter({
  char,
  index,
  accent,
  mx,
  my,
  interactive,
}: {
  char: string;
  index: number;
  accent: string;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  interactive: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const near = useMotionValue(0); // 0 = far away, 1 = pointer is on the letter
  const [rolled, setRolled] = useState(false);

  useEffect(() => {
    if (!interactive) setRolled(true); // reduced motion: show the letters right away
  }, [interactive]);

  useEffect(() => {
    if (!interactive) return;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const d = Math.hypot(mx.get() - (r.left + r.width / 2), my.get() - (r.top + r.height / 2));
      near.set(Math.max(0, 1 - d / 260));
    };
    const a = mx.on("change", update);
    const b = my.on("change", update);
    return () => {
      a();
      b();
    };
  }, [interactive, mx, my, near]);

  const spring = { stiffness: 220, damping: 16, mass: 0.6 };
  const y = useSpring(useTransform(near, [0, 1], [0, -22]), spring);
  const scale = useSpring(useTransform(near, [0, 1], [1, 1.12]), spring);
  const rotate = useSpring(useTransform(near, [0, 1], [0, -5]), spring);
  // blends from the theme's text color (--fg) to this letter's accent
  const color = useTransform(
    near,
    (v) => `color-mix(in srgb, ${accent} ${Math.round(v * 100)}%, var(--fg))`
  );

  return (
    <motion.span
      className="letter-wrap"
      initial={interactive ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
    >
      <span className={`slot${rolled ? "" : " rolling"}`}>
        {/* the real letter: sets the slot width, stays hidden until the roll ends */}
        <motion.span
          ref={ref}
          className={`letter${rolled ? "" : " pending"}`}
          style={interactive ? { y, scale, rotate, color } : undefined}
        >
          {char}
        </motion.span>

        {!rolled && (
          <motion.span
            className="reel"
            aria-hidden="true"
            initial={{ y: "0%" }}
            animate={{ y: `-${((REEL - 1) / REEL) * 100}%` }}
            transition={{ delay: ROLL_START + index * ROLL_STAGGER, duration: ROLL_TIME, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => setRolled(true)}
          >
            {Array.from({ length: REEL - 1 }, (_, k) => (
              <span key={k} className="reel-item">
                {k % 2 === 0 ? <XGlyph /> : FILLER[(index + k) % FILLER.length]}
              </span>
            ))}
            <span className="reel-item final">{char}</span>
          </motion.span>
        )}
      </span>
    </motion.span>
  );
}

export default function Wordmark() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);

  useEffect(() => {
    if (reduce) return;
    const move = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    const leave = () => {
      mx.set(-9999);
      my.set(-9999);
    };
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [reduce, mx, my]);

  const words = ["NxM", "Dev"];
  let i = 0;

  return (
    <h1 className="wordmark" aria-label="NxM Dev">
      {words.map((w) => (
        <span className="word" key={w} aria-hidden="true">
          {w.split("").map((c) => {
            const idx = i++;
            return (
              <Letter
                key={idx}
                char={c}
                index={idx}
                accent={ACCENTS[idx % ACCENTS.length]}
                mx={mx}
                my={my}
                interactive={!reduce}
              />
            );
          })}
        </span>
      ))}
    </h1>
  );
}
