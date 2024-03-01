import { createSlice } from "@reduxjs/toolkit";
import { StateData, StateType } from "../../lib/config/type";

const initialState: StateType<StateData<string>> = {
  value: {
    data: null,
    error: null,
  },
};

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authError: (state, action) => {
      state.value = { ...state.value, error: action.payload };
    },
    authComplete: (state, action) => {
      state.value = { ...state.value, error: null, data: action.payload };
    },
  },
});

export const { authError, authComplete } = slice.actions;
export default slice.reducer;
