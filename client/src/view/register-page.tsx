import { Spinner } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import logo from "../asset/maju-jaya-alt.png";
import { AuthContext } from "./context/auth-context";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });

  useEffect(() => {
    if (authContext?.auth) {
      navigate("/", { replace: true });
    }
  }, [authContext?.auth]);

  function inputOnChange(e: any) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  async function handleForm(e: any) {
    e.preventDefault();

    try {
      setLoading(true);
      await authContext?.register(input);
      toast("Daftar berhasil, login menggunakan email dan password baru anda");
      navigate("/login", { replace: true });
    } catch (error) {
      toast("Daftar gagal, mohon coba beberapa saat lagi");
      setLoading(false);
    }
  }

  return (
    <>
      <div className="bg-background min-h-screen flex flex-col gap-4 justify-center items-center">
        <Link to="/" className="w-1/2 md:w-[10%]">
          <img src={logo} alt="Logo Maju Jaya" />
        </Link>
        <div className="text-onBackground font-semibold text-lg">
          DAFTAR BARU
        </div>
        <form
          onSubmit={handleForm}
          className="bg-surface text-onSurface p-4 drop-shadow rounded flex flex-col gap-4 w-[80%] md:w-[20%]"
        >
          <div className="font-semibold">DETAIL LOGIN</div>
          <hr className="border-1 border-gray-200" />
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            className="border-gray-200 rounded w-full"
            value={input.email}
            onChange={inputOnChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            className="border-gray-200 rounded w-full"
            onChange={inputOnChange}
          />
          <div className="font-semibold">INFO PENGGUNA</div>
          <hr className="border-1 border-gray-200" />
          <input
            type="text"
            placeholder="Nama"
            name="name"
            required
            className="border-gray-200 rounded w-full"
            value={input.name}
            onChange={inputOnChange}
          />
          <input
            type="text"
            placeholder="No HP"
            name="phone"
            required
            className="border-gray-200 rounded w-full"
            value={input.phone}
            onChange={inputOnChange}
          />
          <button
            className="bg-primary text-onPrimary font-semibold p-2 disabled:bg-gray-300"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Daftar"}
          </button>
          <div className="text-center">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-primary font-semibold">
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
