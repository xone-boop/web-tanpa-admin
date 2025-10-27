// Detailed product view with gallery and cart integration.
"use client";

import * as React from "react";
import { fmtIDR } from "@/lib/currency";
import { addItem } from "@/lib/cart";
import type { Product } from "@/lib/cart";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Button } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { useToast } from "@/components/ui/Toast";

interface ProductDetailProps {
  product: Product;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { pushToast } = useToast();
  const [selectedImage, setSelectedImage] = React.useState(product.images[0]);
  const [quantity, setQuantity] = React.useState(1);
  const [variant, setVariant] = React.useState<string | undefined>(
    product.variants ? product.variants.options[0] : undefined
  );

  React.useEffect(() => {
    setSelectedImage(product.images[0]);
    if (product.variants) {
      setVariant(product.variants.options[0]);
    }
  }, [product]);

  const handleAdd = () => {
    addItem({
      id: product.id,
      sku: product.sku,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: selectedImage ?? product.images[0] ?? "/placeholder.png",
      quantity,
      variant
    });
    pushToast({ title: `${product.name} ditambahkan ke keranjang` });
  };

  return (
    <div className="grid gap-10 md:grid-cols-[1.1fr_1fr]">
      <div>
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-card">
          <SafeImage
            src={selectedImage}
            alt={product.name}
            width={800}
            height={800}
            className="h-[420px] w-full object-cover"
          />
        </div>
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {product.images.map((image) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border ${
                selectedImage === image ? "border-primary" : "border-transparent"
              }`}
              aria-label="Pilih gambar produk"
            >
              <SafeImage src={image} alt={product.name} width={160} height={160} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <h1 className="font-heading text-3xl text-dark">{product.name}</h1>
          <p className="text-xl font-semibold text-primary">{fmtIDR(product.price)}</p>
        </div>
        <p className="text-sm leading-relaxed text-textDark/80">{product.description}</p>
        {product.variants && (
          <div className="space-y-3">
            <span className="text-sm font-semibold text-textDark">
              {product.variants.name}
            </span>
            <div className="flex flex-wrap gap-2">
              {product.variants.options.map((option) => {
                const active = option === variant;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setVariant(option)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      active
                        ? "border-primary bg-primary text-textLight"
                        : "border-dark/20 bg-white text-textDark hover:border-primary/60"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-4">
          <QuantityStepper value={quantity} onChange={setQuantity} max={product.stock} />
          <Button onClick={handleAdd} className="w-full">
            Tambah ke Keranjang
          </Button>
        </div>
        <div className="hidden rounded-3xl border border-primary/20 bg-primary/5 p-6 md:block">
          <h2 className="font-heading text-lg text-dark">Detail Produk</h2>
          <ul className="mt-3 space-y-2 text-sm text-textDark/80">
            <li>Kategori: {product.categories.join(", ")}</li>
            <li>Stok tersedia: {product.stock}</li>
            {product.variants && <li>Varian: {product.variants.options.join(", ")}</li>}
          </ul>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-40 bg-white/95 p-4 shadow-[0_-12px_30px_-20px_rgba(0,0,0,0.3)] md:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-textDark/60">Total</p>
            <p className="text-lg font-semibold text-dark">
              {fmtIDR(product.price * quantity)}
            </p>
          </div>
          <Button onClick={handleAdd} className="min-w-[45%]">
            Tambah ke Keranjang
          </Button>
        </div>
      </div>
    </div>
  );
};
