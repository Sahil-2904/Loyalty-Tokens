import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import products from '../products';
import Navbar from './Navbar';
import Footer from './Footer';
import { loginSuccess, logout, wallet } from '../authActions';
import ANavbar from './ANavbar';

function Product() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { id } = useParams();
  console.log(id);
  const pro = products[id - 1];
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
    <>
      {isAuthenticated ? <ANavbar /> : <Navbar /> }

      <div className="flex p-28 w-full justify-center">
        <div className="flex p-10 gap-10 justify-center">
          <div className="flex justify-center rounded-box w-1/2 h-96">
            <img className="flex object-contain" src={pro.thumbnail} alt="" />
          </div>
          <div className="flex flex-col justify-center gap-5 w-1/2">
            <h2 className="flex text-4xl">{pro.title}</h2>
            <p className="flex text-2xl">{pro.desc}</p>
            <div className="flex gap-10">
              <p className="flex text-xl">
                ₹
                {pro.price}
              </p>
              <p className="flex text-xl">
                Rating:
                {pro.rating}
              </p>
            </div>
            <div className="flex gap-5 justify-start">
              {isAuthenticated ? <Link to="/mycart"><button onClick={(e) => handleClick(e, pro.id)} className="btn btn-info">Place Order</button></Link> : <Link to="/login"><button className="btn btn-info">Place Order</button></Link>}
              {isAuthenticated ? <button onClick={(e) => handleClick(e, pro.id)} className="btn btn-outline btn-warning">Add To Cart</button> : <Link to="/login"><button className="btn btn-outline btn-warning">Add To Cart</button></Link>}
              {/* <button className='btn btn-outline btn-warning'>Add to Cart</button> */}
            </div>
          </div>
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

      <Footer />
    </>

  );
}
export default Product;
