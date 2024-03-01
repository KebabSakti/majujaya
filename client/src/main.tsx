import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./index.css";
import AdminPage from "./view/admin-page";
import CartPage from "./view/cart-page";
import CheckoutPage from "./view/checkout-page";
import Layout from "./view/component/layout";
import { AuthProvider } from "./view/context/auth-context";
import { CartProvider } from "./view/context/cart-context";
import DebugPage from "./view/debug-page";
import ErrorPage from "./view/error-page";
import HomePage from "./view/home-page";
import LoginPage from "./view/login-page";
import OrderPage from "./view/order-page";
import ProductDetailPage from "./view/product-detail-page";
import ProductMangementPage from "./view/product-management-page";
import ProductPage from "./view/product-page";
import ProfilePage from "./view/profile-page";
import { store } from "./view/redux/store";
import RegisterPage from "./view/register-page";
import SalesPage from "./view/sales-page";
import ShopPage from "./view/shop-page";
import SuccessPage from "./view/success-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/product",
        element: <ProductPage />,
      },
      { path: "/product-detail/:id", element: <ProductDetailPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/success", element: <SuccessPage /> },
      {
        path: "/profile",
        element: <ProfilePage />,
        children: [
          {
            index: true,
            element: <OrderPage />,
          },
          {
            path: "/profile/shop",
            element: <ShopPage />,
          },
          {
            path: "/profile/product-management",
            element: <ProductMangementPage />,
          },
          {
            path: "/profile/sales",
            element: <SalesPage />,
          },
        ],
      },
      { path: "/debug", element: <DebugPage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
          <ToastContainer position="top-center" hideProgressBar={false} />
        </CartProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
