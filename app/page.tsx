import type { Metadata } from "next";
import { Suspense } from "react";
import { Catalogue } from "@/components/apps/catalogue";
import { AppTicker } from "@/components/home/app-ticker";
import { Hero } from "@/components/home/hero";
import { Pillars } from "@/components/home/pillars";
import { Spotlight } from "@/components/home/spotlight";
import { TaskFinder } from "@/components/home/task-finder";
import { Reveal } from "@/components/shared/reveal";
import { getApps } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const apps = await getApps();
  const spotlight = apps.find((app) => app.spotlight) ?? null;

  return (
    <>
      <Hero apps={apps} />
      <AppTicker apps={apps} />
      <Reveal>
        <TaskFinder apps={apps} />
      </Reveal>
      <Reveal>
        <section id="pocket-family" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="family-title">
          <h2 id="family-title" className="headline text-3xl sm:text-4xl">
            The Pocket family
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Seven pocket tools, each with its own accent. Filter by what they hold.
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
