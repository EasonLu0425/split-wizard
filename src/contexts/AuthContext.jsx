import { login, register } from "api/auth";
import { createContext, useState, useEffect, useContext } from "react";
import * as jwt from "jsonwebtoken";
import { useLocation } from "react-router-dom";
import { checkPermission } from "api/auth";

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

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.setItem("authToken");
      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        return;
      }
      const result = await checkPermission(authToken);
      if (result) {
        setIsAuthenticated(true);
        const tempPayload = jwt.decode(authToken);
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
      value = {{
        isAuthenticated,
        currentMember: payload && {id:payload.sub, name:payload.name},
        register: async(data) => {
          const {success, authToken} = await register({
            account: data.account,
            email: data.email,
            password: data.password
          })
          const tempPayload = jwt.decode(authToken)
          if (tempPayload) {
            setPayload(tempPayload)
            setIsAuthenticated(true)
            localStorage.setItem('authToken', authToken)
          } else {
            setPayload(null)
            setIsAuthenticated(false)
          }
          return success
        },
        login: async (data) => {
          const {success, authToken} = await login({
            account: data.account,
            password: data.password
          })
          const tempPayload = jwt.decode(authToken);
          if (tempPayload) {
            setPayload(tempPayload)
            setIsAuthenticated(true)
            localStorage.setItem('authToken', authToken)
          } else {
            setPayload(null)
            setIsAuthenticated(false)
          }
          return success
        },
        logout: () => {
          localStorage.removeItem('authToken')
          setPayload(null)
          setIsAuthenticated(false)
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  )

};
