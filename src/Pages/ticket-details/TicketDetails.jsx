import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaCalendarAlt } from 'react-icons/fa';
import { BiChevronLeft } from 'react-icons/bi';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import Countdown from '../../Components/Shared/CountDown.jsx';
import SwiftConfirm from '../../utils/alerts/SwiftConfirm.jsx';
import SwiftAlert from '../../utils/alerts/SwiftAlert.jsx';
import useAuth from '../../Hooks/useAuth.jsx';
import SmallLoader from '../../Components/Loading/SmallLoader.jsx';

const TicketDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [bookedQuantity, setBookedQuantity] = useState(1)

    const { data: ticket = {} } = useQuery({
        queryKey: ['ticket', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/ticket/${id}`)
            return res.data
        }
    })

    const { ticketName, ticketURL, departure, perks, transport_type, from, to, price, quantity, vendorEmail, vendorName, } = ticket || {}

    const dateTime = new Date(departure)
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }

    const time = dateTime.toLocaleTimeString(undefined, options)
    const date = dateTime.toLocaleDateString()
    const isExpired = new Date(departure) < new Date()

    const handleBooking = async () => {
        setLoading(true)
        const res = await SwiftConfirm({
            title: "Booking Confirming",
            text: `Do you want to purchase ${bookedQuantity} tickets of ${ticketName}`,
            icon: "info"
        })


        // quantity validation
        if (bookedQuantity < 1 || bookedQuantity > quantity) {
            SwiftAlert({
                title: "Invalid Quantity",
                text: `You must book between 1 and ${quantity} tickets.`,
                icon: "warning"
            });
            setLoading(false);
            return;
        }

        if (res.isConfirmed) {
            const bookingData = {
                basePrice: price,
                totalPrice: price * bookedQuantity,
                bookingDate: new Date(),
                booking_status: 'pending',
                bookedBy: user.email,
                bookedQuantity,
            }

            axiosSecure.patch(`/bookings/${id}`, bookingData)
                .then(res => {
                    if (res.data.modifiedCount) {
                        SwiftAlert({
                            title: "Booking Done",
                            text: "please wait for the vendor to accept your booking request"
                        })
                        navigate('/dashboard/bookings')
                    }
                })
        }
        setLoading(false)
    }

    return (
        <section className="py-5 md:py-16 bg-[#faf9f7] min-h-screen">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <h2
                    className="text-3xl md:text-4xl font-extrabold text-center text-[#2e2e2e] mb-5 md:mb-10"
                    data-aos="fade-up">
                    Ticket Details
                </h2>

                <div
                    className=" bg-white border border-gray-200 shadow-xl rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 md:p-10"
                    data-aos="fade-up"
                    data-aos-duration="900"
                >
                    <div className="w-full flex justify-center">
                        <img
                            src={ticketURL}
                            alt={ticketName}
                            className="w-full h-64 sm:h-72 md:h-96 lg:h-full object-cover rounded-2xl shadow-lg " />
                    </div>

                    <div className="flex flex-col gap-6">
                        <h3 className="text-3xl md:text-4xl font-bold text-[#2e2e2e]">
                            {ticketName}
                        </h3>

                        <p className="text-gray-700 text-lg">
                            <span className="font-semibold text-[#5b3f2d]">From:</span> {from}
                            <span className="mx-2 font-bold text-[#5b3f2d]">→</span>
                            <span className="font-semibold text-[#5b3f2d]">To:</span> {to}
                        </p>

                        <div className="text-gray-700 text-lg flex items-center gap-3">
                            <span className="text-[#5b3f2d] text-2xl">
                                {transport_type}
                            </span>
                        </div>

                        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
                            <p className="text-2xl font-bold text-[#5b3f2d]">
                                ${price}
                                <span className="text-sm text-gray-500"> / per unit</span>
                            </p>

                            <p className="text-gray-700 text-lg">
                                <span className="font-semibold">Available Quantity:</span> {quantity}
                            </p>
                        </div>

                        <div className="text-gray-700 text-lg">
                            <p>
                                <span className="font-semibold">Vendor Name:</span> {vendorName}
                            </p>
                            <p>
                                <span className="font-semibold">Vendor Email:</span> {vendorEmail}
                            </p>
                        </div>

                        <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center'>
                            <p className="font-semibold text-lg">Perks:</p>
                            <ol className="text-gray-600 leading-relaxed space-y-1 flex flex-col sm:flex-row sm:gap-3">
                                {perks?.map((perk, i) => (
                                    <li key={i}>{i + 1}. {perk}</li>
                                ))}
                            </ol>
                        </div>

                        <div className="text-gray-700 text-lg">
                            <p>
                                <span className="font-semibold">Departure Date: </span>
                                {date}
                            </p>
                            <p>
                                <span className="font-semibold">Time: </span>
                                {time}
                            </p>
                        </div>

                        <div className='flex flex-row justify-between items-center'>
                            <button
                                onClick={() => setIsOpen(true)}
                                disabled={quantity <= 0 || isExpired}
                                className='btn my-gradient hover-gradient'>
                                Book Now <FaCalendarAlt />
                            </button>

                            <button
                                onClick={() => navigate(-1)}
                                className='btn btn-secondary text-white flex items-center'
                            >
                                <BiChevronLeft size={20} /> Go back
                            </button>
                        </div>

                        <div className="bg-[#f3eee9] border border-[#e0d8d0] rounded-xl p-5 mt-4">
                            <h4 className="text-xl font-bold text-[#2e2e2e] mb-3">
                                Time left until departure
                            </h4>

                            <Countdown departure={departure}></Countdown>
                        </div>
                    </div>
                </div>
            </div>

            {/* booking modal */}

            {isOpen &&
                <AnimatePresence>
                    <Dialog
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        className="relative z-50"
                    >

                        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

                        <div className="fixed inset-0 flex items-center justify-center p-4">
                            <DialogPanel
                                as={motion.div}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                                className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-lg space-y-5">
                                <DialogTitle className="text-2xl font-bold text-[#2e2e2e]">
                                    Book Your Ticket
                                </DialogTitle>

                                <p className="text-gray-700">
                                    Enter the quantity you want to book. Max allowed: {quantity}
                                </p>

                                <input
                                    type="number"
                                    min="1"
                                    defaultValue={bookedQuantity}
                                    onChange={(e) => setBookedQuantity(Number(e.target.value))}
                                    max={quantity}
                                    className="input input-bordered w-full"
                                />

                                <div className="flex justify-end gap-3 pt-3">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="btn btn-secondary"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={handleBooking}
                                        className="btn my-gradient hover-gradient"
                                    >
                                        {loading ? <SmallLoader /> : "Confirm Booking"}
                                    </button>
                                </div>
                            </DialogPanel>
                        </div>
                    </Dialog>
                </AnimatePresence>
            }

        </section>

    );
};

export default TicketDetails;