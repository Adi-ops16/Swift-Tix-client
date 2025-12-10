import React from "react";
import { FaKey, FaUserPlus } from "react-icons/fa";
import { IoHelpCircle, IoSettings, IoTicket, IoShieldCheckmark, IoCash } from "react-icons/io5";

const FAQ = () => {
    const FAQS = [
        {
            question: "How do I create an account?",
            icon: <FaUserPlus className="w-5 h-5 text-primary" />,
            answer: `Click the "Sign Up" button on the top right and follow the registration steps.`
        },
        {
            question: "I forgot my password. What should I do?",
            icon: <FaKey className="w-5 h-5 text-primary" />,
            answer: `Click on "Forgot Password" on the login page and follow the email instructions.`
        },
        {
            question: "How do I update my profile information?",
            icon: <IoSettings className="w-5 h-5 text-primary" />,
            answer: `Go to "My Account" → "Edit Profile" and update your personal details.`
        },
        {
            question: "How do I buy a ticket on this platform?",
            icon: <IoHelpCircle className="w-5 h-5 text-primary" />,
            answer: `Browse available tickets → Select one → Click “Book Now” → Complete secure payment.`
        },
        {
            question: "Where can I see my booked tickets?",
            icon: <IoTicket className="w-5 h-5 text-primary" />,
            answer: `After booking, go to "My Tickets" to view, download, or manage your purchased tickets.`
        },
        {
            question: "Is my payment information secure?",
            icon: <IoShieldCheckmark className="w-5 h-5 text-primary" />,
            answer: `Yes, we use industry-standard encryption and do not store sensitive card details on our server.`
        },
        {
            question: "What is the refund or cancellation policy?",
            icon: <IoCash className="w-5 h-5 text-primary" />,
            answer: `Refunds depend on ticket type and provider rules. Visit “My Tickets” → select a ticket to check eligibility.`
        }
    ]
    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-10">
                Frequently Asked Questions
            </h2>
            <div data-aos="fade-in" className="space-y-4">
                {
                    FAQS.map((FAQ, i) => {
                        const { question, icon, answer } = FAQ
                        return (
                            <details key={i} className="collapse collapse-arrow bg-base-100 border border-base-300 shadow-md rounded-xl">
                                <summary className="collapse-title flex items-center gap-3 text-lg font-semibold">
                                    {icon}
                                    {question}
                                </summary>
                                <div className="collapse-content text-sm text-base-content/80">
                                    {answer}
                                </div>
                            </details>
                        )
                    })
                }
            </div>
        </section>
    );
};

export default FAQ;
