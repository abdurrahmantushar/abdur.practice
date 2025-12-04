import { createSlice } from "@reduxjs/toolkit";

export const cardSlice = createSlice({
  name: "card",
  initialState: [],
  reducers: {

    AddItem: (state, action) => {
      const exist = state.find(item => item.product.id === action.payload.product.id);
      if (exist) {
        exist.quantity += 1;
      } else {
        state.push({
          ...action.payload,
          quantity: 1
        });
      }
    },

    CutItem: (state, action) => {
      return state.filter(item => item.product.id !== action.payload);
    },
    Increment: (state, action) => {
  const exist = state.find(item => item.product.id === action.payload);
  if (exist) {
    exist.quantity += 1;
  }
},Decrement: (state, action) => {
  const exist = state.find(item => item.product.id === action.payload);
  if (exist && exist.quantity > 1) {
    exist.quantity -= 1;
  }
},


  }
});

export const { AddItem, CutItem, Increment, Decrement} = cardSlice.actions;
export default cardSlice.reducer;
