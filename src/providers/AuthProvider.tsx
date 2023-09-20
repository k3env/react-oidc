import { createContext, useContext } from "react";
import AuthService from "./AuthService";

interface AuthContextType {
  service: AuthService
}


const AuthContext = createContext<AuthContextType>(null!);

const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const service = new AuthService()
  const value = { service }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuth };