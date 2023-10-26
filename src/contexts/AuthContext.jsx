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

  const register = async (registerData) => {
    const {data} = await apiRegister({
      name: registerData.name,
      account: registerData.account,
      password: registerData.password,
      passwordCheck: registerData.passwordCheck,
    });
    console.log('context res', data)
    if (data.status === 'success') {
      const tempPayload = decodeToken(data.result.authToken);
      if (tempPayload) {
        setPayload(tempPayload);
        setIsAuthenticated(true);
        localStorage.setItem("authToken", data.result.authToken);
      } else {
        setPayload(null);
        setIsAuthenticated(false);
      }
    }
    return data
  };

  const login = async (loginData) => {
    const { data } = await apiLogin({
      account: loginData.account,
      password: loginData.password,
    });
    console.log("login result", data);
    if (data.status === "success") {
      const tempPayload = decodeToken(data.result.authToken);
      if (tempPayload) {
        setPayload(tempPayload);
        setIsAuthenticated(true);
        localStorage.setItem("authToken", data.result.authToken);
        localStorage.setItem("currentUserId", tempPayload.userId);
      } else {
        setPayload(null);
        setIsAuthenticated(false);
      }
    }
    return data;
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUserId");
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
      if (result === "success") {
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
        currentMember: payload && { id: payload.userId },
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
