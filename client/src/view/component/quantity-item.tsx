import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductVariant } from "../../../../lib/model/product-variant";
import { Empty } from "../../lib/config/type";
import { AuthContext } from "../context/auth-context";
import { CartContext } from "../context/cart-context";
import { toast } from "react-toastify";

export default function QuantityItem({
  productVariant,
}: {
  productVariant: ProductVariant | Empty;
}) {
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  function increment() {
    if (authContext?.auth) {
      cartContext?.addItem(productVariant!);
    } else {
      mustLogin();
    }
  }

  function decrement() {
    if (authContext?.auth) {
      cartContext?.removeItem(productVariant!);
    } else {
      mustLogin();
    }
  }

  function inputOnChange(e: any) {
    if (authContext?.auth) {
      const value = parseInt(e.target.value);
      cartContext?.setItem(productVariant!, value);
    } else {
      mustLogin();
    }
  }

  function mustLogin() {
    toast("Login untuk mulai belanja");
    navigate("/login");
  }

  return (
    <>
      <div className="flex">
        <button className="bg-secondary p-2" onClick={decrement}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 stroke-onSecondary stroke-2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>
        {(() => {
          let qty = 0;
          const cartItem = cartContext?.getCartItem(productVariant!);

          if (cartItem) {
            qty = cartItem!.qty!;
          }

          return (
            <input
              type="number"
              min={0}
              className="p-1 w-14 text-center"
              name="item"
              required
              value={qty}
              onChange={inputOnChange}
            />
          );
        })()}
        <button className="bg-primary p-2" onClick={increment}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 stroke-onPrimary stroke-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
