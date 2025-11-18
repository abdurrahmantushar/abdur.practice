import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../CustomComponents/customCode";

const initialState = {
  products: [],
  isLoading: false,
  error: null
};

// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async () => {
//     const res = await axios.get(serverUrl);
//     return res.data; 
//   });

export const addProducts = createAsyncThunk(
  'products/addProducts',
  async ( product)=>{
    const res = await axios.post(serverUrl,product)
    return res.data;
  });

export const editProducts= createAsyncThunk(
  'products/editProducts',
  async ({id,product})=>{
    const res= await axios.put (`${serverUrl}/${id}`, product)
    return res.data;
  });

export const deleteProducts= createAsyncThunk(
  'products/deleteProducts',
  async (id)=>{
   await axios.delete(`${serverUrl}/${id}`)
    return id;
  }
)

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(fetchProducts.pending, (state) => {
      //   state.isLoading = true;
      //   state.error = null;
      // })
      // .addCase(fetchProducts.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.products = action.payload; 
      // })
      // .addCase(fetchProducts.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.error.message;
      // })
      .addCase( addProducts.fulfilled,(state,action)=>{
        state.products.push(action.payload)
      })
      .addCase(deleteProducts.fulfilled,(state,action)=>{
        state.products= state.products.filter((product)=>
        product.id !== action.payload
      )})
      .addCase(editProducts.fulfilled, (state, action)=>{
        const index = state.products.findIndex(
          (product)=> product.id === action.payload.id
        )
        if (index !== -1){
          state.products[index]=action.payload;
        }
      })
  }
});

export default productsSlice.reducer;
 