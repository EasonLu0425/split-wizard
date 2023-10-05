import React, { createContext, useContext, useEffect } from "react";
import * as io from "socket.io-client";


const SocketContext = createContext({
  queueLength: 0,
  positionInLine: 0,
});



const SocketProvider = ({ children }) => {
  const socket = io("http://localhost:9000");

  const emitToServer = (eventName, data, callback) => {
    socket.emit(eventName, data, callback);
  };

  useEffect(() => {
    socket.on("onConnected", () => {
      console.log(`Connected with socket ID: ${socket.id}`);
    });

    socket.on("notificationToClient", (data) => {
      console.log("Received notification from server:", data);
    });

    socket.off("onDisconnected", () => {
      console.log(`Disconnected with socket ID: ${socket.id}`);
    });
    return () => {
      socket.off("onConnected");
      socket.off("notificationToClient");
      socket.off("onDisconnected");
    };
  }, [socket]);
  return (
    <SocketContext.Provider value={{ socket, emitToServer }}>
      {children}
    </SocketContext.Provider>
  );
};

function useSocket() {
  return useContext(SocketContext);
}

export { SocketProvider, useSocket };
