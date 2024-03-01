import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

export default function AuthBar() {
  const authContext = useContext(AuthContext);

  return (
    <div className="bg-variant">
      <div className="hidden w-3/5 mx-auto h-6 text-onVariant text-xs lg:flex justify-end items-center gap-1">
        {authContext?.auth ? (
          <></>
        ) : (
          <>
            <Link to="/register">Daftar</Link>|<Link to="/login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
}
