import { useContext, useEffect, useState } from "react";
import Content from "../component/content";
import { toast } from "react-toastify";
import { Failure } from "../../lib/config/failure";
import BannerRepository from "../../lib/repository/banner-repository";
import { AuthContext } from "../context/auth-context";
import { Spinner } from "flowbite-react";
import { BannerModel } from "../../../../lib/model/banner-model";

const bannerRepository = new BannerRepository();

export default function BannerPage() {
  const authContext = useContext(AuthContext);
  const [banner, setBanner] = useState<Record<string, any>>({
    status: "loading",
    data: [],
  });

  async function getData() {
    try {
      setBanner({ ...banner, status: "loading" });
      const data = await bannerRepository.index({ token: authContext!.auth });
      setBanner({ data: data, status: "complete" });
    } catch (error) {
      setBanner({ ...banner, status: "complete" });

      if (error instanceof Failure) {
        toast(error.message);
      } else {
        toast("Unknown error has occured");
      }
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Content title="BANNER">
      <div className="flex justify-end items-center">
        <button className="bg-primary text-onPrimary px-2 py-1 rounded">
          Tambah Data
        </button>
      </div>
      <table className="table-auto border-collapse border text-xs md:text-base">
        <thead>
          <tr>
            <th className="bg-gray-100 text-start p-2">No</th>
            <th className="bg-gray-100 text-start p-2">Nama</th>
            <th className="bg-gray-100 text-start p-2">Banner</th>
            <th className="bg-gray-100 text-start p-2">Status</th>
            <th className="bg-gray-100 text-start p-2"></th>
          </tr>
        </thead>
        <tbody>
          {(() => {
            if (banner.status == "loading") {
              return (
                <tr>
                  <td colSpan={5} className="text-center p-2">
                    <Spinner />
                  </td>
                </tr>
              );
            }

            if (banner.status == "complete" && banner.data?.data?.length > 0) {
              const banners = banner.data.data;

              return (
                <>
                  {banners.map((e: BannerModel, i: number) => {
                    return (
                      <tr
                        key={i}
                        className="border border-collapse even:bg-gray-50 hover:bg-gray-100"
                      >
                        <td className="text-start p-2">{i + 1}</td>
                        <td className="text-start p-2">{e.name}</td>
                        <td className="text-start p-2">Lihat</td>
                        <td className="text-start p-2">
                          {e.active ? (
                            <div className="border border-green-500 text-green-500 px-1 rounded w-fit">
                              Aktif
                            </div>
                          ) : (
                            <div className="border border-red-500 text-red-500 px-1 rounded w-fit">
                              Non Aktif
                            </div>
                          )}
                        </td>
                        <td className="text-start p-2 flex gap-1 items-center">
                          <button className="bg-blue-500 p-1 rounded text-white">
                            Edit
                          </button>
                          <button className="bg-red-500 p-1 rounded text-white">
                            Hapus
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              );
            }

            return (
              <tr>
                <td colSpan={5} className="text-center p-2">
                  Tidak ada data
                </td>
              </tr>
            );
          })()}
          {/* {[...Array(10)].map((_, i) => {
            return (
              <tr
                key={i}
                className="border border-collapse even:bg-gray-50 hover:bg-gray-100"
              >
                <td className="text-start p-2">{i + 1}</td>
                <td className="text-start p-2">Maju Jaya Shop</td>
                <td className="text-start p-2">1000</td>
                <td className="text-start p-2">Aktif</td>
                <td className="text-start p-2">
                  <button className="bg-orange-400 p-1 rounded text-white">
                    Edit
                  </button>
                </td>
              </tr>
            );
          })} */}
        </tbody>
      </table>
    </Content>
  );
}
