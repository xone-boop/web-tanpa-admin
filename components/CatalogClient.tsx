// Client-side catalog with search and category filters.
"use client";

import * as React from "react";
import { clsx } from "clsx";
import type { Product } from "@/lib/cart";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/Input";

const categories = ["Semua", "Lips", "Eyes", "Face", "Sets"] as const;

interface CatalogClientProps {
  products: Product[];
}

export const CatalogClient: React.FC<CatalogClientProps> = ({ products }) => {
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState<(typeof categories)[number]>("Semua");

  const filteredProducts = React.useMemo(() => {
    const sanitizedSearch = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        category === "Semua" || product.categories.includes(category);
      const matchesSearch =
        sanitizedSearch.length === 0 ||
        product.name.toLowerCase().includes(sanitizedSearch) ||
        product.description.toLowerCase().includes(sanitizedSearch);
      return matchesCategory && matchesSearch;
    });
  }, [products, category, search]);

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h1 className="font-heading text-3xl text-dark">Katalog Scarlet Wine</h1>
        <p className="text-sm text-textDark/70">
          Jelajahi setiap koleksi dengan filter kategori dan pencarian instan.
        </p>
        <Input
          placeholder="Cari produk..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={clsx(
                "rounded-full border px-4 py-2 text-sm transition",
                category === item
                  ? "border-primary bg-primary text-textLight"
                  : "border-dark/10 bg-white text-textDark hover:border-primary/40"
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </header>

      {filteredProducts.length === 0 ? (
        <div className="rounded-3xl border border-primary/20 bg-white/60 p-10 text-center text-sm text-textDark/70">
          Tidak ditemukan produk untuk pencarian ini. Coba kata kunci atau kategori lain.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
