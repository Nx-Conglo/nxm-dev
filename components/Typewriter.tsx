"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Typewriter({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const [chars, setChars] = useState<string[]>([]);

  useEffect(() => {
    if (reduce) {
      setChars(text.split(""));
      return;
    }

    let i = 0;
    const timer = setInterval(() => {
      setChars(text.slice(0, i + 1).split(""));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, 60); // Fast, mechanical typing speed

    return () => clearInterval(timer);
  }, [text, reduce]);

  return (
    <div className="builder-container">
      <p className="tagline-text">
        {chars.map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: -4, filter: "brightness(2) drop-shadow(0 0 4px var(--sun))" }}
            animate={{ opacity: 1, y: 0, filter: "brightness(1) drop-shadow(0 0 0px transparent)" }}
            transition={{ duration: 0.15 }}
            className="char"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
        {/* The neon terminal cursor */}
        {!reduce && chars.length < text.length && (
          <motion.span
            className="terminal-cursor"
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          />
        )}
      </p>
    </div>
  );
}