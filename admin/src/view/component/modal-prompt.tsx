import { Modal } from "flowbite-react";
import { ReactNode } from "react";
import { Empty } from "../../lib/config/type";

export default function ModalPrompt({
  positive,
  negative,
  show,
  text,
  children,
}: {
  positive: () => void;
  negative: () => void;
  show: boolean;
  text?: string | Empty;
  children?: ReactNode | Empty;
}) {
  return (
    <Modal show={show} size="md" popup onClose={negative}>
      <Modal.Header />
      <Modal.Body>
        {children ?? (
          <div className="text-center flex flex-col justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-24 h-24 stroke stroke-orange-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>

            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {text}
            </h3>
            <div className="flex justify-center gap-2">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={negative}
              >
                Batal
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded"
                onClick={positive}
              >
                Iya
              </button>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
