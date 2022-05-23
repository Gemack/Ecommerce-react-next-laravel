import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    cart: [],
    qty: "",
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.cart = [...state.cart, { ...action.payload, qty: 1 }];
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload.id);
      state.cart = state.cart.filter((p) => p.id !== action.payload.id);
    },
    changeQty: (state, action) => {
      state.cart = state.cart.filter((c) =>
        c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
      );
    },
    reset: (state) => {
      state.products = [];
      state.cart = [];
      state.qty = "";
    },
  },
});

export const { addProduct, reset, removeProduct, changeQty } =
  cartSlice.actions;
export default cartSlice.reducer;
