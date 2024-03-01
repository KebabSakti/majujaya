import { createContext, useEffect, useState } from "react";
import { AuthModel } from "../../../../lib/model/auth-model";
import { Empty } from "../../lib/config/type";
import AuthRepository from "../../lib/repository/auth-repository";

export interface AuthContextType {
  auth: AuthModel | Empty;
  load: () => void;
  login: (param: Record<string, any>) => Promise<void>;
  register: (param: Record<string, any>) => Promise<void>;
  logout: () => void;
}

const authRepository = new AuthRepository();
export const AuthContext = createContext<AuthContextType | Empty>(null);

export function AuthProvider({ children }: any) {
  const [auth, setAuth] = useState<AuthModel | Empty>();

  useEffect(() => {
    load();
  }, []);

  function load() {
    const result = authRepository.load();
    setAuth(result.data);
  }

  async function login(param: Record<string, any>): Promise<void> {
    const result = await authRepository.login(param);
    setAuth(result.data);
  }

  async function register(param: Record<string, any>): Promise<void> {
    await authRepository.register(param);
  }

  function logout(): void {
    authRepository.logout();
    setAuth(null);
  }

  return (
    <AuthContext.Provider value={{ auth, load, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
