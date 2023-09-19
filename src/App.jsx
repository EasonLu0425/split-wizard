// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage, HomePage } from './pages'
import RegisterPage from './pages/RegisterPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/splitWizard">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
