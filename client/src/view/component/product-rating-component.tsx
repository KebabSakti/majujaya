import { Rating, Spinner } from "flowbite-react";
import { useEffect, useReducer, useState } from "react";
import { ProductRating } from "../../../../lib/model/product-rating";
import { ReducerAction, Result } from "../../lib/config/type";
import { createReducer } from "../../lib/helper/common";
import { Failure } from "../../lib/helper/failure";
import ProductRatingRepository from "../../lib/repository/product-rating-repository";

const productRatingRepository = new ProductRatingRepository();

export default function ProductRatingComponent({
  productId,
}: {
  productId: string;
}) {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    sort: "rating",
    direction: "desc",
    productId: productId,
  });

  const [state, dispatch] = useReducer(createReducer<Result<ProductRating[]>>, {
    type: null,
    payload: null,
    error: null,
  });

  useEffect(() => {
    init();
  }, [query]);

  async function init(): Promise<void> {
    try {
      // dispatch({ type: ReducerAction.LOAD, payload: null });
      const data = await productRatingRepository.read(query);
      dispatch({ type: ReducerAction.LOAD, payload: data });
    } catch (error) {
      dispatch({
        type: ReducerAction.ERROR,
        error: Failure.handle(error),
      });
    }
  }

  function sort() {
    const direction = query.direction === "desc" ? "asc" : "desc";
    setQuery({ ...query, page: 1, direction: direction });
  }

  function next() {
    const max = query.page * query.limit + query.limit;

    if (max < state.payload?.paginate?.total!) {
      setQuery({ ...query, page: query.page + 1 });
    }
  }

  function prev() {
    if (query.page > 1) {
      setQuery({ ...query, page: query.page - 1 });
    }
  }

  return (
    <>
      <div className="bg-surface p-4 flex flex-col gap-2 text-onSurface">
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold">Penilaian</div>
          <button onClick={sort}>
            {query.direction === "desc" ? (
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
                  d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
                />
              </svg>
            ) : (
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
                  d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
                />
              </svg>
            )}
          </button>
        </div>
        {(() => {
          if (state.payload?.data?.length! > 0) {
            return (
              <>
                <div className="flex flex-col gap-0 divide-y">
                  {state.payload?.data?.map((e, i) => {
                    return (
                      <div key={i} className="flex gap-4 py-6">
                        <div className="w-14 shrink-0">
                          <div className="h-12 w-12 rounded-full overflow-hidden">
                            <img
                              src={`https://picsum.photos/500/500?random=${i}`}
                              alt=""
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="font-semibold">{e.user?.name}</div>
                          <Rating size="xs">
                            {[...Array(5)].map((_, i) => (
                              <Rating.Star
                                key={i}
                                filled={Math.floor(e.rating!) > i}
                              />
                            ))}
                          </Rating>
                          <div className="text-gray-400 text-xs">
                            Varian : {e.productName}
                          </div>
                          <div className="text-xs md:text-base">
                            {e.comment}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-center gap-1">
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
              </>
            );
          }

          if (state.payload?.data?.length! == 0) {
            return (
              <div className="h-20 w-full flex justify-center items-center text-gray-400">
                Belum ada penilaian untuk produk ini
              </div>
            );
          }

          return (
            <>
              <div className="h-20 w-full flex justify-center items-center">
                <Spinner size="lg" />
              </div>
            </>
          );
        })()}
      </div>
    </>
  );
}
