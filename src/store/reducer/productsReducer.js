import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    singleProduct: {
      id: "",
      title: "",
      price: "",
      description: "",
      image: "",
      stock: 0,
      category: {},
    },
    productDetails: [{}],
    editProduct: {
      id: "",
      title: "",
      price: "",
      description: "",
      image: "",
      stock: 0,
      category: {},
    },
    filter: {
      search: "",
      category: "Other",
      maxResults: 50,
    },
  },
  reducers: {
    setProducts: (state, action) => {
      const products = action.payload;
      state.products = products;
    },
    setProductInfo: (state, action) => {
      state.singleProduct = action.payload;
    },
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
    setEditProduct: (state, action) => {
      state.editProduct = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  setProducts,
  setProductInfo,
  setProductDetails,
  setEditProduct,
  setFilter,
} = productsSlice.actions;

export default productsSlice.reducer;
