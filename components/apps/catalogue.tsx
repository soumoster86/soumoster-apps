"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { AppCard, MorePocketsCard } from "@/components/apps/app-card";
import { CATEGORIES, type CategoryFilter } from "@/lib/constants";
import type { AppRecord } from "@/lib/schema";
import { cn } from "@/lib/utils";

function isCategory(value: string | null): value is CategoryFilter {
  return CATEGORIES.includes(value as CategoryFilter);
}

export function Catalogue({ apps }: { apps: AppRecord[] }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const raw = params.get("category");
  const category: CategoryFilter = isCategory(raw) ? raw : "All";

  const counts = useMemo(() => {
    const tally = Object.fromEntries(CATEGORIES.map((item) => [item, 0])) as Record<CategoryFilter, number>;
    tally.All = apps.length;
    for (const app of apps) tally[app.category] += 1;
    return tally;
  }, [apps]);

  const shown = category === "All" ? apps : apps.filter((app) => app.category === category);

  function select(next: CategoryFilter) {
    const query = new URLSearchParams(params.toString());
    if (next === "All") query.delete("category");
    else query.set("category", next);
    const suffix = query.toString();
    router.replace(suffix ? `${pathname}?${suffix}` : pathname, { scroll: false });
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter apps by category">
        {CATEGORIES.map((item) => {
          const selected = item === category;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={selected}
              onClick={() => select(item)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                selected
                  ? "border-primary/40 bg-primary/15 text-foreground"
                  : "border-border text-muted hover:text-foreground",
              )}
            >
              {item} <span className="text-muted">({counts[item]})</span>
            </button>
          );
        })}
      </div>

      {shown.length === 0 ? (
        <p className="mt-8 text-muted">No apps in this category yet.</p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((app) => (
            <li key={app.slug}>
              <AppCard app={app} />
            </li>
          ))}
          {category === "All" ? (
            <li>
              <MorePocketsCard />
            </li>
          ) : null}
        </ul>
      )}
    </div>
  );
}
