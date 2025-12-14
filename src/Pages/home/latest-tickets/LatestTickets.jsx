import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../../Hooks/useAxios";
import { Link } from "react-router";
import { FaBusAlt, FaShip, FaTrain, FaPlane, FaQuestion, FaQuestionCircle } from "react-icons/fa";

const LatestTickets = () => {
    const axios = useAxios();

    const { data: latestTickets = [], isLoading } = useQuery({
        queryKey: ["latest"],
        queryFn: async () => {
            const res = await axios.get("/latest");
            return res.data;
        },
    });

    const getTransportIcon = (type) => {
        switch (type?.toLowerCase()) {
            case "bus":
                return <FaBusAlt />;
            case "train":
                return <FaTrain />;
            case "ship":
                return <FaShip />;
            case "plane":
                return <FaPlane />;
            default:
                return <FaBusAlt />;
        }
    };

    if (isLoading) return <p className="text-center py-10">Loading latest tickets...</p>;

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* Section Title */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-[#2e2e2e]">
                    ✨ Latest Tickets
                </h2>

                {/* Grid Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {latestTickets.map((ticket, index) => (
                        <div
                            key={ticket._id}
                            data-aos={index < 3 ? "fade-right" : "fade-left"}
                            data-aos-duration="900"
                            className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden flex flex-col"
                        >
                            <img
                                src={ticket.ticketURL}
                                alt={ticket.ticketName}
                                className="w-full h-56 object-cover"
                            />

                            <div className="p-5 space-y-3 flex-1">

                                <h3 className="text-xl font-bold text-[#2e2e2e]">
                                    {ticket.ticketName}
                                </h3>

                                <div className="flex items-center gap-2 text-gray-700 text-md">
                                    <span className="text-xl text-[#5b3f2d]">
                                        {getTransportIcon(ticket.transport_type)}
                                    </span>
                                    {ticket.transport_type}
                                </div>

                                <div className="flex justify-between items-center">

                                    <p className="text-lg font-semibold text-[#5b3f2d]">
                                        💰 TK {ticket.price}
                                        <span className="text-sm text-gray-500"> / per unit</span>
                                    </p>

                                    <p className="text-gray-700">
                                        <span className="font-semibold">Quantity:</span>{" "}
                                        {ticket.quantity}
                                    </p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-lg font-semibold text-[#5b3f2d] flex items-center gap-4">
                                        Perks:
                                        {ticket.perks.map(p => <span className="text-sm font-normal text-black">{p}</span>)}
                                    </p>
                                </div>

                            </div>
                            {/* Button */}
                            <Link to={`/ticket/${ticket._id}`}
                                className="px-2"
                            >
                                <button
                                    className="btn my-gradient hover-gradient transition-all duration-300 flex justify-center items-center gap-2 cursor-pointer mb-3 w-full"
                                >
                                    See Details
                                    <FaQuestionCircle />
                                </button>
                            </Link>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default LatestTickets;
