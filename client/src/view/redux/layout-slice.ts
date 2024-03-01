import { createSlice } from "@reduxjs/toolkit";
import { StateData, StateType } from "../../lib/config/type";

const initialState: StateType<StateData<boolean>> = {
  value: {
    data: true,
    error: null,
  },
};

export const slice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    loadError: (state, action) => {
      state.value = { ...state.value, error: action.payload };
    },
    loadComplete: (state, action) => {
      state.value = { ...state.value, error: null, data: action.payload };
    },
  },
});

export const { loadError, loadComplete } = slice.actions;
export default slice.reducer;
