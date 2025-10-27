// Build and trigger WhatsApp checkout redirection.
import { fmtIDR } from "@/lib/currency";
import type { CartItem } from "@/lib/cart";

export type CustomerInfo = {
  name: string;
  phone: string;
  address?: string;
  note?: string;
};

export type ShippingInfo = {
  method: string;
  cost: number;
};

export type CheckoutPayload = {
  cart: CartItem[];
  customer: CustomerInfo;
  shipping: ShippingInfo;
  discount: number;
};

export const buildWhatsAppMessage = ({
  cart,
  customer,
  shipping,
  discount
}: CheckoutPayload): string => {
  const lines: string[] = [];
  lines.push("Scarlet Wine Beauty Checkout");
  lines.push("");

  cart.forEach((item, index) => {
    const variantLabel = item.variant ? ` (${item.variant})` : "";
    lines.push(
      `${index + 1}) [${item.sku}] ${item.name}${variantLabel} — x${item.quantity}`
    );
  });

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = subtotal - discount + shipping.cost;

  lines.push("");
  lines.push(`Subtotal: ${fmtIDR(subtotal)}`);
  lines.push(`Diskon: ${fmtIDR(discount)}`);
  lines.push(`Ongkir (${shipping.method}): ${fmtIDR(shipping.cost)}`);
  lines.push(`Total: ${fmtIDR(total)}`);
  lines.push("");

  lines.push("Data Pelanggan:");
  lines.push(`Nama: ${customer.name}`);
  lines.push(`No. HP: ${customer.phone}`);
  if (customer.address) {
    lines.push(`Alamat: ${customer.address}`);
  }
  if (customer.note) {
    lines.push(`Catatan: ${customer.note}`);
  }

  return lines.join("\n");
};

export const goToWhatsApp = (adminPhone: string, message: string): void => {
  if (typeof window === "undefined") return;
  const phone = adminPhone.replace(/[^0-9]/g, "");
  const encoded = encodeURIComponent(message);
  window.location.href = `https://wa.me/${phone}?text=${encoded}`;
};
