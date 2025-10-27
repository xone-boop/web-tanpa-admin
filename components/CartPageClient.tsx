// Client cart page handling local storage interactions and UI.
"use client";

import Link from "next/link";
import * as React from "react";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { SafeImage } from "@/components/ui/SafeImage";
import { getCart, updateQty, removeItem, type CartItem } from "@/lib/cart";
import { fmtIDR } from "@/lib/currency";

export const CartPageClient: React.FC = () => {
  const [items, setItems] = React.useState<CartItem[]>([]);

  React.useEffect(() => {
    setItems(getCart());

    const handleUpdate = (event: Event) => {
      const detail = (event as CustomEvent<CartItem[]>).detail ?? [];
      setItems(detail);
    };

    window.addEventListener("cart:updated", handleUpdate as EventListener);
    return () => {
      window.removeEventListener("cart:updated", handleUpdate as EventListener);
    };
  }, []);

  const subtotal = React.useMemo(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  const handleQtyChange = (item: CartItem, quantity: number) => {
    updateQty(item.id, quantity, item.variant);
    setItems(getCart());
  };

  const handleRemove = (item: CartItem) => {
    removeItem(item.id, item.variant);
    setItems(getCart());
  };

  if (items.length === 0) {
    return (
      <div className="space-y-6 text-center">
        <h1 className="font-heading text-3xl text-dark">Keranjang kosong</h1>
        <p className="text-sm text-textDark/70">
          Produk favoritmu belum masuk ke keranjang. Mulai berbelanja sekarang!
        </p>
        <Link
          href="/produk"
          className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-textLight shadow-card transition hover:bg-[#b23632]"
        >
          Lihat Produk
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={`${item.id}-${item.variant ?? "default"}`}
            className="flex flex-col gap-4 rounded-3xl border border-dark/10 bg-white/60 p-4 md:flex-row md:items-center md:gap-6"
          >
            <div className="relative h-32 w-32 overflow-hidden rounded-2xl bg-white">
              <SafeImage
                src={item.image}
                alt={item.name}
                width={240}
                height={240}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <div>
                <h3 className="font-heading text-lg text-dark">{item.name}</h3>
                <p className="text-sm text-textDark/70">SKU: {item.sku}</p>
                {item.variant && (
                  <p className="text-xs text-textDark/60">Varian: {item.variant}</p>
                )}
              </div>
              <p className="text-sm font-semibold text-primary">{fmtIDR(item.price)}</p>
              <div className="flex flex-wrap items-center gap-4">
                <QuantityStepper
                  value={item.quantity}
                  min={1}
                  max={99}
                  onChange={(value) => handleQtyChange(item, value)}
                />
                <button
                  type="button"
                  onClick={() => handleRemove(item)}
                  className="text-xs font-semibold uppercase tracking-wide text-primary hover:text-[#b23632]"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <aside className="h-max rounded-3xl border border-primary/20 bg-white/80 p-6">
        <h2 className="font-heading text-xl text-dark">Ringkasan</h2>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-textDark/70">Subtotal</span>
          <span className="font-semibold text-dark">{fmtIDR(subtotal)}</span>
        </div>
        <p className="mt-2 text-xs text-textDark/60">
          Ongkos kirim dan promo akan dihitung saat checkout.
        </p>
        <Link
          href="/checkout"
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-textLight shadow-card transition hover:bg-[#b23632]"
        >
          Checkout
        </Link>
        <Link
          href="/produk"
          className="mt-4 block text-center text-xs uppercase tracking-wide text-primary"
        >
          Lanjut Belanja
        </Link>
      </aside>
    </div>
  );
};

