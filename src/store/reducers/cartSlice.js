import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const id = action.payload.id;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.cartItems.forEach((item) => {
          if (item.id === id) {
            item.quantity += 1;
          }
        });
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQty: (state, action) => {
      const id = action.payload;

      state.cartItems.forEach((item) => {
        if (item.id === id) {
          item.quantity += 1;
        }
      });
    },
    decrementQty: (state, action) => {
      const id = action.payload;

      state.cartItems.forEach((item) => {
        if (item.id === id) {
          item.quantity -= 1;
        }
      });
    },
  },
});

export const { addItem, incrementQty, decrementQty } = cartSlice.actions;
export default cartSlice.reducer;
