import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/maju-jaya.png";
import { AuthContext } from "../context/auth-context";
import Menu from "./menu";
import Sidebar from "./sidebar";

export default function Layout() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (authContext!.auth == null) {
      navigate("/", { replace: true });
    }
  }, [authContext]);

  return (
    <>
      <Sidebar show={show}>
        <div
          className="flex flex-col gap-6 p-6"
          onClick={() => {
            setShow(!show);
          }}
        >
          <Menu />
        </div>
      </Sidebar>
      <div className="h-screen flex flex-col">
        <div className="bg-surface h-16 p-6 flex items-center justify-between md:justify-start">
          <img src={logo} className="h-10" />
          <button
            onClick={() => {
              setShow(!show);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 stroke-primary md:hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="bg-background flex-grow">
          <div className="flex h-full">
            <div className="bg-surface w-[15%] hidden md:block">
              <div className="p-6 flex flex-col gap-6">
                <Menu />
              </div>
            </div>
            <div className="h-full w-full flex flex-col justify-between">
              <Outlet />
              <div className="bg-surface text-onSurface h-20 flex justify-center items-center text-sm">
                Copyright Maju Jaya 2024. Hak Cipta Dilindungi
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
