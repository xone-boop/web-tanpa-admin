// Client checkout page handling form state and WhatsApp redirect.
"use client";

import * as React from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { SafeImage } from "@/components/ui/SafeImage";
import {
  getCart,
  type CartItem,
  updateQty,
  removeItem,
  clearCart
} from "@/lib/cart";
import { fmtIDR } from "@/lib/currency";
import { buildWhatsAppMessage, goToWhatsApp } from "@/lib/wa";
import { useToast } from "@/components/ui/Toast";
import { site } from "@/config/site";

const shippingOptions = ["JNE", "J&T", "SiCepat", "GoSend/Grab"];

export const CheckoutPageClient: React.FC = () => {
  const { pushToast } = useToast();
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [note, setNote] = React.useState("");
  const [shippingMethod, setShippingMethod] = React.useState(shippingOptions[0]);
  const [shippingCost, setShippingCost] = React.useState(0);
  const [discount, setDiscount] = React.useState(0);

  React.useEffect(() => {
    setCartItems(getCart());
    const handleUpdate = (event: Event) => {
      const detail = (event as CustomEvent<CartItem[]>).detail ?? [];
      setCartItems(detail);
    };
    window.addEventListener("cart:updated", handleUpdate as EventListener);
    return () => {
      window.removeEventListener("cart:updated", handleUpdate as EventListener);
    };
  }, []);

  const subtotal = React.useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const total = Math.max(0, subtotal - discount + shippingCost);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      pushToast({ title: "Keranjang masih kosong", intent: "error" });
      return;
    }

    if (!name.trim() || !phone.trim()) {
      pushToast({ title: "Nama dan nomor HP wajib diisi", intent: "error" });
      return;
    }

    const message = buildWhatsAppMessage({
      cart: cartItems,
      customer: {
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim() || undefined,
        note: note.trim() || undefined
      },
      shipping: {
        method: shippingMethod,
        cost: shippingCost
      },
      discount
    });

    clearCart();
    pushToast({ title: "Mengalihkan ke WhatsApp" });
    goToWhatsApp(site.waAdmin, message);
  };

  const handleQtyChange = (item: CartItem, value: number) => {
    updateQty(item.id, value, item.variant);
    setCartItems(getCart());
  };

  const handleRemove = (item: CartItem) => {
    removeItem(item.id, item.variant);
    setCartItems(getCart());
  };

  return (
    <div className="space-y-10">
      <h1 className="font-heading text-3xl text-dark">Checkout</h1>
      <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr]">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-3xl border border-dark/10 bg-white/80 p-6 shadow-card">
            <h2 className="font-heading text-xl text-dark">Data Pelanggan</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-textDark/70">
                  Nama Lengkap*
                </label>
                <Input value={name} onChange={(event) => setName(event.target.value)} required />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-textDark/70">
                  Nomor WhatsApp*
                </label>
                <Input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="628xxxxxxxxxx"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-textDark/70">
                  Alamat Pengiriman
                </label>
                <Input value={address} onChange={(event) => setAddress(event.target.value)} />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-textDark/70">
                  Catatan
                </label>
                <Input value={note} onChange={(event) => setNote(event.target.value)} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-dark/10 bg-white/80 p-6 shadow-card">
            <h2 className="font-heading text-xl text-dark">Pengiriman & Promo</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-textDark/70">
                  Metode Pengiriman
                </label>
                <Select
                  value={shippingMethod}
                  onChange={(event) => setShippingMethod(event.target.value)}
                >
                  {shippingOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-textDark/70">
                  Ongkir (IDR)
                </label>
                <Input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={shippingCost}
                  onChange={(event) => setShippingCost(Number(event.target.value) || 0)}
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-textDark/70">
                  Diskon (IDR)
                </label>
                <Input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={discount}
                  onChange={(event) => setDiscount(Number(event.target.value) || 0)}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-textLight shadow-card transition hover:bg-[#b23632]"
          >
            Kirim Detail via WhatsApp
          </button>
        </form>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-primary/20 bg-white/90 p-6 shadow-card">
            <h2 className="font-heading text-xl text-dark">Ringkasan Pesanan</h2>
            <div className="mt-4 space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-sm text-textDark/60">Keranjang kamu kosong.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={`${item.id}-${item.variant ?? "default"}`} className="flex gap-4">
                    <div className="h-20 w-20 overflow-hidden rounded-2xl">
                      <SafeImage
                        src={item.image}
                        alt={item.name}
                        width={120}
                        height={120}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-semibold text-dark">{item.name}</p>
                      {item.variant && (
                        <p className="text-xs text-textDark/60">Varian: {item.variant}</p>
                      )}
                      <p className="text-xs text-textDark/60">SKU: {item.sku}</p>
                      <div className="flex items-center justify-between">
                        <QuantityStepper
                          value={item.quantity}
                          min={1}
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
                ))
              )}
            </div>
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-textDark/70">Subtotal</span>
                <span className="font-semibold text-dark">{fmtIDR(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-textDark/70">Diskon</span>
                <span className="font-semibold text-dark">{fmtIDR(discount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-textDark/70">Ongkir</span>
                <span className="font-semibold text-dark">{fmtIDR(shippingCost)}</span>
              </div>
              <div className="flex justify-between border-t border-dark/10 pt-2 text-base font-semibold text-dark">
                <span>Total</span>
                <span>{fmtIDR(total)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

