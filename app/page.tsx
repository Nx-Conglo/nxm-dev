import SiteHeader from "@/components/SiteHeader";
import Wordmark from "@/components/Wordmark";
import AppTray from "@/components/AppTray";
import { SITE } from "@/lib/apps";

export default function Home() {
  return (
    <>
      <SiteHeader home />
      <main className="hero">
        <Wordmark />
        <p className="tagline">{SITE.tagline}</p>
        <AppTray />
      </main>
    </>
  );
}
