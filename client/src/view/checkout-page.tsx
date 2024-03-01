import { Spinner } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { OrderItem } from "../../../lib/model/order-model";
import { PaymentModel } from "../../../lib/model/payment-model";
import { currency } from "../lib/helper/common";
import OrderRepository from "../lib/repository/order-repository";
import ModalLoading from "./component/modal-loading";
import ModalPrompt from "./component/modal-prompt";
import PaymentComponent from "./component/payment-component";
import StatusBar from "./component/status-bar";
import { AuthContext } from "./context/auth-context";
import { CartContext } from "./context/cart-context";

const orderRepository = new OrderRepository();

export default function CheckoutPage() {
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState(false);

  const [input, setInput] = useState<any>({
    receiverName: "",
    receiverPhone: "",
    receiverAddress: "",
    paymentId: null,
    paymentName: null,
    paymentPicture: null,
    paymentFixed: null,
    productQty: 0,
    productTotal: 0,
    paymentFee: 0,
    adminFee: 0,
    shippingFee: 0,
  });

  useEffect(() => {
    init();
  }, [authContext?.auth, cartContext?.cart]);

  function init() {
    const stores: Record<string, any>[] = [];

    const orderItem: any = cartContext?.cart?.cartItem?.map((e) => {
      return {
        storeId: e.productVariant?.product?.store?.id,
        storeUserId: e.productVariant?.product?.store?.userId,
        storeName: e.productVariant?.product?.store?.name,
        storePhone: e.productVariant?.product?.store?.phone,
        productId: e.productVariant?.product?.id,
        productName: e.productVariant?.product?.name,
        productPicture: e.productVariant?.product?.picture,
        productPrice: e.productVariant?.product?.price,
        productUnit: e.productVariant?.product?.unit,
        productVariantId: e.productVariant?.id,
        productVariantName: e.productVariant?.name,
        productVariantUnit: e.productVariant?.unit,
        productVariantPrice: e.productVariant?.price,
        wholesalePrice: e.productVariant?.wholesalePrice,
        wholesaleMin: e.productVariant?.wholesaleMin,
        qty: e.qty,
        total: e.total,
      };
    });

    orderItem.map((e: OrderItem) => {
      if (!stores.some((s) => s.storeId == e.storeId)) {
        const storeQty = orderItem
          .filter((p: any) => p.storeId == e.storeId)
          .reduce((a: any, b: any) => a + Number(b.qty), 0);

        const storeTotal = orderItem
          .filter((p: any) => p.storeId == e.storeId)
          .reduce((a: any, b: any) => a + Number(b.total), 0);

        stores.push({
          storeId: e.storeId,
          storeUserId: e.storeUserId,
          storeName: e.storeName,
          storePhone: e.storePhone,
          qty: storeQty,
          total: storeTotal,
          items: orderItem.filter((p: any) => p.storeId == e.storeId),
        });
      }
    });

    setInput({
      ...input,
      receiverName: authContext?.auth?.user?.name ?? "",
      receiverPhone: authContext?.auth?.user?.phone ?? "",
      receiverAddress: authContext?.auth?.user?.address ?? "",
      productQty: cartContext?.cart?.qty,
      productTotal: cartContext?.cart?.total,
      stores: stores,
      // orderItem: orderItem,
    });
  }

  function inputOnChange(e: any) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  function calculateTotal(): number {
    const total =
      Number(input.paymentFee) +
      Number(input.adminFee) +
      Number(input.shippingFee) +
      Number(cartContext?.cart?.total);

    return total;
  }

  function handleForm(e: any) {
    e.preventDefault();

    if (input.paymentId == null) {
      alert("Pilih metode pembayaran");
      return;
    }

    setPrompt(true);
  }

  function positivePrompt() {
    createOrder();
  }

  function negativePrompt() {
    setPrompt(false);
  }

  function selectPayment(payment: PaymentModel) {
    setInput({
      ...input,
      paymentId: payment.id,
      paymentName: payment.name,
      paymentPicture: payment.picture,
      paymentFixed: payment.fixed,
      paymentFee: Number(payment.fee),
    });
  }

  async function createOrder() {
    try {
      setPrompt(false);
      setLoading(true);
      // delete input.stores;

      const payload = {
        token: authContext?.auth?.token,
        ...input,
        payTotal: calculateTotal(),
      };

      await orderRepository.create(payload);

      cartContext?.clearItem();
      navigate("/success", { replace: true });
    } catch (error) {
      toast("Terjadi kesalahan, harap coba beberapa saat lagi");
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2 m-4 min-h-screen lg:w-3/5 lg:mx-auto">
        <StatusBar title="Ringkasan Orderan" />
        {(() => {
          if (authContext?.auth) {
            return (
              <form onSubmit={handleForm} className="flex flex-col gap-2">
                <div className="bg-surface text-onSurface w-full py-2 px-4 flex flex-col divide-y">
                  <div className="font-semibold py-4">DATA PENERIMA</div>
                  <div className="flex flex-col gap-2 py-4">
                    <input
                      type="text"
                      placeholder="Nama"
                      name="receiverName"
                      required
                      className="border-gray-200 rounded w-full"
                      value={input.receiverName}
                      onChange={inputOnChange}
                    />
                    <input
                      type="text"
                      placeholder="No WA"
                      name="receiverPhone"
                      required
                      className="border-gray-200 rounded w-full"
                      value={input.receiverPhone}
                      onChange={inputOnChange}
                    />
                    <textarea
                      placeholder="Alamat"
                      name="receiverAddress"
                      required
                      className="border-gray-200 rounded w-full h-32"
                      value={input.receiverAddress}
                      onChange={inputOnChange}
                    />
                  </div>
                </div>
                {input.stores?.map((store: any) => {
                  return (
                    <div
                      key={store.storeId}
                      className="bg-surface text-onSurface w-full py-2 px-4 flex flex-col divide-y"
                    >
                      <div className="font-semibold py-4 flex gap-1 items-center">
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
                            d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                          />
                        </svg>
                        <div className="font-semibold text-green-500">
                          {store.storeName}
                        </div>
                      </div>
                      <div className="max-h-[500px] overflow-y-scroll flex flex-col divide-y">
                        {(() => {
                          return (
                            <>
                              {store.items.map((e: any, i: any) => {
                                return (
                                  <div key={i} className="py-6">
                                    <div className="flex gap-4">
                                      <div className="bg-gray-100 w-16 h-16 mt-2">
                                        <LazyLoadImage
                                          src={e.productPicture}
                                          alt=""
                                          className="h-full w-full object-cover"
                                        />
                                      </div>
                                      <div className="flex flex-col">
                                        <div>{e.productName}</div>
                                        <div className="text-xs text-gray-400">
                                          Varian : {e.productVariantName}
                                        </div>
                                        <div>Jumlah : {e.qty}</div>
                                        <div className="font-semibold flex gap-1 items-center">
                                          <div>{currency(e.total!)}</div>
                                          {(() => {
                                            if (
                                              e.wholesaleMin != null &&
                                              e.wholesalePrice != null
                                            ) {
                                              if (e.qty! >= e.wholesaleMin) {
                                                return (
                                                  <div className="text-red-500 text-xs">
                                                    (Grosir)
                                                  </div>
                                                );
                                              }
                                            }
                                          })()}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </>
                          );
                        })()}
                      </div>
                      <div className="py-4 font-semibold flex justify-between items-center">
                        <div>Total ({store.qty}) Produk</div>
                        <div>{currency(store.total)}</div>
                      </div>
                    </div>
                  );
                })}
                <div className="bg-surface text-onSurface w-full py-2 px-4 flex flex-col divide-y">
                  <div className="font-semibold py-4">METODE PEMBAYARAN</div>
                  <PaymentComponent
                    paymentId={input.paymentId}
                    selectPayment={selectPayment}
                  />
                </div>
                <div className="bg-surface text-onSurface w-full py-2 px-4 flex flex-col divide-y">
                  <div className="font-semibold py-4">DETAIL BIAYA</div>
                  <div className="py-4 flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <div>Subtotal ({input.productQty}) Produk</div>
                      <div className="font-semibold">
                        {currency(cartContext?.cart?.total ?? 0)}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>Biaya Admin</div>
                      <div className="font-semibold">
                        {currency(input.adminFee)}
                      </div>
                    </div>
                    {/* {(() => {
                      if (input.paymentId) {
                        return (
                          <div className="flex justify-between items-center">
                            <div>Biaya ({input.paymentName})</div>
                            <div className="font-semibold">
                              {currency(input.paymentFee)}
                            </div>
                          </div>
                        );
                      }
                    })()} */}
                    <div className="flex justify-between items-center">
                      <div>Total</div>
                      <div className="font-bold text-2xl text-red-500">
                        {currency(calculateTotal())}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <button className="bg-primary text-onPrimary font-semibold p-2 w-full">
                    Buat Pesanan
                  </button>
                </div>
              </form>
            );
          }

          return (
            <div className="bg-surface text-onSurface w-full h-56 py-2 px-4 flex justify-center items-center">
              <Spinner />
            </div>
          );
        })()}
      </div>
      <ModalPrompt
        show={prompt}
        positive={positivePrompt}
        negative={negativePrompt}
        text="Cek kembali pesanan anda, proses ini tidak dapat dibatalkan. Lanjutkan?"
      />
      <ModalLoading show={loading} text="Membuat orderan, mohon tunggu.." />
    </>
  );
}
