import { Modal, Spinner } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BannerModel } from "../../../../lib/model/banner-model";
import { Failure } from "../../lib/config/failure";
import { Empty } from "../../lib/config/type";
import BannerRepository from "../../lib/repository/banner-repository";
import AddBannerForm from "../component/add-banner-form";
import Content from "../component/content";
import EditBannerForm from "../component/edit-banner-form";
import ModalLoading from "../component/modal-loading";
import { AuthContext } from "../context/auth-context";

const bannerRepository = new BannerRepository();

export default function BannerPage() {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<Record<string, any> | Empty>(null);

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

  async function deleteBanner(id: string) {
    try {
      setLoading(true);
      await bannerRepository.delete({ token: authContext!.auth, id: id });
      window.location.reload();
    } catch (error) {
      setLoading(false);

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
    <>
      <Content title="BANNER">
        <div className="flex justify-end items-center">
          <button
            className="bg-primary text-onPrimary px-2 py-1 rounded"
            onClick={() => {
              setModal({ target: "add" });
            }}
          >
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

              if (
                banner.status == "complete" &&
                banner.data?.data?.length > 0
              ) {
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
                          <td className="p-2 flex gap-1 items-center">
                            <button
                              className="bg-blue-500 p-1 rounded text-white"
                              onClick={() => {
                                setModal({ target: "edit", data: e });
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="bg-red-500 p-1 rounded text-white"
                              onClick={() => {
                                if (confirm("Data akan dihapus, anda yakin?")) {
                                  deleteBanner(e.id!);
                                }
                              }}
                            >
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
          </tbody>
        </table>
      </Content>
      <Modal
        show={modal != null}
        onClose={() => {
          setModal(null);
        }}
      >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          {(() => {
            if (modal?.target == "add") {
              return <AddBannerForm />;
            }

            if (modal?.target == "edit") {
              return <EditBannerForm banner={modal.data} />;
            }
          })()}
        </Modal.Body>
      </Modal>
      <ModalLoading show={loading} />
    </>
  );
}
