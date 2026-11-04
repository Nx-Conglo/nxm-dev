import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import AppIcon from "@/components/AppIcon";
import { categories, getCategory, appsByCategory } from "@/lib/apps";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  return category ? { title: category.name } : {};
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = appsByCategory[slug] || [];

  return (
    <>
      <SiteHeader />
      <main className="detail">
        <div className="detail-hero">
          <span
            className="app-icon big"
            style={{ background: `linear-gradient(145deg, ${category.colors[0]}, ${category.colors[1]})` }}
          >
            <AppIcon icon={category.icon} />
          </span>
          <div>
            <h1 className="page-title">{category.name}</h1>
            <p className="lede">{category.tagline}</p>
          </div>
        </div>

        {items.length === 0 ? (
          <p style={{ color: "var(--mute)", marginTop: "40px", fontSize: "1.1rem" }}>
            Nothing here yet. Soon.
          </p>
        ) : (
          <div className="category-grid" style={{ marginTop: "40px", maxWidth: "600px" }}>
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="app"
              >
                <span
                  className="app-icon"
                  style={{ background: `linear-gradient(145deg, ${item.colors[0]}, ${item.colors[1]})` }}
                >
                  {item.logo ? <img src={item.logo} alt="" /> : <AppIcon icon={item.icon} />}
                </span>
                <span className="app-name">{item.name}</span>
              </a>
            ))}
          </div>
        )}
      </main>
    </>
  );
}