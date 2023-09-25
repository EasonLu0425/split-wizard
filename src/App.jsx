// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  LoginPage,
  HomePage,
  RegisterPage,
  GropuPage,
  AddItemPage,
  AddGroupPage,
  ItemDetailPage,
  EditItemPage,
} from "./pages";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/splitWizard">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/group/:groupId/addItem"
            element={<AddItemPage />}
          ></Route>
          <Route path="/group/addGroup" element={<AddGroupPage />}></Route>
          <Route path="/group/:groupId" element={<GropuPage />}></Route>
          <Route
            path="/group/:groupId/:itemId/edit"
            element={<EditItemPage />}
          ></Route>
          <Route
            path="/group/:groupId/:itemId"
            element={<ItemDetailPage />}
          ></Route>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
