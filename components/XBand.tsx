"use client";

import { motion, useReducedMotion } from "framer-motion";

// A row of pixel "X" marks built from square blocks, like the encrypted-password
// frame in the reference video. Blocks pop in one by one, then flicker slowly.
// Fully deterministic: the flicker timing comes from each block's index (--n).

const COUNT = 7;
// 3x3 checker X: four corners + center (column, row)
const CELLS = [
  [1, 1],
  [3, 1],
  [2, 2],
  [1, 3],
  [3, 3],
] as const;

export default function XBand({ delay = 0.2 }: { delay?: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="x-band"
      aria-hidden="true"
      initial={reduce ? false : "hidden"}
      animate="show"
      variants={{ show: { transition: { delayChildren: delay, staggerChildren: 0.07 } } }}
    >
      {Array.from({ length: COUNT }, (_, xi) => (
        <motion.span key={xi} className="x-mark" variants={{ show: { transition: { staggerChildren: 0.035 } } }}>
          {CELLS.map(([c, r], ci) => (
            <motion.i
              key={ci}
              style={{ gridColumn: c, gridRow: r, "--n": xi * 5 + ci } as React.CSSProperties}
              variants={{
                hidden: { opacity: 0, scale: 0 },
                show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 18 } },
              }}
            />
          ))}
        </motion.span>
      ))}
    </motion.div>
  );
}
