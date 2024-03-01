import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { ProductModel } from "../../../../lib/model/product-model";
import { ReducerAction, Result } from "../../lib/config/type";
import { createReducer } from "../../lib/helper/common";
import { Failure } from "../../lib/helper/failure";
import ProductRepository from "../../lib/repository/product-repository";
import ProductItem from "./product-item";

const productRepository = new ProductRepository();

export default function ProductPopularComponent() {
  const [state, dispatch] = useReducer(createReducer<Result<ProductModel[]>>, {
    type: null,
    payload: null,
    error: null,
  });

  useEffect(() => {
    init();
  }, []);

  async function init(): Promise<void> {
    try {
      dispatch({ type: ReducerAction.LOAD, payload: null });

      const data = await productRepository.read({
        page: 1,
        limit: 10,
        sort: "sell",
        direction: "desc",
      });

      dispatch({ type: ReducerAction.LOAD, payload: data });
    } catch (error) {
      dispatch({
        type: ReducerAction.ERROR,
        error: Failure.handle(error),
      });
    }
  }

  return (
    <>
      <div className="mx-4 mt-4 lg:w-3/5 lg:mx-auto">
        <div className="bg-surface mb-1 p-4 flex justify-between">
          <div className="text-onSurface font-semibold">TERLARIS</div>
          <Link
            to="/product?page=1&limit=60&sort=sell&direction=desc"
            className="text-primary text-sm flex"
          >
            <span>Lihat Semua</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </Link>
        </div>
        <div className="grid grid-rows-1 grid-flow-col gap-1 overflow-x-scroll justify-start snap-x no-scrollbar">
          {(() => {
            if (state.payload?.data?.length! > 0) {
              return (
                <>
                  {state.payload?.data?.map((e, i) => {
                    return (
                      <div key={i} className="h-60 w-40 shrink-0">
                        <ProductItem product={e} />
                      </div>
                    );
                  })}
                </>
              );
            }

            return (
              <>
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-200 h-64 w-40 animate-pulse snap-start"
                  ></div>
                ))}
              </>
            );
          })()}
        </div>
      </div>
    </>
  );
}
