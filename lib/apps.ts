// ─────────────────────────────────────────────────────────────
// ALL CONTENT LIVES HERE.
//
//  • categories      → the 6 icons on the home page (each links to /apps/<slug>)
//  • appsByCategory  → the real apps/sites we've built, grouped by category slug
//
// To add an app: find its category slug in `appsByCategory` and add an object, e.g.
//
//   web: [
//     {
//       name: "My App",
//       href: "https://myapp.com",
//       logo: "/logos/myapp.png",   // optional: put the image in public/logos/
//       colors: ["#000", "#333"],
//       icon: "web",                // used when there is no logo
//     },
//   ],
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: "NxM Dev",
  tagline: "Apps, sites and tools we've built.",
  email: "hello@nxmdev.com", // ← replace, or remove the Contact button in SiteHeader.tsx
};

export type IconKey = "web" | "mobile" | "design" | "cloud" | "ai" | "care";

export type Category = {
  slug: string;
  name: string;
  tagline: string; // shown under the tray on hover and on the category page
  colors: [string, string]; // icon gradient
  icon: IconKey;
};

export type AppEntry = {
  name: string;
  href: string; // where the tile links to (opens in a new tab)
  logo?: string; // e.g. "/logos/myapp.png"; falls back to the icon below
  colors: [string, string];
  icon: IconKey;
};

export const categories: Category[] = [
  { slug: "web", name: "Web", tagline: "Websites and web apps we've built.", colors: ["#7C5CFF", "#4B8BFF"], icon: "web" },
  { slug: "mobile", name: "Mobile", tagline: "Apps for iPhone and Android.", colors: ["#FF5C8A", "#FF8E5C"], icon: "mobile" },
  { slug: "design", name: "Design", tagline: "Interfaces, brands and visuals.", colors: ["#FFC857", "#FF9F43"], icon: "design" },
  { slug: "cloud", name: "Cloud", tagline: "Backends, APIs and infrastructure.", colors: ["#2EE6D6", "#20A4F3"], icon: "cloud" },
  { slug: "ai", name: "AI", tagline: "Experiments and tools powered by AI.", colors: ["#B07CFF", "#FF5C8A"], icon: "ai" },
  { slug: "care", name: "Care", tagline: "Tools that keep things running.", colors: ["#3DDC97", "#2EE6D6"], icon: "care" },
];

export const appsByCategory: Record<string, AppEntry[]> = {
  web: [],
  mobile: [],
  design: [],
  cloud: [],
  ai: [],
  care: [],
};

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
