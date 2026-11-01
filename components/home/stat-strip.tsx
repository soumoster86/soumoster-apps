"use client";

import { useEffect, useRef, useState } from "react";

function Counter({ value }: { value: number }) {
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting || started.current) return;
      started.current = true;
      if (reduced || value === 0) {
        setShown(value);
        observer.disconnect();
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 900);
        setShown(Math.round(value * progress));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.6 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="font-heading text-4xl font-bold tracking-tight">
      {shown}
    </span>
  );
}

export function StatStrip({ stats }: { stats: { label: string; value: number }[] }) {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8" aria-label="Studio facts">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center sm:text-left">
          <Counter value={stat.value} />
          <p className="mt-1 text-sm text-muted">{stat.label}</p>
        </div>
      ))}
    </section>
  );
}
