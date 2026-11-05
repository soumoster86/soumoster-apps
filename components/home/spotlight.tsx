import Image from "next/image";
import Link from "next/link";
import { LockScreen } from "@/components/apps/lock-screen";
import { PhoneFrame } from "@/components/apps/phone-frame";
import { PlayBadge } from "@/components/apps/play-badge";
import { StatusBadge } from "@/components/apps/status-badge";
import type { AppRecord } from "@/lib/schema";
import { appThemeStyle, formatAndroid, storeLink } from "@/lib/utils";

export function Spotlight({ app }: { app: AppRecord }) {
  const store = storeLink(app);
  const shot = app.screenshots.find((item) => item.src);
  const kicker = app.status === "closed-test" ? "Now in testing" : "Newest app";
  const facts = [
    app.category,
    app.minAndroid ? formatAndroid(app.minAndroid) : "Android",
    "No account, no ads",
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="spotlight-title">
      <div
        style={appThemeStyle(app)}
        className="app-theme glass grid items-center gap-8 rounded-3xl p-6 md:grid-cols-[1.3fr_0.7fr] md:p-10"
      >
        <div>
          <p className="eyebrow text-[var(--app)]">{kicker}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h2 id="spotlight-title" className="headline text-4xl">
              {app.name}
            </h2>
            <StatusBadge status={app.status} />
          </div>
          <p className="mt-3 max-w-lg text-muted">{app.tagline}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {facts.map((fact) => (
              <li key={fact} className="rounded-full border border-border px-3 py-1 text-sm text-muted">
                {fact}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {store ? <PlayBadge href={store.href} label={store.label} /> : null}
            <Link
              href={`/apps/${app.slug}`}
              className="rounded-xl border border-border px-5 py-3 text-sm font-semibold"
            >
              Learn more
            </Link>
          </div>
        </div>
        <div className="mx-auto" aria-hidden="true">
          <PhoneFrame size="sm">
            {shot?.src ? (
              <Image src={shot.src} alt="" fill className="object-cover" sizes="180px" />
            ) : (
              <LockScreen app={app} compact />
            )}
          </PhoneFrame>
        </div>
      </div>
    </section>
  );
}
