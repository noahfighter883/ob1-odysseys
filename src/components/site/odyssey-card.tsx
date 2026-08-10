import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Odyssey } from "@/content/odysseys";
import { odysseyThemeStyles } from "@/lib/odyssey-theme";
import { Badge } from "@/components/ui/badge";

export function OdysseyCard({ odyssey }: { odyssey: Odyssey }) {
  const isLive = odyssey.status === "live";

  return (
    <Link
      href={`/odysseys/${odyssey.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lg"
    >
      <div
        className={`relative flex h-40 items-end overflow-hidden p-5 text-white ${
          odyssey.heroImage ? "bg-black" : odysseyThemeStyles[odyssey.theme]
        }`}
      >
        {odyssey.heroImage && (
          <Image
            src={odyssey.heroImage.src}
            alt={odyssey.heroImage.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            style={{ objectPosition: odyssey.heroImage.position }}
          />
        )}
        <div className="absolute inset-0 bg-black/65" />
        <Badge
          variant="secondary"
          className="absolute right-4 top-4 z-10 border-0 bg-white/15 text-white backdrop-blur"
        >
          {isLive ? "Live" : (
            <span className="flex items-center gap-1">
              <Clock className="size-3" /> Coming soon
            </span>
          )}
        </Badge>
        <p className="relative z-10 font-heading text-xl font-semibold leading-snug">
          {odyssey.title}
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {odyssey.location}
        </p>
        <p className="text-sm text-foreground/80">{odyssey.hook}</p>
        <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-brand">
          {isLive ? "Read the odyssey" : "See what's coming"}
          <ArrowUpRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
