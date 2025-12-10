import React from 'react';
import { Link, useNavigate } from 'react-router';
import Lottie from 'lottie-react';
import errorAnimation from '../../animations/Error 404.json';

const Error = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-oklch-95 text-oklch-20 px-4">

            {/* Animation */}
            <div className="w-80 md:w-96">
                <Lottie animationData={errorAnimation} loop={true} />
            </div>

            {/* Text */}
            <h1 className="text-3xl md:text-4xl font-extrabold mt-4">
                Oops! Page Not Found
            </h1>

            <p className="text-md md:text-lg text-oklch-40 mt-2 text-center max-w-md">
                The page you are looking for doesn’t exist or may have been moved.
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
                <button
                    onClick={() => navigate(-1)}
                    className="swift-btn-cancel px-5 py-2 rounded-xl font-medium shadow 
                    hover:bg-oklch-80 transition-all"
                >
                    Go Back
                </button>

                <Link
                    to="/"
                    className="swift-btn my-gradient hover-gradient px-5 py-2 rounded-xl 
                    text-white font-semibold shadow"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default Error;
