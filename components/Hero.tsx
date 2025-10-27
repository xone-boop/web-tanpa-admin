// Landing hero section with gradient overlay and CTA.
"use client";

import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import images from "@/data/images.json";

export const Hero = () => {
  const heroImage = images.hero[0];

  return (
    <section className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden rounded-3xl bg-dark text-textLight">
      <SafeImage
        src={heroImage}
        alt="Scarlet Wine Beauty Hero"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/60 to-transparent" />
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-accent">Scarlet Wine</p>
        <h1 className="font-heading text-4xl font-semibold md:text-6xl">
          Discover Wine-Infused Luxury Beauty
        </h1>
        <p className="max-w-2xl text-base text-textLight/80 md:text-lg">
          Artisan makeup inspired by deep crimson palettes and crafted textures.
          Formulated to elevate your rituals with velvety finishes and long-wear comfort.
        </p>
        <Link
          href="/produk"
          className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-textLight shadow-card transition hover:bg-[#b23632]"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};
