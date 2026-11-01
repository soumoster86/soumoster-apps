import type { Metadata } from "next";
import { Suspense } from "react";
import { Catalogue } from "@/components/apps/catalogue";
import { AppTicker } from "@/components/home/app-ticker";
import { Hero } from "@/components/home/hero";
import { Pillars } from "@/components/home/pillars";
import { Spotlight } from "@/components/home/spotlight";
import { StatStrip } from "@/components/home/stat-strip";
import { Reveal } from "@/components/shared/reveal";
import { getApps } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const apps = await getApps();
  const spotlight = apps.find((app) => app.spotlight) ?? null;
  const live = apps.filter((app) => app.status === "live").length;
  const testing = apps.filter((app) => app.status === "closed-test").length;

  return (
    <>
      <Hero apps={apps} />
      <AppTicker apps={apps} />
      <StatStrip
        stats={[
          { label: "Apps live", value: live },
          { label: "Apps in testing", value: testing },
          { label: "Accounts needed", value: 0 },
          { label: "Ads", value: 0 },
        ]}
      />
      <Reveal>
        <section id="pocket-family" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="family-title">
          <h2 id="family-title" className="headline text-3xl sm:text-4xl">
            The Pocket family
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Four offline tools, each with its own accent. Filter by what they hold.
          </p>
          <div className="mt-8">
            <Suspense fallback={<p className="text-muted">Loading the catalogue…</p>}>
              <Catalogue apps={apps} />
            </Suspense>
          </div>
        </section>
      </Reveal>
      {spotlight ? (
        <Reveal>
          <Spotlight app={spotlight} />
        </Reveal>
      ) : null}
      <Reveal>
        <Pillars />
      </Reveal>
    </>
  );
}
