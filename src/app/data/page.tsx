import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { odysseys } from "@/content/odysseys";

export const metadata: Metadata = {
  title: "Data & Transparency — OB1 Odysseys",
  description:
    "Methodology, data-confidence flags, and every downloadable dataset behind OB1 Odysseys' analysis.",
};

const principles = [
  {
    title: "Third-party, published sources only",
    body: "Every odyssey's analysis is built on published third-party datasets, never proprietary or fabricated data — government agencies, research institutions, and cited news reporting.",
  },
  {
    title: "Raw data ships with every claim",
    body: "The source dataset behind each odyssey is published as a downloadable CSV alongside the analysis, so you can check the exact numbers behind every claim yourself.",
  },
  {
    title: "Confidence is labeled, not hidden",
    body: "Where a data point is an approximation, a centroid rather than an exact coordinate, or flagged for follow-up verification, that's noted directly in the dataset rather than smoothed over.",
  },
  {
    title: "Methodology is documented per dataset",
    body: "How each dataset was built — what was included, what was excluded, and known gaps — is written up alongside the data, not just the headline numbers.",
  },
];

export default function DataPage() {
  const datasets = odysseys.flatMap((o) =>
    (o.datasets ?? []).map((d) => ({ ...d, odyssey: o }))
  );

  return (
    <Container className="py-16">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-wide text-brand">
          Data & transparency
        </p>
        <h1 className="mt-2 max-w-2xl font-heading text-4xl font-semibold sm:text-5xl">
          Show your work.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          This program&apos;s credibility rests on analytics discipline, not
          rhetoric. Every dataset behind every odyssey is published here in
          full, alongside the methodology used to build it.
        </p>
      </Reveal>

      <section className="mt-14">
        <Reveal>
          <h2 className="font-heading text-2xl font-semibold">
            Our principles
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 80}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="font-heading font-semibold">{p.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <Reveal>
          <h2 className="font-heading text-2xl font-semibold">
            All published datasets
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Datasets are added as each odyssey&apos;s field research and
            analysis are completed — this list grows with the program.
          </p>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {datasets.map((dataset, i) => (
            <Reveal key={dataset.file} delay={(i % 2) * 80}>
              <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {dataset.odyssey.title}
                </p>
                <p className="mt-1 font-heading font-semibold">
                  {dataset.label}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {dataset.rowCount} rows
                </p>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">
                  {dataset.description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <a
                    href={dataset.file}
                    download
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
                  >
                    <Download className="size-4" /> Download CSV
                  </a>
                  <Link
                    href={`/odysseys/${dataset.odyssey.slug}`}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    View analysis →
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal>
        <section className="mt-16 rounded-2xl border border-border bg-secondary/40 p-8">
          <p className="font-heading text-lg font-semibold">Update cadence</p>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Datasets are refreshed as new field research is completed and as
            source agencies (CAL FIRE, USFS, NIFC, and others) update their
            own public records. Each dataset&apos;s methodology notes call out
            its own known gaps and recommended next steps for higher-precision
            verification.
          </p>
        </section>
      </Reveal>
    </Container>
  );
}
