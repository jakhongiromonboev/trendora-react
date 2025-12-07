import { createSlice } from "@reduxjs/toolkit";
import type { ProductsPageState } from "../../../lib/types/screen";

const initialState: ProductsPageState = {
  products: [],
  chosenProduct: null,
};

const productPageSlice = createSlice({
  name: "productsPage",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
  },
});

export const { setChosenProduct, setProducts } = productPageSlice.actions;

const ProductsPageReducer = productPageSlice.reducer;
export default ProductsPageReducer;
