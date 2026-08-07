"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SECTIONS: [string, string][] = [
  ["problem", "Problem Statement"],
  ["analysis", "Analysis"],
  ["action", "Call to Action"],
  ["sources", "Sources"],
  ["datasets", "Datasets"],
  ["video", "Watch the PSA"],
];

export function OnPageNav() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = SECTIONS.map(([id]) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-24 space-y-1 border-l border-border pl-5 text-sm">
      {SECTIONS.map(([id, label]) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={activeId === id ? "location" : undefined}
          className={cn(
            "-ml-px block border-l-2 py-1 pl-5 transition-colors duration-150",
            activeId === id
              ? "border-brand font-medium text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          {label}
        </a>
      ))}
    </div>
  );
}
