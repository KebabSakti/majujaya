import { Rating } from "flowbite-react";
import { useEffect, useState } from "react";
import { ProductModel } from "../../../../lib/model/product-model";
import { ProductVariant } from "../../../../lib/model/product-variant";
import { Empty } from "../../lib/config/type";
import { currency } from "../../lib/helper/common";
import QuantityItem from "./quantity-item";

export default function ProductInfo({ product }: { product: ProductModel }) {
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | Empty
  >();

  function selectVariant(variant: ProductVariant) {
    setSelectedVariant(variant);
  }

  useEffect(() => {
    init();
  }, []);

  function init() {
    setSelectedVariant(product.productVariant![0]);
  }

  return (
    <>
      <div className="w-full md:basis-1/2 flex flex-col gap-1">
        <div className="font-semibold text-xl">{product.name}</div>
        <div className="flex gap-4 text-sm">
          <div className="flex gap-1 justify-center items-center">
            <span className="font-bold">{product.rating!.toFixed(1)}</span>
            <Rating>
              {[...Array(5)].map((_, i) => (
                <Rating.Star key={i} filled={Math.floor(product.rating!) > i} />
              ))}
            </Rating>
          </div>
          <div className="flex gap-1 justify-center items-center">
            <span className="font-bold">{product.view}</span>
            <span>Dilihat</span>
          </div>
          <div className="flex gap-1 justify-center items-center">
            <span className="font-bold">{product.sell}</span>
            <span>Terjual</span>
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <span className="text-xs text-gray-400">
            {selectedVariant?.product?.unit}
          </span>
          <span className="font-bold text-2xl">
            {currency(selectedVariant?.price ?? product.price!)}
          </span>
          {(() => {
            if (
              selectedVariant?.wholesaleMin != null ||
              selectedVariant?.wholesalePrice! != null
            ) {
              return (
                <span className="text-xs font-bold underline">
                  Beli {selectedVariant?.wholesaleMin}++ harga{" "}
                  <span className="text-red-500">
                    {currency(selectedVariant?.wholesalePrice!)}
                  </span>
                </span>
              );
            }
          })()}
        </div>
        <div className="flex mt-6">
          <span className="w-20 shrink-0">Varian</span>
          <div className="flex gap-2 flex-wrap text-xs">
            {product.productVariant!.map((e, i) => {
              const selected =
                e.id == selectedVariant?.id ? "bg-primary text-onPrimary" : "";

              return (
                <div
                  key={i}
                  className={`p-1 outline outline-1 outline-primary hover:cursor-pointer hover:bg-primary hover:text-onPrimary cursor-pointer ${selected}`}
                  onClick={() => {
                    selectVariant(e);
                  }}
                >
                  {e.name}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex mt-6 items-center">
          <span className="w-20 shrink-0">Kuantitas</span>
          <QuantityItem productVariant={selectedVariant} />
        </div>
        {/* <div className="flex gap-2 mt-6 text-sm">
          <button className="flex gap-2 bg-primary py-2 px-4 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 stroke-onPrimary stroke-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <span className="text-onPrimary">Masukkan Keranjang</span>
          </button>
          <button
            className="flex gap-2 bg-secondary py-2 px-4"
            onClick={() => {}}
          >
            <span className="text-onSecondary">Beli Sekarang</span>
          </button>
        </div> */}
      </div>
    </>
  );
}
