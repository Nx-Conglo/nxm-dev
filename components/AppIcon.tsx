import type { ReactNode } from "react";
import type { IconKey } from "@/lib/apps";

const paths: Record<IconKey, ReactNode> = {
  web: (
    <>
      <rect x="8" y="12" width="48" height="40" rx="8" />
      <path d="M8 24h48" />
      <circle cx="16" cy="18" r="1" />
      <circle cx="23" cy="18" r="1" />
    </>
  ),
  mobile: (
    <>
      <rect x="18" y="6" width="28" height="52" rx="8" />
      <path d="M28 49h8" />
    </>
  ),
  design: (
    <>
      <circle cx="25" cy="27" r="14" />
      <rect x="28" y="30" width="26" height="26" rx="7" />
    </>
  ),
  cloud: <path d="M20 46h26a10 10 0 0 0 1-20 15 15 0 0 0-29 2 9 9 0 0 0 2 18Z" />,
  ai: <path d="M32 8c2 16 8 22 24 24-16 2-22 8-24 24-2-16-8-22-24-24 16-2 22-8 24-24Z" />,
  care: (
    <>
      <path d="M32 8l20 8v16c0 12-8 20-20 26C20 52 12 44 12 32V16Z" />
      <path d="M23 32l7 7 12-14" />
    </>
  ),
};

export default function AppIcon({ icon }: { icon: IconKey }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[icon]}
    </svg>
  );
}
