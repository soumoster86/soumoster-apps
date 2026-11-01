import { STATUS_LABEL } from "@/lib/constants";
import type { AppRecord } from "@/lib/schema";
import { cn } from "@/lib/utils";

const tones: Record<AppRecord["status"], string> = {
  live: "border-emerald-400/40 bg-emerald-400/15 text-emerald-300",
  "closed-test": "border-amber-300/40 bg-amber-300/15 text-amber-200",
  "in-development": "border-primary/40 bg-primary/15 text-[#c4bfff]",
  "coming-soon": "border-border bg-card text-muted",
};

const lightTones: Record<AppRecord["status"], string> = {
  live: "light:text-emerald-800",
  "closed-test": "light:text-amber-900",
  "in-development": "light:text-[#3d3499]",
  "coming-soon": "",
};

export function StatusBadge({ status, className }: { status: AppRecord["status"]; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        tones[status],
        lightTones[status],
        className,
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
