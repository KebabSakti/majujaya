import { createSlice } from "@reduxjs/toolkit";
import { StateData, StateType } from "../../lib/config/type";
import { BannerModel } from "../../../../lib/model/banner-model";

const initialState: StateType<StateData<BannerModel[]>> = {
  value: {
    data: [],
    error: null,
  },
};

export const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    bannerError: (state, action) => {
      state.value = { ...state.value, error: action.payload };
    },
    bannerComplete: (state, action) => {
      state.value = { ...state.value, error: null, data: action.payload };
    },
  },
});

export const { bannerError, bannerComplete } = bannerSlice.actions;
export default bannerSlice.reducer;
