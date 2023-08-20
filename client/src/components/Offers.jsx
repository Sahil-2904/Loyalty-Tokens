import React from 'react';
import offers from '../offer';
import Coin from '../images/Coin.svg';
import { Link } from 'react-router-dom';
function Offers(){
    return (
        <div className='flex flex-col p-10 gap-10 font-bold'>
            <div className="flex p-5 justify-center">
                <h2 className="flex text-5xl">Exciting Offers</h2>
            </div>
            <div className="carousel carousel-center max-w p-4 space-x-4 bg-transparent rounded-box">
            {
                        offers.map((offer, index) => {
                        return (
                            <div key={index} className="carousel-item w-1/4 flex justify-center">
                                <div className="card w-96 bg-base-100 shadow-xl">
                                    <figure className="flex w-72 h-72 mx-auto">
                                        <img src={offer.img} className="rounded-box object-fill" />
                                    </figure>
                                    <div className="card-body">
                                    <h2 className="flex text-2xl">{offer.name}</h2>
                                    <p className="flex text-lg flex-wrap items-center gap-2">
                                        <img className='flex w-5 h-5 flex-col justify-center' src={Coin} alt="" />
                                        <p className='flex'>{offer.tokenValue}</p>
                                    </p>
                                    <div className="card-actions justify-end">
                                        <Link><button className="btn btn-info">Claim Now</button></Link>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        );
                        })
                    }
            </div>
        </div>
    );
}
export default Offers;