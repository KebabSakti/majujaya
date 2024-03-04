import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Failure } from "../../lib/config/failure";
import WaRepository from "../../lib/repository/wa-repository";
import { AuthContext } from "../context/auth-context";
import QRCode from "react-qr-code";

const waRepository = new WaRepository();

export default function AddWaForm() {
  const authContext = useContext(AuthContext);

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

  useEffect(() => {
    getQr();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="h-96 w-full">
          {(() => {
            if (qr.status == "complete" && qr.data?.qr != null) {
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
            window.location.reload();
          }}
        >
          Saya sudah scan
        </button>
      </div>
    </>
  );
}
