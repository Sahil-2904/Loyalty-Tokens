import React from 'react';
import { Link } from 'react-router-dom';
function Footer(){
    return (
        <footer className="flex flex-col gap-10 p-20 pb-10 pt-10 bg-gradient-to-br from-[#020617] to-[#141619] text-white">
            <div className="flex justify-center gap-24">
                <div className='flex flex-col w-1/3 gap-5'>
                    <div className='flex flex-col gap-5'>
                        <div className='flex justify-start'>
                            <h2 className="flex bg-[#141619] p-3 w-16 rounded-full text-3xl text-white justify-center">DE</h2>
                        </div>
                        <p className='flex text-xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h2 className='flex text-3xl'>NewsLetter</h2>
                        <input className='flex rounded-xl p-3' type="email" placeholder='Enter your Email'/>
                        <button>Subscribe</button>
                    </div>
                </div>
                <div className='flex flex-col w-1/3 ps-36'>
                    <h3 className='text-2xl mb-2'>Categories</h3>
                    <Link to="/categories/fashion"><p>Fashion</p></Link>
                    <Link to="/categories/sneakers"><p>Sneakers</p></Link>
                    <Link to="/categories/electronics"><p>Electronics</p></Link>
                    <Link to="/categories/mobiles"><p>Mobiles</p></Link>
                </div>
                <div className='flex flex-col w-1/3 ps-10'>
                    <h3 className='text-2xl mb-2'>Services</h3>
                    <p>Shipping & Delivery</p>
                    <p>Order Pickup</p>
                    <p>Account Signup</p>
                </div>
            </div>
            <hr className="flex"/>
            <div className="flex justify-center">
                <h2>Copyright © 2023 | Team Dev Elites</h2>
            </div>
        </footer>
    );
}
export default Footer;