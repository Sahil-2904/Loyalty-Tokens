import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ethers } from 'ethers';
import products from '../products';
import {
  loginSuccess, logout, wallet, disconnectWallet,
} from '../authActions';

import Admin from '../routes/Admin';
import LoyaltyToken from '../abstract/LoyaltyToken.json';
import SuccessDialog from './SuccessDialog';

function Full() {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isConnected = useSelector((state) => state.auth.connected);
  const [currAddress, setCurrAddress] = useState('0x');
  // const [connected, setConnected] = useState(false);
  const dispatch = useDispatch();
  const [cart, setCart] = useState(user.cart);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const navigate = useNavigate();
  const [transactionInProgress, setTransactionInProgress] = useState(false);

  useEffect(() => {
    setCart(user.cart); // Update the local cart state
    dispatch(loginSuccess({ ...user, cart }));
    // dispatch(wallet());
  }, [user.cart]);
  // useEffect(() => {
  //   dispatch(wallet());
  // },[isConnected]);
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

  let p = 0;
  for (let i = 0; i < user.cart.length; i++) {
    console.log(user.cart[i]);
    const { id } = user.cart[i];
    const q = user.cart[i].quantity;
    // console.log(id,q);
    p += (q * products[id - 1].price);
  }

  function convertPriceToTokens(price) {
    let tokens = Math.round(price / 1000);
    if (tokens > 100) {
      tokens = 100;
    }
    return tokens;
  }
  const removeCart = (e, item) => {
    console.log(item);
    const updatedCart = user.cart.filter((i) => i != item);
    console.log(updatedCart);
    setCart(updatedCart);
    // user.cart = cart;
    dispatch(loginSuccess({ ...user, cart: updatedCart }));
  };
  // useEffect(() => {

  // },[user]);
  const handleSuccess = async () => {
    const response = await fetch('http://localhost:3000/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...user, wallet: currAddress }),
    });
  };
  const mintToken = async (address, amount) => {
    try {
      setTransactionInProgress(true);

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      const contract = new ethers.Contract(
        LoyaltyToken.address,
        LoyaltyToken.abi,
        signer,
      );
      const result = await contract.mintFor(addr, amount);
      await result.wait();
      setTransactionInProgress(false);
      setDialogMessage('Order placed Successfully!');
      setShowDialog(true);

      console.log(result);
    } catch (error) {
      setTransactionInProgress(false);
      console.log(error);
    } finally {
      handleSuccess();
      navigate('/success');
    }
  };
  const handleCloseDialog = () => {
    setShowDialog(false);
  };
  return (
    <div className="flex flex-col gap-2 p-12 pt-5">
      {/* <div className="bg-[#141619] h-2"></div> */}
      <div className="flex gap-2 p-5">
        <div className="flex justify-left w-1/2">
          <h2 className="flex text-6xl p-3 font-bold">
            My Cart
            {(user.cart.length === 0 ? null : ` (${user.cart.length})`)}
          </h2>
        </div>
        <div className="flex flex-col justify-end w-1/2">
          <h2 className="flex text-3xl p-3 justify-end">
            <span className="bg-[#141619] p-5 text-white rounded-xl opacity-90">
              <span className="font-bold">Total Price:&nbsp;</span>
              ₹
              {p}
            </span>
          </h2>
        </div>

      </div>
      <div className="overflow-x-auto p-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="shadow-md">
              <th className="flex text-xl justify-left ms-5 mb-5 mt-5">Product</th>
              <th className="text-xl m-5">Title</th>
              <th className="text-xl m-5">Quantity</th>
              <th className="text-xl m-5">Remove</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
                    user.cart.map((item, index) => {
                      // console.log(i);
                      const i = item.id; const { quantity } = item;
                      return (
                        <tr key={index} className="shadow-md">
                          <td className="flex justify-center">
                            <div className="flex items-center space-x-3">
                              {/* <div className="avatar"> */}
                              <div className="flex w-48 h-48 justify-center">
                                <img className="flex object-contain" src={products[i - 1].thumbnail} alt="Avatar Tailwind CSS Component" />
                              </div>
                              {/* </div> */}
                              {/* <div>
                                        <div className="font-bold">Hart Hagerty</div>
                                        <div className="text-sm opacity-50">United States</div>
                                    </div> */}
                            </div>
                          </td>
                          <td className="">
                            <p className="flex text-3xl ms-5">{products[i - 1].title}</p>
                            <br />
                            {/* {products[i-1].desc} */}
                            <div className="flex gap-5 ms-5">
                              {/* <button onClick={(e) => removeProduct(e,item)} className="flex flex-col justify-center p-3 minus" >-</button> */}
                              <span className="flex text-xl p-0">
                                ₹
                                {products[i - 1].price}

                              </span>
                              {/* <button onClick={(e) => addProduct(e,item)} className="flex flex-col justify-center p-3">+</button> */}
                            </div>

                          </td>
                          <td>
                            <p className="text-xl ms-7">
                              {quantity}
                            </p>
                          </td>
                          <th>
                            <button onClick={(e) => removeCart(e, item)} className="btn btn-ghost btn-lg"><i className="fa-solid fa-trash" style={{ color: 'red' }} /></button>
                          </th>
                        </tr>
                      );
                    })
                }
          </tbody>
          {/* foot */}
          {/* <tfoot>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                    <th></th>
                </tr>
                </tfoot> */}

        </table>
      </div>
      {/* <div className='grid grid-cols-4'> */}
      {
                    // user.cart.map((i,index) => {
                    //     return (
                    //         <div key={index} className="flex p-4"> {/*carousel-item */}
                    //             <div className="card w-96 bg-base-100 shadow-xl">
                    //                 <figure className='flex w-72 h-72 mx-auto'>
                    //                     <img src={products[i-1].thumbnail} className="rounded-box object-contain" />
                    //                 </figure>
                    //                 <div className="card-body">
                    //                     <h2 className='flex text-2xl'>{products[i-1].title}</h2>
                    //                     <p className='flex text-lg flex-wrap'>₹ {products[i-1].price}</p> {/* ₨ */}
                    //                     <div className="card-actions justify-end">
                    //                         <Link to={products[i-1].link}><button className="btn btn-info">Buy Now</button></Link>
                    //                         <button className='btn btn-outline'>Add To Cart</button>
                    //                     </div>
                    //                 </div>
                    //             </div>
                    //         </div>
                    //     )
                    // })
                }
      {/* </div> */}
      <div className="flex justify-center p-5">
        {isConnected ? (
          <div>
            <button
              type="submit"
              className="flex text-3xl p-5 bg-sky-300 text-black/90 rounded-3xl hover:bg-sky-500"
              onClick={() => mintToken(currAddress, convertPriceToTokens(p))}
              disabled={transactionInProgress}
            >
              {transactionInProgress ? 'Transaction in Progress' : 'Place Order'}

            </button>
            {showDialog && (
            <SuccessDialog
              message={dialogMessage}
              onClose={handleCloseDialog}
            />
            )}
          </div>
        ) : (
          <Link to="/profile">
            <button className="flex text-3xl font-bold p-5 m-10 text-white bg-emerald-600 rounded-3xl">
              Connect Wallet
            </button>
          </Link>
        )}
      </div>

    </div>
  );
}
export default Full;
