import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar.jsx';
import ANavbar from '../components/ANavbar.jsx';
import Footer from '../components/Footer.jsx';
import Empty from '../components/Empty.jsx';
import Full from '../components/Full.jsx';
import users from '../user.js';
import { loginSuccess, logout, wallet } from '../authActions.js';

function MyCart() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const connected = useSelector((state) => state.auth.connected);
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  return (
    <>
      {isAuthenticated ? <ANavbar /> : <Navbar /> }
      <div>
        {
                        (user.cart.length === 0) ? <Empty /> : <Full />
                    }
      </div>
      {/* <div className='flex p-16'>

            </div> */}
      <Footer />
    </>

  );
}
export default MyCart;
