import type { Product } from "./product";

/** REACT APP STATE **/
export interface AppRootState {
  homePage: HomePageState;
  //   productsPage: ProductsPageState;
  //   ordersPage: OrdersPageState;
}

/** HOMEPAGE **/
export interface HomePageState {
  trendingNow: Product[];
  newArrivals: Product[];
}

/** PRODUCTS PAGE **/

/** ORDERS PAGE **/
