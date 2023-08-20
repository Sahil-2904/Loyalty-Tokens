import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Product from './components/Product';
import Category from './components/Category';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import MyCart from './routes/MyCart';
import Profile from './routes/Profile';
import Success from "./routes/Success";
import Admin from "./routes/Admin";
import Redeem from './routes/Reedeem';
import Seller from './routes/Seller';
import Earn from './routes/Earn';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<Product />} />
      <Route path="/categories/:category" element={<Category />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/mycart" element={<MyCart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/success" element={<Success/>} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/profile/redeem" element={<Redeem/>}/>
      <Route path="/seller" element={<Seller  />}/>
      <Route path="/profile/earn" element={<Earn  />}/>
    </Routes>
  );
}

export default App;
