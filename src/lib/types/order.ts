import { OrderStatus } from "../enums/order.enum";
import type { Member } from "./member";
import type { Product } from "./product";

export interface OrderItem {
  _id: string;
  itemQuantity: number;
  itemPrice: number;
  orderId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  _id: string;
  memberId: string;
  orderTotal: number;
  orderDelivery: number;
  orderStatus: OrderStatus;
  createdAt: Date;
  updatedAt: Date;

  /** from aggregation **/
  orderItems?: OrderItem[];
  productData?: Product[];
  memberData?: Member[];
}

export interface OrderItemInput {
  itemQuantity: number;
  itemPrice: number;
  productId: string;
  orderId?: string;
}

export interface OrderInquiry {
  page: number;
  limit: number;
  orderStatus: OrderStatus;
}

export interface OrderUpdateInput {
  orderId: string;
  orderStatus: OrderStatus;
}
