import React from 'react';
import Home from "./routes/Home";
import Product from "./components/Product";
import Category from './components/Category';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/categories/:category" element={<Category />} />
      </Routes>
    </>
  );
}

export default App;
