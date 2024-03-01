import { createSlice } from "@reduxjs/toolkit";
import { StateData, StateType } from "../../lib/config/type";
import { ProductModel } from './../../../../lib/model/product-model';

const initialState: StateType<StateData<ProductModel[]>> = {
  value: {
    data: [],
    error: null,
  },
};

export const productSlice = createSlice({
  name: "productPopular",
  initialState,
  reducers: {
    productPopularError: (state, action) => {
      state.value = { ...state.value, error: action.payload };
    },
    productPopularComplete: (state, action) => {
      state.value = { ...state.value, error: null, data: action.payload };
    },
  },
});

export const { productPopularError, productPopularComplete } = productSlice.actions;
export default productSlice.reducer;
