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
  SettlePage,
  NotificationPage,
} from "./pages";

import { ItemDataProvider } from "./contexts/EditItemContext";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <div className="App">
      <ItemDataProvider>
        <BrowserRouter basename="/splitWizard">
          <AuthProvider>
            <Routes>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route
                path="groups/:groupId/addItem"
                element={<AddItemPage />}
              ></Route>
              <Route path="groups/:groupId" element={<GroupPage />}></Route>
              <Route
                path="groups/:groupId/settle"
                element={<SettlePage />}
              ></Route>
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
              <Route
                path="manageAccount"
                element={<ManageAccountPage />}
              ></Route>
              <Route
                path="notifications"
                element={<NotificationPage />}
              ></Route>
              <Route path="*" element={<RedirectPage />}></Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ItemDataProvider>
    </div>
  );
}

export default App;
