import { createSlice } from "@reduxjs/toolkit";
import { ProductRating } from "../../../../lib/model/product-rating";
import { StateData, StateType } from "../../lib/config/type";

const initialState: StateType<StateData<ProductRating[]>> = {
  value: {
    data: [],
    error: null,
  },
};

export const slice = createSlice({
  name: "productRating",
  initialState,
  reducers: {
    productRatingError: (state, action) => {
      state.value = { ...state.value, error: action.payload };
    },
    productRatingComplete: (state, action) => {
      state.value = { ...state.value, error: null, data: action.payload };
    },
  },
});

export const { productRatingError, productRatingComplete } = slice.actions;
export default slice.reducer;
