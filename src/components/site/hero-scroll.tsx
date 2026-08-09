"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/container";
import { Ob1Byline } from "@/components/site/ob1-byline";
import { Button } from "@/components/ui/button";

const HERO_ALT =
  "A composite image of wildfire devastation and glacial collapse split around Earth, illustrating climate urgency.";

type HeroScrollProps = {
  tagline: string;
  description: string;
  statValue: string;
  statLabel: string;
  odysseyHref: string;
  instagramUrl: string;
  instagramHandle: string;
};

export function HeroScroll({
  tagline,
  description,
  statValue,
  statLabel,
  odysseyHref,
  instagramUrl,
  instagramHandle,
}: HeroScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Intentional hydration-completion signal, not state sync — the
    // scroll-linked pin below only mounts client-side, post-hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.55, 0.7, 0.85]
  );

  // Beat 1: mission tagline + description
  const beat1Opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.3],
    [1, 1, 0]
  );
  const beat1Y = useTransform(scrollYProgress, [0, 0.3], [0, -32]);

  // Beat 2: the wildfire stat, pulled from the live dataset
  const beat2Opacity = useTransform(
    scrollYProgress,
    [0.28, 0.4, 0.58, 0.68],
    [0, 1, 1, 0]
  );
  const beat2Y = useTransform(scrollYProgress, [0.28, 0.68], [32, -32]);

  // Beat 3: the closing hand-off line
  const beat3Opacity = useTransform(
    scrollYProgress,
    [0.62, 0.76, 1],
    [0, 1, 1]
  );
  const beat3Y = useTransform(scrollYProgress, [0.62, 0.85], [32, 0]);

  const buttons = (
    <div className="mt-8 flex flex-wrap gap-4">
      <Button
        size="lg"
        nativeButton={false}
        className="bg-white text-black hover:bg-white/90"
        render={
          <Link href={odysseyHref}>
            Explore the odysseys <ArrowRight className="size-4" />
          </Link>
        }
      />
      <Button
        size="lg"
        variant="outline"
        nativeButton={false}
        className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
        render={
          <a href={instagramUrl} target="_blank" rel="noreferrer">
            Follow {instagramHandle}
          </a>
        }
      />
    </div>
  );

  // Server-rendered / not-yet-hydrated / reduced-motion: a single static hero.
  if (!mounted || reduceMotion) {
    return (
      <section
        key="hero-static"
        className="relative flex min-h-[90vh] items-end overflow-hidden bg-black text-white"
      >
        <Image
          src="/images/hero-climate.png"
          alt={HERO_ALT}
          fill
          priority
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
        <Container className="relative z-10 pb-20 pt-40">
          <Ob1Byline className="mb-5" />
          <h1 className="max-w-4xl font-heading text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            {tagline}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">{description}</p>
          {buttons}
        </Container>
      </section>
    );
  }

  return (
    <section key="hero-pinned" ref={containerRef} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen items-end overflow-hidden bg-black text-white">
        <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
          <Image
            src="/images/hero-climate.png"
            alt={HERO_ALT}
            fill
            priority
            className="object-cover opacity-90"
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10"
          style={{ opacity: overlayOpacity }}
        />
        <Container className="relative z-10 flex h-full flex-col justify-end pb-20 pt-40">
          <div className="relative min-h-[300px] sm:min-h-[260px]">
            <motion.div
              style={{ opacity: beat1Opacity, y: beat1Y, willChange: "opacity, transform" }}
              className="absolute inset-0"
            >
              <Ob1Byline className="mb-5" />
              <h1 className="max-w-4xl font-heading text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
                {tagline}
              </h1>
              <p className="mt-6 max-w-xl text-lg text-white/80">
                {description}
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: beat2Opacity, y: beat2Y, willChange: "opacity, transform" }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <p className="font-heading text-6xl font-semibold leading-none sm:text-7xl">
                {statValue}
              </p>
              <p className="mt-4 max-w-md text-lg text-white/80">
                {statLabel}
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: beat3Opacity, y: beat3Y, willChange: "opacity, transform" }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <p className="max-w-md font-heading text-3xl font-semibold leading-tight sm:text-4xl">
                Every claim here is sourced. Check the work yourself.
              </p>
            </motion.div>
          </div>
          {buttons}
        </Container>
      </div>
    </section>
  );
}
