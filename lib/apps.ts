// ─────────────────────────────────────────────────────────────
// EDIT THIS FILE to change your apps/services.
// Every app here automatically gets an icon on the home page
// AND its own page at /apps/<slug>. No other file needs to change.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: "NxM Dev",
  tagline: "Apps and websites, built to be used by everyone.",
  email: "hello@nxmdev.com", // ← replace with your real email
};

export type IconKey = "web" | "mobile" | "design" | "cloud" | "ai" | "care";

export type App = {
  slug: string;
  name: string;
  tagline: string; // shown under the tray on hover
  description: string; // shown on the app's own page
  features: { title: string; text: string }[];
  colors: [string, string]; // icon gradient
  icon: IconKey;
};

export const apps: App[] = [
  {
    slug: "web",
    name: "Web",
    tagline: "Fast, clear websites that work on any screen.",
    description:
      "Websites and web apps that load quickly, read easily and feel good to use, whether your visitor is 16 or 66.",
    features: [
      { title: "Business sites", text: "Pages that explain what you do and make it easy to get in touch." },
      { title: "Web apps", text: "Dashboards, booking tools and portals your team can rely on." },
      { title: "Speed and search", text: "Built to load fast and be found on Google." },
    ],
    colors: ["#7C5CFF", "#4B8BFF"],
    icon: "web",
  },
  {
    slug: "mobile",
    name: "Mobile",
    tagline: "Apps for the phone in everyone's pocket.",
    description:
      "Mobile apps for iPhone and Android with simple screens, big tap targets and smooth motion.",
    features: [
      { title: "iOS and Android", text: "One idea, delivered on both platforms." },
      { title: "Easy to learn", text: "Interfaces that need no manual." },
      { title: "Always improving", text: "Updates and fixes after launch." },
    ],
    colors: ["#FF5C8A", "#FF8E5C"],
    icon: "mobile",
  },
  {
    slug: "design",
    name: "Design",
    tagline: "Interfaces people understand at a glance.",
    description:
      "Product design that starts with the people using it. We sketch, test and refine until it feels obvious.",
    features: [
      { title: "UI and UX", text: "Layouts, flows and clickable prototypes." },
      { title: "Brand look", text: "Colors, type and logos that stay consistent." },
      { title: "Motion", text: "Animation that guides the eye without getting in the way." },
    ],
    colors: ["#FFC857", "#FF9F43"],
    icon: "design",
  },
  {
    slug: "cloud",
    name: "Cloud",
    tagline: "Backends and APIs that keep everything running.",
    description:
      "The behind-the-scenes systems: databases, APIs and hosting that stay fast and secure as you grow.",
    features: [
      { title: "APIs", text: "Clean connections between your apps and services." },
      { title: "Hosting", text: "Reliable deployment with backups." },
      { title: "Security", text: "Sensible defaults and regular updates." },
    ],
    colors: ["#2EE6D6", "#20A4F3"],
    icon: "cloud",
  },
  {
    slug: "ai",
    name: "AI",
    tagline: "Smart tools that save you hours.",
    description:
      "Practical AI features: chat helpers, document tools and automation that fit into the way you already work.",
    features: [
      { title: "Assistants", text: "Chat tools that answer your customers' questions." },
      { title: "Automation", text: "Repetitive tasks handled for you." },
      { title: "Your data", text: "Built around your own content and rules." },
    ],
    colors: ["#B07CFF", "#FF5C8A"],
    icon: "ai",
  },
  {
    slug: "care",
    name: "Care",
    tagline: "We keep your product healthy after launch.",
    description:
      "Maintenance and support plans so your site or app stays up to date, secure and quick.",
    features: [
      { title: "Monitoring", text: "We notice problems before your users do." },
      { title: "Updates", text: "Dependencies and content kept current." },
      { title: "Support", text: "A real person to ask when you need help." },
    ],
    colors: ["#3DDC97", "#2EE6D6"],
    icon: "care",
  },
];

export const getApp = (slug: string) => apps.find((a) => a.slug === slug);
