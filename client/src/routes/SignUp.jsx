import React,{useState} from 'react';
import visible from "../images/show.png";
import hidden from "../images/hide.png";
import Log from "../images/login.png";
import Google from "../images/google.png";
import { Link } from 'react-router-dom';
function SignUp(){
    const [show,setShow] = useState(false);
    return (
        <div className='flex justify-center p-20 min-h-screen'>
            <div className='flex flex-col justify-center w-1/2'>
                <div className="flex justify-center p-4">
                    <img className="animate-slideInLeft" src={Log} alt="login"/>
                </div>
            </div>
            <div className='flex flex-col justify-center rounded-box w-1/2'> 
                <h2 className='flex text-5xl uppercase justify-center'>Sign Up</h2>
                <div className='flex flex-col justify-center gap-5 p-10 pb-2'>
                    <div className='flex justify-center'>
                        <input type="email" placeholder="Email" className="input input-info w-full max-w-xs" />
                    </div>
                    <div className='flex justify-center gap-3'>
                        <input type={show ? "text" : "password"} placeholder="Password" className="input input-info w-full max-w-xs" />
                        <button onClick={() => {setShow(!show)}} className='absolute flex flex-col justify-center hover:bg-slate-100 p-2 rounded-full top-[340px] right-[250px]'><img className='flex w-5 h-5' src={show ? visible : hidden} alt="" /></button>
                    </div>
                    <a className="flex justify-center p-3" href=""> 
                        <div className="flex gap-x-5 bg-sky-400 rounded-2xl p-3 shadow hover:bg-sky-500  transition-all duration-300 ease-out">
                            <h1 className="text-2xl flex justify-center w-28">Sign Up</h1>
                        </div>
                    </a>
                </div>
                <hr className='flex w-1/2 mx-auto' />
                <div className="flex justify-center p-5" > 
                    <a href="/auth/google" className="flex gap-x-5 bg-slate-100 rounded-2xl p-3  shadow hover:bg-slate-200  transition-all duration-300 ease-out">
                        <img className="w-10 h-10" src={Google} alt="google"/>
                        <h1 className="text-xl flex flex-col justify-center">Sign Up with Google</h1>
                    </a>
                </div>
                <div className='flex justify-center' href="/login">
                    <Link to="/login"><p className='flex text-xl'>Existing User? Log In</p></Link>
                </div>
            </div>
            
        </div>
    );
}
export default SignUp;