import type { AppRecord } from "@/lib/schema";
import { AppGlyph } from "@/components/apps/app-glyph";

export function LockScreen({ app, compact = false }: { app: AppRecord; compact?: boolean }) {
  if (!app.icon) return null;

  return (
    <div className="flex h-full flex-col items-center px-4 pt-8 pb-4 text-center">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--app) 42%, transparent), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mb-3 grid h-16 w-16 place-items-center rounded-[22px] border border-[color:color-mix(in_srgb,var(--app)_45%,transparent)] bg-[color:color-mix(in_srgb,var(--app)_16%,var(--card))] text-[var(--app)]">
        <AppGlyph icon={app.icon} className="h-8 w-8" />
      </div>
      <p className={`font-heading font-bold ${compact ? "text-sm" : "text-base"}`}>{app.name}</p>
      <p className="mt-1 text-[11px] leading-snug text-muted">{app.tagline}</p>
      <p className="mt-3 rounded-full border border-[color:color-mix(in_srgb,var(--app)_35%,transparent)] bg-[color:color-mix(in_srgb,var(--app)_12%,transparent)] px-2.5 py-1 text-[10px] font-semibold text-[var(--app)]">
        Private library
      </p>
      <div className="mt-4 w-full rounded-2xl border border-border bg-card/80 px-3 py-3">
        <p className="text-[11px] font-semibold">{app.name} is locked</p>
        <p className="mt-1 text-[10px] leading-snug text-muted">Use your fingerprint or phone PIN.</p>
      </div>
      <div className="mt-auto space-y-1 pt-3">
        <p className="text-[10px] text-muted">Stored only on this phone · No account</p>
        {app.version ? <p className="text-[10px] text-muted/80">{app.version}</p> : null}
        <p className="text-[10px] text-muted">
          <span aria-hidden="true">Designed with ❤️ by SouMoster</span>
          <span className="sr-only">Designed with love by SouMoster</span>
        </p>
      </div>
    </div>
  );
}
