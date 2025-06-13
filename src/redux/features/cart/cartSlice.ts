import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
  category: string;
}

interface StoreCart {
  items: CartItem[];
  totalItems: number;
}

interface CartState {
  stores: Record<string, StoreCart>;
  currentStore: string | null;
}

// Load cart from localStorage if available
const loadCartFromStorage = (): CartState => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        return {
          stores: parsedCart.stores || {},
          currentStore: parsedCart.currentStore || null,
        };
      } catch (e) {
        console.error("Failed to parse cart from localStorage:", e);
      }
    }
  }
  return { stores: {}, currentStore: null };
};

// Save cart to localStorage
const saveCartToStorage = (cart: CartState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

const initialState: CartState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCurrentStore: (state, action: PayloadAction<string>) => {
      state.currentStore = action.payload;

      // Initialize store cart if it doesn't exist
      if (!state.stores[action.payload]) {
        state.stores[action.payload] = {
          items: [],
          totalItems: 0,
        };
      }

      saveCartToStorage(state);
    },

    addToCart: (
      state,
      action: PayloadAction<{
        item: Omit<CartItem, "quantity">;
        storeSlug: string;
      }>
    ) => {
      const { item, storeSlug } = action.payload;

      // Initialize store cart if it doesn't exist
      if (!state.stores[storeSlug]) {
        state.stores[storeSlug] = {
          items: [],
          totalItems: 0,
        };
      }

      const storeCart = state.stores[storeSlug];
      const existingItem = storeCart.items.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        storeCart.items.push({ ...item, quantity: 1 });
      }

      storeCart.totalItems = storeCart.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      saveCartToStorage(state);
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ id: number; storeSlug: string }>
    ) => {
      const { id, storeSlug } = action.payload;

      if (!state.stores[storeSlug]) return;

      const storeCart = state.stores[storeSlug];
      storeCart.items = storeCart.items.filter((item) => item.id !== id);
      storeCart.totalItems = storeCart.items.reduce(
        (total, item) => total + item.quantity,
        0
      );

      saveCartToStorage(state);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number; storeSlug: string }>
    ) => {
      const { id, quantity, storeSlug } = action.payload;

      if (!state.stores[storeSlug]) return;

      const storeCart = state.stores[storeSlug];
      const item = storeCart.items.find((item) => item.id === id);

      if (item) {
        item.quantity = Math.max(1, quantity); // Ensure quantity is at least 1
      }

      storeCart.totalItems = storeCart.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      saveCartToStorage(state);
    },

    clearCart: (state, action: PayloadAction<string>) => {
      const storeSlug = action.payload;

      if (state.stores[storeSlug]) {
        state.stores[storeSlug] = {
          items: [],
          totalItems: 0,
        };
      }

      saveCartToStorage(state);
    },
  },
});

export const {
  setCurrentStore,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
