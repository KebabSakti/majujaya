import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { ProductModel } from "../../../../lib/model/product-model";
import { ReducerAction, Result } from "../../lib/config/type";
import { createReducer } from "../../lib/helper/common";
import { Failure } from "../../lib/helper/failure";
import ProductRepository from "../../lib/repository/product-repository";
import ProductItem from "./product-item";

const productRepository = new ProductRepository();

export default function ProductRecommendedComponent() {
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
        limit: 50,
        sort: "priority",
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
      <div className="bg-surface h-12 mt-4 mx-4 text-onSurface font-semibold flex justify-center items-center border-b-2 border-primary lg:w-3/5 lg:mx-auto">
        REKOMENDASI
      </div>
      <div className="mt-2 mx-4 grid grid-cols-2 gap-2 md:grid-cols-5 lg:grid-cols-6 lg:w-3/5 lg:mx-auto">
        {(() => {
          if (state.payload?.data?.length! > 0) {
            return (
              <>
                {state.payload?.data?.map((e, i) => {
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
      <Link
        to="/product?page=1&limit=60&sort=priority&direction=desc"
        className="bg-surface h-10 mt-2 mx-4 text-onSurface flex justify-center items-center border border-primary mb-2 lg:w-1/3 lg:mx-auto"
      >
        Lihat Lainnya
      </Link>
    </>
  );
}
