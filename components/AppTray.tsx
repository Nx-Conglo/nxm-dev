"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { categories, type Category } from "@/lib/apps";
import AppIcon from "./AppIcon";

export default function AppTray() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Category | null>(null);

  const item = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 200, scale: 0.3 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 150, damping: 15 },
    },
  };

  return (
    <motion.section
      className="tray"
      aria-labelledby="tray-title"
      initial={reduce ? false : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduce ? 0 : 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 id="tray-title" className="tray-title">
        Categories
      </h2>

      <motion.ul
        className="tray-grid"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { delayChildren: reduce ? 0 : 1.4, staggerChildren: 0.08 } } }}
      >
        {categories.map((app) => (
          <motion.li key={app.slug} variants={item}>
            <Link
              href={`/apps/${app.slug}`}
              className="app"
              onMouseEnter={() => setActive(app)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(app)}
              onBlur={() => setActive(null)}
            >
              <motion.span
                className="app-icon"
                style={{ background: `linear-gradient(145deg, ${app.colors[0]}, ${app.colors[1]})` }}
                whileHover={reduce ? undefined : { y: -8, rotate: -3, scale: 1.07 }}
                whileTap={reduce ? undefined : { scale: 0.92 }}
                transition={{ type: "spring", stiffness: 320, damping: 16 }}
              >
                <AppIcon icon={app.icon} />
              </motion.span>
              <span className="app-name">{app.name}</span>
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      <p className="tray-caption" aria-live="polite">
        {active ? active.tagline : "Pick an app to see what it does."}
      </p>
    </motion.section>
  );
}
