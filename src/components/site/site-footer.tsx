import Link from "next/link";
import { Container } from "@/components/site/container";
import { siteConfig } from "@/content/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <Container className="flex flex-col gap-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="font-heading text-lg font-semibold text-foreground">
            OB1 <span className="text-brand">Odysseys</span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {siteConfig.tagline}. Real field research, sourced data, and a
            case for action behind every story.
          </p>
        </div>
        <div className="flex gap-12 text-sm">
          <div className="flex flex-col gap-2">
            <span className="font-medium text-foreground">Explore</span>
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium text-foreground">Follow</span>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Instagram
            </a>
          </div>
        </div>
      </Container>
      <Container className="border-t border-border py-5 text-xs text-muted-foreground">
        © {new Date().getFullYear()} OB1 Odysseys. Data-driven environmental
        storytelling.
      </Container>
    </footer>
  );
}
