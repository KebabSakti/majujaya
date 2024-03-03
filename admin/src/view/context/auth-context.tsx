import { createContext, useState } from "react";
import { Empty } from "../../lib/config/type";
import AuthRepository from "../../lib/repository/auth-repository";

type ContextType = {
  auth: string | Empty;
  logout: () => void;
  login: (param: Record<string, any>) => Promise<void>;
};

const authRepository = new AuthRepository();
export const AuthContext = createContext<ContextType | Empty>(null);

export function AuthProvider({ children }: any) {
  const [auth, setAuth] = useState<string | Empty>(init);

  function init(): string | Empty {
    const token = sessionStorage.getItem("auth");

    return token;
  }

  async function login(param: Record<string, any>) {
    const response = await authRepository.login(param);

    if (response.data) {
      const token = response.data.token;
      sessionStorage.setItem("auth", token);
      setAuth(token);
    }
  }

  function logout() {
    sessionStorage.removeItem("auth");
    setAuth(null);
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
