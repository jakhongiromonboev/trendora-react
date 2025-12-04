import ShopByCategory from "./ShopByCategory";
import "../../../css/home.css";
import TrendingNow from "./TrendingNow";
import NewArrivals from "./NewArrivals";
import PromotionalBanner from "./PromotionalBanner";

export default function HomePage() {
  return (
    <div className={"homepage"}>
      <ShopByCategory />
      <TrendingNow />
      <NewArrivals />
      <PromotionalBanner />
    </div>
  );
}
