// Catalog page with search and category filtering.
import productsData from "@/data/products.json";
import type { Product } from "@/lib/cart";
import { createPageMetadata } from "@/lib/seo";
import { CatalogClient } from "@/components/CatalogClient";

export const metadata = createPageMetadata({
  title: "Katalog Produk | Scarlet Wine Beauty",
  description: "Temukan koleksi makeup Scarlet Wine dengan filter kategori dan pencarian."
});

export default function CatalogPage() {
  return <CatalogClient products={productsData as Product[]} />;
}
