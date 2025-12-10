import React from 'react';
import Lottie from 'lottie-react';
import errorAnimation from '../../animations/Error 404.json';
import { BsChevronLeft } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';

const Forbidden = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[calc(100vh-150px)] flex flex-col justify-center items-center p-4">

            <h2 className="text-center text-3xl md:text-4xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                Access Denied
            </h2>

            <p className="text-center text-gray-600 text-sm md:text-base mb-6">
                You are not authorized to view this page.
                Please go back or return to the homepage.
            </p>

            {/* Animation */}
            <Lottie
                animationData={errorAnimation}
                loop={true}
                className="h-72 md:h-96"
            />

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-3 mt-6">

                <button
                    onClick={() => navigate(-1)}
                    className="swift-btn w-full md:w-auto px-6 py-3 rounded-xl flex items-center gap-2 
                    bg-linear-to-r from-primary to-secondary text-black font-semibold shadow-md hover:opacity-90 transition"
                >
                    <BsChevronLeft size={18} /> Go Back
                </button>

                <Link
                    to="/"
                    className="swift-btn w-full md:w-auto px-6 py-3 rounded-xl flex items-center justify-center gap-2 
                    bg-black text-white font-semibold shadow-md hover:bg-gray-800 transition"
                >
                    <FaHome size={18} /> Home
                </Link>

            </div>
        </div>
    );
};

export default Forbidden;
