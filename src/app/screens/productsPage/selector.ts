import { createSelector } from "@reduxjs/toolkit";
import type {
  AppRootState,
  ProductsPageState,
} from "../../../lib/types/screen";

const selectProductsPage = (state: AppRootState) => state.productsPage;

export const retrieveProducts = createSelector(
  (state: AppRootState) => state.productsPage,
  (ProductsPage: ProductsPageState) => ProductsPage.products
);

export const retrieveChosenProduct = createSelector(
  selectProductsPage,
  (ProductsPage) => {
    return ProductsPage.chosenProduct;
  }
);
