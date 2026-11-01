import type { Metadata } from "next";
import { Markdown } from "@/components/content/markdown";
import { getPage } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("about");
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage() {
  const page = await getPage("about");

  return (
    <article className="mx-auto max-w-3xl px-4 pt-28 pb-20 sm:px-6">
      <p className="eyebrow">Studio</p>
      <h1 className="headline mt-3 text-4xl sm:text-5xl">{page.title}</h1>
      <div className="mt-8">
        <Markdown html={page.html} />
      </div>
    </article>
  );
}
