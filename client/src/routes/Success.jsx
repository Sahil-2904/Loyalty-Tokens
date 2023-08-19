import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout, wallet } from '../authActions.js';
import ANavbar from '../components/ANavbar.jsx';
import Footer from '../components/Footer.jsx';
function Success(){
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const connected = useSelector((state) => state.auth.connected);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    // const u = {
    //     ...user,
    //     cart:[]
    // }
    user.cart = [];
    console.log(user);
    dispatch(loginSuccess(user));
    return (
        <>
            <ANavbar/>
            <div className='flex p-10'>
                <p className='flex text-3xl'>Your Order has been placed successfully</p>
            </div>
            <Footer/>
        </>
    );
}
export default Success;