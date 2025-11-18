// src/app.store/store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slice/adminslice";

export const Store = configureStore({
  reducer: {
    productsR: productsReducer
  }
});
