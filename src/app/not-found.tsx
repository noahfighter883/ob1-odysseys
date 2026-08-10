import type { Metadata } from "next";
import Link from "next/link";
import { Compass } from "lucide-react";
import { Container } from "@/components/site/container";
import { Button } from "@/components/ui/button";
import { odysseys } from "@/content/odysseys";

export const metadata: Metadata = {
  title: "Page Not Found - OB1 Odysseys",
};

export default function NotFound() {
  const liveOdyssey = odysseys.find((o) => o.status === "live");

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-brand/10 text-brand">
        <Compass className="size-6" />
      </div>
      <p className="mt-6 text-sm font-medium uppercase tracking-wide text-brand">
        404
      </p>
      <h1 className="mt-2 max-w-md font-heading text-3xl font-semibold sm:text-4xl">
        This trail doesn&apos;t lead anywhere.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you followed doesn&apos;t exist. It may have moved, or the
        link was mistyped. The odysseys are still right where you left them.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button size="lg" nativeButton={false} render={<Link href="/odysseys">Browse odysseys</Link>} />
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          render={<Link href="/">Back to home</Link>}
        />
      </div>
      {liveOdyssey && (
        <p className="mt-10 text-sm text-muted-foreground">
          Looking for the data?{" "}
          <Link
            href={`/odysseys/${liveOdyssey.slug}`}
            className="text-brand underline underline-offset-2"
          >
            Start with {liveOdyssey.title} →
          </Link>
        </p>
      )}
    </Container>
  );
}
