import React, { useEffect } from 'react';
import Navbar from '../Components/Shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Shared/Footer';
import AOS from 'aos'
import 'aos/dist/aos.css';


const MainLayout = () => {
    // aos initialization
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: false
        })
    }, [])
    // aos refresh
    useEffect(() => {
        AOS.refresh()
    }, [])

    return (
        <div className='max-w-7xl mx-auto flex flex-col justify-between min-h-screen'>
            <Navbar></Navbar>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;