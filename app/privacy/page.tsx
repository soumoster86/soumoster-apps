import type { Metadata } from "next";
import { Markdown } from "@/components/content/markdown";
import { getPage } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("privacy");
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: "/privacy" },
  };
}

export default async function StudioPrivacyPage() {
  const page = await getPage("privacy");

  return (
    <article className="mx-auto max-w-3xl px-4 pt-28 pb-20 sm:px-6">
      <p className="eyebrow">Website</p>
      <h1 className="headline mt-3 text-4xl sm:text-5xl">{page.title}</h1>
      {page.updated ? <p className="mt-3 text-sm text-muted">Last updated {formatDate(page.updated)}</p> : null}
      <div className="mt-8">
        <Markdown html={page.html} />
      </div>
    </article>
  );
}
