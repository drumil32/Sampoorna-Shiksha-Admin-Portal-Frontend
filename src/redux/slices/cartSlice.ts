import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItemToCart: (state, action: PayloadAction<CartItem>) => {
      // Append the new item to the existing cartItems
      state.cartItems.push(action.payload);
    },

    removeItemToCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },

    setItemUpdateQty: (state, action: PayloadAction<number>) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) state.cartItems[index].qty = action.payload.value;
    },

    clearCart: (state, action) => {
      state.cartItems = [];
    },
  },
});

export const { setItemToCart, removeItemToCart, clearCart, setItemUpdateQty } = cartSlice.actions;

export default cartSlice.reducer;
