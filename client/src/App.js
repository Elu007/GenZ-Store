import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom"
import Navbar from './components/Navbar';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Cart from './components/Cart';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
