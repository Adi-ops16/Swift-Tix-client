import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get("session_id")
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/verify-payment?sessionId=${sessionId}`)
        }
    }, [sessionId, axiosSecure])

    return (
        <div>
            <h2 className="text-3xl">Payment success</h2>
        </div>
    );
};

export default PaymentSuccess;