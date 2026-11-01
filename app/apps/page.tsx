import type { Metadata } from "next";
import { Suspense } from "react";
import { Catalogue } from "@/components/apps/catalogue";
import { getApps } from "@/lib/content";

export const metadata: Metadata = {
  title: "All apps",
  description: "Every SouMoster Pocket app: documents, media and notes, offline, with no account and no ads.",
  alternates: { canonical: "/apps" },
};

export default async function AppsPage() {
  const apps = await getApps();

  return (
    <section className="mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
      <p className="eyebrow">Catalogue</p>
      <h1 className="headline mt-3 text-4xl sm:text-5xl">All apps</h1>
      <p className="mt-4 max-w-2xl text-muted">
        The full Pocket family, including anything still on the way.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-muted">Loading the catalogue…</p>}>
          <Catalogue apps={apps} />
        </Suspense>
      </div>
    </section>
  );
}
