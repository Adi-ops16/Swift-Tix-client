import React from 'react';
import Navbar from '../Components/Shared/Navbar';
import Footer from '../Components/Shared/Footer';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='flex flex-col justify-between min-h-screen'>
            <div className='sticky top-0 mt-2 z-50'>
                <Navbar></Navbar>
            </div>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AuthLayout;