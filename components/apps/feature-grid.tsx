import { FEATURE_ICONS, type FeatureIconName } from "@/lib/icons";
import type { AppRecord } from "@/lib/schema";

export function FeatureGrid({ features }: { features: AppRecord["features"] }) {
  return (
    <section aria-labelledby="features-title">
      <h2 id="features-title" className="headline text-3xl">
        What you can do
      </h2>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {features.map((feature) => {
          const Icon = FEATURE_ICONS[feature.icon as FeatureIconName];
          return (
            <li key={feature.title} className="glass rounded-2xl p-5">
              <Icon className="h-5 w-5 text-[var(--app)]" aria-hidden="true" />
              <h3 className="mt-3 font-heading text-lg font-semibold">{feature.title}</h3>
              <p className="mt-1 text-sm text-muted">{feature.body}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
