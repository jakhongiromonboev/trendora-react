import React from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import moment from "moment";

import { retrieveDeliveredOrders } from "./selector";
import { serverApi } from "../../../lib/config";
import type { Order, OrderItem } from "../../../lib/types/order";
import type { Product } from "../../../lib/types/product";

/** REDUX SELECTOR **/
const deliveredOrdersRetriever = createSelector(
  retrieveDeliveredOrders,
  (deliveredOrders) => ({ deliveredOrders })
);

export default function DeliveredOrders() {
  const { deliveredOrders } = useSelector(deliveredOrdersRetriever);

  if (!deliveredOrders?.length) {
    return (
      <Box className="empty-orders">
        <h3>No Delivered Orders</h3>
        <p>Completed orders will appear here</p>
      </Box>
    );
  }

  return (
    <Box className="orders-list">
      {deliveredOrders?.map((order: Order) => (
        <Box key={order?._id} className="order-card delivered">
          <Box className="order-header">
            <Box className="order-info">
              <span className="order-id">
                #{order?._id?.slice(-6)?.toUpperCase()}
              </span>
              <span className="order-date">
                {moment(order?.createdAt).format("MMM DD, YYYY")}
              </span>
            </Box>
            <Box className="order-status delivered">Delivered</Box>
          </Box>

          <Box className="delivered-banner">
            <span className="delivered-icon">✓</span>
            <span>Order delivered successfully</span>
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

          <Box className="thank-you-message">
            <p>Thank you for shopping with TRENDORA!</p>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
