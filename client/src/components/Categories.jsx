import React from 'react';
import { Link } from 'react-router-dom';
import categories from '../categories';

function Categories() {
  return (
    <div className="flex flex-col p-40 pt-20 gap-10 bg-[#141619] text-white h-full shadow-2xl">
      <div className="flex p-5 justify-center">
        <h2 className="flex text-5xl p-10 font-bold">Browse by Category</h2>
      </div>
      <div className="flex gap-10 justify-center">
        {
                    categories.map((cat, index) => (
                      <Link to={cat.link} key={index} className="flex flex-col rounded-xl bg-transparent text-center p-5 translate-y-3 hover:translate-y-0 transition-all duration-300 hover:bg-white hover:text-black hover:font-medium">
                        <div className="flex">
                          <img className="flex w-60 h-60 rounded-2xl mb-5" src={cat.img} alt="" />
                        </div>
                        <div className="flex justify-center p-3">
                          <h2 className="flex text-3xl justify-center">{cat.name}</h2>
                        </div>
                      </Link>
                    ))
                }
      </div>
    </div>
  );
}

export default Categories;
