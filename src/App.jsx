// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  LoginPage,
  HomePage,
  RegisterPage,
  GroupPage,
  AddItemPage,
  AddGroupPage,
  ItemDetailPage,
  EditItemPage,
  RedirectPage,
  ManageAccountPage,
} from "./pages";
import {socket} from './socket'
import { ItemDataProvider } from "./contexts/EditItemContext";
import { useState, useEffect } from "react";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [fooEvents, setFooEvents] = useState([])

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);
  return (
    <div className="App">
      <ItemDataProvider>
        <BrowserRouter basename="/splitWizard">
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route
              path="groups/:groupId/addItem"
              element={<AddItemPage />}
            ></Route>
            <Route path="groups/:groupId" element={<GroupPage />}></Route>
            <Route path="groups/addGroup" element={<AddGroupPage />}></Route>
            <Route
              path="groups/:groupId/:itemId/edit"
              element={<EditItemPage />}
            ></Route>
            <Route
              path="groups/:groupId/:itemId"
              element={<ItemDetailPage />}
            ></Route>
            <Route path="groups" element={<HomePage />}></Route>
            <Route path="manageAccount" element={<ManageAccountPage />}></Route>
            <Route path="*" element={<RedirectPage />}></Route>
          </Routes>
        </BrowserRouter>
      </ItemDataProvider>
    </div>
  );
}

export default App;
