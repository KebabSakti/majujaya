import { createSlice } from "@reduxjs/toolkit";
import { StateData, StateType } from "../../lib/config/type";
import { CategoryModel } from './../../../../lib/model/category-model';

const initialState: StateType<StateData<CategoryModel[]>> = {
  value: {
    data: [],
    error: null,
  },
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    categoryError: (state, action) => {
      state.value = { ...state.value, error: action.payload };
    },
    categoryComplete: (state, action) => {
      state.value = { ...state.value, error: null, data: action.payload };
    },
  },
});

export const { categoryError, categoryComplete } = categorySlice.actions;
export default categorySlice.reducer;
