// Metadata helpers for consistent SEO defaults.
import type { Metadata } from "next";
import { site } from "@/config/site";
import images from "@/data/images.json";

const ogImage = images.hero[1];

export const createPageMetadata = (overrides?: Metadata): Metadata => {
  const base: Metadata = {
    title: site.storeName,
    description: site.tagline,
    openGraph: {
      title: site.storeName,
      description: site.tagline,
      type: "website",
      url: "https://scarlet-wine-beauty.example",
      images: ogImage ? [{ url: ogImage, alt: site.storeName }] : []
    },
    twitter: {
      card: "summary_large_image",
      title: site.storeName,
      description: site.tagline,
      images: ogImage ? [ogImage] : []
    }
  };

  return {
    ...base,
    ...overrides,
    openGraph: {
      ...base.openGraph,
      ...overrides?.openGraph,
      images: overrides?.openGraph?.images ?? base.openGraph?.images
    },
    twitter: {
      ...base.twitter,
      ...overrides?.twitter
    }
  };
};
