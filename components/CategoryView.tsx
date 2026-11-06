"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { AppEntry, Category } from "@/lib/apps";
import AppIcon from "./AppIcon";

const grad = (c: [string, string]) => `linear-gradient(145deg, ${c[0]}, ${c[1]})`;

export default function CategoryView({ category, apps }: { category: Category; apps: AppEntry[] }) {
  const reduce = useReducedMotion();

  return (
    <section className="detail" style={{ ["--c1" as string]: category.colors[0] }}>
      <div className="detail-hero">
        <motion.span
          className="app-icon big hud"
          initial={reduce ? false : { scale: 0.4, rotate: -14, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
        >
          <AppIcon icon={category.icon} />
        </motion.span>
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1>{category.name}</h1>
          <p className="lede">{category.tagline}</p>
        </motion.div>
      </div>

      {apps.length === 0 ? (
        <p className="empty">Nothing here yet. Soon.</p>
      ) : (
        <motion.ul
          className="app-grid"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { delayChildren: reduce ? 0 : 0.35, staggerChildren: 0.08 } } }}
        >
          {apps.map((app) => (
            <motion.li
              key={app.name}
              variants={{
                hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 30, scale: 0.9 },
                show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 240, damping: 20 } },
              }}
            >
              <a className="app-tile" href={app.href} target="_blank" rel="noopener noreferrer">
                <motion.span
                  className="app-icon"
                  style={{ background: grad(app.colors) }}
                  whileHover={reduce ? undefined : { y: -6, scale: 1.05 }}
                  whileTap={reduce ? undefined : { scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 320, damping: 16 }}
                >
                  {app.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={app.logo} alt="" />
                  ) : (
                    <AppIcon icon={app.icon} />
                  )}
                </motion.span>
                <span className="app-name">{app.name}</span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </section>
  );
}
