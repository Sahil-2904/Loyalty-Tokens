import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import Logo from '../images/Lo.svg';

function Navbar() {
  return (
    <div className="flex justify-between p-5 bg-[#3778e2] bg-transparent backdrop-blur-lg top-0 sticky z-20">
      {/* <div className="flex justify-between border border-sky-500 rounded-xl p-3 w-1/3  bg-white text-black">
                    <input className="flex outline-none w-full" type="search" placeholder="Search for products,brands and more" name="" id="" />
                    <i style={{color:"black"}} className="flex flex-col justify-center fa-solid fa-magnifying-glass"></i>
                </div> */}
      <Search />
      <div style={{ left: '48%' }} className="flex absolute bg-[#020617] p-4 rounded-full">
        <Link to="/"><img className="w-14 h-14" src={Logo} alt="" /></Link>
        {/* <h2 className="text-3xl text-white">DE</h2> */}
        {/* <img className="flex w-20 h-20" src={Logo} alt="" /> */}
      </div>

      <div className="flex gap-5 justify-center">
        <Link to="/login" className="btn btn-outline rounded-full w-36 shadow-xl"><button className="flex flex-col justify-center text-2xl p-2 bg-rounded-box">Login</button></Link>
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

export default Navbar;
