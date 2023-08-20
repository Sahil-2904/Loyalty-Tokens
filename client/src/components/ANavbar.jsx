import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cart from '../images/cart.png';
import { loginSuccess, logout, wallet } from '../authActions';
import Search from './Search';
import Logo from '../images/Lo.svg';
import Coin from '../images/Coin.svg';
import Profile from '../images/Profile.png';

function ANavbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const tokens = useSelector((state) => state.auth.tokens);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const response = await fetch('http://localhost:3000/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json();
    if (response.ok) {
      dispatch(logout());
    } else {
      console.log('Logout Error');
    }
  };
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="flex justify-between p-5 bg-[#3778e2] bg-transparent backdrop-blur-lg top-0 sticky z-20">
      {/* <div className="flex justify-between border border-sky-500 rounded-xl p-3 w-1/3  bg-white text-black">
                    <input className="flex outline-none w-full" type="search" placeholder="Search for products,brands and more" name="" id="" />
                    <i style={{color:"black"}} className="flex flex-col justify-center fa-solid fa-magnifying-glass"></i>
                </div> */}
      <Search />
      <div style={{ left: '48%' }} className="flex absolute bg-[#020617] p-2 w-20 h-20 justify-center items-center rounded-full">
        <Link to="/"><img className="w-12 h-12" src={Logo} alt="" /></Link>
        {/* <h2 className="text-3xl text-white">DE</h2> */}
      </div>
      {/* <div className="form-control">
                    <div className="input-group">
                        <input type="text" placeholder="Search…" className="input input-bordered" />
                        <button className="btn btn-square">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div> */}

      <div className="flex gap-5 justify-center">
        <div className="flex gap-3 justify-center text-black rounded-full items-center">
          {/* <h2 className="text-3xl bg-orange-500 p-1 rounded-full">C</h2> */}
          <img className="w-8 h-8 flex flex-col justify-center mx-auto" src={Coin} alt="" />
          <p className="flex flex-col justify-center text-xl text-yellow-400">{tokens}</p>
        </div>
        <div className="dropdown dropdown-click dropdown-end">
          <label tabIndex={0} className="m-10">
            <div className="avatar">
              <div className="w-12 rounded-full ring ring-neutral ring-offset-info ring-offset-2 text-center">
                <p className="flex flex-col justify-center text-2xl p-2 text-sky-500 uppercase bg-[#F4FCFE]">{user.name.slice(0, 2)}</p>

                {/* <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
              </div>
            </div>
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 gap-1 mt-1">
            <li>
              <Link to="/profile">
                <button className="flex justify-center items-center text-lg rounded-box gap-2">
                  <img src={Profile} className="flex w-8 h-8" />
                  Profile
                </button>
              </Link>
            </li>
            <li>
              <Link to="/mycart">
                <button className="flex justify-center text-lg rounded-box gap-2">
                  <img src={cart} className="flex w-8 h-8" />
                  My Cart
                </button>
              </Link>
            </li>
            <li onClick={handleLogout}>
              <Link to="/" className="flex flex-col justify-center text-lg btn btn-outline btn-error m-3 mt-3">
                <button>Logout</button>
              </Link>
            </li>
          </ul>
        </div>

        {/* <button className="flex flex-col justify-center text-2xl p-2 rounded-xl">Login</button> */}
        {/* <button className="flex flex-col justify-center text-2xl p-2 rounded-xl" onClick={()=>window.my_modal_3.showModal()}>Login</button>
                    <dialog id="my_modal_3" className="modal bg-black/10">
                        <form method="dialog" className="modal-box flex flex-col gap-7 bg-white text-black">
                            <div className="flex justify-center w-full join">
                                <button className="flex join-item btn btn-active">Login</button>
                                <button className="flex join-item btn">Sign Up</button>
                            </div>
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><i className="fa-solid fa-xmark fa-lg"/></button>
                            <div className="flex justify-center">
                                <div className="flex flex-col gap-5 justify-center">
                                    <input type="email" name="" id="" placeholder="Email" className="input input-bordered input-info w-full max-w-xs" />
                                    <input type="password" name="" id="" placeholder="Password" className="input input-bordered input-info w-full max-w-xs" />
                                    <button className="flex p-3 text-xl hover:bg-sky-500 justify-center rounded-xl">Sign In</button>
                                </div>
                            </div>
                            <hr className="flex w-3/4 mx-auto" />
                            <a className="flex justify-center p-3" href="/auth/google">
                                <div className="flex gap-x-5 bg-slate-100 rounded-2xl p-3 hover:bg-blue-500 hover:text-slate-200 transition-all duration-300 ease-out">
                                    <img className="w-10 h-10" src={Google} alt="google"/>
                                    <h1 className="text-xl flex flex-col justify-center">Sign In with Google</h1>
                                </div>
                            </a>
                        </form>
                    </dialog> */}

      </div>
    </div>
  );
}

export default ANavbar;
