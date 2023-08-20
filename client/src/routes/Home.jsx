import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import ANavbar from '../components/ANavbar';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import Prod from '../components/Prod';
import Best from '../components/Best';
import Footer from '../components/Footer';
import { loginSuccess, logout, wallet } from '../authActions';

function Home() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className='flex flex-col'>
      {isAuthenticated ? <ANavbar className="" /> : <Navbar />}
      <Carousel />
      <Categories />
      <Prod />
      <Best />
      <Footer />
    </div>
  );
}
export default Home;
