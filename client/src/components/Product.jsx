import React,{useState,useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
// import products from '../products';
import Navbar from './Navbar';
import Footer from './Footer';
import { loginSuccess, logout, wallet } from '../authActions';
import ANavbar from './ANavbar';
import Loader from "../components/Loader";

function Product() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { id } = useParams();
  console.log(id);
  const [products,setProducts] = useState([]);
  const [load,setLoad] = useState(true);
  // let pro = []; 
  useEffect(() => {
      const getProducts = async () => {
        const response = await fetch("http://localhost:3000/products");
        const p = await response.json();
        console.log(p);
        setProducts(p);
        // pro = p[id-1];
        // console.log(pro);
      }
      getProducts();
    },[]);

    setTimeout(() => {
      setLoad(false);
    },3000);
  
  //  pro = products[id - 1];

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

        {load ? <Loader/> : (
          <>
          <>{isAuthenticated ? <ANavbar /> : <Navbar /> }</>
          
    
          <div className="flex p-28 w-full justify-center">
            <div className="flex p-10 gap-10 justify-center">
              <div className="flex justify-center rounded-box w-1/2 h-96">
                <img className="flex object-contain" src={products[id-1].thumbnail} alt="" />
              </div>
              <div className="flex flex-col justify-center gap-5 w-1/2">
                <h2 className="flex text-4xl">{products[id-1].title}</h2>
                <p className="flex text-2xl">{products[id-1].desc}</p>
                <div className="flex gap-10">
                  <p className="flex text-xl">
                    ₹
                    {products[id-1].price}
                  </p>
                  <p className="flex text-xl">
                    Rating:
                    {products[id-1].rating}
                  </p>
                </div>
                <div className="flex gap-5 justify-start">
                  {isAuthenticated ? <Link to="/mycart"><button onClick={(e) => handleClick(e, products[id-1].id)} className="btn btn-info">Place Order</button></Link> : <Link to="/login"><button className="btn btn-info">Place Order</button></Link>}
                  {isAuthenticated ? <button onClick={(e) => handleClick(e, products[id-1].id)} className="btn btn-outline btn-warning">Add To Cart</button> : <Link to="/login"><button className="btn btn-outline btn-warning">Add To Cart</button></Link>}
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
        )}

    </>
    

  );
}
export default Product;
