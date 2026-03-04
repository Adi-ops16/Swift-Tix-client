import React from 'react';
import Logo from './Logo';
import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-[#faf9f7] border-t border-[#e0d8d0]">
            <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

                <div className="space-y-4">
                    <Logo />
                    <p className="text-gray-600 leading-relaxed">
                        A modern ticket booking platform for safe, fast and
                        reliable travel reservations.
                    </p>

                    <div className="text-gray-600 space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                            <FaEnvelope className="text-[#5b3f2d]" />
                            support@swifttix.com
                        </p>
                        <p className="flex items-center gap-2">
                            <FaPhoneAlt className="text-[#5b3f2d]" />
                            +880 1918-389189
                        </p>
                    </div>
                </div>

                <div>
                    <h6 className="text-lg font-semibold text-[#2e2e2e] mb-4">
                        Quick Links
                    </h6>
                    <ul className="space-y-2 text-gray-600">
                        <li className="hover:text-[#5b3f2d] transition"><a href="/">Home</a></li>
                        <li className="hover:text-[#5b3f2d] transition"><a href="/all-tickets">All Tickets</a></li>
                        <li className="hover:text-[#5b3f2d] transition"><a href="/dashboard/bookings">My Bookings</a></li>
                        <li className="hover:text-[#5b3f2d] transition"><a href="/dashboard/profile">Dashboard</a></li>
                    </ul>
                </div>

                <div>
                    <h6 className="text-lg font-semibold text-[#2e2e2e] mb-4">
                        Social Links
                    </h6>
                    <ul className="space-y-2 flex gap-4 text-gray-600">
                        <li className="hover:text-[#5b3f2d] transition">
                            <a href="https://www.facebook.com/spiegel.spike.854114"><FaFacebook size={25}/></a>
                        </li>
                        <li className="hover:text-[#5b3f2d] transition">
                            <a href="https://www.instagram.com/_astro.philee_/"><FaInstagram size={25} /></a>
                        </li>
                        <li className="hover:text-[#5b3f2d] transition">
                            <a href="https://x.com/AbdulHasib95581"><FaXTwitter size={25}/></a>
                        </li>
                        <li className="hover:text-[#5b3f2d] transition">
                            <a href="#"><FaLinkedin size={25}/></a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h6 className="text-lg font-semibold text-[#2e2e2e] mb-4">
                        Payment Method
                    </h6>
                    <ul className="space-y-2 text-gray-600">
                        <li className="hover:text-[#5b3f2d] transition">Stripe</li>
                    </ul>
                </div>

            </div>

            <div className="border-t border-[#e0d8d0] py-5 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} Swift-Tix. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
