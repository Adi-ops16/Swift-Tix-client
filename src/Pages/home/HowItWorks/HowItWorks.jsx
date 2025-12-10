import React from "react";
import { FaTicketAlt, FaSearch, FaMoneyCheckAlt, FaBusAlt } from "react-icons/fa";
import { MdOutlineAdsClick } from "react-icons/md";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

const steps = [
    {
        title: "Browse Available Tickets",
        desc: "Explore the latest tickets approved by the admin. You can filter, compare prices, and check transport types easily.",
        icon: <FaSearch size={34} />,
        animation: "fade-right"
    },
    {
        title: "View Detailed Information",
        desc: "Click on any ticket to see full details like price, perks, quantity, and transport information.",
        icon: <FaTicketAlt size={34} />,
        animation: "fade-up"
    },
    {
        title: "Secure Seamless Booking",
        desc: "Use our simple and secure booking system to purchase tickets without hassle.",
        icon: <FaMoneyCheckAlt size={34} />,
        animation: "fade-left"
    },
    {
        title: "Get Instant Confirmation",
        desc: "Once booked, you’ll receive immediate confirmation of your ticket purchase.",
        icon: <IoCheckmarkDoneCircleSharp size={34} />,
        animation: "fade-right"
    },
    {
        title: "Enjoy Your Journey",
        desc: "Show your ticket and enjoy your travel experience with peace of mind.",
        icon: <FaBusAlt size={34} />,
        animation: "fade-up"
    },
    {
        title: "Stay Updated With Ads",
        desc: "Admins advertise top tickets so users always see the best deals first.",
        icon: <MdOutlineAdsClick size={34} />,
        animation: "fade-left"
    }
];

const HowItWorks = () => {
    return (
        <section className="py-16 bg-[#faf9f7] rounded-lg">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#2e2e2e] mb-12">
                    🚀 How Swift-Tix Work
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

                    {steps.map((step, index) => (
                        <div
                            key={index}
                            data-aos={step.animation}
                            data-aos-duration="900"
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200 p-6 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="text-[#6f4e37] mb-4">
                                {step.icon}
                            </div>

                            <h3 className="text-xl font-bold text-[#2e2e2e] mb-2">
                                {step.title}
                            </h3>

                            <p className="text-gray-600 leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
