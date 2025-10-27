// Cart page exporting metadata and rendering client functionality.
import { CartPageClient } from "@/components/CartPageClient";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Keranjang Belanja | Scarlet Wine Beauty",
  description: "Tinjau produk Scarlet Wine yang ada di keranjang sebelum checkout."
});

export default function CartPage() {
  return <CartPageClient />;
}
