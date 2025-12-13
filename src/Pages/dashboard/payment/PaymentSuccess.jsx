import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import successAnimation from '../../../animations/Success Check.json';
import Lottie from 'lottie-react';

const PaymentSuccess = () => {
    const [paymentInfo, setPaymentInfo] = useState({});
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (sessionId) {
            axiosSecure
                .patch(`/verify-payment?sessionId=${sessionId}`)
                .then(res => setPaymentInfo(res.data.paymentData));
        }
    }, [sessionId, axiosSecure]);

    const {
        ticketName,
        bookedQuantity,
        transaction_id,
        bookedBy,
        payment_date
    } = paymentInfo;

    return (
        <div className="min-h-[calc(100vh-100px)] flex items-center justify-center px-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center">

                <div className="w-40 mx-auto">
                    <Lottie animationData={successAnimation} loop={true} />
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mt-4">
                    Payment Successful
                </h2>

                <p className="text-gray-500 mt-1">
                    Your booking has been confirmed
                </p>

                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-700 font-medium">
                        Ticket
                    </p>
                    <p className="text-lg font-semibold text-green-800">
                        {ticketName}
                    </p>
                </div>

                <div className="mt-6 text-left space-y-3">
                    <Detail label="Booked By" value={bookedBy} />
                    <Detail label="Quantity" value={`${bookedQuantity} ticket(s)`} />
                    <Detail
                        label="Payment Date"
                        value={payment_date ? new Date(payment_date * 1000).toLocaleString() : ""}
                    />
                    <Detail
                        label="Transaction ID"
                        value={transaction_id}
                        mono
                    />
                </div>

                <div className="mt-8 flex gap-3 justify-center">
                    <Link
                        to="/dashboard/payment-history"
                        className="px-5 py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
                    >
                        View payment
                    </Link>

                    <Link
                        to="/"
                        className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

const Detail = ({ label, value }) => (
    <div className="flex justify-between gap-4">
        <span className="text-sm text-gray-500">{label}</span>
        <span className={`text-sm font-medium text-gray-800`}>
            {value || "—"}
        </span>
    </div>
);

export default PaymentSuccess;
