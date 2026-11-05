import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppGlyph } from "@/components/apps/app-glyph";
import type { AppRecord } from "@/lib/schema";
import { appThemeStyle } from "@/lib/utils";

export function TaskFinder({ apps }: { apps: AppRecord[] }) {
  const tasks = apps.filter((app) => app.job);
  if (tasks.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="task-finder-title">
      <h2 id="task-finder-title" className="headline text-3xl sm:text-4xl">
        What do you need to do?
      </h2>
      <p className="mt-3 max-w-2xl text-muted">Pick the job. The right Pocket is one tap away.</p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map((app) => (
          <li key={app.slug}>
            <Link
              href={`/apps/${app.slug}`}
              style={appThemeStyle(app)}
              className="app-theme group glass flex h-full items-center gap-4 rounded-2xl p-4 transition-[border-color] duration-500 hover:border-[color:color-mix(in_srgb,var(--app)_50%,transparent)]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[color:color-mix(in_srgb,var(--app)_40%,transparent)] bg-[color:color-mix(in_srgb,var(--app)_14%,var(--card))] text-[var(--app)]">
                {app.icon ? <AppGlyph icon={app.icon} className="h-6 w-6" /> : null}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-heading font-semibold">{app.job}</span>
                <span className="mt-0.5 block text-sm text-muted">{app.name}</span>
              </span>
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-muted transition-transform duration-500 group-hover:translate-x-0.5"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
