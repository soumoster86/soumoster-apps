import type { AppRecord } from "@/lib/schema";
import { formatAndroid } from "@/lib/utils";

function yesNo(value: boolean) {
  return value ? "Yes" : "No";
}

export function PrivacyFacts({ app }: { app: AppRecord }) {
  if (!app.privacy || !app.version || !app.minAndroid || !app.package) return null;

  const rows = [
    ["Account needed", yesNo(app.privacy.account)],
    ["Ads", yesNo(app.privacy.ads)],
    ["Internet permission", yesNo(app.privacy.internet)],
    ["Data stored", app.privacy.storage],
    ["Export", app.privacy.export],
    ["Version", app.version],
    ["Minimum Android", formatAndroid(app.minAndroid)],
    ["Package", app.package],
  ];

  return (
    <section aria-labelledby="privacy-facts-title">
      <h2 id="privacy-facts-title" className="headline text-3xl">
        Privacy at a glance
      </h2>
      <dl className="mt-6 divide-y divide-border rounded-2xl border border-border">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-1 px-4 py-3 sm:grid-cols-[220px_1fr] sm:items-baseline">
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="font-medium">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
