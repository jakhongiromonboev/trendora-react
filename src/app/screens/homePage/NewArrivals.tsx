import React from "react";
import { Box, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { createSelector } from "reselect";
// import { retrieveNewArrivals } from "./selector";

/** REDUX SLICE & SELECTOR **/

export default function NewArrivals() {
  const history = useHistory();

  // TODO: Replace with Redux selector

  // Dummy data for now - REMOVE when connecting Redux
  const newArrivals = [
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
    history.push("/products?new=true");
  };

  return (
    <div className="new-arrivals-frame">
      <Stack className={"main"}>
        <Box className={"section-title"}>New Arrivals</Box>
        <Box className={"section-subtitle"}>Fresh styles just added</Box>

        <Box className={"products-grid"}>
          {newArrivals.length !== 0 ? (
            newArrivals.map((product) => (
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
