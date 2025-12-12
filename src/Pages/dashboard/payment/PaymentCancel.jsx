import React from 'react';
import { Link } from 'react-router';
import cancelAnimation from '../../../animations/cross animation.json';
import Lottie from 'lottie-react';

const PaymentCancel = () => {
    return (
        <div className="flex flex-col items-center justify-center               min-h-[calc(100vh-100px)] px-4">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">

                <div className="w-48 mx-auto mb-6">
                    <Lottie animationData={cancelAnimation} loop={true} />
                </div>

                <h2 className="text-3xl font-semibold text-red-600 mb-2">
                    Payment Cancelled
                </h2>

                <p className="text-gray-600 mb-8">
                    Your payment was not completed. You can retry anytime.
                </p>

                <Link
                    to="/dashboard/bookings"
                    className="inline-block my-gradient hover-gradient text-white px-6 py-3 rounded-lg text-lg font-medium"
                >
                    Try Again
                </Link>
            </div>
        </div>
    );
};

export default PaymentCancel;
