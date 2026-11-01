"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GAMES_SITE_URL, NAV_LINKS, PLAY_DEVELOPER_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme(document.documentElement.classList.contains("light") ? "light" : "dark");

    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("light", next === "light");
    localStorage.setItem("theme", next);
  }

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-colors duration-300",
        scrolled ? "glass" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8" aria-label="Main">
        <Link href="/" className="flex items-center gap-2.5 rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" width={40} height={40} className="h-10 w-10 rounded-xl" />
          <span className="font-heading text-lg font-bold">SouMoster</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium",
                    active ? "text-primary" : "text-muted hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href={GAMES_SITE_URL}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted hover:text-foreground"
            >
              Games <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={PLAY_DEVELOPER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-white lg:inline-flex"
          >
            Get on Google Play
          </a>
          {mounted ? (
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg p-2 text-muted hover:text-foreground"
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
            </button>
          ) : (
            <span className="h-9 w-9" />
          )}
          <button
            type="button"
            className="rounded-lg p-2 text-foreground md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-nav" className="border-t border-border bg-card md:hidden">
          <ul className="flex flex-col gap-1 px-4 py-4">
            <li>
              <a
                href={PLAY_DEVELOPER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2 flex rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white"
              >
                Get on Google Play
              </a>
            </li>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="block rounded-lg px-3 py-3 text-sm font-medium text-muted"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={GAMES_SITE_URL} className="block rounded-lg px-3 py-3 text-sm font-medium text-muted">
                Games ↗
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
