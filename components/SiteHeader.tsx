import Link from "next/link";
import { SITE } from "@/lib/apps";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader({ home = false }: { home?: boolean }) {
  return (
    <header className="site-header">
      {home ? (
        <span className="mini-logo" aria-hidden="true" />
      ) : (
        <Link href="/" className="mini-logo">
          {SITE.name}
        </Link>
      )}
      <nav aria-label="Main" className="nav">
        {!home && (
          <Link href="/" className="pill">
            Home
          </Link>
        )}
        <a href={`mailto:${SITE.email}`} className="pill">
          Contact us
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
