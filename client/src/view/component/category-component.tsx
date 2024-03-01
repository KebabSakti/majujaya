import { useEffect, useReducer } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { CategoryModel } from "../../../../lib/model/category-model";
import { ReducerAction, Result } from "../../lib/config/type";
import { createReducer } from "../../lib/helper/common";
import { Failure } from "../../lib/helper/failure";
import CategoryRepository from "../../lib/repository/category-repository";

const categoryRepository = new CategoryRepository();

export default function CategoryComponent() {
  const [state, dispatch] = useReducer(createReducer<Result<CategoryModel[]>>, {
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
      const data = await categoryRepository.read();
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
          <div className="text-onSurface font-semibold">KATEGORI</div>
          {/* <Link to="/category" className="text-primary text-sm flex">
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
          </Link> */}
        </div>
        {(() => {
          if (state.payload?.data?.length! > 0) {
            return (
              <>
                <div className="grid grid-rows-2 grid-flow-col gap-1 overflow-x-scroll justify-start snap-x no-scrollbar">
                  {state.payload?.data?.map((e, i) => {
                    return (
                      <Link
                        key={i}
                        to={`/product?categoryId=${e.id}&page=1&limit=60`}
                        className="bg-surface snap-start flex flex-col justify-center items-center w-24 h-24 md:w-40 md:h-40 lg:w-44 lg:h-44"
                      >
                        <LazyLoadImage
                          src={e.picture}
                          width={40}
                          height={40}
                          className="w-12 h-12 object-cover md:w-14 md:h-14"
                        />
                        <div className="text-onSurface text-xs font-semibold mt-2 line-clamp-2 text-center md:text-sm">
                          {e.name}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </>
            );
          }

          return (
            <>
              <div className="grid grid-rows-2 grid-flow-col gap-1 overflow-x-scroll justify-start snap-x">
                {[...Array(16)].map((_, i) => {
                  return (
                    <div
                      key={i}
                      className="bg-gray-200 animate-pulse snap-start flex flex-col justify-center items-center w-24 h-24 md:w-40 md:h-40 lg:w-44 lg:h-44"
                    />
                  );
                })}
              </div>
            </>
          );
        })()}
      </div>
    </>
  );
}
