import React from "react";
import SwiftAlert from "../../../utils/alerts/SwiftAlert";

const NewsLetter = () => {
    const handleSubscribe = (e) => {
        e.preventDefault()
        SwiftAlert({
            title: "Subscribe done",
            text: "Thank you for subscribing, you will get our updates from now on"
        })
    }
    return (
        <section className="py-16 bg-[#f9faf9] overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                <div
                    className="bg-white rounded-3xl shadow-lg p-10 md:p-14 flex flex-col md:flex-row items-center gap-10"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                >
                    <div className="md:w-1/2 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Stay Updated with Swift-Tix
                        </h2>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Subscribe to receive updates about new routes, exclusive discounts,
                            promotions, and travel tips — delivered directly to your inbox.
                        </p>
                    </div>

                    <div className="md:w-1/2 w-full">
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full py-3 px-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />

                            <button
                                type="submit"
                                className="btn bg-primary border-none text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/80 transition shadow-md"
                            >
                                Subscribe
                            </button>
                        </form>

                        <p className="text-xs text-gray-500 mt-3 text-center sm:text-left">
                            We respect your privacy. No spam, only valuable updates.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsLetter;
