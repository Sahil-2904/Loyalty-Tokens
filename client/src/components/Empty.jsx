import React from 'react';
import { Link } from 'react-router-dom';
import em from '../images/empty.jpg';

function Empty() {
  return (
    <div className="flex flex-col gap-5 p-16 font-bold">
      <div className="flex justify-left w-1/2">
        <h2 className="flex text-6xl p-3">My Cart</h2>
      </div>
      <div className="flex w-96 h-96 mx-auto">
        <img className="object-contain" src={em} alt="empty" />
      </div>
      <div className="flex justify-center">
        <Link to="/"><button className="flex text-4xl p-5 m-20 bg-emerald-600 text-black/60 rounded-3xl text-white">Continue Shopping</button></Link>
      </div>
    </div>
  );
}
export default Empty;
