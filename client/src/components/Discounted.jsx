import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { ethers } from 'ethers';
import {
  loginSuccess, logout, wallet, disconnectWallet,
} from '../authActions';
// import products from '../products';
import 'react-toastify/dist/ReactToastify.css';
import Coin from '../images/Coin.svg';
import LoyaltyToken from '../abstract/LoyaltyToken.json';
import SuccessDialog from './SuccessDialog';

function Discounted() {
  const [products,setProducts] = useState([]);
  useEffect(() => {
      const getProducts = async () => {
        const response = await fetch("http://localhost:3000/products");
        const p = await response.json();
        console.log(p);
        setProducts(p);
      }
      getProducts();
    },[]);
  const pro = products.filter((pro) => pro.tags.toLowerCase() === 'heavily-discounted');
  console.log(pro);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.auth.connected);
  const [currAddress, setCurrAddress] = useState('0x');
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [transactionStatus, setTransactionStatus] = useState({});

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      dispatch(disconnectWallet());
      // console.log(connected);
      // setConnected(false);
      setCurrAddress('0x');
    } else {
      dispatch(wallet());
      // console.log(connected);
      // setConnected(true);
      setCurrAddress(accounts[0]);
    }
  };
  const handleCloseDialog = () => {
    setShowDialog(false);
  };
  useEffect(() => {
    const { ethereum } = window;
    if (ethereum && ethereum.selectedAddress) {
      dispatch(wallet());
      // setConnected(true);
      // console.log(connected);
      setCurrAddress(ethereum.selectedAddress);
    }

    if (ethereum) {
      ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (ethereum) {
        ethereum.removeAllListeners('accountsChanged');
      }
    };
  }, [currAddress]);
  const reedemToken = async (amount, index) => {
    try {
      setTransactionStatus((prevState) => ({ ...prevState, [index]: true }));
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        LoyaltyToken.address,
        LoyaltyToken.abi,
        signer,
      );
      const result = await contract.redeemTokens(amount);
      setDialogMessage('Tokens Redeemed Successfully!');
      setShowDialog(true);
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setTransactionStatus((prevState) => ({ ...prevState, [index]: false }));
    }
  };

  return (
    <div className="flex flex-col p-10 gap-10 font-bold">
      <div className="flex p-5 justify-center">
        <h2 className="flex text-5xl">Exclusive Deals</h2>
      </div>
      <div className="carousel carousel-center max-w p-4 space-x-4 bg-transparent rounded-box">
        {
                    pro.map((product, index) => {
                      const link = `products/${product.id}`;
                      console.log(product.tokenValue);
                      return (
                        <div key={index} className="carousel-item w-1/4 flex justify-center">
                          <div className="card w-96 bg-base-100 shadow-xl">
                            <figure className="flex w-72 h-72 mx-auto">
                              <img src={product.thumbnail} className="rounded-box object-fill" />
                            </figure>
                            <div className="card-body">
                              <h2 className="flex text-2xl">{product.title}</h2>
                              <p className="flex text-lg flex-wrap items-center gap-2">
                                <img className="flex w-5 h-5 flex-col justify-center" src={Coin} alt="" />
                                <p className="flex">{product.tokenValue}</p>
                              </p>
                              <div className="card-actions justify-end">
                                <button
                                  type="submit"
                                  className="btn btn-info"
                                  onClick={() => reedemToken(product.tokenValue, index)}
                                  disabled={transactionStatus[index]}
                                >
                                  {transactionStatus[index] ? 'Transaction in Progress' : 'Claim Now'}
                                </button>
                                {showDialog && (
                                <SuccessDialog
                                  message={dialogMessage}
                                  onClose={handleCloseDialog}
                                />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                }
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
      />
    </div>
  );
}
export default Discounted;
