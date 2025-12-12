import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Countdown from '../../../Components/Shared/CountDown';
import { FaCircleQuestion, FaStripeS } from "react-icons/fa6";
import { Link } from 'react-router';


const MyBookedTickets = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user.email}`)
            return res.data;
        }
    })

    const handlePayment = async (booking) => {
        const { totalPrice, ticketName, ticketURL, bookedBy, bookedQuantity, _id, ticketId } = booking
        const paymentData = {
            totalPrice, ticketName, ticketURL, bookedBy, bookedQuantity, ticketId,
            booking_id: _id
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentData)
        window.location.href = res.data.url
    }

    return (
        <div className="py-10 px-4 md:px-8">
            <h2 className="text-3xl font-bold text-[#2e2e2e] mb-8 text-center">
                My Booked Tickets
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {bookings?.map((booking) => {
                    const { _id, ticketName, ticketURL, from, to, departure, transport_type, totalPrice, bookedQuantity, booking_status,
                    } = booking;

                    const dateTime = new Date(departure);
                    const date = dateTime.toLocaleDateString();
                    const time = dateTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    });

                    return (
                        <div
                            key={_id}
                            className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl overflow-hidden flex flex-col transform hover:scale-[1.02] transition-all duration-300">
                            <img
                                src={ticketURL}
                                alt={ticketName}
                                className="w-full h-56 object-cover"
                            />

                            <div className="p-5 space-y-4 flex-1">

                                <h3 className="text-xl font-bold text-[#2e2e2e]">
                                    {ticketName}
                                </h3>

                                <p className="text-gray-700 text-md">
                                    <span className="font-semibold text-[#5b3f2d]">From:</span> {from}
                                    <span className="mx-2 font-bold text-[#5b3f2d]">→</span>
                                    <span className="font-semibold text-[#5b3f2d]">To:</span> {to}
                                </p>

                                <div className="flex items-center gap-2 text-gray-700 text-md">
                                    <span className="text-xl text-[#5b3f2d]">
                                        {transport_type}
                                    </span>
                                    {transport_type}
                                </div>

                                <div className="flex justify-between items-center">
                                    <p className="text-gray-700 text-lg">
                                        <span className="font-semibold">Ticket Quantity:</span> {bookedQuantity}
                                    </p>
                                    <p className="text-lg font-semibold text-[#5b3f2d]">
                                        Total: ${totalPrice}
                                    </p>
                                </div>

                                <div className="text-gray-700">
                                    <p>
                                        <span className="font-semibold">Departure Date:</span> {date}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Time:</span> {time}
                                    </p>
                                </div>

                                <div className="bg-[#f3eee9] border border-[#e0d8d0] rounded-xl p-3">
                                    <p className="font-semibold text-[#2e2e2e]">
                                        Status:
                                        <span className={`ml-2 px-2 py-1 rounded-md text-sm 
                                        ${booking_status === "pending" && "bg-yellow-100 text-yellow-700"}
                                        ${booking_status === "accepted" && "bg-green-100 text-green-700"}
                                        ${booking_status === "rejected" && "bg-red-100 text-red-700"}
                                        ${booking_status === "paid" && "bg-blue-100 text-blue-700"}
                                    `}
                                        >
                                            {booking_status}
                                        </span>
                                    </p>

                                    <div className="mt-2">
                                        <Countdown departure={departure} />
                                    </div>
                                </div>
                            </div>

                            <div className="px-5 pb-5 flex gap-2">
                                {booking_status === "accepted" ? (
                                    <button
                                        onClick={() => handlePayment(booking)}
                                        className="btn w-full my-gradient hover-gradient transition-all duration-300 mb-3 flex-1"
                                    >
                                        Pay Now
                                        <FaStripeS />
                                    </button>
                                ) :
                                    <p className='text-gray-400'>
                                        *Please wait for the vendor to accept your booking
                                    </p>
                                }
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

    );
};

export default MyBookedTickets;