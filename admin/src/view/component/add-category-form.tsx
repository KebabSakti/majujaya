import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Failure } from "../../lib/config/failure";
import CategoryRepository from "../../lib/repository/category-repository";
import { AuthContext } from "../context/auth-context";
import ModalLoading from "./modal-loading";

const categoryRepository = new CategoryRepository();

export default function AddCAtegoryForm() {
  const fileRef = useRef<any>();
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [formValue, setFormValue] = useState<Record<string, any>>({
    name: "",
    picture: null,
    status: "inactive",
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
      await categoryRepository.create({
        ...formValue,
        token: authContext!.auth,
      });
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
          <div className="md:shrink-0 md:w-28">Nama Kategori</div>
          <input
            type="text"
            placeholder="Nama Kategori"
            name="name"
            required
            className="border-gray-200 rounded w-full"
            onChange={change}
            value={formValue.name}
          />
        </div>
        <div className="flex flex-col gap-2 md:gap-4 md:flex-row md:items-center">
          <div className="md:shrink-0 md:w-28">File Icon</div>
          <div className="w-full">
            <input
              readOnly
              type="text"
              placeholder="Icon"
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
        <div className="flex flex-col gap-2 md:gap-4 md:flex-row md:items-center">
          <div className="md:shrink-0 md:w-28">Status</div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value="active"
                checked={formValue.status == "active"}
                onChange={change}
              />
              <div>Aktif</div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="status"
                value="inactive"
                checked={formValue.status == "inactive"}
                onChange={change}
              />
              <div>Non Aktif</div>
            </div>
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
