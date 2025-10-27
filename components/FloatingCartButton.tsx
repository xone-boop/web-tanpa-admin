// Mobile floating cart shortcut with live item count.
"use client";

import Link from "next/link";
import * as React from "react";
import { getCart, type CartItem } from "@/lib/cart";

const cartSvg = (
  <svg
    aria-hidden="true"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h2l1 4h13l-1.2 6H7.2L6 7M9 20a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
    />
  </svg>
);

export const FloatingCartButton: React.FC = () => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const current = getCart();
    setCount(current.reduce((total, item) => total + item.quantity, 0));

    const handleUpdate = (event: Event) => {
      const detail = (event as CustomEvent<CartItem[]>).detail ?? [];
      const total = detail.reduce((sum, item) => sum + item.quantity, 0);
      setCount(total);
    };

    window.addEventListener("cart:updated", handleUpdate as EventListener);
    return () => {
      window.removeEventListener("cart:updated", handleUpdate as EventListener);
    };
  }, []);

  return (
    <Link
      href="/keranjang"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-textLight shadow-2xl transition hover:bg-[#b23632] sm:hidden"
      aria-label="Buka keranjang"
    >
      {cartSvg}
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-dark px-1 text-[0.65rem] font-semibold text-textLight">
          {count}
        </span>
      )}
    </Link>
  );
};
