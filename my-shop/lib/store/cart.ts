import { create } from "zustand";
import type { CartItem } from "../types/cart";

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (documentId: string) => void;
  updateQuantity: (documentId: string, qty: number) => void;
  clearCart: () => void;
  total: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (item) => {
    const exists = get().items.find((i) => i.documentId === item.documentId);

    if (exists) {
      set({
        items: get().items.map((i) =>
          i.documentId === item.documentId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        ),
      });
    } else {
      set({ items: [...get().items, item] });
    }
  },

  removeItem: (documentId) =>
    set({ items: get().items.filter((i) => i.documentId !== documentId) }),

  updateQuantity: (documentId, quantity) =>
    set({
      items: get().items.map((i) =>
        i.documentId === documentId ? { ...i, quantity } : i
      ),
    }),

  clearCart: () => set({ items: [] }),

  total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));
