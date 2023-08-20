import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import visible from '../images/show.png';
import hidden from '../images/hide.png';
import Log from '../images/login.png';
import Google from '../images/google.png';
import { loginSuccess, logout, wallet } from '../authActions.js';
import 'react-toastify/dist/ReactToastify.css';
// import products from '../products';
// import {sha256} from 'crypto-hash';
function SignUp() {
  const salt = bcrypt.genSaltSync(10);

  const [show, setShow] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [users, setUsers] = useState([]);
  const [link, setLink] = useState('/signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const dispatch = useDispatch();
  // const [user,setUser] = useState([]);
  useEffect(() => {
    setLink('/');
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:3000/users');
        const users = await res.json();
        setUsers(users);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);
  // const postData = async (newUser) => {
  //     const response = await fetch("http://localhost:3000/signup",{
  //       method:"POST",
  //       headers:{
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(newUser)
  //     })
  //     const data = await response.json();
  //     console.log(data);
  // }
  const handleSignUp = async () => {
    const id = (users.length + 1).toString();
    const hashedpassword = bcrypt.hashSync(password, salt);
    // const hp = sha256(password);
    const newUser = {
      id,
      name,
      email,
      password,
      contact,
      cart: [],
      type: 'customer',
      order: [],

    };
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      // console.log(response.status);
      const data = await response.json();
      console.log(data);
      console.log(newUser);
      if (response.ok) {
        dispatch(loginSuccess(newUser));
      } else {
        console.log('User Already Exists');
        toast.info('User Already Exists');
      }
    } catch (error) {
      console.log('Error creating user: ', error);
    }
    // const existingUser = users.find(u => u.email === newUser.email);
  };
  return (
    <div className="flex justify-center p-20 min-h-screen">
      <div className="flex flex-col justify-center w-1/2">
        <div className="flex justify-center p-4">
          <img className="animate-slideInLeft" src={Log} alt="login" />
        </div>
      </div>
      <div className="flex flex-col justify-center rounded-box w-1/2">
        <h2 className="flex text-5xl uppercase justify-center">Sign Up</h2>
        <div className="flex flex-col justify-center gap-5 p-10 pb-2">
          <div className="flex justify-center">
            <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name" className="input input-info w-full max-w-xs" />
          </div>
          <div className="flex justify-center">
            <input onChange={(e) => setContact(e.target.value)} value={contact} type="text" placeholder="Contact Number" className="input input-info w-full max-w-xs" />
          </div>
          <div className="flex justify-center">
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" className="input input-info w-full max-w-xs" />
          </div>
          <div className="flex justify-center gap-3">
            <input onChange={(e) => setPassword(e.target.value)} value={password} type={show ? 'text' : 'password'} placeholder="Password" className="input input-info w-full max-w-xs" />
            <button onClick={() => { setShow(!show); }} className="absolute flex flex-col justify-center hover:bg-slate-100 p-2 rounded-full top-[57vh] right-[18vw]"><img className="flex w-5 h-5" src={show ? visible : hidden} alt="" /></button>
          </div>
          <button onClick={handleSignUp} className="flex justify-center p-3">
            <Link to={link}>
              <div className="flex gap-x-5 bg-sky-400 rounded-2xl p-3 shadow hover:bg-sky-500  transition-all duration-300 ease-out">
                <h1 className="text-2xl flex justify-center w-28">Sign Up</h1>
              </div>
            </Link>
          </button>
        </div>
        <hr className="flex w-1/2 mx-auto" />
        <div className="flex justify-center p-5">
          <a href="/auth/google" className="flex gap-x-5 bg-slate-100 rounded-2xl p-3  shadow hover:bg-slate-200  transition-all duration-300 ease-out">
            <img className="w-10 h-10" src={Google} alt="google" />
            <h1 className="text-xl flex flex-col justify-center">Sign Up with Google</h1>
          </a>
        </div>
        <div className="flex justify-center" href="/login">
          <Link to="/login"><p className="flex text-xl">Existing User? Log In</p></Link>
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
export default SignUp;
