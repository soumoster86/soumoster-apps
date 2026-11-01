import type { CSSProperties } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { AppRecord } from "@/lib/schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function appThemeStyle(app: Pick<AppRecord, "accent">): CSSProperties {
  const light = app.accent?.light ?? "#6C63FF";
  const dark = app.accent?.dark ?? "#C4BFFF";
  return {
    "--accent-light": light,
    "--accent-dark": dark,
  } as CSSProperties;
}

export function storeLink(app: AppRecord): { href: string; label: string } | null {
  if (app.status === "coming-soon" || app.status === "in-development") return null;
  if (app.status === "closed-test") {
    const href = app.testUrl ?? app.playUrl;
    return href ? { href, label: "Join the test" } : null;
  }
  if (app.playUrl) return { href: app.playUrl, label: "Get it on" };
  return null;
}

export function formatAndroid(minAndroid: string) {
  return `Android ${minAndroid}+`;
}

export function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
