import { useNavigate } from "react-router-dom";

export default function StatusBar({ title }: { title: string }) {
  const navigate = useNavigate();

  function back() {
    navigate(-1);
  }

  return (
    <div className="bg-surface text-onSurface w-full py-2 px-4 flex justify-between items-center">
      <button
        className="bg-primary text-onPrimary rounded-full p-2"
        onClick={back}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 stroke-onPrimary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <div className="font-semibold text-lg border p-2 rounded">{title}</div>
    </div>
  );
}
