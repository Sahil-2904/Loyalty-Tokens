import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { loginSuccess, logout, wallet } from '../authActions';
// import products from '../products';
import 'react-toastify/dist/ReactToastify.css';

function Prod() {
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
  const pro = products.filter((pro) => pro.tags.toLowerCase() === 'top');
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleClick = (e, id) => {
    const item = {
      id,
      quantity: 1,
    };
    user.cart.push(item);
    dispatch(loginSuccess(user));
    console.log(id);
    toast.success('Product Added to Cart');
  };
  return (
    <div className="flex flex-col p-10 gap-10 bg-[#161922] font-bold shadow-2xl">
      <div className="flex p-5 justify-center">
        <h2 className="flex text-5xl text-white">Top Picks</h2>
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
                    pro.map((product, index) => {
                      const link = `products/${product.id}`;
                      return (
                        <div key={index} className="carousel-item w-1/4 flex justify-center">
                          <div className="card w-96 bg-base-100 shadow-xl">
                            <figure className="flex w-72 h-72 mx-auto">
                              <img src={product.thumbnail} className="rounded-box object-contain" />
                            </figure>
                            <div className="card-body">
                              <h2 className="flex text-2xl">{product.title}</h2>
                              <p className="flex text-lg flex-wrap">
                                ₹
                                {product.price}
                              </p>
                              {' '}
                              {/* ₨ */}
                              <div className="card-actions justify-end">
                                <Link to={link}><button className="btn btn-info">Buy Now</button></Link>
                                {isAuthenticated ? <button onClick={(e) => handleClick(e, product.id)} className="btn btn-outline">Add To Cart</button> : <Link to="/login"><button className="btn btn-outline">Add To Cart</button></Link>}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                }
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
      />
    </div>
  );
}
export default Prod;
