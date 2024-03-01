import { Modal, Spinner } from "flowbite-react";

export default function ModalLoading({
  children,
  text = "Loading..",
  show,
}: {
  children?: any;
  text?: string;
  show: boolean;
}) {
  return (
    <Modal dismissible show={show}>
      <Modal.Body>
        {children ?? (
          <div className="flex gap-2 items-center">
            <Spinner />
            <div className="text-onSurface font-semibold">{text}</div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
