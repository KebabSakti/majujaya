import { useEffect, useReducer, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { ProductModel } from "../../../../lib/model/product-model";
import { ReducerAction, Result } from "../../lib/config/type";
import { createReducer, currency, debounce } from "../../lib/helper/common";
import { Failure } from "../../lib/helper/failure";
import ProductRepository from "../../lib/repository/product-repository";

const productRepository = new ProductRepository();

export default function SearchBar() {
  const inputRef = useRef(null);
  const [keyword, setKeyword] = useState("");
  const [debounceSearch] = debounce(search, 500);

  const [state, dispatch] = useReducer(createReducer<Result<ProductModel[]>>, {
    type: null,
    payload: null,
    error: null,
  });

  function search(event: any) {
    const value = event.target.value;
    setKeyword(value);
  }

  async function searchProduct(): Promise<void> {
    try {
      dispatch({ type: ReducerAction.LOAD, payload: null });

      const data = await productRepository.read({
        page: 1,
        limit: 5,
        name: keyword,
      });

      dispatch({ type: ReducerAction.LOAD, payload: data });
    } catch (error) {
      dispatch({
        type: ReducerAction.ERROR,
        error: Failure.handle(error),
      });
    }
  }

  function reset() {
    dispatch({ type: ReducerAction.LOAD, payload: null });
    setKeyword("");

    if (inputRef.current) {
      (inputRef.current["value"] as any) = "";
    }
  }

  useEffect(() => {
    if (keyword.length >= 3) {
      searchProduct();
    } else {
      dispatch({ type: ReducerAction.LOAD, payload: null });
    }
  }, [keyword]);

  return (
    <>
      <div className="relative grow mx-4 lg:mx-10">
        <input
          ref={inputRef}
          type="text"
          placeholder="Cari di sini"
          className="bg-background h-10 px-4 text-sm w-full"
          onChange={debounceSearch}
        />
        {(() => {
          if (keyword.length > 0) {
            return (
              <>
                <div
                  className="bg-surface text-onSurface p-4 z-10 w-full drop-shadow mt-1 rounded-sm absolute"
                  onClick={reset}
                >
                  {(() => {
                    if (state.payload?.data?.length! == 0) {
                      return (
                        <div className="text-sm">
                          Tidak ditemukan produk dengan kata kunci{" "}
                          <span className="font-bold">{keyword}</span>
                        </div>
                      );
                    }

                    if (state.payload?.data?.length! > 0) {
                      return (
                        <div className="flex flex-col gap-4">
                          {state.payload?.data?.map((_, i) => {
                            const product = state.payload?.data![i]!;

                            return (
                              <Link key={i} to={`/product-detail/${product.id}`}>
                                <div className="flex items-center gap-3 text-sm text-onBackground">
                                  <div className="w-8 h-8">
                                    <LazyLoadImage
                                      src={product?.picture}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="text-xs md:text-base">
                                    <div className="font-semibold line-clamp-1">
                                      {product?.name}
                                    </div>
                                    <div>{currency(product?.price!)}</div>
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      );
                    }

                    return <div className="text-sm">Loading..</div>;
                  })()}
                </div>
              </>
            );
          }

          return <></>;
        })()}
      </div>
    </>
  );
}
