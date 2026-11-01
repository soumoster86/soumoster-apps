import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/content/markdown";
import { SUPPORT_EMAIL } from "@/lib/constants";
import { getApp, getApps, getPolicy } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  const apps = await getApps();
  return apps.filter((app) => app.privacyPolicy).map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const app = await getApp(slug);
  if (!app) return {};
  const description = `Privacy policy for ${app.name}, an Android app by SouMoster.`;
  return {
    title: `${app.name} privacy policy`,
    description,
    alternates: { canonical: `/apps/${app.slug}/privacy` },
  };
}

export default async function AppPrivacyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = await getApp(slug);
  if (!app || !app.privacyPolicy) notFound();
  const policy = await getPolicy(app);

  return (
    <article className="mx-auto max-w-3xl px-4 pt-28 pb-20 sm:px-6">
      <p className="eyebrow">Privacy policy</p>
      <h1 className="headline mt-3 text-4xl sm:text-5xl">{app.name}</h1>
      <p className="mt-3 text-sm text-muted">Last updated {formatDate(policy.updated)}</p>
      <div className="mt-8">
        <Markdown html={policy.html} />
      </div>
      <p className="mt-10 text-sm text-muted">
        Questions: <a className="text-primary" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        {" · "}
        <Link href={`/apps/${app.slug}`} className="text-primary">
          Back to {app.name}
        </Link>
        {" · "}
        <Link href="/privacy" className="text-primary">
          Website privacy
        </Link>
      </p>
    </article>
  );
}
