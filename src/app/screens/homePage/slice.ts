import { createSlice } from "@reduxjs/toolkit";
import type { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  trendingNow: [],
  newArrivals: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setTrendingNow: (state, action) => {
      state.trendingNow = action.payload;
    },

    setNewArrivals: (state, action) => {
      state.newArrivals = action.payload;
    },
  },
});

export const { setTrendingNow, setNewArrivals } = homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
