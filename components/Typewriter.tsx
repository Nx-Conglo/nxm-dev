"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Terminal-style typing. Fully deterministic (no Math.random), so SSR and the
// browser always agree: the first render shows 0 characters on both sides.
export default function Typewriter({
  text,
  startDelay = 900,
  speed = 40,
  className = "",
}: {
  text: string;
  startDelay?: number;
  speed?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) {
      setCount(text.length);
      return;
    }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setCount(i);
      // slightly uneven rhythm, but computed from the index (not random)
      if (i < text.length) timer = setTimeout(tick, speed + ((i * 7) % 5) * 12);
    };
    timer = setTimeout(tick, startDelay);
    return () => clearTimeout(timer);
  }, [text, startDelay, speed, reduce]);

  return (
    <p className={`typewriter ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text
          .slice(0, count)
          .split("")
          .map((c, i) => (
            <span key={i} className="tw-char">
              {c}
            </span>
          ))}
        <span className={`tw-cursor${count >= text.length ? " idle" : ""}`} />
        <span className="tw-rest">{text.slice(count)}</span>
      </span>
    </p>
  );
}
