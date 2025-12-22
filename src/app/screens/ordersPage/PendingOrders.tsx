import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import moment from "moment";

import { retrievePendingOrders } from "./selector";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi, Messages } from "../../../lib/config";
import { OrderStatus } from "../../../lib/enums/order.enum";
import type {
  Order,
  OrderItem,
  OrderUpdateInput,
} from "../../../lib/types/order";
import type { Product } from "../../../lib/types/product";
import OrderService from "../../../services/OrderService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";

/** REDUX SELECTOR **/
const pendingOrdersRetriever = createSelector(
  retrievePendingOrders,
  (pendingOrders) => ({ pendingOrders })
);

export default function PendingOrders() {
  const { pendingOrders } = useSelector(pendingOrdersRetriever);
  const { authMember, setOrderBuilder } = useGlobals();

  /** HANDLERS **/
  const handleCancelOrder = async (orderId: string) => {
    try {
      if (!authMember) throw new Error(Messages.error2);

      const confirmation = window.confirm(
        "Are you sure you want to cancel this order?"
      );

      if (confirmation) {
        const input: OrderUpdateInput = {
          orderId: orderId,
          orderStatus: OrderStatus.CANCEL,
        };

        const orderService = new OrderService();
        await orderService.updateOrderByUser(input);
        await sweetTopSmallSuccessAlert("Order cancelled", 1500);
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  if (!pendingOrders?.length) {
    return (
      <Box className="empty-orders">
        <h3>No Pending Orders</h3>
        <p>Orders awaiting payment will appear here</p>
      </Box>
    );
  }

  return (
    <Box className="orders-list">
      {pendingOrders?.map((order: Order) => (
        <Box key={order?._id} className="order-card">
          {/* ORDER HEADER */}
          <Box className="order-header">
            <Box className="order-info">
              <span className="order-id">
                #{order?._id?.slice(-8)?.toUpperCase()}
              </span>
              <span className="order-date">
                {moment(order?.createdAt).format("MMM DD, YYYY")}
              </span>
            </Box>
            <Box className="order-status pending">Awaiting Payment</Box>
          </Box>

          {/* ORDER ITEMS */}
          <Box className="order-items">
            {order?.orderItems?.map((item: OrderItem) => {
              const product: Product | undefined = order?.productData?.find(
                (p: Product) => p?._id === item?.productId
              );

              if (!product) return null;

              const imagePath = `${serverApi}/${product?.productImages?.[0]}`;

              return (
                <Box key={item?._id} className="order-item">
                  <img
                    src={imagePath}
                    alt={product?.productName}
                    className="item-image"
                  />
                  <Box className="item-info">
                    <span className="item-name">{product?.productName}</span>
                    <span className="item-meta">
                      ${item?.itemPrice?.toFixed(2)} × {item?.itemQuantity}
                    </span>
                  </Box>
                  <span className="item-total">
                    ${(item?.itemPrice * item?.itemQuantity)?.toFixed(2)}
                  </span>
                </Box>
              );
            })}
          </Box>

          {/* ORDER SUMMARY */}
          <Box className="order-summary">
            <Box className="summary-row">
              <span>Subtotal</span>
              <span>
                ${(order?.orderTotal - order?.orderDelivery)?.toFixed(2)}
              </span>
            </Box>
            <Box className="summary-row">
              <span>Delivery</span>
              <span>
                {order?.orderDelivery === 0
                  ? "Free"
                  : `$${order?.orderDelivery?.toFixed(2)}`}
              </span>
            </Box>
            <Box className="summary-row total">
              <span>Total</span>
              <span>${order?.orderTotal?.toFixed(2)}</span>
            </Box>
          </Box>

          {/* ORDER ACTIONS */}
          <Box className="order-actions">
            <p className="action-note">
              Please complete payment and send confirmation with your Order ID
            </p>
            <button
              className="btn-cancel"
              onClick={() => handleCancelOrder(order?._id)}
            >
              Cancel Order
            </button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
