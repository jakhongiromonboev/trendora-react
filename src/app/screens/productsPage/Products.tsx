import { createSelector, type Dispatch } from "@reduxjs/toolkit";
import type { CartItem } from "../../../lib/types/search";
import type { Product, ProductInquiry } from "../../../lib/types/product";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  ProductCollection,
  ProductGender,
  ProductShoeSize,
  ProductSize,
} from "../../../lib/enums/product.enum";
import { useHistory } from "react-router-dom";
import ProductService from "../../../services/ProductService";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(prop: ProductProps) {
  const { onAdd } = prop;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);

  /** LOCAL STATE **/
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    gender: ProductGender.FEMALE,
    productCollection: ProductCollection.TOPS,
    search: "",
  });

  const history = useHistory();
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
      productSearch.search = searchText;
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** HANDLERS **/
  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchGenderHandler = (gender: ProductGender) => {
    productSearch.page = 1;
    productSearch.gender = gender;
    setProductSearch({ ...productSearch });
  };

  const searchProductSizeHandler = (size: ProductSize) => {
    productSearch.page = 1;
    productSearch.productSize = size;
    setProductSearch({ ...productSearch });
  };

  const searchProductShoeSizeHandler = (shoeSize: ProductShoeSize) => {
    productSearch.page = 1;
    productSearch.productShoeSize = shoeSize;
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

  const cleaerAllFiltersHandler = () => {
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

  return <div>HI</div>;
}
