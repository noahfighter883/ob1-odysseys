"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/site/container";
import { MobileNav } from "@/components/site/mobile-nav";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { siteConfig } from "@/content/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [revealed, setRevealed] = useState(!isHome);

  // Syncs header visibility with client-side route changes (isHome can flip
  // without a remount) and with the hero section's scroll position. Both
  // are external-system syncs, not React state mirroring.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!isHome) {
      setRevealed(true);
      return;
    }

    setRevealed(false);

    const hero = document.getElementById("hero-pinned");
    if (!hero) {
      setRevealed(true);
      return;
    }

    const checkScroll = () => {
      setRevealed(window.scrollY > 48);
    };

    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, [isHome]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur transition-[transform,opacity] duration-300 ease-out supports-[backdrop-filter]:bg-background/70",
        revealed
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0"
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-heading text-lg font-semibold tracking-tight text-foreground"
        >
          OB1 <span className="text-brand">Odysseys</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          {siteConfig.nav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden text-sm font-medium text-brand hover:underline sm:inline-block"
          >
            {siteConfig.instagramHandle}
          </a>
          <ThemeToggle className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
