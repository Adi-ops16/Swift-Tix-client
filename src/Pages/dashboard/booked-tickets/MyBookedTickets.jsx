import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Countdown from '../../../Components/Shared/CountDown';
import { FaCircleQuestion, FaStripeS, FaTrash } from "react-icons/fa6";
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
        const { ticketName, ticketURL, _id, bookings } = booking
        const { bookedQuantity, bookingId, basePrice, bookedBy } = bookings
        const paymentData = {
            basePrice,
            ticketName,
            ticketURL,
            bookedBy,
            bookedQuantity: Number(bookedQuantity),
            ticketId: _id,
            bookingId
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentData)
        window.location.assign(res.data.url)
    }

    return (
        <div className="py-10 px-4 md:px-8">
            <h2 className="text-3xl font-bold text-[#2e2e2e] mb-8 text-center">
                My Booked Tickets
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {bookings?.map((booking) => {
                    const { _id, ticketName, ticketURL, from, to, departure, transport_type, bookings
                    } = booking;

                    const dateTime = new Date(departure);
                    const date = dateTime.toLocaleDateString();
                    const time = dateTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    });

                    const hasExpired = new Date(departure) < new Date()
                    const { paymentStatus, bookedQuantity, bookingId, booking_status, totalPrice, } = bookings

                    return (
                        <div
                            key={bookingId}
                            className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl overflow-hidden flex flex-col transform hover:scale-[1.02] transition-all duration-300">
                            <img
                                src={ticketURL}
                                alt={ticketName}
                                className="w-full h-56 object-cover"
                            />

                            <div className="p-5 space-y-2 flex-1">

                                <h3 className="text-xl font-bold text-[#2e2e2e]">
                                    {ticketName}
                                </h3>

                                <div className="flex items-center justify-between text-gray-700 text-md">
                                    <p className="text-gray-700 text-md">
                                        <span className="font-semibold text-[#5b3f2d]">From:</span> {from}
                                        <span className="mx-2 font-bold text-[#5b3f2d]">→</span>
                                        <span className="font-semibold text-[#5b3f2d]">To:</span> {to}
                                    </p>

                                    <span className="font-semibold text-[#5b3f2d]">
                                        Type:
                                        {" "}
                                        {transport_type}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <p className="text-gray-700 text-lg">
                                        <span className="font-semibold">Ticket Quantity:</span> {bookedQuantity}
                                    </p>
                                    <p className="text-lg font-semibold text-[#5b3f2d]">
                                        Total: ${totalPrice}
                                    </p>
                                </div>

                                <div className="text-gray-700 flex justify-between items-center">
                                    <p>
                                        <span className="font-semibold">Departure Date:</span> {date}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Time:</span> {time}
                                    </p>
                                </div>

                                <div className="bg-[#f3eee9] border border-[#e0d8d0] rounded-xl p-3">
                                    <div className='flex justify-between'>
                                        <p className="font-semibold text-[#2e2e2e]">
                                            Status:
                                            <span className={`ml-2 px-2 py-1 rounded-md text-sm 
                                        ${booking_status === "rejected" && "bg-red-100 text-red-700"}
                                        ${booking_status === "pending" && "bg-yellow-100 text-yellow-700"}
                                        ${booking_status === "accepted" && "bg-green-100 text-green-700"}`}>
                                                {booking_status}
                                            </span>
                                        </p>
                                        {paymentStatus && !hasExpired && <p className="font-semibold text-[#2e2e2e]">
                                            Payment Status:
                                            <span className={`ml-2 px-2 py-1 rounded-md text-sm 
                                        ${paymentStatus === "pending" && "bg-yellow-100 text-yellow-700"}
                                        ${paymentStatus === "paid" && "bg-green-100 text-green-700"}`}>
                                                {hasExpired ? "none" : paymentStatus}
                                            </span>
                                        </p>}
                                    </div>

                                    {booking_status !== 'rejected' &&
                                        <div className="mt-2">
                                            <Countdown departure={departure} />
                                        </div>
                                    }

                                </div>
                            </div>

                            <Link
                                to={`/ticket/${_id}`}
                                className=' mx-5 mb-2'
                            >
                                <button className='btn w-full btn-outline border-[#5b3f2d] text-[#5b3f2d] hover:bg-[#5b3f2d] hover:text-white'>
                                    View Details <FaCircleQuestion />
                                </button>
                            </Link>
                            <div className="px-5 pb-5 flex gap-2">
                                {booking_status === "accepted" ? (
                                    <div className='flex w-full gap-2'>
                                        <button
                                            disabled={hasExpired || paymentStatus === 'paid'}
                                            onClick={() => handlePayment(booking)}
                                            className={`btn w-full  transition-all duration-300 mb-3 flex-1 ${hasExpired ? " bg-gray-100 text-gray-600" : "my-gradient hover-gradient"}`}
                                        >
                                            <span className='flex gap-2 items-center'>
                                                {paymentStatus === 'paid' ? "paid" : "Pay Now"}
                                                {hasExpired ? " (Expired)" : <FaStripeS />}
                                            </span>
                                        </button>
                                        <button
                                            className="border rounded-sm cursor-pointer border-red-500 text-red-500 hover:text-white hover:bg-red-500 flex justify-center w-full transition-all duration-300 mb-3 flex-1 "
                                        >
                                            <span className='flex gap-2 items-center'>
                                                Delete <FaTrash />
                                            </span>
                                        </button>
                                    </div>
                                ) : booking_status === 'rejected' ?
                                    <p className='text-gray-400'>
                                        Sorry, your booking request has been rejected
                                    </p> :
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