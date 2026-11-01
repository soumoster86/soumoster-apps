import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppCard } from "@/components/apps/app-card";
import { FeatureGrid } from "@/components/apps/feature-grid";
import { LockScreen } from "@/components/apps/lock-screen";
import { PhoneFrame } from "@/components/apps/phone-frame";
import { PlayBadge } from "@/components/apps/play-badge";
import { PrivacyFacts } from "@/components/apps/privacy-facts";
import { ScreenshotRail } from "@/components/apps/screenshot-rail";
import { StatusBadge } from "@/components/apps/status-badge";
import { Markdown } from "@/components/content/markdown";
import { SITE_URL } from "@/lib/constants";
import { getApp, getApps } from "@/lib/content";
import { appThemeStyle, storeLink } from "@/lib/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  const apps = await getApps();
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const app = await getApp(slug);
  if (!app) return {};
  const description = `${app.name}: ${app.tagline} An Android app from SouMoster, with no account and no ads.`;
  return {
    title: app.name,
    description,
    alternates: { canonical: `/apps/${app.slug}` },
    openGraph: { title: app.name, description, url: `/apps/${app.slug}` },
  };
}

export default async function AppDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = await getApp(slug);
  if (!app) notFound();

  const others = (await getApps()).filter((item) => item.slug !== app.slug);
  const store = storeLink(app);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.tagline,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Android",
    url: `${SITE_URL}/apps/${app.slug}`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@type": "Organization", name: "SouMoster", url: SITE_URL },
    ...(store ? { downloadUrl: store.href } : {}),
    ...(app.version ? { softwareVersion: app.version } : {}),
  };

  return (
    <article style={appThemeStyle(app)} className="app-theme">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative overflow-hidden pt-28 pb-12">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 80% 20%, color-mix(in srgb, var(--app) 28%, transparent), transparent 55%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div>
            <p className="eyebrow">{app.category}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <h1 className="headline text-4xl sm:text-6xl">{app.name}</h1>
              <StatusBadge status={app.status} />
            </div>
            <p className="mt-4 max-w-xl text-lg text-muted">{app.tagline}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {store ? <PlayBadge href={store.href} label={store.label} /> : null}
              {app.privacyPolicy ? (
                <Link href={`/apps/${app.slug}/privacy`} className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
                  Privacy policy
                </Link>
              ) : null}
            </div>
          </div>
          <div className="mx-auto" aria-hidden="true">
            <PhoneFrame size="lg">
              <LockScreen app={app} />
            </PhoneFrame>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-4 py-8 sm:px-6 lg:px-8">
        {app.status !== "coming-soon" ? <ScreenshotRail app={app} /> : null}
        {app.bodyHtml ? (
          <section aria-labelledby="about-app-title">
            <h2 id="about-app-title" className="headline text-3xl">
              About {app.name}
            </h2>
            <div className="mt-4 max-w-3xl">
              <Markdown html={app.bodyHtml} />
            </div>
          </section>
        ) : null}
        {app.features.length > 0 ? <FeatureGrid features={app.features} /> : null}
        <PrivacyFacts app={app} />
        <section aria-labelledby="more-pockets-title">
          <h2 id="more-pockets-title" className="headline text-3xl">
            More Pockets
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((item) => (
              <li key={item.slug}>
                <AppCard app={item} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
