import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import CategoryView from "@/components/CategoryView";
import { appsByCategory, categories, getCategory } from "@/lib/apps";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  return category ? { title: category.name, description: category.tagline } : {};
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <CategoryView category={category} apps={appsByCategory[slug] ?? []} />
      </main>
    </>
  );
}
