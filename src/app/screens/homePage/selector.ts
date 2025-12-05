import { createSelector } from "@reduxjs/toolkit";
import type { AppRootState, HomePageState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieveTrendingNow = createSelector(
  selectHomePage,
  (HomePage) => {
    return HomePage.trendingNow;
  }
);

export const retrieveNewArrivals = createSelector(
  (state: AppRootState) => state.homePage,
  (HomePage: HomePageState) => HomePage.newArrivals
);
