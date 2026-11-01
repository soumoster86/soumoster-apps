import type { Metadata } from "next";
import Link from "next/link";
import { Markdown } from "@/components/content/markdown";
import { SUPPORT_EMAIL } from "@/lib/constants";
import { getApps, getPage } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("support");
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: "/support" },
  };
}

export default async function SupportPage() {
  const [page, apps] = await Promise.all([getPage("support"), getApps()]);
  const withFaqs = apps.filter((app) => app.faqs.length > 0);

  return (
    <article className="mx-auto max-w-3xl px-4 pt-28 pb-20 sm:px-6">
      <p className="eyebrow">Help</p>
      <h1 className="headline mt-3 text-4xl sm:text-5xl">{page.title}</h1>
      <p className="mt-4 text-muted">
        Email{" "}
        <a className="text-primary" href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("SouMoster Apps support")}`}>
          {SUPPORT_EMAIL}
        </a>
        . A person reads it.
      </p>
      <div className="mt-8">
        <Markdown html={page.html} />
      </div>

      <h2 className="headline mt-12 text-3xl">Questions by app</h2>
      <div className="mt-6 space-y-8">
        {withFaqs.map((app) => (
          <section key={app.slug} aria-labelledby={`${app.slug}-faq`}>
            <h3 id={`${app.slug}-faq`} className="font-heading text-xl font-semibold">
              <Link href={`/apps/${app.slug}`} className="hover:text-primary">
                {app.name}
              </Link>
            </h3>
            <div className="mt-2 divide-y divide-border border-y border-border">
              {app.faqs.map((faq) => (
                <details key={faq.q} className="group">
                  <summary className="cursor-pointer list-none py-4 font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {faq.q}
                      <span aria-hidden="true" className="text-muted transition-transform group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="pb-4 text-muted">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
