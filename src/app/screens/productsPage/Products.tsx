import React, { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSelector, type Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import ProductService from "../../../services/ProductService";
import { serverApi } from "../../../lib/config";
import type { Product, ProductInquiry } from "../../../lib/types/product";
import type { CartItem } from "../../../lib/types/search";
import { sweetBagAlert } from "../../../lib/sweetAlert";
import {
  ProductCollection,
  ProductGender,
  ProductSize,
  ProductShoeSize,
} from "../../../lib/enums/product.enum";

import "../../../css/products.css";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const history = useHistory();
  const location = useLocation();
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);

  const searchParams = new URLSearchParams(location.search);
  const urlGender = searchParams.get("gender") as ProductGender;
  const urlCollection = searchParams.get(
    "productCollection"
  ) as ProductCollection;

  /** LOCAL STATE **/
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    gender: urlGender || ProductGender.FEMALE,
    productCollection: urlCollection || ProductCollection.TOPS,
    search: "",
  });
  const [searchText, setSearchText] = useState<string>("");

  /** FETCH PRODUCTS **/
  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** HANDLERS **/
  const searchGenderHandler = (gender: ProductGender) => {
    productSearch.page = 1;
    productSearch.gender = gender;
    setProductSearch({ ...productSearch });
  };

  const searchCollectionHandler = (collection: ProductCollection | null) => {
    productSearch.page = 1;
    if (collection === null) {
      delete productSearch.productCollection;
    } else {
      productSearch.productCollection = collection;
    }

    delete productSearch.productSize;
    delete productSearch.productShoeSize;
    setProductSearch({ ...productSearch });
  };

  const searchSizeHandler = (size: ProductSize | ProductShoeSize | null) => {
    productSearch.page = 1;

    delete productSearch.productSize;
    delete productSearch.productShoeSize;

    if (size !== null) {
      if (productSearch.productCollection === ProductCollection.SHOES) {
        productSearch.productShoeSize = size as ProductShoeSize;
      } else {
        productSearch.productSize = size as ProductSize;
      }
    }

    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.page = 1;
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const clearAllFiltersHandler = () => {
    setSearchText("");
    setProductSearch({
      page: 1,
      limit: 8,
      order: "createdAt",
      gender: ProductGender.FEMALE,
      productCollection: ProductCollection.TOPS,
      search: "",
    });
  };

  const loadMoreHandler = () => {
    productSearch.page = productSearch.page + 1;
    setProductSearch({ ...productSearch });
  };

  const handleProductClick = (id: string) => {
    history.push(`/products/${id}`);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAdd({
      _id: product._id,
      quantity: 1,
      name: product.productName,
      price: product.productPrice,
      image: product.productImages[0],
    });

    sweetBagAlert(product?.productName);
  };

  /** HELPER FUNCTIONS **/
  const formatGender = (gender: ProductGender) => {
    switch (gender) {
      case ProductGender.MALE:
        return "Men";
      case ProductGender.FEMALE:
        return "Women";
      case ProductGender.UNISEX:
        return "Unisex";
      default:
        return "";
    }
  };

  const formatCollection = (collection?: ProductCollection) => {
    if (!collection) return "All Products";
    return collection.charAt(0) + collection.slice(1).toLowerCase();
  };

  const getPageTitle = () => {
    const gender = formatGender(productSearch.gender || ProductGender.FEMALE);
    const collection = formatCollection(productSearch.productCollection);
    return `${gender}'s ${collection}`;
  };

  const getAvailableCategories = () => {
    const allCategories = [
      ProductCollection.TOPS,
      ProductCollection.BOTTOMS,
      ProductCollection.DRESSES,
      ProductCollection.SHOES,
      ProductCollection.ACCESSORIES,
    ];

    if (productSearch.gender === ProductGender.MALE) {
      return allCategories.filter((cat) => cat !== ProductCollection.DRESSES);
    }

    return allCategories;
  };

  const shouldShowSizeFilter = () => {
    const collection = productSearch.productCollection;
    return (
      collection === ProductCollection.TOPS ||
      collection === ProductCollection.BOTTOMS ||
      collection === ProductCollection.DRESSES ||
      collection === ProductCollection.SHOES
    );
  };

  const getSizeOptions = () => {
    if (productSearch.productCollection === ProductCollection.SHOES) {
      return Object.values(ProductShoeSize);
    }
    return Object.values(ProductSize);
  };

  const getCurrentSize = () => {
    if (productSearch.productCollection === ProductCollection.SHOES) {
      return productSearch.productShoeSize || null;
    }
    return productSearch.productSize || null;
  };

  return (
    <div className="products">
      {/* BREADCRUMB */}
      <Box className="breadcrumb">
        <span onClick={() => history.push("/")} className="breadcrumb-link">
          Home
        </span>
        <span className="breadcrumb-divider">/</span>
        <span className="breadcrumb-link">
          {formatGender(productSearch?.gender || ProductGender.FEMALE)}
        </span>
        {productSearch?.productCollection && (
          <>
            <span className="breadcrumb-divider">/</span>
            <span className="breadcrumb-current">
              {formatCollection(productSearch?.productCollection)}
            </span>
          </>
        )}
      </Box>

      {/* PAGE HEADER */}
      <Box className="page-header">
        <Container>
          <h1 className="page-title">{getPageTitle()}</h1>
          <Box className="header-controls">
            <Box className="search-bar">
              <input
                type="text"
                placeholder="Search products..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchProductHandler();
                }}
              />
            </Box>
            <select
              className="sort-dropdown"
              value={productSearch?.order}
              onChange={(e) => searchOrderHandler(e.target.value)}
            >
              <option value="createdAt">Sort: Newest</option>
              <option value="productPrice">Price: Low to High</option>
              <option value="productViews">Most Popular</option>
            </select>
          </Box>
        </Container>
      </Box>

      {/* MAIN CONTENT */}
      <Container>
        <Box className="main-content">
          <aside className="sidebar">
            {/* GENDER FILTER */}
            <Box className="filter-section">
              <Box className="filter-title">Gender</Box>
              <Box className="filter-options">
                <Box
                  className={`filter-option ${
                    productSearch?.gender === ProductGender.FEMALE
                      ? "active"
                      : ""
                  }`}
                  onClick={() => searchGenderHandler(ProductGender.FEMALE)}
                >
                  Women
                </Box>
                <Box
                  className={`filter-option ${
                    productSearch?.gender === ProductGender.MALE ? "active" : ""
                  }`}
                  onClick={() => searchGenderHandler(ProductGender.MALE)}
                >
                  Men
                </Box>
                <Box
                  className={`filter-option ${
                    productSearch?.gender === ProductGender.UNISEX
                      ? "active"
                      : ""
                  }`}
                  onClick={() => searchGenderHandler(ProductGender.UNISEX)}
                >
                  Unisex
                </Box>
              </Box>
            </Box>

            {/* CATEGORY FILTER */}
            <Box className="filter-section">
              <Box className="filter-title">Category</Box>
              <Box className="filter-options">
                <Box
                  className={`filter-option ${
                    !productSearch?.productCollection ? "active" : ""
                  }`}
                  onClick={() => searchCollectionHandler(null)}
                >
                  View All
                </Box>
                {getAvailableCategories().map((category) => (
                  <Box
                    key={category}
                    className={`filter-option ${
                      productSearch?.productCollection === category
                        ? "active"
                        : ""
                    }`}
                    onClick={() => searchCollectionHandler(category)}
                  >
                    {formatCollection(category)}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* SIZE FILTER */}
            {shouldShowSizeFilter() && (
              <Box className="filter-section">
                <Box className="filter-title">Size</Box>
                <Box className="size-grid">
                  {getSizeOptions().map((size) => (
                    <Box
                      key={size}
                      className={`size-option ${
                        getCurrentSize() === size ? "active" : ""
                      }`}
                      onClick={() => searchSizeHandler(size)}
                    >
                      {size}
                    </Box>
                  ))}
                </Box>
                {getCurrentSize() && (
                  <Box
                    className="clear-size"
                    onClick={() => searchSizeHandler(null)}
                  >
                    Clear Size
                  </Box>
                )}
              </Box>
            )}

            {/* CLEAR ALL BUTTON */}
            <Box className="filter-section">
              <button className="clear-btn" onClick={clearAllFiltersHandler}>
                Clear All Filters
              </button>
            </Box>
          </aside>

          {/* PRODUCTS GRID */}
          <Box className="products-container">
            {products?.length > 0 ? (
              <>
                <Box className="products-grid">
                  {products?.map((product) => {
                    const imagePath = `${serverApi}/${product?.productImages[0]}`;
                    return (
                      <Box
                        key={product._id}
                        className="product-card"
                        onClick={() => handleProductClick(product?._id)}
                      >
                        <Box className="product-image">
                          <img src={imagePath} alt={product?.productName} />
                        </Box>
                        <Box className="product-info">
                          <Box className="product-name">
                            {product?.productName}
                          </Box>
                          <Box className="product-category">
                            {product?.productCollection}
                          </Box>
                          <Box className="product-footer">
                            <Box className="product-price">
                              ${product?.productPrice.toFixed(2)}
                            </Box>
                            <Box
                              className="cart-icon"
                              onClick={(e) => handleAddToCart(e, product)}
                            >
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                              </svg>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>

                {/* LOAD MORE */}
                <Box className="load-more">
                  <button className="load-more-btn" onClick={loadMoreHandler}>
                    Load More Products
                  </button>
                </Box>
              </>
            ) : (
              <Box className="no-products">No products available</Box>
            )}
          </Box>
        </Box>
      </Container>
    </div>
  );
}
