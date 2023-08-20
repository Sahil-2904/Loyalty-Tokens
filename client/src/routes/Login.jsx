import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import bcrypt, { genSaltSync } from 'bcryptjs';
import visible from '../images/show.png';
import hidden from '../images/hide.png';
import Log from '../images/login.png';
import Google from '../images/google.png';
import { loginSuccess, logout, wallet } from '../authActions';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [show, setShow] = useState(false);
  const salt = genSaltSync(10);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const connected = useSelector((state) => state.auth.connected);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [link, setLink] = useState('/login');
  useEffect(() => {
    setLink('/');
  }, [isAuthenticated]);

  const handleLogin = async () => {
    const hashedpassword = bcrypt.hashSync(password, salt);
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(response);
      console.log(data.user);
      if (response.ok) {
        dispatch(loginSuccess(data.user)); // Dispatch the action to login success state
      } else {
        toast.warning(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center p-20 min-h-screen">
      <div className="flex flex-col justify-center w-1/2">
        <div className="flex justify-center p-4">
          <img className="animate-slideInLeft" src={Log} alt="login" />
        </div>
      </div>
      <div className="flex flex-col justify-center rounded-box w-1/2">
        <h2 className="flex text-5xl uppercase justify-center">Login</h2>
        <div className="flex flex-col justify-center gap-5 p-10 pb-2">
          <div className="flex justify-center">
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" className="input input-info w-full max-w-xs" />
          </div>
          <div className="flex justify-center gap-3">
            <input onChange={(e) => setPassword(e.target.value)} value={password} type={show ? 'text' : 'password'} placeholder="Password" className="input input-info w-full max-w-xs" />
            <button onClick={() => { setShow(!show); }} className="absolute flex flex-col justify-center hover:bg-slate-100 p-2 rounded-full top-[47vh] right-[18vw]"><img className="flex flex-col justify-center w-5 h-5" src={show ? visible : hidden} alt="" /></button>
          </div>
          <button onClick={handleLogin} className="flex justify-center p-3">
            <Link to={link}>
              <div className="flex gap-x-5 bg-sky-400 rounded-2xl p-3 shadow hover:bg-sky-500  transition-all duration-300 ease-out">
                <h1 className="text-2xl flex justify-center w-28">Log In</h1>
              </div>
            </Link>
          </button>
        </div>
        <hr className="flex w-1/2 mx-auto" />
        <div className="flex justify-center p-5">
          <a href="/auth/google" className="flex gap-x-3 bg-slate-100 rounded-2xl p-5 shadow hover:bg-slate-200  transition-all duration-300 ease-out">
            <img className="w-10 h-10" src={Google} alt="google" />
            <h1 className="text-xl flex flex-col justify-center">Log In with Google</h1>
          </a>
        </div>
        <div className="flex justify-center" href="/signup">
          <Link to="/signup"><p className="flex text-xl">New User? Create an account</p></Link>
        </div>
      </div>
      <ToastContainer
        position="top-right"
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
export default Login;
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setAuthenticated } from '../authActions';

// const Login = () => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const dispatch = useDispatch();

//   const handleLogin = () => {
//     dispatch(setAuthenticated(true)); // Dispatch the action to set authentication state
//   };

//   return (
//     <div>
//       {isAuthenticated ? (
//         <p>Welcome, you are authenticated!</p>
//       ) : (
//         <button onClick={handleLogin}>Login</button>
//       )}
//     </div>
//   );
// };

// export default Login;
