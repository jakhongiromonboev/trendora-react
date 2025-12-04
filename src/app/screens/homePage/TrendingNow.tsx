import React from "react";
import { Box, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { createSelector } from "reselect";
// import { retrieveTrendingProducts } from "./selector";

/** REDUX SLICE & SELECTOR **/

export default function TrendingNow() {
  const history = useHistory();

  // TODO: Replace with Redux selector

  // Dummy data for now - REMOVE when connecting Redux
  const trendingProducts = [
    {
      _id: "1",
      productName: "Oversized Hoodie",
      productPrice: 89.99,
      productImages: ["/img/shoes1.jpg"],
      productViews: 234,
      productCollection: "TOPS",
    },
    {
      _id: "2",
      productName: "Slim Fit Jeans",
      productPrice: 119.99,
      productImages: ["/img/shoes1.jpg"],
      productViews: 189,
      productCollection: "BOTTOMS",
    },
    {
      _id: "3",
      productName: "Leather Jacket",
      productPrice: 299.99,
      productImages: ["/img/shoes1.jpg"],
      productViews: 456,
      productCollection: "TOPS",
    },
    {
      _id: "4",
      productName: "White Sneakers",
      productPrice: 159.99,
      productImages: ["/img/shoes1.jpg"],
      productViews: 312,
      productCollection: "SHOES",
    },
  ];

  const handleProductClick = (productId: string) => {
    history.push(`/product/${productId}`);
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
            trendingProducts.map((product) => (
              <Box
                key={product._id}
                className={"product-card"}
                onClick={() => handleProductClick(product._id)}
              >
                <Box className={"product-image-wrapper"}>
                  <img
                    src={product.productImages[0]}
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
            ))
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
