"use client";

import { useEffect, useState } from "react";

// "Hacker" text helpers. The first render is always the same placeholder (dots),
// and all random characters are generated after mount, so SSR never disagrees.

const GLYPHS = "01<>/\\{}[]#$%&*+=-_:;ABCDEF";
const rnd = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

// Text that flickers as random characters until `reveal` turns true,
// then decodes left to right into the real text.
export function Scramble({ text, reveal, instant = false }: { text: string; reveal: boolean; instant?: boolean }) {
  const [out, setOut] = useState(() => text.replace(/\S/g, "·"));

  useEffect(() => {
    if (instant) {
      setOut(text);
      return;
    }
    let f = 0;
    const id = setInterval(() => {
      f += 1;
      setOut(
        text
          .split("")
          .map((c, i) => (c === " " ? " " : reveal && f > i * 2 + 2 ? c : rnd()))
          .join("")
      );
      if (reveal && f > text.length * 2 + 3) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, [text, reveal, instant]);

  return <>{out}</>;
}

// A small block of flowing characters, shown inside a tile until its module is generated.
export function TileNoise() {
  const [out, setOut] = useState(() => Array(6).fill("·······").join("\n"));

  useEffect(() => {
    const id = setInterval(() => {
      let s = "";
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 7; c++) s += rnd();
        if (r < 5) s += "\n";
      }
      setOut(s);
    }, 80);
    return () => clearInterval(id);
  }, []);

  return <span className="tile-ascii">{out}</span>;
}
