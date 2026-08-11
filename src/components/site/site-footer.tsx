import Link from "next/link";
import { Container } from "@/components/site/container";
import { siteConfig } from "@/content/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <Container className="flex flex-col items-center gap-6 py-12 text-center">
        <div>
          <p className="font-heading text-lg font-semibold text-foreground">
            OB1 <span className="text-brand">Odysseys</span>
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            {siteConfig.tagline}. Real field research, sourced data, and a
            case for action behind every story.
          </p>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Instagram
          </a>
        </nav>
      </Container>
      <Container className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} OB1 Odysseys. Data-driven environmental
        storytelling.
      </Container>
    </footer>
  );
}
