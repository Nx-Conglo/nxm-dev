import SiteHeader from "@/components/SiteHeader";
import Wordmark from "@/components/Wordmark";
import Typewriter from "@/components/Typewriter";
import AppTray from "@/components/AppTray";
import { SITE } from "@/lib/apps";

export default function Home() {
  return (
    <>
      <SiteHeader home />
      <main className="hero">
        <Wordmark />
        <Typewriter text={SITE.tagline} className="tagline" />
        <AppTray />
      </main>
    </>
  );
}
