import React from 'react';
import products from '../products';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
function Product(){
    const {id} = useParams();
    console.log(id);
    const pro = products[id - 1];
    return (
        <>
            <Navbar/>
            <div className='flex p-10 w-full'>
                <div className='flex p-10 gap-10'>
                    <div className='flex justify-center rounded-box w-1/2'>
                        <img className='flex' src={pro.thumbnail} alt="" />
                    </div>
                    <div className='flex flex-col gap-5 w-1/2'>
                        <h2 className='flex text-4xl'>{pro.title}</h2>
                        <p className='flex text-2xl'>{pro.desc}</p>
                        <div className='flex gap-10'>
                            <p className='flex text-xl'>₹ {pro.price}</p>
                            <p className='flex text-xl'>Rating: {pro.rating}</p>
                        </div>
                        <div className='flex gap-5 justify-start'>
                            <button className='btn btn-info'>Place Order</button>
                            <button className='btn btn-outline btn-warning'>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer/>
        </>
        
    );
}
export default Product;