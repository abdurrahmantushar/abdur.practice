// src/app.store/store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slice/adminslice";
import cardReducer from "./slice/cardslice";

export const Store = configureStore({
  reducer: {
    productsR: productsReducer,
    cardR:cardReducer
  }
});
