import { createSlice } from "@reduxjs/toolkit";
import { Empty, StateData, StateType } from "../../lib/config/type";
import { ProductModel } from './../../../../lib/model/product-model';

const initialState: StateType<StateData<ProductModel | Empty>> = {
  value: {
    data: null,
    error: null,
  },
};

export const slice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    productDetailLoad: (state, action) => {
      state.value = { ...state.value, error: null, data: action.payload };
    },
  },
});

export const { productDetailLoad } = slice.actions;
export default slice.reducer;
