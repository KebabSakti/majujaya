import { createSlice } from "@reduxjs/toolkit";
import { StateData, StateType } from "../../lib/config/type";

const initialState: StateType<StateData<boolean>> = {
  value: {
    data: false,
    error: null,
  },
};

export const slice = createSlice({
  name: "init",
  initialState,
  reducers: {
    initError: (state, action) => {
      state.value = { ...state.value, error: action.payload };
    },
    initComplete: (state, action) => {
      state.value = { ...state.value, error: null, data: action.payload };
    },
  },
});

export const { initError, initComplete } = slice.actions;
export default slice.reducer;
