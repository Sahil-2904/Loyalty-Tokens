import React from 'react';
import products from '../products';
import Navbar from './Navbar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../authActions.js';
import { Link,useParams } from 'react-router-dom';
import ANavbar from './ANavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Category(){
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    console.log(isAuthenticated);
    const {category} = useParams();
    // console.log(category);
    const pro = products.filter(pro => pro.category.toLowerCase() === category);
    // console.log(pro);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const handleClick = (e,id) => {
        user.cart.push(id);
        dispatch(loginSuccess(user));
        console.log(id);
        toast.success("Product Added to Cart");
    }
    return (
        <>
            {isAuthenticated ? <ANavbar/> : <Navbar />}
            
            <div className='flex flex-col p-14 gap-6'>
                <div className='flex justify-center'>
                    <h2 className='flex text-5xl text-white uppercase bg-[#141619] p-4 rounded-xl'>{category}</h2>
                </div>
                <div className="grid grid-cols-3 p-4 place-items-center gap-4"> {/* carousel carousel-center max-w p-4 space-x-4 bg-transparent rounded-box */}
                    {
                        pro.map((product,index) => {
                            const link = "products/" + product.id ;  
                            return(
                                <div key={index} className="flex p-4"> {/*carousel-item */}
                                    <div className="card w-96 bg-base-100 shadow-xl">
                                        <figure className='flex w-96 h-96 mx-auto'>
                                            <img src={product.thumbnail} className="rounded-box object-contain" />
                                        </figure>
                                        <div className="card-body">
                                            <h2 className='flex text-2xl'>{product.title}</h2>
                                            <p className='flex text-lg flex-wrap'>₹ {product.price}</p> {/* ₨ */}
                                            <div className="card-actions justify-end">
                                                <Link to={product.link}><button className="btn btn-info">Buy Now</button></Link>
                                                {isAuthenticated ? <button onClick={ e => handleClick(e,product.id)} className='btn btn-outline'>Add To Cart</button> : <Link to="/login"><button className='btn btn-outline'>Add To Cart</button></Link>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )    
                        })
                    }
                </div>
                <ToastContainer
                position="bottom-right"
                autoClose={1500}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme="dark"
            />
            </div>
            <Footer/>
        </>
        
    );
}
export default Category;