import { useState } from "react";
import ModalLoading from "./component/modal-loading";

export default function AdminPage() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="bg-primary h-16"></div> {/* HEADER */}
        <div className="bg-surface grow flex">
          {/* BODY */}
          <div className="bg-red-100 p-4 w-[60%] md:w-[20%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsm
            corporis autem beatae suscipit fugit perspiciatis quam alias eveniet
            enim nulla commodi earum, omnis eaque reprehenderit tempora dolorem
            at esse ratione.
          </div>
          <div className="bg-green-200 p-4 grow"></div>
        </div>
        <div className="bg-secondary h-20"></div> {/* FOOTER */}
      </div>
      <ModalLoading show={loading} />
    </>
  );
}
