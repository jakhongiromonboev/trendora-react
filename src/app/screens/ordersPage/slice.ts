import { createSlice } from "@reduxjs/toolkit";
import type { OrdersPageState } from "../../../lib/types/screen";

const initialState: OrdersPageState = {
  pendingOrders: [],
  proccessOrders: [],
  deliveredOrders: [],
};

const ordersPageSlice = createSlice({
  name: "ordersPageSlice",
  initialState,
  reducers: {
    setPendingOrders: (state, action) => {
      state.pendingOrders = action.payload;
    },
    setProccessOrders: (state, action) => {
      state.proccessOrders = action.payload;
    },
    setDeliveredOrders: (state, action) => {
      state.deliveredOrders = action.payload;
    },
  },
});

export const { setPendingOrders, setDeliveredOrders, setProccessOrders } =
  ordersPageSlice.actions;

const OrdersPageReducer = ordersPageSlice.reducer;
export default OrdersPageReducer;
