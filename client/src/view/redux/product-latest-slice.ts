import { createSlice } from "@reduxjs/toolkit";
import { StateData, StateType } from "../../lib/config/type";
import { ProductModel } from "./../../../../lib/model/product-model";

const initialState: StateType<StateData<ProductModel[]>> = {
  value: {
    data: [],
    error: null,
  },
};

export const productSlice = createSlice({
  name: "productLatest",
  initialState,
  reducers: {
    productLatestError: (state, action) => {
      state.value = { ...state.value, error: action.payload };
    },
    productLatestComplete: (state, action) => {
      state.value = { ...state.value, error: null, data: action.payload };
    },
  },
});

export const { productLatestError, productLatestComplete } =
  productSlice.actions;
export default productSlice.reducer;
