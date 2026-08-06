"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="rounded-md border border-border px-3 py-1.5 text-sm font-medium transition-[background-color] duration-150 hover:bg-muted"
      >
        {open ? "Close" : "Menu"}
      </button>
      <div
        className={cn(
          "absolute inset-x-0 top-16 origin-top border-b border-border bg-background shadow-sm transition-[opacity,transform] duration-200 ease-out",
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-95 opacity-0 motion-reduce:translate-y-0"
        )}
      >
        <nav className="flex flex-col gap-3 px-6 py-4 text-sm font-medium">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-1"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="py-1 text-brand"
          >
            {siteConfig.instagramHandle}
          </a>
        </nav>
      </div>
    </div>
  );
}
