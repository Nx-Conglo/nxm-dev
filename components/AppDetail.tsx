"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SITE, type App } from "@/lib/apps";
import AppIcon from "./AppIcon";

export default function AppDetail({ app, others }: { app: App; others: App[] }) {
  const reduce = useReducedMotion();
  const grad = `linear-gradient(145deg, ${app.colors[0]}, ${app.colors[1]})`;

  return (
    <article className="detail" style={{ ["--c1" as string]: app.colors[0] }}>
      <div className="detail-hero">
        <motion.span
          className="app-icon big"
          style={{ background: grad }}
          initial={reduce ? false : { scale: 0.4, rotate: -14, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
        >
          <AppIcon icon={app.icon} />
        </motion.span>
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1>{app.name}</h1>
          <p className="lede">{app.tagline}</p>
        </motion.div>
      </div>

      <p className="body-copy">{app.description}</p>

      <motion.ul
        className="features"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { delayChildren: reduce ? 0 : 0.4, staggerChildren: 0.1 } } }}
      >
        {app.features.map((f) => (
          <motion.li
            key={f.title}
            className="feature"
            variants={{
              hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
            }}
          >
            <h2>{f.title}</h2>
            <p>{f.text}</p>
          </motion.li>
        ))}
      </motion.ul>

      <a className="btn" href={`mailto:${SITE.email}?subject=${encodeURIComponent(app.name + " project")}`}>
        Start a {app.name} project
      </a>

      <section className="more" aria-labelledby="more-title">
        <h2 id="more-title">More apps</h2>
        <ul>
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/apps/${o.slug}`} className="more-link">
                <span
                  className="app-icon small"
                  style={{ background: `linear-gradient(145deg, ${o.colors[0]}, ${o.colors[1]})` }}
                >
                  <AppIcon icon={o.icon} />
                </span>
                {o.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
