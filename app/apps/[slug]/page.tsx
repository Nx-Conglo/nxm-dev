import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import AppDetail from "@/components/AppDetail";
import { apps, getApp } from "@/lib/apps";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return apps.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  return app ? { title: app.name, description: app.tagline } : {};
}

export default async function AppPage({ params }: Props) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <AppDetail app={app} others={apps.filter((a) => a.slug !== app.slug)} />
      </main>
    </>
  );
}
