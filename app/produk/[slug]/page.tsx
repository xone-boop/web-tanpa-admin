// Dynamic product detail page with metadata and related items.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import products from "@/data/products.json";
import type { Product } from "@/lib/cart";
import { ProductDetail } from "@/components/ProductDetail";
import { ProductCard } from "@/components/ProductCard";
import { createPageMetadata } from "@/lib/seo";
import { site } from "@/config/site";

const productList = products as Product[];

export const dynamicParams = false;

export function generateStaticParams() {
  return productList.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({
  params
}: {
  params: { slug: string };
}): Metadata {
  const product = productList.find((item) => item.slug === params.slug);
  if (!product) {
    return createPageMetadata({ title: site.storeName });
  }

  return createPageMetadata({
    title: `${product.name} | ${site.storeName}`,
    description: product.description,
    openGraph: {
      images: product.images.map((image) => ({ url: image, alt: product.name }))
    }
  });
}

export default function ProductDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const product = productList.find((item) => item.slug === params.slug);

  if (!product) {
    notFound();
  }

  const related = productList
    .filter((item) => item.id !== product.id && item.categories[0] === product.categories[0])
    .slice(0, 3);

  return (
    <div className="space-y-14">
      <ProductDetail product={product} />
      {related.length > 0 && (
        <section className="space-y-6">
          <h2 className="font-heading text-2xl text-dark">Rekomendasi Serupa</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
