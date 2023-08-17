import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import products from "../products";
function Search(){
    const [text,setText] = useState("");
    const [pro,setPro] = useState([]);
    const handleChange = (e) => {
        console.log(e.target.value);
        const inputValue = e.target.value;
        setText(inputValue);
        if(inputValue.length === 0)
            setPro([]);
        else{
            const p = products.filter((product) => product.title.toLowerCase().includes(e.target.value.toLowerCase()));
            console.log(p);
            setPro(p);
        }
    }
    return (
        <>
            <div className="flex justify-between border border-sky-500 rounded-xl p-3 w-1/3 bg-white text-black">
                <input onChange={(e) => handleChange(e)} className="flex outline-none w-full" type="search" placeholder="Search for products,brands and more" value={text} name="" id="" />
                
                        {pro.length !== 0 && (<div className='absolute w-[33%] bg-black mt-10 ml-[-15px] overflow-auto  max-h-96 rounded-xl'>
                                                {
                                                    pro.map((product, index) => {
                                                        return(
                                                            <Link to={product.link} >
                                                                <div key={index} className='flex p-5 rounded-xl gap-5 bg-[#141619] text-white m-2 border border-sky-400'>
                                                                    <div className='flex w-20 h-20'>
                                                                        <img className='object-contain' src={product.thumbnail} alt="" />
                                                                    </div>
                                                                    <div className='flex flex-col'>
                                                                        <h5 className='flex text-2xl'>{product.title}</h5>
                                                                        <p className='flex text-lg'>{product.category}</p>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        )
                                                })
                                                } 
                                            </div>)
                        }
                
                <i style={{color:"black"}} className="flex flex-col justify-center fa-solid fa-magnifying-glass"></i>
            </div>
        </>
    );
}
export default Search;