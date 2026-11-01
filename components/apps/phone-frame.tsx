import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const sizes = {
  sm: "w-[168px]",
  md: "w-[210px]",
  lg: "w-[240px] sm:w-[260px]",
};

export function PhoneFrame({
  children,
  className,
  size = "md",
}: {
  children: ReactNode;
  className?: string;
  size?: keyof typeof sizes;
}) {
  return (
    <div className={cn("relative", sizes[size], className)}>
      <div className="rounded-[2.2rem] border border-white/15 bg-card p-1.5 shadow-[0_0_0_1px_rgba(15,23,42,0.35)]">
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.8rem] bg-background">
          <div
            className="absolute top-2 left-1/2 z-10 h-4 w-14 -translate-x-1/2 rounded-full bg-black/55"
            aria-hidden="true"
          />
          {children}
        </div>
      </div>
    </div>
  );
}
