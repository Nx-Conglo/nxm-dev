import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="detail">
        <h1>Page not found</h1>
        <p className="lede">That page doesn't exist. Head back and pick an app.</p>
        <Link href="/" className="btn">
          Back to home
        </Link>
      </main>
    </>
  );
}
