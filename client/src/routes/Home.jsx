import React from 'react';
import Navbar from "../components/Navbar";
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import Prod from '../components/Prod';
import Footer from "../components/Footer";
function Home(){
    return (
        <>
            <Navbar />
            <Carousel />
            <Categories />
            <Prod/>
            <Footer />
        </>
    );
}
export default Home;