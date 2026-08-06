import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, AtSign, Clock, Download } from "lucide-react";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { odysseys, getOdyssey } from "@/content/odysseys";
import { odysseyThemeStyles } from "@/lib/odyssey-theme";
import { getWildfireAnalysis } from "@/lib/wildfire-data";
import { WildfireTrendChart } from "@/components/odyssey/wildfire-trend-chart";
import { EraSummaryTable } from "@/components/odyssey/era-summary-table";

export function generateStaticParams() {
  return odysseys.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const odyssey = getOdyssey(slug);
  if (!odyssey) return {};
  return {
    title: `${odyssey.title} — OB1 Odysseys`,
    description: odyssey.hook,
  };
}

export default async function OdysseyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const odyssey = getOdyssey(slug);
  if (!odyssey) notFound();

  const isComingSoon = odyssey.status === "coming-soon";

  return (
    <>
      <section className={`text-white ${odysseyThemeStyles[odyssey.theme]}`}>
        <Container className="py-16">
          <Link
            href="/odysseys"
            className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white"
          >
            <ArrowLeft className="size-4" /> All odysseys
          </Link>
          <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both mt-6 duration-500 ease-out">
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="secondary"
                className="border-0 bg-white/15 text-white backdrop-blur"
              >
                {isComingSoon ? (
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" /> Coming soon
                  </span>
                ) : (
                  "Live odyssey"
                )}
              </Badge>
              <span className="text-sm text-white/80">{odyssey.location}</span>
            </div>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl font-semibold sm:text-5xl">
              {odyssey.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/85">
              {odyssey.hook}
            </p>
          </div>
        </Container>
      </section>

      {isComingSoon ? (
        <Container className="py-16">
          <Reveal>
            <div className="max-w-2xl rounded-2xl border border-border bg-card p-8">
              <p className="font-heading text-xl font-semibold">
                This odyssey is still in research.
              </p>
              <p className="mt-3 text-muted-foreground">
                {odyssey.comingSoonNote}
              </p>
              <Button
                className="mt-6"
                nativeButton={false}
                render={<Link href="/odysseys">Browse live odysseys</Link>}
              />
            </div>
          </Reveal>
        </Container>
      ) : (
        <AlWasRightContent odyssey={odyssey} />
      )}
    </>
  );
}

function AlWasRightContent({
  odyssey,
}: {
  odyssey: NonNullable<ReturnType<typeof getOdyssey>>;
}) {
  const analysis = getWildfireAnalysis();

  return (
    <Container className="py-16">
      <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="space-y-16">
          {/* Problem statement */}
          <section id="problem" className="scroll-mt-24">
            <Reveal>
              <SectionLabel>Problem Statement</SectionLabel>
              <div className="mt-4 space-y-4 text-lg leading-relaxed text-foreground/90">
                {odyssey.problemStatement?.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
          </section>

          {/* Analysis */}
          <section id="analysis" className="scroll-mt-24">
            <Reveal>
              <SectionLabel>Analysis</SectionLabel>
              <div className="mt-4 space-y-4 text-foreground/90">
                {odyssey.analysisIntro?.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-8 rounded-2xl border border-border bg-card p-6">
                <p className="font-heading text-lg font-semibold">
                  Mega-fires (≥50,000 acres) near the PCT, 2000–2025
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Computed directly from the {analysis.totalFiresTracked}-fire
                  published dataset — {analysis.megaFireCount} fires meet the
                  mega-fire threshold.
                </p>
                <div className="mt-6">
                  <WildfireTrendChart data={analysis.yearlyTrend} />
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-8">
                <p className="font-heading text-lg font-semibold">
                  Three-era summary
                </p>
                <div className="mt-4">
                  <EraSummaryTable eras={analysis.eras} />
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-8 rounded-2xl border border-border bg-card p-6">
                <p className="font-heading text-lg font-semibold">
                  Six largest fires in the dataset
                </p>
                <ul className="mt-4 divide-y divide-border text-sm">
                  {analysis.largestFires.map((fire) => (
                    <li
                      key={fire.id}
                      className="flex items-center justify-between gap-4 py-3"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {fire.name}
                        </p>
                        <p className="text-muted-foreground">
                          {fire.year} · {fire.state} · {fire.nearestTown}
                        </p>
                      </div>
                      <p className="shrink-0 font-medium text-ember">
                        {fire.sizeAcres.toLocaleString()} acres
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </section>

          {/* Call to action */}
          <section id="action" className="scroll-mt-24">
            <Reveal>
              <SectionLabel>Call to Action</SectionLabel>
            </Reveal>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {odyssey.callToAction?.map((cta, i) => (
                <Reveal key={cta.title} delay={(i % 2) * 80}>
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <p className="font-heading font-semibold">{cta.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {cta.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Sources */}
          <section id="sources" className="scroll-mt-24">
            <Reveal>
              <SectionLabel>Sources</SectionLabel>
              <ul className="mt-4 space-y-3">
                {odyssey.sources?.map((source) => (
                  <li key={source.label} className="text-sm">
                    <span className="font-medium text-foreground">
                      {source.label}
                    </span>
                    {source.detail && (
                      <span className="text-muted-foreground">
                        {" "}
                        — {source.detail}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          {/* Datasets */}
          <section id="datasets" className="scroll-mt-24">
            <Reveal>
              <SectionLabel>Datasets</SectionLabel>
            </Reveal>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {odyssey.datasets?.map((dataset, i) => (
                <Reveal key={dataset.file} delay={(i % 2) * 80}>
                  <div className="flex flex-col rounded-2xl border border-border bg-card p-5">
                    <p className="font-heading font-semibold">
                      {dataset.label}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {dataset.rowCount} rows
                    </p>
                    <p className="mt-3 flex-1 text-sm text-muted-foreground">
                      {dataset.description}
                    </p>
                    <a
                      href={dataset.file}
                      download
                      className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-brand hover:underline"
                    >
                      <Download className="size-4" /> Download CSV
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Video */}
          <section
            id="video"
            className="scroll-mt-24 rounded-2xl border border-border bg-secondary/40 p-6"
          >
            <Reveal>
              <p className="font-heading font-semibold">Watch the PSA</p>
              <p className="mt-2 text-sm text-muted-foreground">
                The short-form video for this odyssey is published on
                Instagram. The full data case above is what backs every claim
                in it.
              </p>
              <a
                href="https://www.instagram.com/ob1odysseys"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
              >
                <AtSign className="size-4" /> View on @ob1odysseys
              </a>
            </Reveal>
          </section>
        </div>

        {/* On-page nav */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-1 border-l border-border pl-5 text-sm">
            {[
              ["problem", "Problem Statement"],
              ["analysis", "Analysis"],
              ["action", "Call to Action"],
              ["sources", "Sources"],
              ["datasets", "Datasets"],
              ["video", "Watch the PSA"],
            ].map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="block py-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </div>
        </aside>
      </div>
    </Container>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-medium uppercase tracking-wide text-brand">
      {children}
    </p>
  );
}
