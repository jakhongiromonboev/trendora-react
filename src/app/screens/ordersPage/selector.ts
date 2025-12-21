import { createSelector } from "@reduxjs/toolkit";
import type { AppRootState, OrdersPageState } from "../../../lib/types/screen";

const selectOrdersPage = (state: AppRootState) => state.ordersPage;

export const retrievePendingOrders = createSelector(
  (state: AppRootState) => state.ordersPage,
  (OrdersPage: OrdersPageState) => OrdersPage.pendingOrders
);

export const retrieveProccessOrders = createSelector(
  selectOrdersPage,
  (OrdersPage: OrdersPageState) => OrdersPage.proccessOrders
);

export const retrieveDeliveredOrders = createSelector(
  (state: AppRootState) => state.ordersPage,
  (OrdersPage: OrdersPageState) => OrdersPage.deliveredOrders
);
