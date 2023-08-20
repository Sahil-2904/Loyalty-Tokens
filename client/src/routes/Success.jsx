import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout, wallet } from '../authActions.js';
import ANavbar from '../components/ANavbar.jsx';
import Footer from '../components/Footer.jsx';
import s from "../images/Success.jpg";
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
            <div className='flex flex-col p-20 justify-center items-center gap-10'>
                <img className='w-96 h-96 flex' src={s} alt="" />
                <Link to="/profile"><button className='flex text-2xl p-3 bg-sky-300 rounded-box'>Go To Profile</button></Link>
            </div>
            <Footer/>
        </>
    );
}
export default Success;