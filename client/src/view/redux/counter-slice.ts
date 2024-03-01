import { createSlice } from "@reduxjs/toolkit";
import { StateData, StateType } from "../../lib/config/type";

const initialState: StateType<StateData<number>> = {
  value: {
    data: 0,
    error: null,
  },
};

export const slice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCounter: (state, action) => {
      state.value = { ...state.value, error: null, data: action.payload };
    },
  },
});

export const { setCounter } = slice.actions;
export default slice.reducer;
