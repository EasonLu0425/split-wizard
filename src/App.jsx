// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage, HomePage, RegisterPage } from './pages'


function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/splitWizard">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/' element={<HomePage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
