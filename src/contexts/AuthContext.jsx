import { apiLogin, apiRegister, checkPermission } from "../api/auth";
import { createContext, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { decodeToken } from "react-jwt";

const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  const { pathname } = useLocation();

  const register = async (data) => {
    const { success, result } = await apiRegister({
      name: data.name,
      account: data.account,
      password: data.password,
    });
    const tempPayload = decodeToken(result.authToken);
    if (tempPayload) {
      setPayload(tempPayload);
      setIsAuthenticated(true);
      localStorage.setItem("authToken", result.authToken);
    } else {
      setPayload(null);
      setIsAuthenticated(false);
    }
    return success;
  };

  const login = async (data) => {
    const { success, result } = await apiLogin({
      account: data.account,
      password: data.password,
    });
    const tempPayload = decodeToken(result.authToken);
    if (tempPayload) {
      setPayload(tempPayload);
      setIsAuthenticated(true);
      localStorage.setItem("authToken", result.authToken);
    } else {
      setPayload(null);
      setIsAuthenticated(false);
    }
    return success;
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setPayload(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        return;
      }
      const result = await checkPermission(authToken);
      if (result) {
        setIsAuthenticated(true);
        const tempPayload = decodeToken(authToken);

        setPayload(tempPayload);
      } else {
        setIsAuthenticated(false);
        setPayload(null);
      }
    };

    checkTokenIsValid();
  }, [pathname]);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && { id: payload.sub, name: payload.name },
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
