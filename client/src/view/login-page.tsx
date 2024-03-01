import { Spinner } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../asset/maju-jaya-alt.png";
import { AuthContext } from "./context/auth-context";

export default function LoginPage() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({ email: "", password: "" });

  useEffect(() => {
    if (authContext?.auth) {
      navigate("/", { replace: true });
    }
  }, [authContext?.auth]);

  function inputOnChange(e: any) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  async function loginForm(e: any) {
    e.preventDefault();

    try {
      setLoading(true);
      await authContext?.login(input);
    } catch (error) {
      toast("Login gagal, cek kembali email dan password anda");
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
          LOGIN PENGGUNA
        </div>
        <form
          onSubmit={loginForm}
          className="bg-surface text-onSurface p-4 drop-shadow rounded flex flex-col gap-4 w-[80%] md:w-[20%]"
        >
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
          <button
            className="bg-primary text-onPrimary font-semibold p-2 disabled:bg-gray-300"
            disabled={loading}
          >
            {loading ? <Spinner /> : "LOGIN"}
          </button>
          <div className="text-center">
            Belum punya akun?{" "}
            <Link to="/register" className="text-primary font-semibold">
              Daftar
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
