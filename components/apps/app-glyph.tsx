import { cn } from "@/lib/utils";

export function AppGlyph({ icon, className }: { icon: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block bg-current", className)}
      style={{
        maskImage: `url(${icon})`,
        WebkitMaskImage: `url(${icon})`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
}
