export const SITE = {
  name: "NxM Dev",
  tagline: "Built for the community",
  email: "hello@nxmdev.com",
};

export type IconKey = "web" | "mobile" | "design" | "cloud" | "ai" | "care";

// What the categories look like on the home page
export type Category = {
  slug: string;
  name: string;
  tagline: string;
  colors: [string, string];
  icon: IconKey;
};

// What the actual apps look like inside a category
export type AppItem = {
  name: string;
  href: string;
  logo?: string;
  colors: [string, string];
  icon: IconKey;
};

export const categories: Category[] = [
  { slug: "web", name: "Web", tagline: "Websites and web apps.", colors: ["#7C5CFF", "#4B8BFF"], icon: "web" },
  { slug: "mobile", name: "Mobile", tagline: "iOS and Android apps.", colors: ["#FF5C8A", "#FF8E5C"], icon: "mobile" },
  { slug: "design", name: "Design", tagline: "Interfaces and branding.", colors: ["#FFC857", "#FF9F43"], icon: "design" },
  { slug: "cloud", name: "Cloud", tagline: "Backends and APIs.", colors: ["#2EE6D6", "#20A4F3"], icon: "cloud" },
  { slug: "ai", name: "AI", tagline: "Smart tools and automation.", colors: ["#B07CFF", "#FF5C8A"], icon: "ai" },
  { slug: "care", name: "Care", tagline: "Maintenance and support.", colors: ["#3DDC97", "#2EE6D6"], icon: "care" },
];

// Put your actual apps in here, mapped to the category slug
export const appsByCategory: Record<string, AppItem[]> = {
  web: [   { name: "App for test", href: "https://github.com", colors: ["#010005", "#e7e7e7"], icon: "web" },
    // Example: { name: "My Site", href: "https://example.com", colors: ["#000", "#333"], icon: "web" }
  ],
  mobile: [],
  design: [],
  cloud: [],
  ai: [],
  care: [],
};

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);