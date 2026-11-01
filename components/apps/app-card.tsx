import Link from "next/link";
import type { AppRecord } from "@/lib/schema";
import { appThemeStyle, cn } from "@/lib/utils";
import { AppGlyph } from "@/components/apps/app-glyph";
import { StatusBadge } from "@/components/apps/status-badge";

export function AppCard({ app }: { app: AppRecord }) {
  const announced = app.status !== "coming-soon";

  return (
    <Link
      href={`/apps/${app.slug}`}
      style={appThemeStyle(app)}
      className="app-theme group glass flex h-full flex-col rounded-2xl p-5 transition-[border-color] duration-500 hover:border-[color:color-mix(in_srgb,var(--app)_50%,transparent)]"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div
          className={cn(
            "grid h-14 w-14 place-items-center rounded-[22px] border text-[var(--app)]",
            "border-[color:color-mix(in_srgb,var(--app)_40%,transparent)] bg-[color:color-mix(in_srgb,var(--app)_14%,var(--card))]",
          )}
        >
          {app.icon ? (
            <AppGlyph icon={app.icon} className="h-7 w-7 transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <span className="font-heading text-lg font-bold text-primary">{app.name.slice(0, 1)}</span>
          )}
        </div>
        <StatusBadge status={app.status} />
      </div>
      <h3 className="font-heading text-xl font-semibold">{app.name}</h3>
      <p className="mt-1 flex-1 text-sm text-muted">{app.tagline}</p>
      {announced && app.version ? <p className="mt-3 text-xs text-muted">Version {app.version}</p> : null}
      {announced && app.highlights.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2">
          {app.highlights.slice(0, 2).map((chip) => (
            <li key={chip} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted">
              {chip}
            </li>
          ))}
        </ul>
      ) : null}
    </Link>
  );
}

export function MorePocketsCard() {
  return (
    <article className="glass flex h-full flex-col rounded-2xl p-5">
      <StatusBadge status="coming-soon" className="self-start" />
      <h3 className="mt-4 font-heading text-xl font-semibold">More Pockets on the way</h3>
      <p className="mt-2 text-sm text-muted">
        The next tool takes a card here when it has a name and a one-line promise.
      </p>
    </article>
  );
}
