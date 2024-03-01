import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PaymentModel } from "../../../../lib/model/payment-model";
import { DataState, Empty } from "../../lib/config/type";
import PaymentRepository from "../../lib/repository/payment-repository";

const paymentRepository = new PaymentRepository();

export default function PaymentComponent({
  paymentId,
  selectPayment,
}: {
  paymentId: string | Empty;
  selectPayment: (payment: PaymentModel) => void;
}) {
  const [payment, setPayment] = useState<DataState<PaymentModel[]>>();

  useEffect(() => {
    init();
  }, []);

  function init() {
    getPayment();
  }

  function getPayment() {
    try {
      setPayment({ ...payment, status: "loading" });

      paymentRepository.read().then((result) => {
        setPayment({
          ...payment,
          status: "loaded",
          data: result.data,
          error: null,
        });
      });
    } catch (error: any) {
      setPayment({ ...payment, status: "error", error: error });
    }
  }

  return (
    <>
      {(() => {
        if (payment?.status == "loaded" && payment.data?.length! > 0) {
          return (
            <>
              <div className="flex gap-2">
                {payment.data!.map((e, i) => {
                  const active =
                    paymentId == e.id
                      ? "bg-primary text-onPrimary font-semibold"
                      : "";

                  return (
                    <button
                      key={i}
                      type="button"
                      className="py-4"
                      onClick={() => selectPayment(e)}
                    >
                      <div
                        className={`py-1 px-2 border w-max rounded cursor-pointer flex gap-1 items-center hover:bg-primary hover:text-onPrimary ${active}`}
                      >
                        <div className="size-10">
                          <LazyLoadImage src={e.picture} />
                        </div>
                        <div>{e.name}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          );
        }

        if (payment?.status == "loading") {
          return (
            <div className="py-4 flex gap-2">
              <Spinner />
            </div>
          );
        }

        return <div className="py-4 flex gap-2">Tidak ada data</div>;
      })()}
    </>
  );
}
