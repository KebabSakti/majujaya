import { Modal, Spinner } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";
import { ConfigModel } from "../../../../lib/model/config-model";
import { Failure } from "../../lib/config/failure";
import ConfigRepository from "../../lib/repository/config-repository";
import WaRepository from "../../lib/repository/wa-repository";
import Content from "../component/content";
import ModalLoading from "../component/modal-loading";
import { AuthContext } from "../context/auth-context";

const configRepository = new ConfigRepository();
const waRepository = new WaRepository();

export default function ConfigPage() {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const [banner, setBanner] = useState<Record<string, any>>({
    status: "loading",
    data: [],
  });

  const [qr, setQr] = useState<Record<string, any>>({
    status: "loading",
    data: null,
  });

  async function getQr() {
    try {
      setQr({ ...qr, status: "loading" });

      const data = await waRepository.qr({
        token: authContext!.auth,
      });

      setQr({ data: data, status: "complete" });
    } catch (error) {
      setQr({ ...qr, status: "complete" });

      if (error instanceof Failure) {
        toast(error.message);
      } else {
        toast("Unknown error has occured");
      }
    }
  }

  async function getData() {
    try {
      setBanner({ ...banner, status: "loading" });

      const data = await configRepository.index({
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

  async function updateConfig(id: string, value: string) {
    try {
      setLoading(true);

      await configRepository.update({
        token: authContext!.auth,
        id: id,
        value: value,
      });

      getData();
      setLoading(false);
    } catch (error) {
      setLoading(false);

      if (error instanceof Failure) {
        toast(error.message);
      } else {
        toast("Unknown error has occured");
      }
    }
  }

  function init() {
    getQr();
    getData();
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Content title="KONFIGURASI">
        <table className="table-auto border-collapse border text-xs md:text-base">
          <thead>
            <tr>
              <th className="bg-gray-100 text-start p-2">Nama</th>
              <th className="bg-gray-100 text-start p-2">Deskripsi</th>
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
                    {banners.map((e: ConfigModel, i: number) => {
                      return (
                        <tr
                          key={i}
                          className="border border-collapse even:bg-gray-50 hover:bg-gray-100"
                        >
                          <td className="text-start p-2">{e.name}</td>
                          <td className="text-start p-2">{e.description}</td>
                          <td className="p-2">
                            {(() => {
                              if (e.id == "store") {
                                return (
                                  <button
                                    className="bg-primary p-1 rounded text-onPrimary"
                                    onClick={() => {
                                      const value =
                                        e.value == "Tidak" ? "Ya" : "Tidak";

                                      updateConfig(e.id!, value);
                                    }}
                                  >
                                    {e.value == "Tidak"
                                      ? "Aktifkan"
                                      : "Non Aktifkan"}
                                  </button>
                                );
                              }

                              if (e.id == "whatsapp") {
                                if (
                                  qr.status == "complete" &&
                                  qr.data.status == "pending"
                                ) {
                                  return (
                                    <button
                                      className="bg-primary p-1 rounded text-onPrimary"
                                      onClick={() => {
                                        setModal(true);
                                      }}
                                    >
                                      Scan QR
                                    </button>
                                  );
                                }

                                return (
                                  <div className="text-green-500 font-semibold">
                                    Terhubung
                                  </div>
                                );
                              }
                            })()}
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
        show={modal}
        onClose={() => {
          init();
          setModal(false);
        }}
      >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="h-96 w-full">
              {(() => {
                if (qr.status == "complete" && qr.data.status == "pending") {
                  return (
                    <QRCode
                      value={qr.data.qr}
                      className="object-cover h-full w-full"
                    />
                  );
                }

                return (
                  <div className="bg-gray-100 text-gray-400 h-full w-full flex items-center justify-center">
                    Memuat kode QR
                  </div>
                );
              })()}
            </div>
            <div className="text-onSurface text-center">
              Scan kode QR di atas menggunakan aplikasi whatsapp
            </div>
            <button
              className="bg-primary text-onPrimary p-2 w-fit rounded"
              onClick={() => {
                init();
                setModal(false);
              }}
            >
              Saya sudah scan
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <ModalLoading show={loading} />
    </>
  );
}
