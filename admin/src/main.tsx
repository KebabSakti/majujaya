import { CustomFlowbiteTheme, Flowbite } from "flowbite-react";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Layout from "./view/component/layout";
import { AuthProvider } from "./view/context/auth-context";
import CategoryPage from "./view/page/category-page";
import DashboardPage from "./view/page/dashboard-page";
import LoginPage from "./view/page/login-page";
import SettingPage from "./view/page/setting-page";
import BannerPage from "./view/page/banner-page";

const theme: CustomFlowbiteTheme = {
  carousel: {
    scrollContainer: {
      base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-none",
      snap: "snap-x",
    },
  },
  modal: {
    root: {
      base: "fixed top-0 right-0 left-0 z-50 h-full overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
    },
    content: {
      base: "relative h-full w-full p-4 md:h-auto flex flex-col justify-center",
      inner:
        "relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col",
    },
  },
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    element: <Layout />,
    children: [
      {
        index: true,
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/banner",
        element: <BannerPage />,
      },
      {
        path: "/category",
        element: <CategoryPage />,
      },
      {
        path: "/setting",
        element: <SettingPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Flowbite theme={{ theme: theme }}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer position="top-center" hideProgressBar={false} />
      </AuthProvider>
    </Flowbite>
  </React.StrictMode>
);
