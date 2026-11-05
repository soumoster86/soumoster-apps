export const SITE_NAME = "SouMoster Apps";
export const SITE_URL = "https://soumoster-app.vercel.app";
export const GAMES_SITE_URL = "https://sou-moster.vercel.app";
export const PLAY_DEVELOPER_URL =
  "https://play.google.com/store/apps/dev?id=9220341090582575849";
export const SUPPORT_EMAIL = "soumoster@gmail.com";

export const SITE_DESCRIPTION =
  "Android tools from SouMoster. ScanPocket, PlayPocket, NotesPocket, ReadPocket, ExpensePocket and FilePocket — no account and no ads.";

export const HERO_EYEBROW = "SouMoster Apps";
export const HERO_HEADLINE = "Small apps. Big pockets.";
export const HERO_PROMISE = "Android tools with no account and no ads.";

export const CATEGORIES = ["All", "Documents", "Media", "Notes", "Money", "Files"] as const;
export type CategoryFilter = (typeof CATEGORIES)[number];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/apps", label: "Apps" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
  { href: "/privacy", label: "Privacy" },
] as const;

export const STATUS_LABEL = {
  live: "Live",
  "closed-test": "Closed test",
  "in-development": "In development",
  "coming-soon": "Coming soon",
} as const;
