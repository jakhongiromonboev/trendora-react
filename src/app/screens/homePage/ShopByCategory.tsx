import React from "react";
import { Box, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
import { ProductCollection } from "../../../lib/enums/product.enum";

export default function ShopByCategory() {
  const history = useHistory();

  const categories = [
    {
      id: 1,
      name: "TOPS",
      description: "T-shirts, Hoodies & Jackets",
      image: "/img/tops(main).jpg",
      productCollection: ProductCollection.TOPS,
    },
    {
      id: 2,
      name: "BOTTOMS",
      description: "Jeans, Trousers & Shorts",
      image: "/img/bottoms2.jpg",
      productCollection: ProductCollection.BOTTOMS,
    },
    {
      id: 3,
      name: "DRESSES",
      description: "Elegant & Casual",
      image: "/img/dresses.jpg",
      productCollection: ProductCollection.DRESSES,
    },
    {
      id: 4,
      name: "SHOES",
      description: "Sneakers, Boots & Heels",
      image: "/img/shoes1.jpg",
      productCollection: ProductCollection.SHOES,
    },
    {
      id: 5,
      name: "ACCESSORIES",
      description: "Bags, Caps & Jewelry",
      image: "/img/accessories.jpg",
      productCollection: ProductCollection.ACCESSORIES,
    },
  ];

  const handleCategoryClick = (productCollection: ProductCollection) => {
    history.push(`/products?productCollection=${productCollection}`);
  };

  return (
    <div className="shop-by-category-frame">
      <Stack className={"main"}>
        <Box className={"category-title"}>Shop by Category</Box>
        <Box className={"category-subtitle"}>Discover your perfect style</Box>

        <Box className={"category-grid"}>
          {/* TOPS */}
          <Box
            className={"category-card category-tops"}
            onClick={() => handleCategoryClick(categories[0].productCollection)}
          >
            <img
              src={categories[0].image}
              alt={categories[0].name}
              className={"category-image"}
            />
            <Box className={"category-overlay"}>
              <Box className={"category-name"}>{categories[0].name}</Box>
              <Box className={"category-description"}>
                {categories[0].description}
              </Box>
            </Box>
          </Box>

          {/* BOTTOMS */}
          <Box
            className={"category-card category-bottoms"}
            onClick={() => handleCategoryClick(categories[1].productCollection)}
          >
            <img
              src={categories[1].image}
              alt={categories[1].name}
              className={"category-image"}
            />
            <Box className={"category-overlay"}>
              <Box className={"category-name"}>{categories[1].name}</Box>
              <Box className={"category-description"}>
                {categories[1].description}
              </Box>
            </Box>
          </Box>

          {/* DRESSES */}
          <Box
            className={"category-card category-dresses"}
            onClick={() => handleCategoryClick(categories[2].productCollection)}
          >
            <img
              src={categories[2].image}
              alt={categories[2].name}
              className={"category-image"}
            />
            <Box className={"category-overlay"}>
              <Box className={"category-name"}>{categories[2].name}</Box>
              <Box className={"category-description"}>
                {categories[2].description}
              </Box>
            </Box>
          </Box>

          {/* SHOES */}
          <Box
            className={"category-card category-shoes"}
            onClick={() => handleCategoryClick(categories[3].productCollection)}
          >
            <img
              src={categories[3].image}
              alt={categories[3].name}
              className={"category-image"}
            />
            <Box className={"category-overlay"}>
              <Box className={"category-name"}>{categories[3].name}</Box>
              <Box className={"category-description"}>
                {categories[3].description}
              </Box>
            </Box>
          </Box>

          {/* ACCESSORIES */}
          <Box
            className={"category-card category-accessories"}
            onClick={() => handleCategoryClick(categories[4].productCollection)}
          >
            <img
              src={categories[4].image}
              alt={categories[4].name}
              className={"category-image"}
            />
            <Box className={"category-overlay"}>
              <Box className={"category-name"}>{categories[4].name}</Box>
              <Box className={"category-description"}>
                {categories[4].description}
              </Box>
            </Box>
          </Box>
        </Box>
      </Stack>
    </div>
  );
}
