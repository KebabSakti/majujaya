import { Modal, Spinner } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BannerModel } from "../../../../lib/model/banner-model";
import { Failure } from "../../lib/config/failure";
import { Empty } from "../../lib/config/type";
import CategoryRepository from "../../lib/repository/category-repository";
import AddCAtegoryForm from "../component/add-category-form";
import Content from "../component/content";
import EditCategoryForm from "../component/edit-category-form";
import ModalLoading from "../component/modal-loading";
import { AuthContext } from "../context/auth-context";

const categoryRepository = new CategoryRepository();

export default function CategoryPage() {
  const authContext = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries([...searchParams]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<Record<string, any> | Empty>(null);
  const [image, setImage] = useState<string | Empty>(null);

  const [banner, setBanner] = useState<Record<string, any>>({
    status: "loading",
    data: [],
  });

  async function getData() {
    try {
      setBanner({ ...banner, status: "loading" });

      const data = await categoryRepository.index({
        ...query,
        token: authContext!.auth,
      });

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

  async function deleteCategory(id: string) {
    try {
      setLoading(true);
      await categoryRepository.delete({ token: authContext!.auth, id: id });
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
    setSearchParams({ ...query, page: "1", limit: "10" });
  }, []);

  useEffect(() => {
    if (Object.keys(query).length > 0) {
      getData();
    }
  }, [searchParams]);

  return (
    <>
      <Content title="CATEGORY">
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
              {/* <th className="bg-gray-100 text-start p-2">No</th> */}
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
                          {/* <td className="text-start p-2">{i + Number(query.page)}</td> */}
                          <td className="text-start p-2">{e.name}</td>
                          <td className="text-start p-2">
                            <button
                              onClick={() => {
                                setImage(e.picture!);
                              }}
                            >
                              <div className="w-6 h-6">
                                <img src={e.picture} className="object-cover" />
                              </div>
                            </button>
                          </td>
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
                                  deleteCategory(e.id!);
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
        <div className="flex justify-center gap-1 text-xs">
          <button
            className="px-2 rounded bg-secondary text-onSecondary"
            onClick={() => {
              const page = Number(query.page);

              if (page > 1) {
                setSearchParams({ ...query, page: (page - 1).toString() });
              }
            }}
          >
            PREV
          </button>
          <button
            className="p-2 rounded bg-primary text-onPrimary"
            onClick={() => {
              const page = Number(query.page);

              setSearchParams({ ...query, page: (page + 1).toString() });
            }}
          >
            NEXT
          </button>
        </div>
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
              return <AddCAtegoryForm />;
            }

            if (modal?.target == "edit") {
              return <EditCategoryForm category={modal.data} />;
            }
          })()}
        </Modal.Body>
      </Modal>
      <Modal
        dismissible
        show={image != null}
        onClose={() => {
          setImage(null);
        }}
      >
        <div className="relative">
          <button
            className="absolute right-2 top-2 bg-white drop-shadow rounded-full p-1"
            onClick={() => {
              setImage(null);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
          <img src={image!} className="w-full h-full" />
        </div>
      </Modal>
      <ModalLoading show={loading} />
    </>
  );
}
