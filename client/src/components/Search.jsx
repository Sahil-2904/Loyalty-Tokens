import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
// import products from '../products';

function Search() {
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
  const [text, setText] = useState('');
  const [pro, setPro] = useState([]);
  const handleChange = (e) => {
    console.log(e.target.value);
    const inputValue = e.target.value;
    setText(inputValue);
    if (inputValue.length === 0) setPro([]);
    else {
      const p = products.filter((product) => product.title.toLowerCase().includes(e.target.value.toLowerCase()));
      console.log(p);
      setPro(p);
    }
  };
  return (
    <div className="flex justify-between border border-gray-300 rounded-xl p-3 w-1/3 bg-white text-black shadow-md">
      <input onChange={(e) => handleChange(e)} className="flex outline-none w-full" type="search" placeholder="Search for products,brands and more" value={text} name="" id="" />

      {pro.length !== 0 && (
      <div className="absolute w-[33%] bg-gray-50 mt-11 ml-[-15px] overflow-y-scroll no-scrollbar max-h-96 rounded-xl">
        {
                                                    pro.map((product, index) => (
                                                      <Link to={product.link}>
                                                        <div key={index} className="flex p-5 rounded-xl gap-5 m-2 border border-gray-200 hover:text-white hover:bg-[#141619]">
                                                          <div className="flex w-20 h-16">
                                                            <img className="object-contain w-24 h-16" src={product.thumbnail} alt="" />
                                                          </div>
                                                          <div className="flex flex-col ms-7">
                                                            <h5 className="flex text-2xl">{product.title}</h5>
                                                            <p className="flex text-lg">{product.category}</p>
                                                          </div>
                                                        </div>
                                                      </Link>
                                                    ))
                                                }
      </div>
      )}

      <i style={{ color: 'black' }} className="flex flex-col justify-center fa-solid fa-magnifying-glass" />
    </div>
  );
}
export default Search;
