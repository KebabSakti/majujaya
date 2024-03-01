import { randomUUID } from "crypto";
import { createSlice } from "@reduxjs/toolkit";
import { Empty, StateData, StateType } from "../../lib/config/type";
import { CartModel } from "./../../../../lib/model/cart-model";

const initialState: StateType<StateData<CartModel | Empty>> = {
  value: {
    data: {
      id: randomUUID(),
    },
    error: null,
  },
};

export const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartLoad: (state, action) => {
      state.value = { ...state.value, error: null, data: action.payload };
    },
  },
});

export const { cartLoad } = slice.actions;
export default slice.reducer;
