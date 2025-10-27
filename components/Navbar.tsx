// Primary navigation bar with brand links and WhatsApp CTA.
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { clsx } from "clsx";
import { getCart, type CartItem } from "@/lib/cart";
import { site } from "@/config/site";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Produk", href: "/produk" },
  { label: "Tentang", href: "/tentang" },
  { label: "FAQ", href: "/faq" }
];

const getCountFromItems = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [cartCount, setCartCount] = React.useState(0);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setCartCount(getCountFromItems(getCart()));

    const handleUpdate = (event: Event) => {
      const detail = (event as CustomEvent<CartItem[]>).detail;
      setCartCount(getCountFromItems(detail ?? []));
    };

    window.addEventListener("cart:updated", handleUpdate as EventListener);
    return () => {
      window.removeEventListener("cart:updated", handleUpdate as EventListener);
    };
  }, []);

  React.useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="font-heading text-2xl font-semibold text-dark">
          Scarlet Wine Beauty
        </Link>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-dark/10 text-dark transition hover:bg-primary/10 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 rounded bg-current" />
            <span className="block h-0.5 w-5 rounded bg-current" />
            <span className="block h-0.5 w-5 rounded bg-current" />
          </span>
        </button>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "text-sm font-medium transition",
                  isActive
                    ? "text-primary"
                    : "text-textDark hover:text-primary"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/keranjang"
            className="relative text-sm font-medium text-dark transition hover:text-primary"
          >
            Keranjang
            {cartCount > 0 && (
              <span className="absolute -right-3 -top-2 h-5 min-w-[1.25rem] rounded-full bg-primary px-1 text-center text-xs font-semibold text-textLight">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            href={`https://wa.me/${site.waAdmin}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center rounded-full bg-primary px-4 text-sm font-semibold text-textLight shadow-card transition hover:bg-[#b23632]"
          >
            Chat WA
          </Link>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-dark/10 bg-surface px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "text-sm font-medium transition",
                    isActive
                      ? "text-primary"
                      : "text-textDark hover:text-primary"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/keranjang"
              className="flex items-center justify-between text-sm font-medium text-dark transition hover:text-primary"
            >
              Keranjang
              {cartCount > 0 && (
                <span className="ml-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold text-textLight">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              href={`https://wa.me/${site.waAdmin}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-textLight shadow-card transition hover:bg-[#b23632]"
            >
              Chat WA
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
