import { useLocation, useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  const location = useLocation();

  function navigateHome() {
    let path = location.pathname.includes("admin") ? "/admin/app" : "/";
    navigate(path);
  }

  function navigateBack() {
    navigate(-1);
  }

  return (
    <div className="bg-background text-onBackground w-full h-screen flex flex-col justify-center items-center px-10 text-center">
      <div className="text-5xl mb-4">Error :(</div>
      <div>Terjadi kesalahan, mohon coba beberapa saat lagi</div>
      <div className="mt-4 flex gap-1">
        <button
          className="bg-primary text-onPrimary px-4 py-2 rounded"
          onClick={navigateHome}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </button>
        <button
          className="bg-secondary text-onSecondary px-4 py-2 rounded"
          onClick={navigateBack}
        >
          Kembali
        </button>
      </div>
    </div>
  );
}
