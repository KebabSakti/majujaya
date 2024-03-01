import { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../asset/maju-jaya.png";
import mascot from "../../asset/mascot-only.png";
import { CartContext } from "../context/cart-context";
import SearchBar from "./search-bar";
import { AuthContext } from "../context/auth-context";

export default function NavBar() {
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);

  return (
    <div className="bg-primary">
      <div className="mx-4 h-16 flex justify-between items-center lg:mx-auto lg:w-3/5">
        <Link to="/" className="flex items-center">
          <img src={mascot} alt="Logo Maju Jaya" className="w-12 md:hidden" />
          <img
            src={logo}
            alt="Logo Maju Jaya"
            className="hidden md:w-36 md:block"
          />
        </Link>
        <SearchBar />
        <div className="flex gap-3">
          <Link to="/cart" className="relative">
            <div className="h-5 w-5 flex justify-center items-center rounded-full bg-red-500 text-white text-[10px] font-bold outline outline-2 outline-white absolute -right-2 -top-2">
              {(() => {
                const total = cartContext?.cart?.cartItem?.reduce(
                  (a, b) => a + Number(b.qty!),
                  0
                );

                return total ?? 0;
              })()}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-onPrimary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </Link>
          <Link
            to={
              authContext?.auth
                ? "/profile?page=1&limit=5&sort=updated&direction=desc"
                : "/login"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-onPrimary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
