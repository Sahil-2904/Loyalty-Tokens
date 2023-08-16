import React from 'react';
import products from '../products';
import { Link } from "react-router-dom";
function Prod(){
    return (
        <div className='flex flex-col p-10 gap-10'>
            <div className='flex p-5 justify-center'>
                <h2 className='flex text-5xl'>Top Picks</h2>
            </div>
            {/* <div className='flex gap-10 justify-center'>
                {
                    products.map((product,index) => {
                        return(
                            <div className="carousel rounded-box w-96">
                                <div className='carousel-item w-1/2'>
                                     
                                </div>    
                            </div>
                        )
                    })
                }
            </div> */}
            <div className="carousel carousel-center max-w p-4 space-x-4 bg-transparent rounded-box">
                {
                    products.map((product,index) => {
                        const link = "products/" + product.id ;  
                        return(
                            <div key={index} className="carousel-item w-1/3">
                                <div className="card w-96 bg-base-100 shadow-xl">
                                    <figure className='flex'>

                                        <img src={product.thumbnail} className="rounded-box bg-blend-multiply" />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className='flex text-2xl'>{product.title}</h2>
                                        <p className='flex text-lg flex-wrap'>₹ {product.price}</p> {/* ₨ */}
                                        <div className="card-actions justify-end">
                                            <Link to={link}><button className="btn btn-info">Buy Now</button></Link>
                                            <button className='btn btn-outline'>Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )    
                    })
                }
            </div>
        </div>
    );
}
export default Prod;