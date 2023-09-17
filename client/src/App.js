import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom"
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Cart from './pages/Cart';
import AddProduct from './pages/AddProducts';
import ProductView from './pages/ProductView';
import Address from './pages/Address';
import Payment from './pages/Payment';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<Address/>} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/api/products/get/:id" element={<ProductView/>} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
