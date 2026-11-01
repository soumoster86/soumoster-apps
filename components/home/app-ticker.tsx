import type { AppRecord } from "@/lib/schema";

export function AppTicker({ apps }: { apps: AppRecord[] }) {
  const items = apps.map((app) => `${app.name} · ${app.tagline}`);

  return (
    <section className="ticker border-y border-border py-4" aria-label="Pocket apps">
      <div className="overflow-hidden">
        <div className="ticker-track flex w-max items-center gap-8 px-4">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className={`flex items-center gap-8 ${copy === 1 ? "ticker-duplicate" : ""}`}
            >
              {items.map((item) => (
                <li key={`${copy}-${item}`} className="flex items-center gap-8 text-sm whitespace-nowrap text-muted">
                  <span>{item}</span>
                  <span aria-hidden="true" className="text-primary">
                    ✦
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
