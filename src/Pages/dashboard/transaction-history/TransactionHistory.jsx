import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading/Loading';

const TransactionHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payment-history', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure(`/payment-history?email=${user.email}`);
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[40vh]">
                <Loading />
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">

            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    Transaction History
                </h2>
                <p className="text-sm text-gray-500">
                    All Stripe payments associated with your account
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th>#</th>
                            <th>Transaction ID</th>
                            <th>Ticket</th>
                            <th>Amount</th>
                            <th>Payment Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-500">
                                    No transactions found
                                </td>
                            </tr>
                        )}

                        {payments.map((payment, index) => {
                            const {
                                transaction_id,
                                totalPrice,
                                ticketName,
                                payment_date
                            } = payment;

                            return (
                                <tr key={payment._id} className="hover">
                                    <th>{index + 1}</th>

                                    <td className="font-mono text-sm text-gray-700 max-w-[220px] break-all">
                                        {transaction_id}
                                    </td>

                                    <td className="font-medium text-gray-800">
                                        {ticketName}
                                    </td>

                                    <td className="font-semibold text-green-600">
                                        ${(totalPrice / 100).toFixed(2)}
                                    </td>

                                    <td className="text-gray-600 text-sm">
                                        {new Date(payment_date * 1000).toLocaleString()}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionHistory;
