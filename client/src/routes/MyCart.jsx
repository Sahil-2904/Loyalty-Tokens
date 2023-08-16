import React from 'react';
import ANavbar from "../components/ANavbar.jsx";
import Footer from "../components/Footer.jsx";
import users from "../user.js"
function MyCart(){
    const user = users[0];
    return (
        <>
            <ANavbar/>
            <div className='flex justify-center'>
                <div className='flex justify-center'>
                    <h2 className='flex text-5xl'>My Cart</h2>

                </div>
            </div>
            <Footer/>
        </>
       
    );
}
export default MyCart;