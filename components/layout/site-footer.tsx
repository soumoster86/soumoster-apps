import Link from "next/link";
import type { AppRecord } from "@/lib/schema";
import { GAMES_SITE_URL, NAV_LINKS, SUPPORT_EMAIL } from "@/lib/constants";

export function SiteFooter({ apps }: { apps: Pick<AppRecord, "slug" | "name">[] }) {
  return (
    <footer className="mt-auto border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="" width={40} height={40} className="h-10 w-10 rounded-xl" />
            <p className="font-heading text-lg font-bold">SouMoster Apps</p>
          </div>
          <p className="mt-3 text-sm text-muted">Offline Android tools. No account. No ads.</p>
          <p className="mt-4 text-sm text-muted">
            <span aria-hidden="true">Designed with ❤️ by SouMoster</span>
            <span className="sr-only">Designed with love by SouMoster</span>
          </p>
        </div>

        <div>
          <h2 className="font-heading text-sm font-semibold tracking-wide uppercase">Apps</h2>
          <ul className="mt-4 space-y-2">
            {apps.map((app) => (
              <li key={app.slug}>
                <Link href={`/apps/${app.slug}`} className="text-sm text-muted hover:text-primary">
                  {app.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-sm font-semibold tracking-wide uppercase">Pages</h2>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={GAMES_SITE_URL} className="text-sm text-muted hover:text-primary">
                Games ↗
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-sm font-semibold tracking-wide uppercase">Contact</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a className="text-muted hover:text-primary" href={`mailto:${SUPPORT_EMAIL}`}>
                {SUPPORT_EMAIL}
              </a>
            </li>
            <li>
              <Link href="/support" className="text-muted hover:text-primary">
                Support
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-muted hover:text-primary">
                Website privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
