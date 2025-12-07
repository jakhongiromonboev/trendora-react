import React from "react";
import { Box, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTrendingNow } from "./selector";
import { serverApi } from "../../../lib/config";
import type { Product } from "../../../lib/types/product";

/** REDUX SLICE & SELECTOR **/
const trendingNowRetriever = createSelector(
  retrieveTrendingNow,
  (trendingProducts) => ({
    trendingProducts,
  })
);

export default function TrendingNow() {
  const history = useHistory();
  const { trendingProducts } = useSelector(trendingNowRetriever);

  const handleProductClick = (productId: string) => {
    history.push(`/products/${productId}`);
  };

  const handleViewAll = () => {
    history.push("/products?trending=true");
  };

  return (
    <div className="trending-now-frame">
      <Stack className={"main"}>
        <Box className={"section-title"}>Trending Now</Box>
        <Box className={"section-subtitle"}>Most popular items this week</Box>

        <Box className={"products-grid"}>
          {trendingProducts.length !== 0 ? (
            trendingProducts.map((product: Product) => {
              const imagePath = `${serverApi}/${product.productImages[0]}`;

              return (
                <Box
                  key={product._id}
                  className={"product-card"}
                  onClick={() => handleProductClick(product._id)}
                >
                  <Box className={"product-image-wrapper"}>
                    <img
                      src={imagePath}
                      alt={product.productName}
                      className={"product-image"}
                    />
                  </Box>
                  <Box className={"product-info"}>
                    <Box className={"product-name"}>{product.productName}</Box>
                    <Box className={"product-category"}>
                      {product.productCollection}
                    </Box>
                    <Box className={"product-price"}>
                      ${product.productPrice.toFixed(2)}
                    </Box>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Box className={"no-data"}>No trending products available</Box>
          )}
        </Box>

        {/* View All Button */}
        {trendingProducts.length > 0 && (
          <Box className={"view-all-wrapper"}>
            <button className={"view-all-btn"} onClick={handleViewAll}>
              View All Products
            </button>
          </Box>
        )}
      </Stack>
    </div>
  );
}
