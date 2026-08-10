import Link from "next/link";
import { ArrowRight, Flame, TrendingUp, Zap } from "lucide-react";
import { Container } from "@/components/site/container";
import { OdysseyCard } from "@/components/site/odyssey-card";
import { Reveal } from "@/components/site/reveal";
import { HeroScroll } from "@/components/site/hero-scroll";
import { Button } from "@/components/ui/button";
import { odysseys, getOdyssey } from "@/content/odysseys";
import { siteConfig } from "@/content/site-config";
import { getWildfireAnalysis } from "@/lib/wildfire-data";
import { odysseyThemeStyles } from "@/lib/odyssey-theme";

export default function Home() {
  const featured = getOdyssey("al-was-right")!;
  const analysis = getWildfireAnalysis();
  const earlyEra = analysis.eras[0];
  const recentEra = analysis.eras[2];
  const frequencyMultiple = (
    recentEra.megaFiresPerYear / earlyEra.megaFiresPerYear
  ).toFixed(1);

  return (
    <>
      <HeroScroll
        tagline={siteConfig.tagline}
        description="OB1 Odysseys turns eco-tourism travel into short-form PSAs — each one backed by a sourced, data-driven case published in full here. Evidence carries the weight, not rhetoric."
        odysseyHref="/odysseys"
        takeActionHref="/take-action"
      />

      {/* Thesis strip */}
      <section className="border-b border-border bg-secondary/30 py-16">
        <Container>
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wide text-brand">
              The thesis
            </p>
            <h2 className="mt-2 max-w-2xl font-heading text-2xl font-semibold sm:text-3xl">
              We&apos;re at a climate inflection point — driven by three
              converging forces.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <Reveal delay={0}>
              <ThesisCard
                icon={<Flame className="size-5" />}
                title="Climate urgency"
                body="Measurable, visible effects of greenhouse gas emissions — rising temperatures, wildfire severity, drought, ecosystem loss."
              />
            </Reveal>
            <Reveal delay={80}>
              <ThesisCard
                icon={<TrendingUp className="size-5" />}
                title="Economic shift"
                body="Renewable energy is becoming cheaper and more abundant than oil, changing the economics and geopolitics of energy."
              />
            </Reveal>
            <Reveal delay={160}>
              <ThesisCard
                icon={<Zap className="size-5" />}
                title="Political will gap"
                body="The missing piece isn't evidence — it's action. Will lags behind both the science and the economics."
              />
            </Reveal>
          </div>
          <Reveal delay={100}>
            <p className="mt-8 max-w-2xl text-sm text-muted-foreground">
              The bet: analytics discipline — clear evidence, clear stakes,
              clear stories — can close that will gap the way it has
              historically closed decision-making gaps in enterprise settings.{" "}
              <Link
                href="/about"
                className="text-brand underline underline-offset-2"
              >
                Read the full program thesis →
              </Link>
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Featured odyssey */}
      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wide text-brand">
              Featured odyssey
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold sm:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-4 text-muted-foreground">{featured.hook}</p>
            <div className="mt-8 grid grid-cols-3 gap-4 rounded-2xl border border-border bg-card p-5">
              <Stat
                value={`${frequencyMultiple}×`}
                label="more mega-fires per year, 2020–25 vs 2000–12"
              />
              <Stat
                value={analysis.totalFiresTracked.toString()}
                label="wildfires ≥10k acres tracked along the PCT corridor"
              />
              <Stat
                value={`${analysis.yearRange.start}–${analysis.yearRange.end}`}
                label="years of sourced, downloadable data"
              />
            </div>
            <Button
              className="mt-8"
              size="lg"
              nativeButton={false}
              render={
                <Link href={`/odysseys/${featured.slug}`}>
                  Read the full case <ArrowRight className="size-4" />
                </Link>
              }
            />
          </Reveal>
          <Reveal delay={120}>
            <div
              className={`relative overflow-hidden rounded-2xl border border-border p-8 text-white ${odysseyThemeStyles.ember}`}
            >
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10">
                <p className="font-heading text-lg font-semibold">
                  {analysis.eras[2].label}
                </p>
                <p className="mt-1 text-sm text-white/80">
                  {analysis.eras[2].megaFireCount} mega-fires ·{" "}
                  {analysis.eras[2].megaFiresPerYear}/yr ·{" "}
                  {Math.round(analysis.eras[2].avgMegaFireSize / 1000)}k acre
                  avg.
                </p>
                <div className="mt-6 space-y-3 text-sm text-white/90">
                  {analysis.eras.map((era) => (
                    <div
                      key={era.label}
                      className="flex items-center justify-between border-t border-white/15 pt-3 first:border-0 first:pt-0"
                    >
                      <span>{era.label}</span>
                      <span className="font-medium">
                        {era.megaFiresPerYear}/yr
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Odyssey grid */}
      <section className="border-t border-border bg-secondary/30 py-20">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-brand">
                  All odysseys
                </p>
                <h2 className="mt-2 font-heading text-3xl font-semibold">
                  Where OB1 is headed next
                </h2>
              </div>
              <Button
                variant="ghost"
                nativeButton={false}
                render={
                  <Link href="/odysseys">
                    View all <ArrowRight className="size-4" />
                  </Link>
                }
              />
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {odysseys.map((odyssey, i) => (
              <Reveal key={odyssey.slug} delay={i * 80}>
                <OdysseyCard odyssey={odyssey} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
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

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-heading text-2xl font-semibold text-brand">
        {value}
      </p>
      <p className="mt-1 text-xs leading-snug text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
