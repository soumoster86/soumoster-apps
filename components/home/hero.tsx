import Link from "next/link";
import { LockScreen } from "@/components/apps/lock-screen";
import { PhoneFrame } from "@/components/apps/phone-frame";
import { GAMES_SITE_URL, HERO_EYEBROW, HERO_HEADLINE, HERO_PROMISE } from "@/lib/constants";
import type { AppRecord } from "@/lib/schema";
import { appThemeStyle } from "@/lib/utils";

const fan = [
  { rotate: -14, x: "4%", delay: "0ms" },
  { rotate: -5, x: "24%", delay: "80ms" },
  { rotate: 5, x: "44%", delay: "140ms" },
  { rotate: 13, x: "62%", delay: "200ms" },
];

export function Hero({ apps }: { apps: AppRecord[] }) {
  const phones = apps.slice(0, 4);

  return (
    <section className="relative overflow-x-clip pt-28 pb-16 sm:pt-32 lg:pt-36">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 18% 40%, rgba(169,199,255,0.16), transparent 46%), radial-gradient(ellipse at 70% 20%, rgba(255,181,155,0.12), transparent 42%), radial-gradient(ellipse at 80% 80%, rgba(206,186,255,0.12), transparent 46%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid min-w-0 max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:px-8">
        <div className="min-w-0">
          <p className="eyebrow">{HERO_EYEBROW}</p>
          <h1 className="headline headline-xl mt-4 max-w-xl">
            <span className="gradient-text">{HERO_HEADLINE}</span>
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted">{HERO_PROMISE}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/apps" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white">
              Explore the apps
            </Link>
            <a
              href={GAMES_SITE_URL}
              className="rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground"
            >
              Games by SouMoster
            </a>
          </div>
        </div>

        <div className="relative mx-auto h-[320px] w-full min-w-0 max-w-[560px] overflow-hidden sm:h-[460px]" aria-hidden="true">
          <div className="absolute bottom-0 left-1/2 h-[430px] w-[520px] origin-bottom -translate-x-1/2 scale-[0.68] sm:scale-100">
            {phones.map((app, index) => {
              const place = fan[index] ?? fan[0];
              return (
                <div
                  key={app.slug}
                  className="phone-fan-item app-theme absolute bottom-0"
                  style={{
                    ...appThemeStyle(app),
                    left: place.x,
                    zIndex: index + 1,
                    transform: `rotate(${place.rotate}deg)`,
                    animationDelay: place.delay,
                  }}
                >
                  <PhoneFrame size="sm">
                    <LockScreen app={app} compact />
                  </PhoneFrame>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
