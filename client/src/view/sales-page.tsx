import dayjs from "dayjs";
import { Datepicker, Modal, Spinner } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { DataState } from "../lib/config/type";
import { AuthContext } from "./context/auth-context";
import SalesRepository from "../lib/repository/sales-repository";
import "dayjs/locale/id";
import { currency } from "../lib/helper/common";

const salesRepository = new SalesRepository();

export default function SalesPage() {
  const authContext = useContext(AuthContext);
  let [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries([...searchParams]);
  const page = parseInt(query.page);
  const limit = parseInt(query.limit);
  const startDate = dayjs(query.startDate).locale("id").format("DD MMMM YYYY");
  const endDate = dayjs(query.endDate).locale("id").format("DD MMMM YYYY");
  const max = (page - 1) * (limit * 2);
  const [data, setData] = useState<DataState<Record<string, any>>>();
  const [user, setUser] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    getData();
  }, [authContext?.auth]);

  useEffect(() => {
    getData();
  }, [searchParams]);

  async function getData() {
    if (authContext?.auth) {
      try {
        setData({ ...data, status: "loading" });

        const result = await salesRepository.index({
          ...query,
          token: authContext?.auth?.token,
        });

        setData({
          ...data,
          status: "loaded",
          data: result,
          error: null,
        });
      } catch (error: any) {
        setData({ ...data, status: "error", error: error });
      }
    }
  }

  return (
    <>
      <div className="bg-surface text-onSurface p-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-end md:gap-4">
            <div>Periode</div>
            <Datepicker
              className="grow md:grow-0"
              language="id-ID"
              name="startDate"
              value={startDate}
              onSelectedDateChanged={(date) => {
                const formattedDate = dayjs(date).format("YYYY-MM-DD");
                setSearchParams({ ...query, startDate: formattedDate });
              }}
            />
            <Datepicker
              className="grow md:grow-0"
              language="id-ID"
              name="endDate"
              value={endDate}
              onSelectedDateChanged={(date) => {
                const formattedDate = dayjs(date).format("YYYY-MM-DD");
                setSearchParams({ ...query, endDate: formattedDate });
              }}
            />
          </div>
          {(() => {
            if (data?.status == "loading") {
              return (
                <div className="min-h-24 flex items-center justify-center">
                  <Spinner />
                </div>
              );
            }

            if (data?.data?.data?.length > 0) {
              const sale = data?.data!;

              return (
                <div className="flex flex-col gap-4 py-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div>Terjual</div>
                      <div className="font-semibold">
                        {sale.summary.totalItemSold} Item
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>Pemasukan</div>
                      <div className="font-semibold">
                        {currency(sale.summary.totalRevenue)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold text-center">
                      Data Pelanggan
                    </div>
                    <table className="table-auto border-collapse border text-sm">
                      <thead>
                        <tr>
                          <th className="border text-start px-2">Nama</th>
                          <th className="border text-start px-2">
                            Total Barang
                          </th>
                          <th className="border text-start px-2">
                            Total Belanja
                          </th>
                          <th className="border text-start px-2">#</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sale.data?.map((e: any, i: number) => {
                          return (
                            <tr key={i}>
                              <td className="border text-start p-2">
                                {e.name}
                              </td>
                              <td className="border text-start p-2">
                                {e.productQty}
                              </td>
                              <td className="border text-start p-2">
                                {currency(e.payTotal)}
                              </td>
                              <td className="border text-start p-2">
                                <button
                                  className="bg-primary text-onPrimary p-2 rounded"
                                  onClick={() => {
                                    setUser(e);
                                  }}
                                >
                                  Detail
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {(() => {
                    if (sale?.paginate?.total! > sale?.data?.length) {
                      return (
                        <div className="flex justify-center gap-1 mt-2">
                          <button
                            className="p-2 rounded bg-secondary text-onSecondary"
                            onClick={() => {
                              if (page > 1) {
                                setSearchParams({
                                  ...query,
                                  page: (page - 1) as any,
                                });
                              }
                            }}
                          >
                            PREV
                          </button>
                          <button
                            className="p-2 rounded bg-primary text-onPrimary"
                            onClick={() => {
                              if (max < sale?.paginate?.total!) {
                                setSearchParams({
                                  ...query,
                                  page: (page + 1) as any,
                                });
                              }
                            }}
                          >
                            NEXT
                          </button>
                        </div>
                      );
                    }
                  })()}
                </div>
              );
            }

            return (
              <div className="min-h-24 flex items-center justify-center">
                Tidak ada data
              </div>
            );
          })()}
        </div>
      </div>
      <Modal
        show={user != null}
        size="lg"
        onClose={() => {
          setUser(null);
        }}
      >
        <Modal.Header>Detail Pelanggan</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-2 max-h-[500px] overflow-auto no-scrollbar">
            <div className="flex justify-between items-center">
              <div className="text-gray-500">Nama</div>
              <div>{user?.name}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-gray-500">No Hp</div>
              <div>{user?.phone}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-gray-500">Email</div>
              <div>{user?.email}</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-gray-500">Alamat</div>
              <div>{user?.address ?? "-"}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-gray-500">Total Barang</div>
              <div>{user?.productQty}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-gray-500">Total Belanja</div>
              <div>{currency(user?.payTotal)}</div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Link
            to={`https://wa.me/${user?.phone}`}
            target="_blank"
            className="bg-primary p-2 rounded text-onPrimary flex gap-1 items-center"
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
                d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
            <div>Hubungi Pelanggan</div>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}
