import React from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaCalendarAlt } from 'react-icons/fa';
import { BiChevronLeft } from 'react-icons/bi';
import useRemainingTime from '../../utils/time-calculation/index.js';

const TicketDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()

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
    const countdown = useRemainingTime(departure)

    return (
        <section className="py-5 md:py-16 bg-[#faf9f7] min-h-screen">
            <div className="max-w-6xl mx-auto px-4 md:px-8">

                <h2
                    className="text-3xl md:text-4xl font-extrabold text-center text-[#2e2e2e] mb-5 md:mb-10"
                    data-aos="fade-up"
                >
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
                            <button className='btn my-gradient hover-gradient'>
                                Book Now <FaCalendarAlt />
                            </button>

                            <button
                                onClick={() => navigate(-1)}
                                className='btn btn-secondary text-white flex items-center'
                            >
                                <BiChevronLeft size={20} /> Go back
                            </button>
                        </div>

                        {/* Countdown Area */}
                        <div className="bg-[#f3eee9] border border-[#e0d8d0] rounded-xl p-5 mt-4">
                            <h4 className="text-xl font-bold text-[#2e2e2e] mb-3">
                                Time left until departure
                            </h4>

                            {countdown?.expired ? (
                                <p className="text-red-600 font-semibold text-lg">
                                    Departure time has passed.
                                </p>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                                    <div className="bg-white shadow rounded-xl py-3">
                                        <p className="text-3xl font-bold text-[#5b3f2d]">
                                            {countdown.days}
                                        </p>
                                        <p className="text-gray-600 text-sm">Days</p>
                                    </div>

                                    <div className="bg-white shadow rounded-xl py-3">
                                        <p className="text-3xl font-bold text-[#5b3f2d]">
                                            {countdown.hours}
                                        </p>
                                        <p className="text-gray-600 text-sm">Hours</p>
                                    </div>

                                    <div className="bg-white shadow rounded-xl py-3">
                                        <p className="text-3xl font-bold text-[#5b3f2d]">
                                            {countdown.minutes}
                                        </p>
                                        <p className="text-gray-600 text-sm">Minutes</p>
                                    </div>

                                    <div className="bg-white shadow rounded-xl py-3">
                                        <p className="text-3xl font-bold text-[#5b3f2d]">
                                            {countdown.seconds}
                                        </p>
                                        <p className="text-gray-600 text-sm">Seconds</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </section>

    );
};

export default TicketDetails;