import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { loginSuccess, logout, wallet } from '../authActions';
import products from '../products';
import 'react-toastify/dist/ReactToastify.css';
import Coin from '../images/Coin.svg'

function Discounted() {
  const pro = products.filter((pro) => pro.tags.toLowerCase() === 'heavily-discounted');
  console.log(pro);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col p-10 gap-10 font-bold">
      <div className="flex p-5 justify-center">
        <h2 className="flex text-5xl">Exclusive Deals</h2>
      </div>
      <div className="carousel carousel-center max-w p-4 space-x-4 bg-transparent rounded-box">
        {
                    pro.map((product, index) => {
                      const link = `products/${product.id}`;
                      return (
                        <div key={index} className="carousel-item w-1/4 flex justify-center">
                          <div className="card w-96 bg-base-100 shadow-xl">
                            <figure className="flex w-72 h-72 mx-auto">
                              <img src={product.thumbnail} className="rounded-box object-fill" />
                            </figure>
                            <div className="card-body">
                              <h2 className="flex text-2xl">{product.title}</h2>
                              <p className="flex text-lg flex-wrap items-center gap-2">
                                <img className='flex w-5 h-5 flex-col justify-center' src={Coin} alt="" />
                                <p className='flex'>{product.tokenValue}</p>
                              </p>
                              <div className="card-actions justify-end">
                                <Link><button className="btn btn-info">Claim Now</button></Link>
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
