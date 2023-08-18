import React from 'react';
import ANavbar from '../components/ANavbar.jsx';
import Footer from "../components/Footer.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../authActions.js';
import { Link } from 'react-router-dom';
function Profile(){
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    return (
        <>
            <ANavbar/>
            <div className='flex flex-col p-10 gap-5'>
                <h2 className='flex text-5xl'>{user.name}</h2>
                <p>Wallet Address: {user.walletadd}</p>
            </div>
            <div className='flex justify-center p-5'>
                <Link to="/"><button className='flex text-4xl p-5 bg-sky-600 text-black/90 rounded-3xl'>Connect Wallet</button></Link>
            </div>
            <Footer/>
        </>
        
    );
}
export default Profile;