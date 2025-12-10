import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../Components/Loading/Loading";
import { Link } from "react-router";
import { BsChevronRight } from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateTicketsModal from "./UpdateTicketsModal";
import SwiftConfirm from "../../../utils/alerts/SwiftConfirm";
import SwiftAlert from "../../../utils/alerts/SwiftAlert";

const AddedTickets = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const { data: tickets, isLoading, refetch } = useQuery({
        queryKey: ["tickets"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets?email=${user?.email}`);
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    const handleEdit = (ticket) => {
        setSelectedTicket(ticket);
        setIsOpen(true);
    };

    const handleDelete = async (id) => {
        const result = await SwiftConfirm({
            title: "Are you sure? you want to delete this ticket?",
            text: "You won't be able to revert this",
            icon: "info"
        })
        if (result.isConfirmed) {
            axiosSecure.delete(`/tickets/delete/${id}`)
                .then(() => {
                    SwiftAlert({
                        title: "Successful",
                        text: "Ticket has been successfully deleted",
                    })
                    refetch()
                })
                .catch(err => {
                    SwiftAlert({
                        title: "Something went wrong",
                        text: "Couldn't delete tickets",
                        icon: "error"
                    })
                    console.log(err)
                })
        }
    }

    return (
        <div className="p-4">
            <h2 className="text-3xl font-semibold mb-6">Your Added Tickets</h2>

            {tickets?.length === 0 ? (
                <div className="min-h-[calc(100vh/2)] flex flex-col justify-center items-center gap-5">
                    <p className="text-gray-500 text-xl font-semibold">
                        No tickets found. You haven't added a ticket yet
                    </p>
                    <Link
                        to="/dashboard/add-ticket"
                        className="btn my-gradient hover-gradient text-white flex items-center"
                    >
                        Add a ticket <BsChevronRight strokeWidth={1.5} />
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tickets.map((ticket) => {
                        const disabled = ticket.verification_status === "rejected";

                        return (
                            <div
                                key={ticket._id}
                                className="rounded-2xl shadow-lg overflow-hidden flex flex-col bg-base-200"
                            >
                                <img
                                    src={ticket.ticketURL}
                                    alt={ticket.ticketName}
                                    className="h-70 w-full object-cover"
                                />

                                <div className="p-4 flex flex-col grow">
                                    <h3 className="text-xl font-semibold">{ticket.ticketName}</h3>

                                    <p className="text-gray-600 mt-1">
                                        {ticket.from} → {ticket.to}
                                    </p>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Departure: {new Date(ticket.departure).toLocaleString()}
                                    </p>

                                    <p className="font-semibold text-lg mt-3">৳ {ticket.price}</p>

                                    <div className="mt-3">
                                        <p className="text-sm font-semibold">Perks:</p>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {ticket.perks.map((perk, i) => (
                                                <span
                                                    key={i}
                                                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                                                >
                                                    {perk}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <span
                                            className={`px-3 py-1 text-xs font-semibold rounded-full
                                                ${ticket.verification_status === "accepted"
                                                    ? "bg-green-100 text-green-600"
                                                    : ticket.verification_status === "rejected"
                                                        ? "bg-red-100 text-red-600"
                                                        : "bg-yellow-100 text-yellow-600"
                                                }
                                            `}
                                        >
                                            {ticket.verification_status.toUpperCase()}
                                        </span>
                                    </div>

                                    <div className="flex gap-3 mt-5">
                                        <button
                                            onClick={() => {
                                                handleEdit(ticket)
                                                setSelectedTicket(ticket)
                                            }}
                                            disabled={disabled}
                                            className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-white
                                                ${disabled
                                                    ? "bg-gray-300 cursor-not-allowed"
                                                    : "bg-primary/80 hover:bg-primary transition-all"
                                                }
                                            `}
                                        >
                                            <FaEdit /> Update
                                        </button>

                                        <button
                                            onClick={() => handleDelete(ticket._id)}
                                            disabled={disabled}
                                            className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-red-600 font-semibold
                                                ${disabled
                                                    ? "bg-gray-300 cursor-not-allowed"
                                                    : "bg-white/80 cursor-pointer hover:bg-white hover:brightness-150"
                                                }
                                            `}
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            <UpdateTicketsModal
                ticket={selectedTicket}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                refetch={refetch}
            ></UpdateTicketsModal>

        </div>
    );
};

export default AddedTickets;
