import React from 'react';
import Home from "./routes/Home";
import Product from "./components/Product";
import Category from './components/Category';
import Login from './routes/Login';
import SignUp from "./routes/SignUp";
import MyCart from "./routes/MyCart";
import Profile from "./routes/Profile";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/categories/:category" element={<Category />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/mycart" element={<MyCart/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </>
  );
}

export default App;
