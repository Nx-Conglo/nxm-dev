"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("nxm-theme", next);
    } catch {}
    setTheme(next);
  };

  return (
    <button type="button" className="pill theme-toggle" onClick={toggle}>
      {theme === "light" ? "Dark theme" : "Light theme"}
    </button>
  );
}
