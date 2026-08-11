"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/site/container";
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
      (el): el is HTMLElement => el !== null,
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Container>
        <div className="mx-auto max-w-3xl">
          <nav className="-ml-3.5 flex gap-1 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SECTIONS.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={activeId === id ? "location" : undefined}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-1.5 text-sm whitespace-nowrap transition-colors duration-150",
                  activeId === id
                    ? "bg-brand/10 font-medium text-brand"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </div>
  );
}
