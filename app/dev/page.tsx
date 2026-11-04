import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Dev",
  description: "Tools, experiments, and notes.",
};

export default function DevPage() {
  return (
    <>
      <SiteHeader />
      <main className="detail">
        <h1 className="page-title">Dev</h1>
        <p className="lede">Tools, experiments, and notes go here.</p>
      </main>
    </>
  );
}