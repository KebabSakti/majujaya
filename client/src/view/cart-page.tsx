import { useContext, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { currency } from "../lib/helper/common";
import QuantityItem from "./component/quantity-item";
import StatusBar from "./component/status-bar";
import { CartContext } from "./context/cart-context";

export default function CartPage() {
  const cartContext = useContext(CartContext);

  useEffect(() => {
    cartContext?.init();
  }, []);

  return (
    <div className="flex flex-col gap-2 m-4 min-h-screen lg:w-3/5 lg:mx-auto">
      <StatusBar title="Keranjang Belanja" />
      <div className="bg-surface text-onSurface w-full py-2 px-4 flex flex-col divide-y">
        {(() => {
          if (cartContext?.cart?.cartItem?.length) {
            return (
              <>
                {cartContext.cart.cartItem.map((e, i) => {
                  return (
                    <div key={i} className="py-6">
                      <div className="flex gap-1 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                          />
                        </svg>
                        <div className="font-semibold text-green-500">
                          {e.productVariant?.product?.store?.name}
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="bg-gray-100 w-24 h-24 mt-2 shrink-0">
                          <LazyLoadImage
                            src={e.productVariant?.product?.picture}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <div>
                            <Link
                              to={`/product-detail/${e.productVariant?.product?.id}`}
                            >
                              {e.productVariant?.product?.name}
                            </Link>
                            <div className="text-xs text-gray-400">
                              Varian : {e.productVariant?.name}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="font-semibold flex gap-1 items-center">
                              <div>{currency(e.total!)}</div>
                              {(() => {
                                if (
                                  e.productVariant?.wholesaleMin != null &&
                                  e.productVariant?.wholesalePrice != null
                                ) {
                                  if (e.qty! >= e.productVariant.wholesaleMin) {
                                    return (
                                      <div className="text-red-500 text-xs">
                                        (Grosir)
                                      </div>
                                    );
                                  }
                                }
                              })()}
                            </div>
                            <QuantityItem productVariant={e.productVariant} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            );
          }

          return (
            <div className="flex flex-col gap-4 items-center justify-center py-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-24 h-24 stroke-gray-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
              <div>Keranjang Belanja Kosong</div>
              <Link
                to="/product?page=1&limit=60&sort=priority&direction=desc"
                className="bg-primary text-onPrimary rounded py-2 px-4"
              >
                Cek produk Rekomendasi
              </Link>
            </div>
          );
        })()}
      </div>
      <div className="bg-surface text-onSurface w-full py-2 px-4 flex flex-col gap-4 md:flex-row md:gap-0 md:justify-between md:items-center">
        <div className="font-bold">
          Total ({cartContext?.cart?.cartItem?.length ?? 0}) Produk :{" "}
          <span className="text-red-500 text-lg">
            {currency(cartContext?.cart?.total!)}
          </span>
        </div>
        {cartContext?.cart?.cartItem?.length == 0 ? (
          <></>
        ) : (
          <Link
            to="/checkout"
            className="bg-primary text-onPrimary p-2 w-full text-center md:w-max"
          >
            Checkout
          </Link>
        )}
      </div>
    </div>
  );
}
