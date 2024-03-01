import { useEffect, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import { CategoryModel } from "../../../lib/model/category-model";
import { ProductModel } from "../../../lib/model/product-model";
import { ReducerAction, Result } from "../lib/config/type";
import { createReducer } from "../lib/helper/common";
import { Failure } from "../lib/helper/failure";
import CategoryRepository from "../lib/repository/category-repository";
import ProductRepository from "../lib/repository/product-repository";
import ProductItem from "./component/product-item";
import ScrollTop from "./component/scrolltop";
import StatusBar from "./component/status-bar";

const productRepository = new ProductRepository();
const categoryRepository = new CategoryRepository();

export default function ProductPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries([...searchParams]);
  const page = parseInt(query.page);
  const limit = parseInt(query.limit);
  const max = page * (limit * 2);

  const [product, dispatchProduct] = useReducer(
    createReducer<Result<ProductModel[]>>,
    {
      type: null,
      payload: null,
      error: null,
    }
  );

  const [category, dispatchCategory] = useReducer(
    createReducer<Result<CategoryModel[]>>,
    {
      type: null,
      payload: null,
      error: null,
    }
  );

  function selectCategory(id: string) {
    if (id != query.categoryId) {
      setSearchParams({ ...query, categoryId: id, page: "1" });
    }
  }

  function selectAllCategory() {
    delete query.categoryId;
    setSearchParams(query);
  }

  function sort(param: Record<string, any>) {
    setSearchParams({ ...query, ...param });
  }

  function clearSort() {
    delete query.sort;
    delete query.direction;
    setSearchParams(query);
  }

  function next() {
    if (max < product.payload?.paginate?.total!) {
      setSearchParams({ ...query, page: (page + 1) as any });
    }
  }

  function prev() {
    if (page > 1) {
      setSearchParams({ ...query, page: (page - 1) as any });
    }
  }

  async function fetchCategory(): Promise<void> {
    try {
      const data = await categoryRepository.read();
      dispatchCategory({ type: ReducerAction.LOAD, payload: data });
    } catch (error) {
      dispatchCategory({
        type: ReducerAction.ERROR,
        error: Failure.handle(error),
      });
    }
  }

  async function fetchProduct(): Promise<void> {
    try {
      dispatchProduct({ type: ReducerAction.LOAD, payload: null });
      const data = await productRepository.read(query);
      dispatchProduct({ type: ReducerAction.LOAD, payload: data });
    } catch (error) {
      dispatchProduct({
        type: ReducerAction.ERROR,
        error: Failure.handle(error),
      });
    }
  }

  useEffect(() => {
    fetchCategory();
    fetchProduct();
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [searchParams]);

  return (
    <>
      <div className="flex flex-col gap-2 m-4 min-h-screen lg:w-3/5 lg:mx-auto">
        <StatusBar title="Semua Produk" />
        <div className="bg-surface text-onSurface w-full py-2 px-4 flex gap-2 items-center">
          <div>Urutkan:</div>
          <div className="flex gap-2 overflow-scroll snap-x no-scrollbar">
            {(() => {
              const active =
                query.sort == null && query.direction == null
                  ? "bg-secondary text-onSecondary font-semibold"
                  : "border border-secondary text-onSurface";

              return (
                <button
                  onClick={clearSort}
                  className={`py-2 px-4 whitespace-nowrap snap-start ${active}`}
                >
                  Terkait
                </button>
              );
            })()}

            {(() => {
              const active =
                query.sort == "created"
                  ? "bg-secondary text-onSecondary font-semibold"
                  : "border border-secondary text-onSurface";

              return (
                <button
                  onClick={() => {
                    sort({
                      sort: "created",
                      direction: "desc",
                    });
                  }}
                  className={`py-2 px-4 whitespace-nowrap snap-start ${active}`}
                >
                  Terbaru
                </button>
              );
            })()}

            {(() => {
              const active =
                query.sort == "sell"
                  ? "bg-secondary text-onSecondary font-semibold"
                  : "border border-secondary text-onSurface";

              return (
                <button
                  onClick={() => {
                    sort({
                      sort: "sell",
                      direction: "desc",
                    });
                  }}
                  className={`py-2 px-4 whitespace-nowrap snap-start ${active}`}
                >
                  Terlaris
                </button>
              );
            })()}

            {(() => {
              const active =
                query.sort == "rating"
                  ? "bg-secondary text-onSecondary font-semibold"
                  : "border border-secondary text-onSurface";

              return (
                <button
                  onClick={() => {
                    sort({
                      sort: "rating",
                      direction: "desc",
                    });
                  }}
                  className={`py-2 px-4 whitespace-nowrap snap-start ${active}`}
                >
                  Populer
                </button>
              );
            })()}

            {(() => {
              const active =
                query.sort == "priority"
                  ? "bg-secondary text-onSecondary font-semibold"
                  : "border border-secondary text-onSurface";

              return (
                <button
                  onClick={() => {
                    sort({
                      sort: "priority",
                      direction: "desc",
                    });
                  }}
                  className={`py-2 px-4 whitespace-nowrap snap-start ${active}`}
                >
                  Rekomendasi
                </button>
              );
            })()}

            {(() => {
              const active =
                query.sort == "price" && query.direction == "asc"
                  ? "bg-secondary text-onSecondary font-semibold"
                  : "border border-secondary text-onSurface";

              return (
                <button
                  onClick={() => {
                    sort({
                      sort: "price",
                      direction: "asc",
                    });
                  }}
                  className={`py-2 px-4 whitespace-nowrap snap-start ${active}`}
                >
                  Harga Terendah
                </button>
              );
            })()}

            {(() => {
              const active =
                query.sort == "price" && query.direction == "desc"
                  ? "bg-secondary text-onSecondary font-semibold"
                  : "border border-secondary text-onSurface";

              return (
                <button
                  onClick={() => {
                    sort({
                      sort: "price",
                      direction: "desc",
                    });
                  }}
                  className={`py-2 px-4 whitespace-nowrap snap-start ${active}`}
                >
                  Harga Tertinggi
                </button>
              );
            })()}
          </div>
        </div>
        <div className="flex gap-2">
          {(() => {
            const active =
              query.categoryId == null
                ? "bg-secondary text-onSecondary font-semibold"
                : "bg-surface text-onSurface";

            return (
              <>
                <button
                  onClick={selectAllCategory}
                  className={`py-2 px-4 whitespace-nowrap snap-start ${active}`}
                >
                  Semua Produk
                </button>
              </>
            );
          })()}
          <div className="flex gap-2 overflow-scroll snap-x no-scrollbar">
            {(() => {
              if (category.payload?.data?.length! > 0) {
                return (
                  <>
                    {category.payload?.data!.map((e, i) => {
                      const active =
                        query.categoryId == e.id
                          ? "bg-secondary text-onSecondary font-semibold"
                          : "bg-surface text-onSurface";

                      return (
                        <button
                          key={i}
                          onClick={() => {
                            selectCategory(e.id!);
                          }}
                          className={`py-2 px-4 whitespace-nowrap snap-start ${active}`}
                        >
                          {e.name}
                        </button>
                      );
                    })}
                  </>
                );
              }

              return (
                <>
                  {[...Array(20)].map((_, i) => {
                    return (
                      <div
                        key={i}
                        className="bg-gray-200 animate-pulse w-20 shrink-0"
                      />
                    );
                  })}
                </>
              );
            })()}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-5 lg:grid-cols-6">
          {(() => {
            if (product.payload?.data?.length! > 0) {
              return (
                <>
                  {product.payload?.data?.map((e, i) => {
                    return (
                      <div key={i} className="h-60">
                        <ProductItem product={e} />
                      </div>
                    );
                  })}
                </>
              );
            }

            return (
              <>
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-gray-200 animate-pulse h-60"></div>
                ))}
              </>
            );
          })()}
        </div>

        {(() => {
          if (max < product.payload?.paginate?.total!) {
            return (
              <div className="flex justify-center gap-1 mt-2">
                <button
                  className="p-2 rounded bg-secondary text-onSecondary"
                  onClick={prev}
                >
                  PREV
                </button>
                <button
                  className="p-2 rounded bg-primary text-onPrimary"
                  onClick={next}
                >
                  NEXT
                </button>
              </div>
            );
          }
        })()}
      </div>
      <ScrollTop />
    </>
  );
}
