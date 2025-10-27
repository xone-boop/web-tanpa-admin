// Product presentation card with add-to-cart action.
"use client";

import Link from "next/link";
import * as React from "react";
import { fmtIDR } from "@/lib/currency";
import { addItem } from "@/lib/cart";
import type { Product } from "@/lib/cart";
import { Button } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { useToast } from "@/components/ui/Toast";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { pushToast } = useToast();
  const image = product.images[0];

  const handleAdd = () => {
    addItem({
      id: product.id,
      sku: product.sku,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: image ?? "/placeholder.png",
      quantity: 1
    });
    pushToast({ title: `${product.name} ditambahkan ke keranjang` });
  };

  return (
    <div className="flex h-full flex-col rounded-2xl bg-white shadow-card">
      <Link href={`/produk/${product.slug}`} className="group relative block overflow-hidden">
        <SafeImage
          src={image}
          alt={product.name}
          width={400}
          height={400}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="space-y-1">
          <Link
            href={`/produk/${product.slug}`}
            className="line-clamp-2 font-heading text-lg text-dark transition hover:text-primary"
          >
            {product.name}
          </Link>
          <p className="text-sm font-semibold text-primary">{fmtIDR(product.price)}</p>
        </div>
        <Button onClick={handleAdd} className="mt-auto">
          Tambah
        </Button>
      </div>
    </div>
  );
};
