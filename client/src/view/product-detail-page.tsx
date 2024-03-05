import { Carousel, Modal, Spinner } from "flowbite-react";
import { useContext, useEffect, useReducer, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useParams } from "react-router-dom";
import { ProductModel } from "../../../lib/model/product-model";
import { Empty, ReducerAction, Result } from "../lib/config/type";
import { createReducer, nl2br } from "../lib/helper/common";
import { Failure } from "../lib/helper/failure";
import ProductRepository from "../lib/repository/product-repository";
import ProductInfo from "./component/product-info";
import ProductRatingComponent from "./component/product-rating-component";
import ScrollTop from "./component/scrolltop";
import StatusBar from "./component/status-bar";
import { CartContext } from "./context/cart-context";

const productRepository = new ProductRepository();

export default function ProductDetailPage() {
  const { id } = useParams();
  const cartContext = useContext(CartContext);
  const [image, setImage] = useState<string | Empty>(null);

  const [state, dispatch] = useReducer(createReducer<Result<ProductModel>>, {
    type: null,
    payload: null,
    error: null,
  });

  useEffect(() => {
    init();
    cartContext?.init();
  }, [id]);

  async function init(): Promise<void> {
    try {
      dispatch({ type: ReducerAction.LOAD, payload: null });
      const data = await productRepository.show(id!);
      dispatch({ type: ReducerAction.LOAD, payload: data });
    } catch (error) {
      dispatch({
        type: ReducerAction.ERROR,
        error: Failure.handle(error),
      });
    }
  }

  if (state.payload != null) {
    const product = state.payload?.data!;
    const gallery = state.payload?.data?.productGalery;

    return (
      <>
        <div className="flex flex-col gap-2 m-4 min-h-screen lg:w-3/5 lg:mx-auto">
          <StatusBar title="Produk Detail" />
          <div className="bg-surface p-4 flex flex-col gap-2 text-onSurface md:flex-row md:gap-4">
            <div className="bg-gray-700 h-60 w-full md:h-80 md:basis-1/2">
              <Carousel indicators={false}>
                <LazyLoadImage
                  src={product.picture}
                  alt={product.name}
                  className="object-contain h-full w-full"
                  onClick={() => {
                    setImage(product.picture);
                  }}
                />
                {gallery?.map((e, i) => {
                  return (
                    <LazyLoadImage
                      key={i}
                      src={e.picture}
                      alt={product.name}
                      className="object-contain h-full w-full"
                      onClick={() => {
                        setImage(e.picture);
                      }}
                    />
                  );
                })}
              </Carousel>
            </div>
            <ProductInfo product={product} />
          </div>
          <div className="bg-surface p-4 flex items-center gap-4 text-onSurface md:flex-row md:gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
              />
            </svg>
            <div className="flex flex-col gap-1">
              <span className="text-xl font-semibold">
                {product.store?.name}
              </span>
              <div className="flex gap-2">
                <Link
                  to={`/product?storeId=${product.store?.id}&page=1&limit=60`}
                  className="flex gap-1 items-center bg-primary px-2 py-1 w-max"
                >
                  <span className="text-onPrimary text-sm">Lihat Produk</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 stroke-white stroke-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </Link>
                <Link
                  to={`https://wa.me/6281254982664`}
                  target="_blank"
                  className="flex gap-1 items-center bg-green-500 px-2 py-1 w-max"
                >
                  <span className="text-white text-sm">Chat Penjual</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 stroke-white stroke-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-surface p-4 flex flex-col gap-2 text-onSurface">
            <div className="text-xl font-semibold">Deskripsi</div>
            <div className="whitespace-pre-line">
              {product.description ?? ""}
            </div>
          </div>
          <ProductRatingComponent productId={product.id!} />
        </div>
        <ScrollTop />
        <Modal
          dismissible
          show={image != null}
          onClose={() => {
            setImage(null);
          }}
        >
          <div className="relative">
            <button
              className="absolute right-2 top-2 bg-white drop-shadow rounded-full p-1"
              onClick={() => {
                setImage(null);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
            <img src={image!} className="w-full h-full" />
          </div>
        </Modal>
      </>
    );
  }

  return (
    <>
      <div className="bg-surface flex justify-center items-center h-screen m-4 lg:w-3/5 lg:mx-auto">
        <Spinner size="xl" />
      </div>
    </>
  );
}
