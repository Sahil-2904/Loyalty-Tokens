import React from 'react';
import { Link } from 'react-router-dom';
import products from "../products";
function Full(props){
    const user = props.user;
    let price  = 0;
    for(let i=0;i<user.cart.length;i++){
        let id = user.cart[i];
        price += products[id-1].price;
    }

    return (
        <div className='flex flex-col gap-2'>
            <h2>Total price: {price}</h2>
            <div className='grid grid-cols-4'>
                {
                    user.cart.map((i,index) => {
                        return (
                            <div key={index} className="flex p-4"> {/*carousel-item */}
                                <div className="card w-96 bg-base-100 shadow-xl">
                                    <figure className='flex w-72 h-72 mx-auto'>
                                        <img src={products[i-1].thumbnail} className="rounded-box object-contain" />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className='flex text-2xl'>{products[i-1].title}</h2>
                                        <p className='flex text-lg flex-wrap'>₹ {products[i-1].price}</p> {/* ₨ */}
                                        <div className="card-actions justify-end">
                                            <Link to={products[i-1].link}><button className="btn btn-info">Buy Now</button></Link>
                                            <button className='btn btn-outline'>Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='flex justify-center'>
                <Link to="/"><button className='flex text-4xl p-5 bg-emerald-600 text-black/60 rounded-3xl'>Continue Shopping</button></Link>
            </div>
        </div>
    );
}
export default Full;