import React from "react";
import { Box, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewArrivals } from "./selector";
import { serverApi } from "../../../lib/config";
import type { Product } from "../../../lib/types/product";

/** REDUX SLICE & SELECTOR **/
const newArrivalsRetriever = createSelector(
  retrieveNewArrivals,
  (newArrivals) => ({
    newArrivals,
  })
);

export default function NewArrivals() {
  const history = useHistory();
  const { newArrivals } = useSelector(newArrivalsRetriever);
  console.log("newArrivals:", newArrivals);

  const handleProductClick = (productId: string) => {
    history.push(`/products/${productId}`);
  };

  const handleViewAll = () => {
    history.push("/products?new=true");
  };

  return (
    <div className="new-arrivals-frame">
      <Stack className={"main"}>
        <Box className={"section-title"}>New Arrivals</Box>
        <Box className={"section-subtitle"}>Fresh styles just added</Box>

        <Box className={"products-grid"}>
          {newArrivals.length !== 0 ? (
            newArrivals.map((product: Product) => {
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
            <Box className={"no-data"}>No new arrivals available</Box>
          )}
        </Box>

        {/* View All Button */}
        {newArrivals.length > 0 && (
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
