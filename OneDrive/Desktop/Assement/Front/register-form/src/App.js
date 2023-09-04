
import './App.css';

import Home from './Home';
import Register from './Register';
import Login from './Login';
import ChangePassword from './ChangePassword';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";



function App() {

  const user = localStorage.getItem('token')
  return (
    <div className="App">
    <BrowserRouter>
    

    <Routes>
    
  
    {user && <Route element={<Home />} exact path="/" />}
    <Route element={<Register />} exact path="/register" />
    <Route element={<Login />} exact path="/login" />
    <Route element={<ChangePassword />} exact path="/change-password" />
    <Route element={<Navigate replace to='/login' />} exact path="/" />
   
    </Routes>
   
    </BrowserRouter>
    </div>
  );
}

export default App;
