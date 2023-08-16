import React,{useState} from 'react';
import Navbar from "../components/Navbar";
import ANavbar from '../components/ANavbar';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import Prod from '../components/Prod';
import Footer from "../components/Footer";
function Home(){
    const [authenticated,setAuthenticate] = useState(true);
    return (
        <>
            {authenticated ? <ANavbar/> : <Navbar/>}
            <Carousel />
            <Categories />
            <Prod/>
            <Footer />
        </>
    );
}
export default Home;