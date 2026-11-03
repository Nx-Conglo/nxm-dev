"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const ACCENTS = ["#FF5C8A", "#2EE6D6", "#FFC857", "#7C5CFF", "#FF5C8A", "#2EE6D6"];

function Letter({
  char,
  accent,
  mx,
  my,
  interactive,
}: {
  char: string;
  accent: string;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  interactive: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const near = useMotionValue(0); // 0 = far away, 1 = pointer is on the letter

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
  const color = useTransform(near, [0, 1], ["#F6F4FF", accent]);

  return (
    <motion.span
      className="letter-wrap"
      variants={{
        hidden: { y: "55%", opacity: 0, filter: "blur(14px)" },
        show: {
          y: "0%",
          opacity: 1,
          filter: "blur(0px)",
          transition: { type: "spring", stiffness: 140, damping: 16 },
        },
      }}
    >
      <motion.span ref={ref} className="letter" style={interactive ? { y, scale, rotate, color } : undefined}>
        {char}
      </motion.span>
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
    <motion.h1
      className="wordmark"
      aria-label="NxM Dev"
      initial={reduce ? "show" : "hidden"}
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
    >
      {words.map((w) => (
        <span className="word" key={w} aria-hidden="true">
          {w.split("").map((c) => {
            const idx = i++;
            return (
              <Letter key={idx} char={c} accent={ACCENTS[idx % ACCENTS.length]} mx={mx} my={my} interactive={!reduce} />
            );
          })}
        </span>
      ))}
    </motion.h1>
  );
}
