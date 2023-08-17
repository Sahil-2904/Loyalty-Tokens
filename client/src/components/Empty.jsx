import React from 'react';
import { Link } from 'react-router-dom';
import em from "../images/empty.jpg";
function Empty(){
    return (
        <div className='flex flex-col gap-5'>
            <div className='flex w-96 h-96 mx-auto'>
                <img className="object-contain" src={em} alt="empty" />
            </div>
            <div className='flex justify-center'>
                <Link to="/"><button className='flex text-4xl p-5 bg-emerald-600 text-black/60 rounded-3xl'>Continue Shopping</button></Link>
            </div>
        </div>
    );
}
export default Empty;