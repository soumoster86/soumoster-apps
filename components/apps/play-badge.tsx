import { useId } from "react";
import { cn } from "@/lib/utils";

export function PlayBadge({
  href,
  label = "Get it on",
  title = "Google Play",
  className,
}: {
  href: string;
  label?: string;
  title?: string;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} ${title}`}
      className={cn(
        "inline-flex min-h-12 items-center gap-3 rounded-xl border border-neutral-700/80 bg-black/90 px-4 py-2 text-white shadow-lg shadow-black/30 transition hover:border-neutral-500",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-5 shrink-0" aria-hidden="true">
        <path d="M3.6 1.8 13.8 12 3.6 22.2A1.3 1.3 0 0 1 3 21.2V2.8c0-.4.2-.8.6-1Z" fill={`url(#${id}-b)`} />
        <path d="M17.2 8.6 13.8 12 3.6 1.8c.3-.1.6-.1.9.1L17.2 8.6Z" fill={`url(#${id}-g)`} />
        <path d="M17.2 15.4 4.5 22.1c-.3.2-.6.2-.9-.1L13.8 12l3.4 3.4Z" fill={`url(#${id}-r)`} />
        <path d="m20.9 10.5-3.7-1.9L13.8 12l3.4 3.4 3.7-1.9c.7-.4 1.1-1.1 1.1-1.8s-.4-1.4-1.1-1.8Z" fill={`url(#${id}-y)`} />
        <defs>
          <linearGradient id={`${id}-b`} x1="8" y1="2" x2="2" y2="14">
            <stop stopColor="#00A0FF" />
            <stop offset="1" stopColor="#00E3FF" />
          </linearGradient>
          <linearGradient id={`${id}-g`} x1="16" y1="4" x2="4" y2="8">
            <stop stopColor="#FFE000" />
            <stop offset="1" stopColor="#FF9C00" />
          </linearGradient>
          <linearGradient id={`${id}-r`} x1="14" y1="12" x2="4" y2="24">
            <stop stopColor="#FF3A44" />
            <stop offset="1" stopColor="#C31162" />
          </linearGradient>
          <linearGradient id={`${id}-y`} x1="14" y1="8" x2="22" y2="16">
            <stop stopColor="#32A071" />
            <stop offset="1" stopColor="#00F076" />
          </linearGradient>
        </defs>
      </svg>
      <span className="flex flex-col text-left leading-tight">
        <span className="text-[10px] font-medium tracking-widest text-neutral-300 uppercase">{label}</span>
        <span className="font-heading text-sm font-bold tracking-wide">{title}</span>
      </span>
    </a>
  );
}
