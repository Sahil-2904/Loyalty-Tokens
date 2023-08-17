import React from 'react';
import Navbar from '../components/Navbar.jsx';
import ANavbar from "../components/ANavbar.jsx";
import Footer from "../components/Footer.jsx";
import Empty from '../components/Empty.jsx';
import Full from '../components/Full.jsx';
import users from "../user.js";
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../authActions.js';
function MyCart(){
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const user = useSelector((state) => state.auth.user);
    console.log(user);
    return (
        <>
            {isAuthenticated ? <ANavbar/> : <Navbar/> }
            
            <div className='flex flex-col p-16'>
                <div className='flex justify-left'>
                    <h2 className='flex text-5xl'>My Cart  {(user.cart.length === 0 ? null : `(${user.cart.length})`)}</h2>
                </div>
                <div>
                    {
                        (user.cart.length === 0) ? <Empty/> : <Full user={user}/> 
                    }
                </div>
            </div>
            <Footer/>
        </>
       
    );
}
export default MyCart;