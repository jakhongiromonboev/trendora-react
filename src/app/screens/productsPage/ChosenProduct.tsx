import React, { useEffect, useState } from "react";
import { Container, Box, Stack } from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import type { CartItem } from "../../../lib/types/search";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import type { Product } from "../../../lib/types/product";
import ProductService from "../../../services/ProductService";

/** SWIPER **/
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.css";

import "../../../css/chosenProduct.css";

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductProps) {
  const { onAdd } = props;
  const history = useHistory();
  const { productId } = useParams<{ productId: string }>();

  /** LOCAL STATE **/
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [openAccordion, setOpenAccordion] = useState<string>("details");
  const [chosenProduct, setChosenProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  /** FETCH CHOSEN PRODUCT **/
  useEffect(() => {
    const productService = new ProductService();
    productService
      .getProduct(productId)
      .then((data) => {
        console.log("data=>chosen", data);
        setChosenProduct(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId]);

  /** FETCH RELATED PRODUCTS **/
  useEffect(() => {
    if (!chosenProduct) return;

    const productService = new ProductService();
    productService
      .getProducts({
        order: "productViews",
        page: 1,
        limit: 5,
        productCollection: chosenProduct?.productCollection,
        gender: chosenProduct?.productGender,
      })
      .then((data) => {
        console.log("data=>related", data);
        const filtered = data.filter((p) => p._id !== chosenProduct._id);
        setRelatedProducts(filtered.slice(0, 4));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [chosenProduct]);

  /** HANDLERS **/
  const handleThumbnailClick = (index: number) => {
    if (swiperRef) {
      swiperRef.slideTo(index);
    }
    setActiveIndex(index);
  };

  const handleAccordionToggle = (section: string) => {
    setOpenAccordion(openAccordion === section ? "" : section);
  };

  const handleGoBack = () => {
    history.goBack();
  };

  const handleRelatedProductClick = (id: string) => {
    history.push(`/products/${id}`);
    window.scrollTo(0, 0);
  };

  const handleAddToBag = () => {
    if (!chosenProduct) return;
    onAdd({
      _id: chosenProduct._id,
      quantity: 1,
      name: chosenProduct.productName,
      price: chosenProduct.productPrice,
      image: chosenProduct.productImages[0],
    });
  };

  /** HELPER FUNCTIONS **/
  const formatGender = (gender: string) => {
    switch (gender) {
      case "MALE":
        return "Men";
      case "FEMALE":
        return "Women";
      default:
        return "Unisex";
    }
  };

  const formatCollection = (collection: string) => {
    return collection.charAt(0) + collection.slice(1).toLowerCase();
  };

  if (!chosenProduct) {
    return (
      <div className="chosen-product">
        <Container className="loading-container">
          <p>Loading...</p>
        </Container>
      </div>
    );
  }

  const displaySize =
    chosenProduct.productCollection === ProductCollection.SHOES
      ? chosenProduct.productShoeSize
      : chosenProduct.productSize;

  const isInStock = (chosenProduct.productLeftCount ?? 0) > 0;

  return (
    <div className="chosen-product">
      <Box className="breadcrumb">
        <span onClick={() => history.push("/")} className="breadcrumb-link">
          Home
        </span>
        <span className="breadcrumb-divider">/</span>
        <span
          onClick={() =>
            history.push(`/products?gender=${chosenProduct?.productGender}`)
          }
          className="breadcrumb-link"
        >
          {formatGender(chosenProduct?.productGender || "UNISEX")}
        </span>
        <span className="breadcrumb-divider">/</span>
        <span
          onClick={() =>
            history.push(
              `/products?collection=${chosenProduct?.productCollection}`
            )
          }
          className="breadcrumb-link"
        >
          {formatCollection(chosenProduct?.productCollection)}
        </span>
        <span className="breadcrumb-divider">/</span>
        <span className="breadcrumb-current">{chosenProduct?.productName}</span>
      </Box>

      {/* MAIN PRODUCT CONTAINER */}
      <Container className="product-container">
        {/* LEFT SIDE */}
        <Stack className="product-thumbnails">
          {chosenProduct?.productImages.map((image, index) => {
            const imagePath = `${serverApi}/${image}`;
            return (
              <Box
                key={index}
                className={`thumbnail ${activeIndex === index ? "active" : ""}`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img
                  src={imagePath}
                  alt={`${chosenProduct.productName} thumbnail ${index + 1}`}
                />
              </Box>
            );
          })}
        </Stack>

        <Stack className="product-gallery">
          <Swiper
            onSwiper={setSwiperRef}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            spaceBetween={0}
            slidesPerView={1}
            navigation={true}
            modules={[Navigation]}
            className="main-swiper"
          >
            {chosenProduct?.productImages.map((image, index) => {
              const imagePath = `${serverApi}/${image}`;
              return (
                <SwiperSlide key={index} className="main-slide">
                  <img
                    src={imagePath}
                    alt={`${chosenProduct?.productName} - Image ${index + 1}`}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>

        {/* RIGHT SIDE */}
        <Stack className="product-info">
          <span className="product-collection">
            {chosenProduct?.productCollection}
          </span>
          <h1 className="product-name">{chosenProduct?.productName}</h1>
          <span className="product-price">${chosenProduct?.productPrice}</span>

          {/* SIZE DISPLAY */}
          <Box className="size-section">
            <Box className="size-header">
              <span className="size-label">Size</span>
              <span className="size-guide">Size Guide</span>
            </Box>
            <Box className="size-display">
              <span className="current-size">{displaySize}</span>
            </Box>
            <p className="model-info">Model is 175cm / 5'9" and wears size S</p>
          </Box>

          <Box className="stock-status">
            {isInStock ? (
              <span className="in-stock">
                In Stock ({chosenProduct?.productLeftCount} left)
              </span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
            <span className="product-views">
              <VisibilityOutlinedIcon />
              {chosenProduct?.productViews}
            </span>
          </Box>

          {/* ADD TO BAG BUTTON */}
          <button
            className={`add-to-bag ${!isInStock ? "disabled" : ""}`}
            onClick={handleAddToBag}
            disabled={!isInStock}
          >
            {isInStock ? "Add to Bag" : "Out of Stock"}
          </button>

          {/* ACCORDION */}
          <Box className="accordion">
            {/* THE DETAILS */}
            <Box
              className={`accordion-item ${
                openAccordion === "details" ? "open" : ""
              }`}
            >
              <button
                className="accordion-header"
                onClick={() => handleAccordionToggle("details")}
              >
                <span>The Details</span>
                <span className="accordion-icon">
                  {openAccordion === "details" ? <RemoveIcon /> : <AddIcon />}
                </span>
              </button>
              <Box className="accordion-content">
                <p>
                  {chosenProduct?.productDesc || "No description available."}
                </p>
                <Box className="details-list">
                  <p>
                    <strong>Collection:</strong>{" "}
                    {formatCollection(chosenProduct?.productCollection)}
                  </p>
                  <p>
                    <strong>Gender:</strong>{" "}
                    {formatGender(chosenProduct?.productGender || "UNISEX")}
                  </p>
                  <p>
                    <strong>Size:</strong> {displaySize}
                  </p>
                </Box>
              </Box>
            </Box>

            {/* SIZE & FIT */}
            <Box
              className={`accordion-item ${
                openAccordion === "size" ? "open" : ""
              }`}
            >
              <button
                className="accordion-header"
                onClick={() => handleAccordionToggle("size")}
              >
                <span>Size & Fit</span>
                <span className="accordion-icon">
                  {openAccordion === "size" ? <RemoveIcon /> : <AddIcon />}
                </span>
              </button>
              <Box className="accordion-content">
                <p>
                  This item has a regular fit. Model is 175cm / 5'9" tall and
                  wears size S.
                </p>
                <p className="size-tip">
                  <strong>Tip:</strong> If you're between sizes, we recommend
                  sizing up for a more relaxed fit.
                </p>
              </Box>
            </Box>

            {/* SHIPPING & RETURNS */}
            <Box
              className={`accordion-item ${
                openAccordion === "shipping" ? "open" : ""
              }`}
            >
              <button
                className="accordion-header"
                onClick={() => handleAccordionToggle("shipping")}
              >
                <span>Shipping & Returns</span>
                <span className="accordion-icon">
                  {openAccordion === "shipping" ? <RemoveIcon /> : <AddIcon />}
                </span>
              </button>
              <Box className="accordion-content">
                <Box className="shipping-highlight">
                  <LocalShippingOutlinedIcon />
                  <span>
                    <strong>Free shipping</strong> on orders over $110
                  </span>
                </Box>
                <Box className="shipping-highlight">
                  <AssignmentReturnOutlinedIcon />
                  <span>
                    <strong>Free returns</strong> within 14 days
                  </span>
                </Box>
                <Box className="shipping-details">
                  <p>
                    <strong>Standard Delivery:</strong> $6 (Free over $110)
                  </p>
                  <p>
                    <strong>Processing Time:</strong> 1-2 business days
                  </p>
                  <p>
                    <strong>Delivery Time:</strong> 3-5 business days
                  </p>
                </Box>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Container>

      {/* YOU MAY ALSO LIKE */}
      {relatedProducts?.length > 0 && (
        <Box className="related-products">
          <Container>
            <h2 className="related-title">You May Also Like</h2>
            <Box className="related-grid">
              {relatedProducts?.map((product) => {
                const imagePath = `${serverApi}/${product?.productImages?.[0]}`;
                return (
                  <Box
                    key={product?._id}
                    className="related-card"
                    onClick={() => handleRelatedProductClick(product?._id)}
                  >
                    <Box className="related-image">
                      <img src={imagePath} alt={product?.productName} />
                    </Box>
                    <Box className="related-info">
                      <span className="related-name">
                        {product?.productName}
                      </span>
                      <span className="related-category">
                        {product?.productCollection}
                      </span>
                      <span className="related-price">
                        ${product?.productPrice?.toFixed(2)}
                      </span>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Container>
        </Box>
      )}

      <Box className="back-link">
        <span onClick={handleGoBack} className="back-button">
          <KeyboardArrowLeftIcon />
          Back to Shopping
        </span>
      </Box>
    </div>
  );
}
