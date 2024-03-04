import { Datepicker } from "flowbite-react";
import Content from "../component/content";

export default function DashboardPage() {
  return (
    <Content title="DASHBOARD">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4 md:justify-end">
        <div className="font-semibold">Periode</div>
        <Datepicker />
        <Datepicker />
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="bg-primary text-onPrimary p-2 w-full rounded flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Toko Terlaris</div>
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
              </div>
              <div className="text-sm flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div>Nama Toko</div>
                  <div>Maju Jaya Shop</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>Produk Terjual</div>
                  <div>2000</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>Penghasilan</div>
                  <div>Rp 1.000.000</div>
                </div>
              </div>
            </div>
            <div className="bg-primary text-onPrimary p-2 w-full rounded flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Pembeli Terbanyak</div>
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
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </div>
              <div className="text-sm flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div>Nama Pelanggan</div>
                  <div>Udin</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>Produk Dibeli</div>
                  <div>2000</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>Total Belanja</div>
                  <div>Rp 1.000.000</div>
                </div>
              </div>
            </div>
            <div className="bg-primary text-onPrimary p-2 w-full rounded flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Produk Terlaris</div>
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
                    d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
                  />
                </svg>
              </div>
              <div className="text-sm flex flex-col gap-1">
                <div className="flex items-center justify-between gap-10">
                  <div>Produk</div>
                  <div className="line-clamp-1">Elegant Frozen Tuna</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>Terjual</div>
                  <div>2000 Item</div>
                </div>
              </div>
            </div>
            <div className="bg-primary text-onPrimary p-2 w-full rounded flex flex-col justify-between gap-2">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Total Transaksi</div>
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
                    d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <div className="font-semibold text-end">
                <div className="text-xl text-green-400">Rp 1.000.000.000</div>
                <div className="text-sm">20000 Produk</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex flex-col gap-2 flex-1">
            <div className="font-semibold text-center text-lg">
              Statistik Toko
            </div>
            <table className="table-auto border-collapse border text-xs md:text-base">
              <thead>
                <tr>
                  <th className="bg-gray-100 text-start p-2">No</th>
                  <th className="bg-gray-100 text-start p-2">Nama Toko</th>
                  <th className="bg-gray-100 text-start p-2">Produk Terjual</th>
                  <th className="bg-gray-100 text-start p-2">Penghasilan</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(10)].map((_, i) => {
                  return (
                    <tr
                      key={i}
                      className="border border-collapse even:bg-gray-50 hover:bg-gray-100"
                    >
                      <td className="text-start p-2">{i + 1}</td>
                      <td className="text-start p-2">Maju Jaya Shop</td>
                      <td className="text-start p-2">1000</td>
                      <td className="text-start p-2">Rp 200.000</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <div className="font-semibold text-center text-lg">
              Statistik Pelanggan
            </div>
            <table className="table-auto border-collapse border text-xs md:text-base">
              <thead>
                <tr>
                  <th className="bg-gray-100 text-start p-2">No</th>
                  <th className="bg-gray-100 text-start p-2">Nama Pelanggan</th>
                  <th className="bg-gray-100 text-start p-2">Produk Dibeli</th>
                  <th className="bg-gray-100 text-start p-2">Total Belanja</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(10)].map((_, i) => {
                  return (
                    <tr
                      key={i}
                      className="border border-collapse even:bg-gray-50 hover:bg-gray-100"
                    >
                      <td className="text-start p-2">{i + 1}</td>
                      <td className="text-start p-2">Maju Jaya Shop</td>
                      <td className="text-start p-2">1000</td>
                      <td className="text-start p-2">Rp 200.000</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Content>
  );
}
