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
  ManageAccountPage
} from "./pages";

function App() {
  return (
    <div className="App">
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
            path="group/:groupId/:itemId/edit"
            element={<EditItemPage />}
          ></Route>
          <Route
            path="group/:groupId/:itemId"
            element={<ItemDetailPage />}
          ></Route>
          <Route path="group" element={<HomePage />}></Route>
          <Route path="manageAccount" element = {<ManageAccountPage/>}></Route>
          <Route path='*' element={<RedirectPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
