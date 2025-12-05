import ShopByCategory from "./ShopByCategory";
import "../../../css/home.css";
import TrendingNow from "./TrendingNow";
import NewArrivals from "./NewArrivals";
import PromotionalBanner from "./PromotionalBanner";
import type { Dispatch } from "@reduxjs/toolkit";
import { setNewArrivals, setTrendingNow } from "./slice";
import type { Product } from "../../../lib/types/product";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import ProductService from "../../../services/ProductService";

/** REDUX SLICE **/
const actionDispatch = (dispatch: Dispatch) => ({
  setTrendingNow: (data: Product[]) => dispatch(setTrendingNow(data)),
  setNewArrivals: (data: Product[]) => dispatch(setNewArrivals(data)),
});

export default function HomePage() {
  const { setTrendingNow, setNewArrivals } = actionDispatch(useDispatch());

  useEffect(() => {
    const product = new ProductService();

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
      })
      .then((data) => {
        console.log("data here:", data);
        setTrendingNow(data);
      })
      .catch((err) => {
        console.log(err);
      });

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
      })
      .then((data) => {
        setNewArrivals(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"homepage"}>
      <ShopByCategory />
      <TrendingNow />
      <NewArrivals />
      <PromotionalBanner />
    </div>
  );
}
