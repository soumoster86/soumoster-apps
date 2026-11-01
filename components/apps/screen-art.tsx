import type { AppRecord } from "@/lib/schema";

function Row({ title, width = "70%" }: { title: string; width?: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-2.5 py-2">
      <span className="h-7 w-7 shrink-0 rounded-lg bg-[color:color-mix(in_srgb,var(--app)_25%,transparent)]" />
      <span className="min-w-0 flex-1">
        <span className="block h-2 rounded-full bg-foreground/80" style={{ width }} />
        <span className="mt-1.5 block h-1.5 w-1/2 rounded-full bg-muted/70" />
        <span className="sr-only">{title}</span>
      </span>
    </div>
  );
}

export function ScreenArt({ id, app }: { id: string; app: AppRecord }) {
  if (id === "qr") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-5 pt-8">
        <div className="grid grid-cols-5 gap-1 rounded-2xl border border-border bg-card p-3">
          {Array.from({ length: 25 }, (_, index) => (
            <span
              key={index}
              className={index % 2 === 0 || index % 7 === 0 ? "h-3 w-3 bg-foreground" : "h-3 w-3 bg-transparent"}
            />
          ))}
        </div>
        <p className="text-center text-[11px] text-muted">{app.name}</p>
      </div>
    );
  }

  if (id === "player") {
    return (
      <div className="flex h-full flex-col px-4 pt-10">
        <div className="grid h-28 place-items-center rounded-2xl bg-[color:color-mix(in_srgb,var(--app)_22%,var(--card))]">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--app)] text-background">
            <span className="ml-0.5 border-y-[7px] border-l-[12px] border-y-transparent border-l-current" />
          </span>
        </div>
        <p className="mt-4 font-heading text-sm font-semibold">Folder</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
          <div className="h-full w-1/3 rounded-full bg-[var(--app)]" />
        </div>
        <div className="mt-4 space-y-2">
          <Row title="Track" width="62%" />
          <Row title="Track" width="80%" />
        </div>
      </div>
    );
  }

  const titles =
    id === "notes"
      ? ["A note", "A checklist", "A reminder"]
      : id === "ledger"
        ? ["An entry", "A budget", "An asset"]
      : id === "reader"
        ? ["The open PDF", "A highlight", "A note in the margin"]
        : id === "scan"
          ? ["A captured page", "Cleaned edges", "Ready to sign"]
          : ["Library item", "Another item", "A third item"];

  return (
    <div className="flex h-full flex-col gap-2 px-3 pt-9">
      <p className="px-1 font-heading text-sm font-semibold">{id === "reader" ? "Continue" : app.name}</p>
      {titles.map((title) => (
        <Row key={title} title={title} />
      ))}
      {id === "reader" ? (
        <div className="mt-2 rounded-xl border border-border bg-card/70 p-3">
          <div className="h-2 w-full rounded-full bg-foreground/70" />
          <div className="mt-2 h-2 w-4/5 rounded-full bg-[var(--app)]" />
          <div className="mt-2 h-2 w-2/3 rounded-full bg-foreground/50" />
        </div>
      ) : null}
    </div>
  );
}
