import type { Metadata } from "next";
import { Container } from "@/components/site/container";
import { OdysseyCard } from "@/components/site/odyssey-card";
import { Reveal } from "@/components/site/reveal";
import { odysseys } from "@/content/odysseys";

export const metadata: Metadata = {
  title: "Odysseys - OB1 Odysseys",
  description:
    "Browse every OB1 odyssey: place-based research trips paired with sourced, data-driven analysis.",
};

export default function OdysseysIndexPage() {
  return (
    <Container className="py-16">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-wide text-brand">
          The odysseys
        </p>
        <h1 className="mt-2 max-w-2xl font-heading text-4xl font-semibold">
          Place-based research trips, backed by open data.
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Every odyssey follows the same structure: a Problem Statement, the
          Analysis behind it, a concrete Call to Action, full Sources, and the
          raw Datasets, so every claim in the field video can be checked
          here.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {odysseys.map((odyssey, i) => (
          <Reveal key={odyssey.slug} delay={i * 80}>
            <OdysseyCard odyssey={odyssey} />
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
