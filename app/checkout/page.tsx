// Checkout page exporting metadata and rendering client form workflow.
import { CheckoutPageClient } from "@/components/CheckoutPageClient";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Checkout WhatsApp | Scarlet Wine Beauty",
  description: "Isi data pengiriman dan lanjutkan pembayaran via WhatsApp dengan admin Scarlet Wine."
});

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
