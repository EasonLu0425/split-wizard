import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";

const SocketContext = createContext({
  queueLength: 0,
  positionInLine: 0,
});

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const { pathname } = useLocation();

  const emitToServer = (eventName, data, callback) => {
    socket.emit(eventName, data, callback);
  };

  const closeSocket = () => {
    if (socket) {
      const socketId = socket.id;
      const currentUserId = localStorage.getItem("currentUserId");
      emitToServer("logout", { currentUserId, socketId });
      socket.disconnect();
      setIsConnected(false);
      console.log("disconnectSocket!");
    }
  };

  useEffect(() => {
    if (!isConnected) {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        const newSocket = io("http://localhost:5000", {
          withCredentials: true,
          path: "/swSocket/",
        });
        newSocket.on("connect", () => {
          console.log("Socket connected, id:", newSocket.id);
          const socketId = newSocket.id;
          const currentUserId = localStorage.getItem("currentUserId");
          const loginData = { currentUserId, socketId };
          // Emit login event after connection
          newSocket.emit("login", loginData, (response) => {
            if (response.success) {
              console.log("Login success");
            } else {
              console.log("Login failed");
            }
          });
          setIsConnected(true); // Mark the connection as established
        });

        setSocket(newSocket);
      }
    }
  }, [pathname]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        emitToServer,
        closeSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

function useSocket() {
  return useContext(SocketContext);
}

export { SocketProvider, useSocket };
