import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/auth-context";
import BannerRepository from "../../lib/repository/banner-repository";
import { toast } from "react-toastify";
import { Failure } from "../../lib/config/failure";
import ModalLoading from "./modal-loading";

const bannerRepository = new BannerRepository();

export default function AddBannerForm() {
  const fileRef = useRef<any>();
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [formValue, setFormValue] = useState<Record<string, any>>({
    name: "",
    picture: null,
  });

  function change(e: any) {
    if (!e.target.files) {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.value,
      });
    } else {
      setFormValue({
        ...formValue,
        picture: e.target.files[0],
      });
    }
  }

  async function submit(e: any) {
    e.preventDefault();
    addBanner();
  }

  async function addBanner() {
    try {
      setLoading(true);
      await bannerRepository.create({ ...formValue, token: authContext!.auth });
      window.location.reload();
    } catch (error) {
      console.log(error);
      setLoading(false);

      if (error instanceof Failure) {
        toast(error.message);
      } else {
        toast("Unknown error has occured");
      }
    }
  }

  return (
    <>
      <form onSubmit={submit} className="flex flex-col gap-4 text-onSurface">
        <div className="flex flex-col gap-2 md:gap-4 md:flex-row md:items-center">
          <div className="md:shrink-0 md:w-28">Nama Banner</div>
          <input
            type="text"
            placeholder="Nama Banner"
            name="name"
            required
            className="border-gray-200 rounded w-full"
            onChange={change}
            value={formValue.name}
          />
        </div>
        <div className="flex flex-col gap-2 md:gap-4 md:flex-row md:items-center">
          <div className="md:shrink-0 md:w-28">File Banner</div>
          <div className="w-full">
            <input
              readOnly
              type="text"
              placeholder="File Banner"
              required
              className="border-gray-200 rounded w-full cursor-pointer"
              value={formValue.picture?.name ?? ""}
              onClick={() => {
                fileRef.current.click();
              }}
            />
            <input
              type="file"
              name="picture"
              className="hidden"
              ref={fileRef}
              onChange={change}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary text-onPrimary py-2 px-4 rounded float-right md:w-fit"
        >
          Submit
        </button>
      </form>
      <ModalLoading show={loading} />
    </>
  );
}
