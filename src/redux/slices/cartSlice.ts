import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShowVendorOrder } from "../../types/VendorOrder";

interface CartState {
  cartItems: ShowVendorOrder[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItemToCart: (state, action: PayloadAction<ShowVendorOrder>) => {
      // Append the new item to the existing cartItems
      state.cartItems.push(action.payload);
    },

    removeItemToCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((item) => item.toy.id !== action.payload);
    },

    setUpdateQty: (state, action: PayloadAction<ShowVendorOrder>) => {
      if (action.payload.quantity < 1) {
        return;
      }
      console.log(action.payload.quantity)
      const index = state.cartItems.findIndex((item) => item.toy.id === action.payload.toy.id);
      if (index !== -1) state.cartItems[index].quantity = isNaN(action.payload.quantity) ? 0 : action.payload.quantity;
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { setItemToCart, removeItemToCart, clearCart, setUpdateQty } =
  cartSlice.actions;

export default cartSlice.reducer;
