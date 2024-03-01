import { Modal, Textarea } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreModel } from "../../../lib/model/store-model";
import { DataState } from "../lib/config/type";
import StoreRepository from "../lib/repository/store-repository";
import ModalLoading from "./component/modal-loading";
import ModalPrompt from "./component/modal-prompt";
import StatusBar from "./component/status-bar";
import { AuthContext } from "./context/auth-context";
import ScrollTop from "./component/scrolltop";

const storeRepository = new StoreRepository();

export default function ProfilePage() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [storeModal, setStoreModal] = useState(false);
  const [input, setInput] = useState({ name: "", phone: "", address: "" });
  const [store, setStore] = useState<DataState<StoreModel>>();

  useEffect(() => {
    if (authContext?.auth) {
      getStore();
    }
  }, [authContext?.auth]);

  async function getStore() {
    try {
      setStore({ ...store, status: "loading" });

      const result = await storeRepository.show({
        token: authContext?.auth?.token,
      });

      setStore({
        ...store,
        status: "loaded",
        data: result.data,
        error: null,
      });
    } catch (error: any) {
      setStore({ ...store, status: "error", error: error });
    }
  }

  async function createStore() {
    try {
      setLoading(true);

      await storeRepository.create({
        token: authContext?.auth?.token,
        ...input,
      });

      getStore();
      setLoading(false);
      setStoreModal(false);
      toast("Proses berhasil, toko berhasil dibuat");
    } catch (error: any) {
      setLoading(false);
      toast("Proses gagal, harap ulangi beberapa saat lagi");
    }
  }

  function logout() {
    authContext?.logout();
    navigate("/login", { replace: true });
  }

  function inputOnChange(e: any) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  function formSubmit(e: any) {
    e.preventDefault();
    createStore();
  }

  return (
    <>
      <div className="flex flex-col gap-2 m-4 min-h-screen lg:w-3/5 lg:mx-auto">
        <StatusBar title="Halaman Anda" />
        {(() => {
          if (store?.status == "loaded") {
            return (
              <div className="bg-surface text-onSurface w-full py-2 px-4">
                {(() => {
                  if (store?.data) {
                    return (
                      <div className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-7 h-7 shrink-0"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                          />
                        </svg>
                        <div className="text-green-500 font-semibold">
                          {store.data.name}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <button
                      className="bg-primary text-onPrimary p-2 rounded flex gap-1 items-center shrink-0 float-end"
                      onClick={() => {
                        setStoreModal(true);
                      }}
                    >
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
                      Buka Toko
                    </button>
                  );
                })()}
              </div>
            );
          }

          return <div className="bg-gray-200 h-10 animate-pulse"></div>;
        })()}
        <div className="bg-surface text-onSurface w-full py-2 px-4 flex justify-between items-center">
          <div className="font-semibold">
            <div>{authContext?.auth?.user?.name}</div>
            <div>{authContext?.auth?.user?.email}</div>
            {/* <Link to="" className="text-primary flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              Edit Data
            </Link> */}
          </div>
          <button
            className="bg-red-500 text-white font-semibold p-1 rounded-full flex gap-1 items-center"
            onClick={() => {
              setPrompt(true);
            }}
          >
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
                d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
              />
            </svg>
          </button>
        </div>
        <div className="bg-primary text-onPrimary w-full">
          <div className="flex divide-x divide-onPrimary overflow-x-scroll no-scrollbar">
            {(() => {
              const active =
                location.pathname == "/profile"
                  ? "bg-surface text-onSurface font-semibold"
                  : "bg-primary text-onPrimary";

              return (
                <Link
                  to="/profile?page=1&limit=5&sort=updated&direction=desc"
                  className={`${active} py-2 px-4 shrink-0 flex gap-2 items-center`}
                >
                  <div>Pesanan Saya</div>
                  {/* <div className="size-6 rounded-full text-xs font-bold bg-red-500 text-white flex items-center justify-center">
                    1
                  </div> */}
                </Link>
              );
            })()}
            {(() => {
              if (store?.data) {
                const active =
                  location.pathname == "/profile/shop"
                    ? "bg-surface text-onSurface font-semibold"
                    : "bg-primary text-onPrimary";

                return (
                  <>
                    <Link
                      to={`/profile/shop?page=1&limit=5&sort=updated&direction=desc&filter=storeId&value=${store.data.id}`}
                      className={`${active} py-2 px-4 shrink-0 flex gap-2 items-center`}
                    >
                      <div>Orderan Masuk</div>
                      {/* <div className="size-6 rounded-full text-xs font-bold bg-red-500 text-white flex items-center justify-center">
                    1
                  </div> */}
                    </Link>
                  </>
                );
              }
            })()}
            {(() => {
              if (store?.data) {
                const active =
                  location.pathname == "/profile/product-management"
                    ? "bg-surface text-onSurface font-semibold"
                    : "bg-primary text-onPrimary";

                return (
                  <>
                    <Link
                      to={`/profile/product-management?page=1&limit=60&sort=created&direction=desc&active=all&storeId=${store.data.id}`}
                      className={`${active} py-2 px-4 shrink-0 flex gap-2 items-center`}
                    >
                      Produk Saya
                    </Link>
                  </>
                );
              }
            })()}
            {(() => {
              if (store?.data) {
                const active =
                  location.pathname == "/profile/sales"
                    ? "bg-surface text-onSurface font-semibold"
                    : "bg-primary text-onPrimary";

                const startDate = new Date().toISOString().split("T")[0];
                const endDate = new Date().toISOString().split("T")[0];

                return (
                  <>
                    <Link
                      to={`/profile/sales?page=1&limit=10&startDate=${startDate}&endDate=${endDate}&storeId=${store.data.id}`}
                      className={`${active} py-2 px-4 shrink-0 flex gap-2 items-center`}
                    >
                      Statistik Penjualan
                    </Link>
                  </>
                );
              }
            })()}
          </div>
          <Outlet />
        </div>
      </div>
      <ScrollTop />
      <Modal
        size="lg"
        show={storeModal}
        onClose={() => {
          setStoreModal(false);
        }}
      >
        <form onSubmit={formSubmit}>
          <Modal.Header>Data Toko</Modal.Header>
          <Modal.Body>
            <div className="flex flex-col gap-4 w-full text-sm">
              <div>
                <input
                  type="text"
                  placeholder="Nama Toko"
                  name="name"
                  required
                  className="border-gray-200 rounded w-full"
                  value={input.name}
                  onChange={inputOnChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="No Whatsapp"
                  name="phone"
                  required
                  className="border-gray-200 rounded w-full"
                  value={input.phone}
                  onChange={inputOnChange}
                />
              </div>
              <div>
                <Textarea
                  placeholder="Alamat"
                  name="address"
                  className="border-gray-200 rounded w-full h-24 bg-white text-base"
                  required
                  value={input.address}
                  onChange={inputOnChange}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="w-full">
              <button
                type="submit"
                className="bg-primary text-onPrimary py-2 px-4 rounded float-right"
              >
                Buat Toko
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
      <ModalPrompt
        show={prompt}
        positive={logout}
        negative={() => {
          setPrompt(false);
        }}
        text="Anda akan keluar dari akun, lanjutkan?"
      />
      <ModalLoading show={loading} />
    </>
  );
}
