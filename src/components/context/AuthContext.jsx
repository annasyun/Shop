import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "../../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    onUserStateChange((user) => {
      setUserData(user);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
