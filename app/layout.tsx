import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import Backdrop from "@/components/Backdrop";
import { SITE } from "@/lib/apps";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: { default: `${SITE.name}: ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.tagline,
};

export const viewport: Viewport = { themeColor: "#060607" };

// Runs before the page paints so the saved theme never flashes the wrong color.
const themeScript = `try{var t=localStorage.getItem("nxm-theme");document.documentElement.dataset.theme=t==="light"||t==="dark"?t:"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={manrope.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Backdrop />
        {children}
      </body>
    </html>
  );
}
