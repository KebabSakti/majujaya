import { Carousel } from "flowbite-react";
import { useEffect, useReducer } from "react";
import { BannerModel } from "../../../../lib/model/banner-model";
import { ReducerAction, Result } from "../../lib/config/type";
import { createReducer } from "../../lib/helper/common";
import { Failure } from "../../lib/helper/failure";
import BannerRepository from "../../lib/repository/banner-repository";

const bannerRepository = new BannerRepository();

export default function BannerComponent() {
  const [state, dispatch] = useReducer(createReducer<Result<BannerModel[]>>, {
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
      const data = await bannerRepository.read();
      dispatch({ type: ReducerAction.LOAD, payload: data });
    } catch (error) {
      dispatch({
        type: ReducerAction.ERROR,
        error: Failure.handle(error),
      });
    }
  }

  return (
    <div className="bg-surface p-4 lg:py-4 lg:px-0">
      {(() => {
        if (state.payload?.data?.length! > 0) {
          return (
            <>
              <Carousel className="h-44 lg:h-52 lg:w-3/5 lg:mx-auto">
                {state.payload?.data!.map((e, i) => {
                  return (
                    <img
                      key={i}
                      src={e.picture}
                      alt={e.name}
                      width={500}
                      height={500}
                      className="bg-gray-100 object-cover h-full w-full"
                    />
                  );
                })}
              </Carousel>
            </>
          );
        }

        return (
          <>
            <div className="bg-gray-200 animate-pulse h-44 lg:h-52 lg:w-3/5 lg:mx-auto" />
          </>
        );
      })()}
    </div>
  );
}
