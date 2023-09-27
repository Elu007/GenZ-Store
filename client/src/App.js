import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom"
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Cart from './pages/Cart';
import AddProduct from './pages/AddProducts';
import ProductView from './pages/ProductView';
import Address from './pages/Address';
import Payment from './pages/Payment';
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import Signup from './pages/Signup';
import axios from 'axios';

const promise = loadStripe(
  "pk_test_51NeC2BSIt5ZXu8rJGhLLPkfC3HCy5CbKry8c8ozYP4NmfjI3bTCMqqLm4YuRqdhsiBJVmWM1UT9PqM0qG7Q8YWAz00ZH4T0ahw"
);
axios.defaults.withCredentials = true

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<Address/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/payment" element={<Elements stripe={promise}><Payment/></Elements>} />
        <Route path="/api/products/get/:id" element={<ProductView/>} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
