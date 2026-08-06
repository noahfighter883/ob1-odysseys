import Link from "next/link";
import { Container } from "@/components/site/container";
import { MobileNav } from "@/components/site/mobile-nav";
import { siteConfig } from "@/content/site-config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
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
        <a
          href={siteConfig.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="hidden text-sm font-medium text-brand hover:underline sm:inline-block"
        >
          {siteConfig.instagramHandle}
        </a>
        <MobileNav />
      </Container>
    </header>
  );
}
