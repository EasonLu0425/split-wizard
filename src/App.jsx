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
import { ItemDataProvider } from "./contexts/EditItemContext";

function App() {
  return (
    <div className="App">
      <ItemDataProvider>
        <BrowserRouter basename="/splitWizard">
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route
              path="group/:groupId/addItem"
              element={<AddItemPage />}
            ></Route>
            <Route path="groups/:groupId" element={<GroupPage />}></Route>
            <Route path="group/addGroup" element={<AddGroupPage />}></Route>
            <Route
              path="groups/:groupId/:itemId/edit"
              element={<EditItemPage />}
            ></Route>
            <Route
              path="group/:groupId/:itemId"
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
