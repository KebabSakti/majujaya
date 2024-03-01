import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import bannerReducer from "./banner-slice";
import categoryReducer from "./category-slice";
import counterReducer from "./counter-slice";
import layoutReducer from "./layout-slice";
import productDetailReducer from "./product-detail-slice";
import productLatestReducer from "./product-latest-slice";
import productPopularReducer from "./product-popular-slice";
import productRatingReducer from "./product-rating-slice";
import productReducer from "./product-slice";

const store = configureStore({
  reducer: {
    layout: layoutReducer,
    auth: authReducer,
    banner: bannerReducer,
    category: categoryReducer,
    product: productReducer,
    productPopular: productPopularReducer,
    productLatest: productLatestReducer,
    productDetail: productDetailReducer,
    productRating: productRatingReducer,
    counter: counterReducer,
  },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
