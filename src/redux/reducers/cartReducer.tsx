import { CartProduct } from '@/types/product.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  cartOpen: boolean;
  cartItems: CartProduct[];
};

const initialState: InitialState = {
  cartItems: [],
  cartOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ item: CartProduct; openCart: boolean }>,
    ) => {
      const { openCart, item } = action.payload;
      const exist = state.cartItems.findIndex((i) => i._id === item._id);

      if (exist !== -1) {
        state.cartItems[exist] = {
          ...state.cartItems[exist],
          quantity: state.cartItems[exist].quantity + item.quantity,
        };
      } else {
        state.cartItems.push(item);
      }

      state.cartOpen = openCart;
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.cartOpen = action.payload;
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      const exist = state.cartItems.findIndex((i) => i._id === id);
      if (exist !== -1) {
        state.cartItems[exist].quantity = quantity;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems?.filter(
        (item) => item._id !== action.payload,
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartOpen = false;
    },
  },
});

export const {
  addToCart,
  setCartOpen,
  updateQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
