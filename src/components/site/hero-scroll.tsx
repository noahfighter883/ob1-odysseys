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
  odysseyHref: string;
  takeActionHref: string;
};

export function HeroScroll({
  tagline,
  description,
  odysseyHref,
  takeActionHref,
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

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.8]);

  const content = (
    <>
      <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 ease-out">
        <Ob1Byline className="mb-5" />
        <h1 className="max-w-4xl font-heading text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          {tagline}
        </h1>
      </div>
      <p className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both delay-100 mt-6 max-w-xl text-lg text-white/80 duration-700 ease-out">
        {description}
      </p>
      <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both delay-200 mt-8 flex flex-wrap gap-4 duration-700 ease-out">
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
            <Link href={takeActionHref}>
              Take action <ArrowRight className="size-4" />
            </Link>
          }
        />
      </div>
    </>
  );

  // Server-rendered / not-yet-hydrated / reduced-motion: a single static hero,
  // no pin, no header hide-on-load (the header watches for #hero-pinned).
  if (!mounted || reduceMotion) {
    return (
      <section
        id="hero-pinned"
        className="relative flex min-h-[90vh] items-end overflow-hidden bg-black text-white"
      >
        <Image
          src="/images/hero-climate.png"
          alt={HERO_ALT}
          fill
          priority
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/65" />
        <Container className="relative z-10 pb-20 pt-40">{content}</Container>
      </section>
    );
  }

  return (
    <section
      id="hero-pinned"
      ref={containerRef}
      className="relative h-[160vh]"
    >
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
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
        <Container className="relative z-10 pb-20 pt-40">{content}</Container>
      </div>
    </section>
  );
}
