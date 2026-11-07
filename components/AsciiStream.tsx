"use client";

import { useEffect, useState } from "react";
import { categories } from "@/lib/apps";

// Scrolling "data stream" behind the module tiles while they are being generated.
// Each time a module finishes, a "module/<name> ... OK" line scrolls in.

const SET = "01ABCDEF<>/\\|{}[]#$%&*+=-_:;";
const LINES = 10;
const WIDTH = 150;

const makeLine = () => {
  let s = "";
  for (let i = 0; i < WIDTH; i++) s += i % 9 === 8 ? " " : SET[Math.floor(Math.random() * SET.length)];
  return s;
};

export default function AsciiStream({ count, done }: { count: number; done: boolean }) {
  const [lines, setLines] = useState<string[]>(() => Array(LINES).fill(""));

  useEffect(() => {
    if (done) return;
    const id = setInterval(() => setLines((l) => [...l.slice(1), makeLine()]), 70);
    return () => clearInterval(id);
  }, [done]);

  useEffect(() => {
    if (count > 0 && categories[count - 1]) {
      const name = categories[count - 1].slug;
      setLines((l) => [...l.slice(1), `> module/${name} .......... OK`]);
    }
  }, [count]);

  return (
    <pre className={`ascii-stream${done ? " done" : ""}`} aria-hidden="true">
      {lines.join("\n")}
    </pre>
  );
}
