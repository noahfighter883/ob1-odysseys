import type { Metadata } from "next";
import Link from "next/link";
import { Flame, TrendingUp, Zap } from "lucide-react";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { Ob1Byline } from "@/components/site/ob1-byline";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "About — OB1 Odysseys",
  description:
    "The program thesis and OB1 persona behind OB1 Odysseys — environmental storytelling backed by open data.",
};

const contentModel = [
  {
    title: "Problem Statement",
    body: "What ecological change is happening, where, and why it matters.",
  },
  {
    title: "Analysis",
    body: "The data and evidence behind the claim — trends, comparisons, forecasts.",
  },
  {
    title: "Call to Action",
    body: "What the viewer or reader can do — advocacy, regulation support, behavior change.",
  },
  {
    title: "Sources",
    body: "Citations for every claim — scientific studies, agency data, and news.",
  },
  {
    title: "Datasets",
    body: "The underlying data made available and downloadable for full transparency.",
  },
];

export default function AboutPage() {
  return (
    <Container className="py-16">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-wide text-brand">
          About the program
        </p>
        <h1 className="mt-2 max-w-2xl font-heading text-4xl font-semibold sm:text-5xl">
          {siteConfig.tagline}.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          OB1 Odysseys is an environmental storytelling program: real
          eco-tourism travel becomes field research, field research becomes
          short-form video PSAs, and every PSA is backed by a rigorous,
          sourced, data-driven case published here. The mission is to raise
          visibility and urgency around environmental regulation and action,
          and to help drive the transition to a sustainable economy and
          healthier planet.
        </p>
      </Reveal>

      <Reveal>
        <section className="mt-16">
          <Ob1Byline tone="dark" />
          <h2 className="mt-3 font-heading text-2xl font-semibold">
            Who&apos;s behind it
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            OB1 Odysseys is run by a former enterprise analytics leader —
            background at Workday and Oracle — transitioning into
            environmental evangelism. The persona, &ldquo;OB1,&rdquo; is a
            Jedi-inspired evangelist: playful in tone, serious in substance.
            The bet is that analytics discipline — clear evidence, clear
            stakes, clear stories — can close the gap between knowing and
            acting the same way it has historically closed decision-making
            gaps in enterprise settings.
          </p>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-semibold">
            The thesis: a climate inflection point
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            The program operates on the hypothesis that we&apos;re at an
            inflection point, driven by three converging forces.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <Reveal delay={0}>
              <ThesisCard
                icon={<Flame className="size-5" />}
                title="Climate urgency"
                body="Measurable, visible effects of greenhouse gas emissions: rising temperatures, wildfire severity, drought, ecosystem loss."
              />
            </Reveal>
            <Reveal delay={80}>
              <ThesisCard
                icon={<TrendingUp className="size-5" />}
                title="Economic shift"
                body="Renewable energy becoming cheaper and more abundant than oil, changing the economics and geopolitics of energy."
              />
            </Reveal>
            <Reveal delay={160}>
              <ThesisCard
                icon={<Zap className="size-5" />}
                title="Political will gap"
                body="The missing piece isn't evidence, it's action — individual and institutional will lags behind both the science and the economics."
              />
            </Reveal>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-semibold">
            The Odyssey format
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Each odyssey is a place-based research trip that becomes a PSA
            story. Every story — in the short-form video and on this site —
            follows the same five-part structure, so it reads as a public
            service announcement backed by open data, not opinion content.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {contentModel.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-xs font-medium text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 font-heading font-semibold">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-16 rounded-2xl border border-border bg-secondary/40 p-8">
          <h2 className="font-heading text-2xl font-semibold">
            Where it lives
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Social media — anchored on Instagram at{" "}
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="text-brand underline underline-offset-2"
            >
              {siteConfig.instagramHandle}
            </a>{" "}
            — is the primary discovery layer: short-form video designed for
            reach and emotional impact. This website is the credibility and
            depth layer — the &ldquo;show your work&rdquo; case that social
            video can&apos;t accommodate.{" "}
            <Link
              href="/odysseys"
              className="text-brand underline underline-offset-2"
            >
              Explore the odysseys →
            </Link>
          </p>
        </section>
      </Reveal>
    </Container>
  );
}

function ThesisCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex size-10 items-center justify-center rounded-full bg-brand/10 text-brand">
        {icon}
      </div>
      <p className="mt-4 font-heading text-lg font-semibold">{title}</p>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
