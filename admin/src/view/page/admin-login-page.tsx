import { Spinner } from "flowbite-react";
import { useState } from "react";
import logo from "../../assets/maju-jaya-alt.png";

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);

  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });

  function change(e: any) {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  }

  function submit(e: any) {
    e.preventDefault();

    try {
      setLoading(true);
    } catch (error) {
      //
    }
  }

  return (
    <div className="bg-background min-h-screen flex flex-col gap-2 justify-center items-center">
      <div className="flex flex-col gap-2 justify-center items-center">
        <img src={logo} alt="Logo Maju Jaya" className="w-[70%]" />
        <div className="text-onBackground font-semibold text-lg">
          LOGIN ADMIN
        </div>
      </div>
      <div className="bg-surface p-4 drop-shadow rounded w-[80%] md:w-[50%] lg:w-[30%]">
        <div>
          <form onSubmit={submit} className="flex flex-col gap-4">
            <input
              required
              type="text"
              placeholder="Username"
              name="username"
              className="bg-gray-100 border-none rounded w-full disabled:bg-gray-300"
              disabled={loading}
              value={formValue.username}
              onChange={change}
            />
            <input
              required
              type="password"
              placeholder="Password"
              name="password"
              className="bg-gray-100 border-none rounded w-full disabled:bg-gray-300"
              disabled={loading}
              value={formValue.password}
              onChange={change}
            />
            <button
              className="bg-primary text-onPrimary p-2 rounded w-full"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
