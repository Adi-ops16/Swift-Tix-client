import React from "react";
import { Link } from "react-router";
import about from "../../../assets/about.jpg";

const About = ({ aboutRef }) => {
    return (
        <section ref={aboutRef} className="bg-[#f9faf9] py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">

                <div
                    className="lg:w-1/2 w-full flex justify-center"
                    data-aos="fade-right"
                    data-aos-duration="1000"
                >
                    <img
                        src={about}
                        alt="About Swift-Tix"
                        className="rounded-3xl shadow-xl w-full max-w-md object-cover"
                    />
                </div>

                <div
                    className="lg:w-1/2 w-full text-center lg:text-left"
                    data-aos="fade-left"
                    data-aos-duration="1000"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
                        About Swift-Tix
                    </h2>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Swift-Tix is your seamless gateway to stress-free travel.
                        We provide fast, secure, and transparent ticket booking so you can focus on the journey, not the hassle.
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-8">
                        From verified sellers to real-time availability and secure Stripe payments,
                        our platform ensures every traveler enjoys a smooth and reliable ticketing experience.
                        Whether you're planning a short trip or a long adventure — Swift-Tix keeps things easy.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
