import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import SwiftAlert from '../../../utils/alerts/SwiftAlert';

const RequestedBookings = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: data = [], refetch } = useQuery({
        queryKey: ['bookedTickets', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets?email=${user?.email}`);
            return res.data;
        }
    });

    const tickets = data.filter(t => t.bookings.length > 0)


    const handleBookingStatus = async (ticketId, bookingId, status) => {

        const updatedBooking = {
            bookingId,
            status,
            paymentStatus: 'pending'
        }
        axiosSecure.patch(`/bookings/status/${ticketId}`, updatedBooking)
            .then(res => {
                if (res.data.modifiedCount) {
                    SwiftAlert({
                        title: `Booking ${status}`,
                        text: " "
                    })
                    refetch()
                }
            })
    };


    return (
        <div className="py-10 px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#2e2e2e] mb-10">
                Requested Bookings
            </h2>

            {tickets.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">
                    No booking requests found.
                </p>
            ) : (
                <div className="overflow-x-auto bg-white shadow-xl rounded-xl border border-gray-200">
                    <table className="table table-zebra">
                        <thead className="bg-gray-100 text-gray-700 text-sm">
                            <tr>
                                <th>#</th>
                                <th>User Email</th>
                                <th>Ticket Title</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tickets.map(ticket => {
                                const bookings = ticket.bookings
                                return (
                                    bookings.map(booking => {
                                        const { totalPrice, bookingId, bookedBy, bookedQuantity, booking_status } = booking
                                        return (
                                            <tr key={bookingId} className="hover">
                                                <th>{1}</th>

                                                <td className="font-medium">{bookedBy}</td>

                                                <td className="font-semibold text-[#2e2e2e]">
                                                    {ticket.ticketName}
                                                </td>

                                                <td>{bookedQuantity}</td>

                                                <td className="font-semibold text-gray-800">
                                                    $ {totalPrice}
                                                </td>

                                                <td>
                                                    <div>
                                                        {
                                                            booking_status === 'pending' ?
                                                                <div className="flex gap-3 justify-center">
                                                                    <button
                                                                        onClick={() => handleBookingStatus(ticket._id, bookingId, 'accepted')}
                                                                        className="btn btn-sm bg-green-600 hover:bg-green-700 text-white px-4"
                                                                    >
                                                                        Accept
                                                                    </button>

                                                                    <button
                                                                        onClick={() => handleBookingStatus(ticket._id, bookingId, 'rejected')}
                                                                        className="btn btn-sm bg-red-600 hover:bg-red-700 text-white px-4"
                                                                    >
                                                                        Reject
                                                                    </button>
                                                                </div>
                                                                :
                                                                <p
                                                                    className="flex justify-center"
                                                                >
                                                                    <span className={`badge ${booking_status === 'accepted' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                                                                        {booking_status}
                                                                    </span>
                                                                </p>
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RequestedBookings;
