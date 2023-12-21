import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import CoinPage from './Pages/CoinPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} exact> </Route>
        <Route path="/coins/:id" element={<CoinPage />} exact> </Route>
        <Route path="/login" element={<Login />} exact> </Route>
        <Route path="/signup" element={<SignUp />} exact> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
