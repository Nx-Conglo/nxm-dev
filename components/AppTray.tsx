"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { categories, type Category } from "@/lib/apps";
import AppIcon from "./AppIcon";
import { Scramble, TileNoise } from "./Scramble";

// Only the module icons and names are "encrypted": they start as flowing characters
// and decode one module at a time. The rest of the panel stays clean.
const START = 2600; // ms before decoding starts (after the title has rolled in)
const EVERY = 380; // ms between modules

export default function AppTray() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Category | null>(null);
  const [count, setCount] = useState(0); // how many modules are decoded so far
  const total = categories.length;

  useEffect(() => {
    if (reduce) {
      setCount(total);
      return;
    }
    let n = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      n += 1;
      setCount(n);
      if (n < total) timer = setTimeout(tick, EVERY);
    };
    timer = setTimeout(tick, START);
    return () => clearTimeout(timer);
  }, [reduce, total]);

  return (
    <motion.section
      className="tray"
      aria-labelledby="tray-title"
      initial={reduce ? false : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduce ? 0 : 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="tray-head">
        <h2 id="tray-title" className="tray-title">
          Categories
        </h2>
        <span className="tray-meta">{String(total).padStart(2, "0")} modules online</span>
      </div>

      <ul className="tray-grid">
        {categories.map((c, i) => {
          const shown = count > i;
          return (
            <li key={c.slug}>
              <Link
                href={`/apps/${c.slug}`}
                className="app"
                aria-label={c.name}
                onMouseEnter={() => setActive(c)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(c)}
                onBlur={() => setActive(null)}
              >
                <motion.span
                  className="app-icon hud"
                  whileHover={reduce ? undefined : { y: -8, rotate: -3, scale: 1.07 }}
                  whileTap={reduce ? undefined : { scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 320, damping: 16 }}
                >
                  {shown ? (
                    <motion.span
                      key="icon"
                      className="tile-inner"
                      initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 16 }}
                    >
                      <AppIcon icon={c.icon} />
                    </motion.span>
                  ) : (
                    <TileNoise />
                  )}
                </motion.span>
                <span className="app-name" aria-hidden="true">
                  <Scramble text={c.name} reveal={shown} instant={!!reduce} />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <p className={`tray-caption${active ? " on" : ""}`} aria-live="polite">
        {active ? active.tagline : "Select a module"}
      </p>
    </motion.section>
  );
}
