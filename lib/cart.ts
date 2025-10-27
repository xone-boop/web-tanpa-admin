// Local storage cart utilities with custom events for UI updates.
export type ProductVariant = {
  name: string;
  options: string[];
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  description: string;
  categories: string[];
  stock: number;
  variants?: ProductVariant;
};

export type CartItem = {
  id: string;
  sku: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
};

const STORAGE_KEY = "scarlet-wine:cart";

const emitCartEvent = (items: CartItem[]) => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<CartItem[]>("cart:updated", { detail: items })
  );
};

const readStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch (error) {
    console.error("Failed to parse cart", error);
    return [];
  }
};

const writeStorage = (items: CartItem[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  emitCartEvent(items);
};

export const getCart = (): CartItem[] => readStorage();

export const setCart = (items: CartItem[]): void => {
  writeStorage(items);
};

export const addItem = (item: CartItem): void => {
  const cart = readStorage();
  const existingIndex = cart.findIndex((entry) => {
    return entry.id === item.id && entry.variant === item.variant;
  });

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }

  writeStorage(cart);
};

export const updateQty = (
  id: string,
  quantity: number,
  variant?: string
): void => {
  const cart = readStorage();
  const updated = cart
    .map((item) => {
      if (item.id === id && item.variant === variant) {
        return { ...item, quantity };
      }
      return item;
    })
    .filter((item) => item.quantity > 0);

  writeStorage(updated);
};

export const removeItem = (id: string, variant?: string): void => {
  const cart = readStorage();
  const filtered = cart.filter((item) => {
    return !(item.id === id && item.variant === variant);
  });

  writeStorage(filtered);
};

export const clearCart = (): void => {
  writeStorage([]);
};

export const getCartCount = (): number => {
  return readStorage().reduce((acc, item) => acc + item.quantity, 0);
};

export const getCartSubtotal = (): number => {
  return readStorage().reduce((acc, item) => acc + item.price * item.quantity, 0);
};
