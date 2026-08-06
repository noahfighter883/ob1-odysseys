import Link from "next/link";
import { Container } from "@/components/site/container";
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
        <details className="md:hidden">
          <summary className="list-none cursor-pointer rounded-md border border-border px-3 py-1.5 text-sm font-medium">
            Menu
          </summary>
          <div className="absolute inset-x-0 top-16 border-b border-border bg-background px-6 py-4 shadow-sm">
            <nav className="flex flex-col gap-3 text-sm font-medium">
              {siteConfig.nav.map((item) => (
                <Link key={item.href} href={item.href} className="py-1">
                  {item.label}
                </Link>
              ))}
              <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="py-1 text-brand">
                {siteConfig.instagramHandle}
              </a>
            </nav>
          </div>
        </details>
      </Container>
    </header>
  );
}
