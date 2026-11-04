"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { categories, type Category } from "@/lib/apps";
import AppIcon from "./AppIcon";

export default function AppTray() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Category | null>(null);

  const trayVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: reduce ? 0 : 2.0, // Wait for tagline to finish building
        staggerChildren: 0.1, // Pops out one by one
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 200, // Start way below the tray
      x: 0,
      scale: 0.3 
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        type: "spring" as const, // <--- THIS FIXES THE TYPESCRIPT ERROR
        stiffness: 250,
        damping: 15,
        mass: 1,
      },
    },
  };

  return (
    <motion.section
      className="tray"
      aria-labelledby="tray-title"
      initial={reduce ? false : "hidden"}
      animate="show"
      variants={trayVariants}
    >
      <h2 id="tray-title" className="tray-title">
        Explore
      </h2>

      <ul className="tray-grid">
        {categories.map((cat) => (
          <motion.li key={cat.slug} variants={itemVariants}>
            <Link
              href={`/apps/${cat.slug}`}
              className="app"
              onMouseEnter={() => setActive(cat)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(cat)}
              onBlur={() => setActive(null)}
            >
              <motion.span
                className="app-icon"
                style={{ background: `linear-gradient(145deg, ${cat.colors[0]}, ${cat.colors[1]})` }}
                whileHover={reduce ? undefined : { y: -8, rotate: -3, scale: 1.07 }}
                whileTap={reduce ? undefined : { scale: 0.92 }}
                transition={{ type: "spring", stiffness: 320, damping: 16 }}
              >
                <AppIcon icon={cat.icon} />
              </motion.span>
              <span className="app-name">{cat.name}</span>
            </Link>
          </motion.li>
        ))}
      </ul>

      <motion.p 
        className="tray-caption" 
        aria-live="polite"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 2.8 }}
      >
        {active ? active.tagline : "Pick a category to see our work."}
      </motion.p>
    </motion.section>
  );
}