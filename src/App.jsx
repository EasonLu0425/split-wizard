// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage, HomePage } from './pages'


function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/splitWizard">
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
