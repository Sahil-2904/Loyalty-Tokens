import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import products from "../products";
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../authActions';
function Full(){
    
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const [cart,setCart] = useState(user.cart);
    useEffect(() => {
        setCart(user.cart); // Update the local cart state
    }, [user.cart]);

    let p  = 0;
    for(let i=0;i<user.cart.length;i++){
        console.log(user.cart[i]);
        let id = user.cart[i].id;
        let q = user.cart[i].quantity;
        // console.log(id,q);
        p += (q * products[id-1].price);
    }
    const removeCart = (e,item) => {
        console.log(item);
        const updatedCart = user.cart.filter((i) => i != item);
        console.log(updatedCart);
        setCart(updatedCart);
        // user.cart = cart;
        dispatch(loginSuccess({...user,cart:updatedCart}));
    }
    // useEffect(() => {

    // },[user]);

    return (
        <div className='flex flex-col gap-2 p-12'>
            <div className='flex gap-2 p-5'>
                <div className='flex justify-left w-1/2'>
                    <h2 className='flex text-5xl p-3'>My Cart  {(user.cart.length === 0 ? null : `(${user.cart.length})`)}</h2>
                </div>
                <div className='flex flex-col justify-end w-1/2'>
                    <h2 className='flex text-3xl p-3 justify-end'>Total price: {p}</h2>
                </div>
                
            </div>
            <div className="overflow-x-auto p-5">
                <table className="table">
                {/* head */}
                <thead>
                <tr className=''>
                    <th className='flex text-xl justify-left'>Product</th>
                    <th className='text-xl'>Title</th>
                    <th className='text-xl'>Price</th>
                    <th className='text-xl'>Quantity</th>
                </tr>
                </thead>
                <tbody>
                {/* row 1 */}
                {
                    user.cart.map((item,index) => {
                        // console.log(i);
                        let i = item.id,quantity = item.quantity;
                        return (
                            <tr key={index}>
                                <td className='flex justify-center'>
                                    <div className="flex items-center space-x-3">
                                        {/* <div className="avatar"> */}
                                            <div className="flex w-48 h-48 justify-center">
                                                <img className='flex object-contain' src={products[i-1].thumbnail} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        {/* </div> */}
                                    {/* <div>
                                        <div className="font-bold">Hart Hagerty</div>
                                        <div className="text-sm opacity-50">United States</div>
                                    </div> */}
                                    </div>
                                </td>
                                <td className=''>
                                    <p className='flex text-3xl'>{products[i-1].title}</p>
                                    <br/>
                                    {/* {products[i-1].desc} */}
                                    <div className='flex gap-5'>
                                        <button className='flex flex-col justify-center p-3'>-</button>
                                        <span className="flex text-xl p-3">{quantity}</span>
                                        <button className='flex flex-col justify-center p-3'>+</button>
                                    </div>
                                    
                                </td>
                                <td>
                                    <p>Rs {products[i-1].price}</p>
                                </td>
                                <th>
                                <button onClick={(e) => removeCart(e,item)} className="btn btn-ghost btn-xs"><i class="fa-solid fa-x"></i></button>
                                </th>
                            </tr>
                        )
                    })
                }
                </tbody>
                {/* foot */}
                {/* <tfoot>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                    <th></th>
                </tr>
                </tfoot> */}
                
                </table>
            </div>
            {/* <div className='grid grid-cols-4'> */}
                {
                    // user.cart.map((i,index) => {
                    //     return (
                    //         <div key={index} className="flex p-4"> {/*carousel-item */}
                    //             <div className="card w-96 bg-base-100 shadow-xl">
                    //                 <figure className='flex w-72 h-72 mx-auto'>
                    //                     <img src={products[i-1].thumbnail} className="rounded-box object-contain" />
                    //                 </figure>
                    //                 <div className="card-body">
                    //                     <h2 className='flex text-2xl'>{products[i-1].title}</h2>
                    //                     <p className='flex text-lg flex-wrap'>₹ {products[i-1].price}</p> {/* ₨ */}
                    //                     <div className="card-actions justify-end">
                    //                         <Link to={products[i-1].link}><button className="btn btn-info">Buy Now</button></Link>
                    //                         <button className='btn btn-outline'>Add To Cart</button>
                    //                     </div>
                    //                 </div>
                    //             </div>
                    //         </div>
                    //     )
                    // })
                }
            {/* </div> */}
            <div className='flex justify-center p-5'>
                <Link to="/"><button className='flex text-4xl p-5 bg-sky-600 text-black/90 rounded-3xl'>Connect Wallet</button></Link>
            </div>
        </div>
    );
}
export default Full;