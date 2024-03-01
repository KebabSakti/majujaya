import { CustomFlowbiteTheme, Flowbite } from "flowbite-react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import AuthBar from "./auth-bar";
import ErrorBoundary from "./error-boundary";
import Footer from "./footer";
import NavBar from "./nav-bar";

const customTheme: CustomFlowbiteTheme = {
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

export default function Layout() {
  return (
    <>
      <ScrollRestoration />
      <Flowbite theme={{ theme: customTheme }}>
        <ErrorBoundary>
          <div className="bg-background min-h-screen">
            <AuthBar />
            <NavBar />
            <Outlet />
            <Footer />
          </div>
        </ErrorBoundary>
      </Flowbite>
    </>
  );
}
