import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/Lo.svg';

function Footer() {
  return (
    <footer className="flex flex-col gap-10 p-20 pb-10 pt-10 bg-gradient-to-br from-[#020617] to-[#141619] text-white">
      <div className="flex justify-center gap-24">
        <div className="flex flex-col w-1/3 gap-5">
          <div className="flex flex-col gap-5">
            <div className="flex justify-start">
              <Link to="/"><img className="w-16 h-16" src={Logo} alt="" /></Link>
              {/* <h2 className="flex bg-white p-3 w-16 rounded-full text-3xl text-[#141619] justify-center">DE</h2> */}
            </div>
            <p className="flex text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="flex text-3xl">NewsLetter</h2>
            <input className="input input-bordered text-black" type="email" placeholder="Enter your Email" />
            <button className="btn btn-md btn-info btn-outline flex w-1/3">Subscribe</button>
          </div>
        </div>
        <div className="flex flex-col w-1/3 ps-20">
          <h3 className="text-3xl mb-2">Categories</h3>
          <Link to="/categories/fashion"><p className="text-lg">Fashion</p></Link>
          <Link to="/categories/sneakers"><p className="text-lg">Sneakers</p></Link>
          <Link to="/categories/electronics"><p className="text-lg">Electronics</p></Link>
          <Link to="/categories/mobiles"><p className="text-lg">Mobiles</p></Link>
        </div>
        <div className="flex flex-col w-1/3">
          <h3 className="text-3xl mb-2">Services</h3>
          <p className="text-lg">Shipping & Delivery</p>
          <p className="text-lg">Order Pickup</p>
          <p className="text-lg">Account Signup</p>
        </div>
      </div>
      <hr className="flex" />
      <div className="flex justify-center">
        <h2>Copyright © 2023 | Team Dev Elites</h2>
      </div>
    </footer>
  );
}
export default Footer;
