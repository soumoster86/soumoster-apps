"use client";

import Image from "next/image";
import { useRef, type KeyboardEvent } from "react";
import { LockScreen } from "@/components/apps/lock-screen";
import { PhoneFrame } from "@/components/apps/phone-frame";
import { ScreenArt } from "@/components/apps/screen-art";
import type { AppRecord } from "@/lib/schema";

export function ScreenshotRail({ app }: { app: AppRecord }) {
  const scroller = useRef<HTMLDivElement>(null);
  if (app.screenshots.length === 0) return null;

  function scrollByCard(direction: -1 | 1) {
    const node = scroller.current;
    if (!node) return;
    const card = node.querySelector<HTMLElement>("[data-shot]");
    const amount = (card?.offsetWidth ?? 180) + 16;
    node.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByCard(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByCard(-1);
    }
  }

  return (
    <section aria-labelledby="screens-title">
      <div className="flex items-end justify-between gap-4">
        <h2 id="screens-title" className="headline text-3xl">
          On the phone
        </h2>
        <div className="flex gap-2">
          <button type="button" className="rounded-full border border-border px-3 py-2 text-sm" onClick={() => scrollByCard(-1)}>
            <span aria-hidden="true">←</span>
            <span className="sr-only">Previous screen</span>
          </button>
          <button type="button" className="rounded-full border border-border px-3 py-2 text-sm" onClick={() => scrollByCard(1)}>
            <span aria-hidden="true">→</span>
            <span className="sr-only">Next screen</span>
          </button>
        </div>
      </div>
      <div
        ref={scroller}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label="App screens"
        className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
      >
        {app.screenshots.map((shot) => (
          <div key={`${shot.id ?? ""}-${shot.src ?? ""}-${shot.alt}`} data-shot className="snap-start">
            <PhoneFrame size="sm">
              {shot.src ? (
                <Image src={shot.src} alt={shot.alt} fill className="object-cover" sizes="180px" />
              ) : (
                <div role="img" aria-label={shot.alt} className="h-full">
                  {shot.id === "lock" ? <LockScreen app={app} compact /> : <ScreenArt id={shot.id ?? "library"} app={app} />}
                </div>
              )}
            </PhoneFrame>
          </div>
        ))}
      </div>
    </section>
  );
}
