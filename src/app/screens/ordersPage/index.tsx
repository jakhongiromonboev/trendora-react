import type { Dispatch } from "@reduxjs/toolkit";
import type { Order } from "../../../lib/types/order";
import {
  setDeliveredOrders,
  setPendingOrders,
  setProccessOrders,
} from "./slice";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPendingOrders: (data: Order[]) => dispatch(setPendingOrders(data)),
  setProccessOrders: (data: Order[]) => dispatch(setProccessOrders(data)),
  setDeliveredOrders: (data: Order[]) => dispatch(setDeliveredOrders(data)),
});
