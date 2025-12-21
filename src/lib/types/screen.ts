import type { Order } from "./order";
import type { Product } from "./product";

/** REACT APP STATE **/
export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
  ordersPage: OrdersPageState;
}

/** HOMEPAGE **/
export interface HomePageState {
  trendingNow: Product[];
  newArrivals: Product[];
}

/** PRODUCTS PAGE **/
export interface ProductsPageState {
  products: Product[];
  chosenProduct: Product | null /** Chosen product is being stored in STATE (NOT in REDUX!) **/;
}

/** ORDERS PAGE **/
export interface OrdersPageState {
  pendingOrders: Order[];
  proccessOrders: Order[];
  deliveredOrders: Order[];
}
