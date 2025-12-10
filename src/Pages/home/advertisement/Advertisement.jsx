import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../../Hooks/useAxios";
import { Link } from "react-router";
import { FaBusAlt, FaShip, FaTrain, FaPlane, FaQuestionCircle } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import SmallLoader from "../../../Components/Loading/SmallLoader";
import { MdOutlineCampaign } from "react-icons/md";


const Advertisement = () => {
    const axios = useAxios();

    const { data: tickets = [], isLoading } = useQuery({
        queryKey: ["advertisement"],
        queryFn: async () => {
            const res = await axios.get("/advertisement");
            return res.data;
        },
    });

    if (isLoading)
        return (
            <div className="flex flex-col items-center my-2 gap-2">
                <p className="text-center text-lg font-semibold">
                    Loading advertisements...
                </p>
                <SmallLoader></SmallLoader>
            </div>
        );

    if (!tickets.length) return <></>;
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

    return (
        <section className="py-16 bg-white">
            <div data-aos="fade up" className="max-w-7xl mx-auto px-4 md:px-8">

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-[#2e2e2e] flex items-center justify-center gap-1">
                    <MdOutlineCampaign /> Advertised Tickets
                </h2>

                {/* Swiper */}
                <Swiper
                    pagination={{ clickable: true }}
                    modules={[Pagination, Autoplay, EffectCoverflow]}
                    spaceBetween={50}
                    slidesPerView={1}
                    centeredSlides={true}
                    loop={tickets.length > 1}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    speed={1000}
                    effect="coverflow"
                    coverflowEffect={{
                        rotate: 0,
                        stretch: -70,
                        depth: 200,
                        modifier: 2,
                        slideShadows: false,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 1.2 },
                        1024: { slidesPerView: 2.2 },
                    }}
                >
                    {tickets.map((ticket) => (
                        <SwiperSlide key={ticket._id}>
                            <div
                                className="relative group rounded-2xl overflow-hidden shadow-lg border border-gray-100 
                                transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 bg-white"
                            >
                                {/* Image */}
                                <img
                                    src={ticket.ticketURL}
                                    alt={ticket.ticketName}
                                    className="w-full h-42 object-cover transition-all duration-500 group-hover:scale-105"
                                />

                                {/* Content layer */}
                                <div className="p-6 space-y-3">
                                    <h3 className="text-2xl font-bold text-[#2e2e2e]">{ticket.ticketName}</h3>

                                    <div className="flex justify-between items-center">
                                        {/* Price */}
                                        <p className="text-lg font-semibold text-[#5b3f2d]">
                                            💰 TK {ticket.price}
                                            <span className="text-sm text-gray-500"> / per unit</span>
                                        </p>

                                        {/* Quantity */}
                                        <p className="text-gray-700">
                                            <span className="font-semibold">Quantity:</span>{" "}
                                            {ticket.quantity}
                                        </p>
                                    </div>

                                    {/* Transport */}
                                    <div className="flex items-center gap-2 text-gray-700 text-md">
                                        <span className="text-xl text-[#5b3f2d]">
                                            {getTransportIcon(ticket.transport_type)}
                                        </span>
                                        {ticket.transport_type}
                                    </div>

                                    {/* Perks */}
                                    <div>
                                        <p className="font-semibold mb-1">Perks:</p>
                                        <ul className="list-disc pl-5 text-gray-600 leading-snug flex gap-7">
                                            {ticket.perks?.slice(0, 3).map((perk, i) => (
                                                <li key={i}>{perk}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Button */}
                                    <Link to={`/ticket/${ticket._id}`}>
                                        <button
                                            className="mt-3 w-full bg-[#6f4e37] hover:bg-[#5b3f2d] 
                                            text-white py-2.5 rounded-xl font-semibold flex justify-center items-center gap-2 transition-all duration-300"
                                        >
                                            <FaQuestionCircle /> See Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Advertisement;
