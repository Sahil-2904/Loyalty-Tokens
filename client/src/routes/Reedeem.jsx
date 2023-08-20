import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Discounted from '../components/Discounted';
import Offers from '../components/Offers';
import {
  loginSuccess, logout, wallet, disconnectWallet,
} from '../authActions';
import ANavbar from '../components/ANavbar';
import Footer from '../components/Footer';

function Redeem() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const isConnected = useSelector((state) => state.auth.connected);
  const tokens = useSelector((state) => state.auth.tokens);
  return (
    <div className="flex flex-col">
      <ANavbar />
      <Discounted />
      <Offers />
      <Footer />
    </div>
  );
}
export default Redeem;
