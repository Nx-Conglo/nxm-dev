import SiteHeader from "@/components/SiteHeader";
import Wordmark from "@/components/Wordmark";
import AppTray from "@/components/AppTray";
import Typewriter from "@/components/Typewriter";
import { SITE } from "@/lib/apps";

export default function Home() {
  return (
    <>
      <SiteHeader home />
      <main className="hero">
        <Wordmark />
        <Typewriter text={SITE.tagline} />
        <AppTray />
      </main>
    </>
  );
}