import React from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaCalendarAlt } from 'react-icons/fa';
import { BiChevronLeft } from 'react-icons/bi';

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

    return (
        <section className="py-16 bg-[#faf9f7] min-h-screen">
            <div className="max-w-6xl mx-auto px-4 md:px-8">

                {/* Title */}
                <h2
                    className="text-3xl md:text-4xl font-extrabold text-center text-[#2e2e2e] mb-10"
                    data-aos="fade-up"
                >
                    Ticket Details
                </h2>

                <div
                    className="bg-white border border-gray-200 shadow-xl rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 md:p-10"
                    data-aos="fade-up"
                    data-aos-duration="900"
                >
                    {/* Left: Image */}
                    <div className="w-full">
                        <img
                            src={ticketURL}
                            alt={ticketName}
                            className="w-full h-80 md:h-full object-cover rounded-2xl shadow-lg"
                        />
                    </div>

                    {/* Right: Details */}
                    <div className="space-y-6">

                        {/* Ticket Name */}
                        <h3 className="text-3xl md:text-4xl font-bold text-[#2e2e2e]">
                            {ticketName}
                        </h3>

                        {/* From → To */}
                        <p className="text-gray-700 text-lg">
                            <span className="font-semibold text-[#5b3f2d]">From:</span> {from}
                            <span className="mx-2 font-bold text-[#5b3f2d]">→</span>
                            <span className="font-semibold text-[#5b3f2d]">To:</span> {to}
                        </p>

                        {/* Transport */}
                        <div className="text-gray-700 text-lg flex items-center gap-3">
                            <span className="text-[#5b3f2d] text-2xl">
                                {transport_type}
                            </span>
                        </div>

                        {/* Price */}
                        <div className='flex justify-between items-center'>
                            <p className="text-2xl font-bold text-[#5b3f2d]">
                                ${price}
                                <span className="text-sm text-gray-500"> / per unit</span>
                            </p>

                            {/* Quantity */}
                            <p className="text-gray-700 text-lg">
                                <span className="font-semibold">Available Quantity:</span> {quantity}
                            </p>
                        </div>

                        {/* Vendor Info */}
                        <div className="text-gray-700 text-lg">
                            <p>
                                <span className="font-semibold">Vendor Name:</span> {vendorName}
                            </p>
                            <p>
                                <span className="font-semibold">Vendor Email:</span> {vendorEmail}
                            </p>
                        </div>

                        {/* Perks */}
                        <div className='flex gap-4 items-center'>
                            <p className="font-semibold text-lg">Perks:</p>
                            <ol className="text-gray-600 leading-relaxed flex gap-3">
                                {perks?.map((perk, i) => (
                                    <li key={i}>{i + 1}. {perk}</li>
                                ))}
                            </ol>
                        </div>

                        {/* Departure */}

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

                        <div className='flex justify-between items-center'>
                            <button className='btn my-gradient hover-gradient'>Book Now <FaCalendarAlt /></button>
                            <button onClick={() => navigate(-1)} className='btn btn-secondary text-white flex items-center'><BiChevronLeft size={20} /> Go back </button>
                        </div>

                        {/* Countdown Area */}
                        <div className="bg-[#f3eee9] border border-[#e0d8d0] rounded-xl p-5 mt-6">
                            <h4 className="text-xl font-bold text-[#2e2e2e] mb-1">
                                Time left until departure
                            </h4>
                            <p className="text-gray-600">
                                {/* Countdown will be rendered here later */}
                                Coming soon...
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </section>

    );
};

export default TicketDetails;