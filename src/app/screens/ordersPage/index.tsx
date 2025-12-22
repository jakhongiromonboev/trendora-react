import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { Dispatch } from "@reduxjs/toolkit";

import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { OrderStatus } from "../../../lib/enums/order.enum";
import type { Order, OrderInquiry } from "../../../lib/types/order";
import OrderService from "../../../services/OrderService";

import {
  setPendingOrders,
  setProccessOrders,
  setDeliveredOrders,
} from "./slice";

import PendingOrders from "./PendingOrders";
import ProcessingOrders from "./ProccessingOrders";
import DeliveredOrders from "./DeliveredOrders";

import "../../../css/order.css";

/** REDUX SLICE **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPendingOrders: (data: Order[]) => dispatch(setPendingOrders(data)),
  setProccessOrders: (data: Order[]) => dispatch(setProccessOrders(data)),
  setDeliveredOrders: (data: Order[]) => dispatch(setDeliveredOrders(data)),
});

export default function OrdersPage() {
  const { setPendingOrders, setProccessOrders, setDeliveredOrders } =
    actionDispatch(useDispatch());
  const { authMember, orderBuilder } = useGlobals();
  const history = useHistory();

  const [value, setValue] = useState("1");
  const [orderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 10,
    orderStatus: OrderStatus.PENDING,
  });

  useEffect(() => {
    if (!authMember) {
      history.push("/");
    }
  }, [authMember]);

  useEffect(() => {
    if (!authMember) return;

    const orderService = new OrderService();

    orderService
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PENDING })
      .then((data) => setPendingOrders(data))
      .catch((err) => console.log(err));

    orderService
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESSING })
      .then((data) => setProccessOrders(data))
      .catch((err) => console.log(err));

    orderService
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.DELIVERED })
      .then((data) => setDeliveredOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  /** HANDLERS **/
  const handleTabChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!authMember) return null;

  return (
    <div className="orders">
      {/* BREADCRUMB */}
      <Box className="orders-breadcrumb">
        <span onClick={() => history.push("/")} className="breadcrumb-link">
          Home
        </span>
        <span className="breadcrumb-divider">/</span>
        <span className="breadcrumb-current">Orders</span>
      </Box>

      <Box className="orders-header">
        <h1 className="orders-title">My Orders</h1>
      </Box>

      <Container className="orders-container">
        <Box className="orders-layout">
          {/* LEFT SIDE - Orders */}
          <Box className="orders-main">
            {/* TABS */}
            <Box className="orders-tabs">
              <Tabs
                value={value}
                onChange={handleTabChange}
                TabIndicatorProps={{
                  style: { backgroundColor: "#000000", height: "2px" },
                }}
              >
                <Tab label="Pending" value="1" />
                <Tab label="Processing" value="2" />
                <Tab label="Delivered" value="3" />
              </Tabs>
            </Box>

            <Box className="orders-content">
              {value === "1" && <PendingOrders />}
              {value === "2" && <ProcessingOrders />}
              {value === "3" && <DeliveredOrders />}
            </Box>
          </Box>

          {/* RIGHT SIDE - Sidebar */}
          <Box className="orders-sidebar">
            {/* USER CARD */}
            <Box className="sidebar-card user-card">
              <Box className="user-avatar">
                <img
                  src={
                    authMember?.memberImage
                      ? `${serverApi}/${authMember?.memberImage}`
                      : "/icons/default-user.svg"
                  }
                  alt={authMember?.memberNick}
                />
              </Box>
              <h3 className="user-name">{authMember?.memberNick}</h3>
              <span className="user-type">{authMember?.memberType}</span>
              <Box className="user-details">
                {authMember?.memberAddress && (
                  <Box className="user-detail">
                    <span className="detail-label">Address</span>
                    <span className="detail-value">
                      {authMember?.memberAddress}
                    </span>
                  </Box>
                )}
                {authMember?.memberPhone && (
                  <Box className="user-detail">
                    <span className="detail-label">Phone</span>
                    <span className="detail-value">
                      {authMember?.memberPhone}
                    </span>
                  </Box>
                )}
              </Box>
            </Box>

            {/* PAYMENT CARD */}
            <Box className="sidebar-card payment-card">
              <h3 className="card-title">Payment Details</h3>
              <p className="card-subtitle">
                Transfer payment to complete your order
              </p>

              <Box className="payment-methods">
                {/* BANK TRANSFER */}
                <Box className="payment-method">
                  <span className="method-label">Bank Transfer</span>
                  <Box className="method-details">
                    <Box className="detail-row">
                      <span>Bank</span>
                      <span>Chase Bank</span>
                    </Box>
                    <Box className="detail-row">
                      <span>Account</span>
                      <span>TRENDORA LLC</span>
                    </Box>
                    <Box className="detail-row">
                      <span>Account #</span>
                      <span>123456789012</span>
                    </Box>
                    <Box className="detail-row">
                      <span>Routing #</span>
                      <span>021000021</span>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box className="payment-note">
                <p>
                  After payment, send confirmation with your{" "}
                  <strong>Order ID</strong> via:
                </p>
                <Box className="contact-options">
                  <a
                    href="https://wa.me/12125557891"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-btn whatsapp"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="mailto:info@trendora.com"
                    className="contact-btn email"
                  >
                    Email
                  </a>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
