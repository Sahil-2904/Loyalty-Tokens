import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import Search from '../components/Search';
import Logo from '../images/Lo.svg';
import Loader from '../components/Loader';
import Coin from '../images/Coin.svg';
import LoyaltyToken from '../abstract/LoyaltyToken.json';
// import products from '../products';
function Seller() {
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch('http://localhost:3000/products');
      const p = await response.json();
      console.log(p);
      setProducts(p);
      setLoad(false);
    };
    getProducts();
  }, []);
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:3000/transactions');
        const transactionData = await response.json();
        console.log(transactionData);
        setTransactions(transactionData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const getUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        const users = await response.json();
        console.log(users);
        setUsers(users);
      } catch (error) {
        console.log('Error getting users', error);
      }
    };
    getUsers();
    fetchTransactions();
  }, []);

  const add = async (e, index) => {
    const pro = products[index];
    console.log(pro);
    try {
      const response = fetch('http://localhost:3000/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pro),
      });
    } catch (e) {
      console.log('Error adding products', e);
    }
  };

  const giveToken = async (e, to) => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      //   const addr = await signer.getAddress();

      const contract = new ethers.Contract(
        LoyaltyToken.address,
        LoyaltyToken.abi,
        signer,
      );
      const result = await contract.mintTo(to, 10);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {
                load ? (<Loader />) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between p-5 bg-[#3778e2] bg-transparent backdrop-blur-lg top-0 sticky z-20">
                      <Search />
                      <div style={{ left: '48%' }} className="flex absolute bg-[#020617] p-2 w-20 h-20 justify-center items-center rounded-full">
                        <Link to="/"><img className="w-12 h-12" src={Logo} alt="" /></Link>
                      </div>
                      <div className="flex mr-14">
                        <div className="avatar">
                          <div className="w-12 rounded-full ring ring-neutral ring-offset-info ring-offset-2 text-center">
                            <p className="flex flex-col justify-center text-2xl p-2 text-sky-500 uppercase bg-[#F4FCFE]">SE</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col p-20 gap-5">
                      <h2 className="flex justify-center text-3xl">Your Customers</h2>
                      <div className="carousel carousel-center max-w p-4 space-x-4 bg-transparent rounded-box">
                        {
                        transactions.map((transaction, index) => {
                          console.log(transaction.cart[0]);
                          return (
                            <div key={index} className="carousel-item  flex flex-col justify-center bg-base-100 shadow-xl rounded-xl p-5 gap-2">
                              <p className="flex text-3xl">{transaction.name}</p>
                              <p className="flex text-lg">
                                {transaction.wallet}
                                ...
                              </p>
                              <div className="carousel carousel-center max-w space-x-4 bg-transparent rounded-box">
                                {
                                            transaction.cart.map((object, index) => (
                                              <p className="flex carousel-item">{products[object.id - 1].title}</p>
                                            ))
                                        }
                              </div>
                              <button className="flex text-2xl rounded-xl border outline-sky-200 w-1/2 justify-center p-3 btn-info hover:bg-sky-500" onClick={(e) => giveToken(e, transaction.wallet)}>Give Tokens</button>
                            </div>
                          );
                        })
                    }
                      </div>
                    </div>
                    <div className="flex flex-col p-20 gap-5">
                      <h2 className="flex justify-center text-3xl">Your Products</h2>
                      <div className="carousel carousel-center max-w p-4 space-x-4 bg-transparent rounded-box">
                        {
                        products.map((product, index) =>
                        // console.log(transaction.cart[0]);
                          (
                            <div key={index} className="carousel-item w-1/4 flex justify-center">
                              <div className="card w-96 bg-base-100 shadow-xl">
                                <figure className="flex w-72 h-72 mx-auto">
                                  <img src={product.thumbnail} className="rounded-box object-fill" />
                                </figure>
                                <div className="card-body">
                                  <h2 className="flex text-2xl">{product.title}</h2>
                                  <p className="flex text-lg flex-wrap">
                                    ₹
                                    {product.price}
                                  </p>
                                  {' '}
                                  {/* ₨ */}
                                </div>
                              </div>
                            </div>
                          ))
                    }
                      </div>
                    </div>
                    {/* <div>

            {users.length !== 0 ?

                (users.map((user,index) => {
                    return (
                        <div key={index}>
                            <h2>{user.name}</h2>
                            <p>{user.email}</p>
                            <p>{user.walletadd}</p>
                        </div>

                    )
                }))
                :
                (<><p>No Users</p></>)
            }
            </div> */}
                    {/* <div>
                {
                    transactions.length !== 0 ? (
                    (
                        transactions.map((transaction,index) => {
                            return (
                                <div key={index}>
                                    <h2>{transaction.name}</h2>
                                    <p>{transaction.walletadd}</p>
                                </div>
                            )
                        })
                    )) :
                    (<><p>No Transactions</p></>)
                }

            </div> */}
                    {/* <div className='flex flex-col'>
            {
                products.map((product,index) => {
                    return (
                        <>
                            <div className='flex gap-10'>
                                <p>{index+1}</p>
                                <p>{product.title}</p>
                                <button onClick={(e) => add(e,index)}>Add</button>
                            </div>
                        </>
                    )
                })
            }
        </div> */}
                  </div>
                )
            }
    </>

  );
}
export default Seller;
