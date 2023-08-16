import React from 'react';
import categories from '../categories';
function Categories(){
    return (
        <div className='flex flex-col p-10 gap-10'>
            <div className='flex p-5 justify-center'>
                <h2 className='flex text-5xl'>Browse by Category</h2>
            </div>
            <div className='flex gap-10 justify-center'>
                {
                    categories.map((cat,index) => {
                        return(
                            <a href={cat.link} key={index} className='flex flex-col rounded-xl bg-transparent text-center p-5 translate-y-3 hover:translate-y-0 transition-all duration-300'>
                                <div className='flex'>
                                    <img className='flex w-60 h-60 rounded-2xl' src={cat.img} alt="" />
                                </div>
                                <div className='flex justify-center p-3'>
                                    <h2 className='flex text-3xl justify-center'>{cat.name}</h2>
                                </div>
                            </a>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Categories;