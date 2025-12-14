import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../Hooks/useAxios';
import { Link } from 'react-router';
import { FaQuestionCircle, FaBus, FaTrain, FaPlane, FaShip } from "react-icons/fa";
import SmallLoader from '../../Components/Loading/SmallLoader';

const getTransportIcon = (type) => {
    switch (type?.toLowerCase()) {
        case "bus": return <FaBus />;
        case "train": return <FaTrain />;
        case "flight": return <FaPlane />;
        case "ship": return <FaShip />;
        default: return <FaBus />;
    }
};

const AllTickets = () => {
    const [page, setPage] = useState(1);
    const axios = useAxios();

    const { data: ticketData = {}, isLoading } = useQuery({
        queryKey: ['all-tickets', page],
        queryFn: async () => {
            const res = await axios.get(`/all-tickets?status=accepted&page=${page}`);
            return res.data;
        },
        keepPreviousData: true,
    });

    const { tickets = [], totalPages = 1  } = ticketData;

    if (isLoading) return <p className="text-center py-20">
        <SmallLoader/>
    </p>;

    return (
        <section className="pt-10 my-10 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#2e2e2e] mb-12">
                    All Available Tickets
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {tickets.map(ticket => {
                        const { _id, ticketName, ticketURL, from, to, transport_type, price, quantity, perks, departure } = ticket || {};
                        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
                        const newDate = new Date(departure);
                        const time = newDate.toLocaleTimeString(undefined, options);
                        const date = newDate.toLocaleDateString();

                        return (
                            <div key={_id} className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl overflow-hidden flex flex-col transform hover:scale-101 transition-all duration-400">
                                <img src={ticketURL} alt={ticketName} className="w-full h-56 object-cover" />
                                <div className="p-5 space-y-3 flex-1">
                                    <h3 className="text-xl font-bold text-[#2e2e2e]">{ticketName}</h3>
                                    <p className="text-gray-700 text-md">
                                        <span className="font-semibold text-[#5b3f2d]">From:</span> {from}
                                        <span className="mx-2 font-bold text-[#5b3f2d]">→</span>
                                        <span className="font-semibold text-[#5b3f2d]">To:</span> {to}
                                    </p>
                                    <div className="flex items-center gap-2 text-gray-700 text-md">
                                        <span className="text-xl text-[#5b3f2d]">{getTransportIcon(transport_type)}</span>
                                        {transport_type}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <p className="text-lg font-semibold text-[#5b3f2d]">
                                            ${price}<span className="text-sm text-gray-500"> / per unit</span>
                                        </p>
                                        <p className="text-gray-700"><span className="font-semibold">Quantity:</span> {quantity}</p>
                                    </div>
                                    <div className='flex gap-4'>
                                        <p className="font-semibold mb-1">Perks:</p>
                                        <ul className="list-disc pl-5 text-gray-600 leading-snug space-y-1 flex gap-7">
                                            {perks?.slice(0, 3).map((perk, i) => (<li key={i}>{perk}</li>))}
                                        </ul>
                                    </div>
                                    <div className="text-gray-700">
                                        <p><span className="font-semibold">Departure Date:</span> {date}</p>
                                        <p><span className="font-semibold">Time:</span> {time}</p>
                                    </div>
                                </div>
                                <Link to={`/ticket/${_id}`} className="px-5 my-2">
                                    <button className="btn w-full my-gradient hover-gradient transition-all duration-300 flex justify-center items-center gap-2 cursor-pointer mb-3">
                                        See Details <FaQuestionCircle />
                                    </button>
                                </Link>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-center items-center my-5 gap-4">
                    <button
                        className="btn btn-outline"
                        disabled={page <= 1}
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    >
                        Prev
                    </button>

                    <span className="px-4 py-2 bg-white rounded-xl shadow-md">{page} / {totalPages}</span>

                    <button
                        className="btn btn-outline"
                        disabled={page >= totalPages}
                        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AllTickets;
