import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import NotFound from "../../../Components/not-found/NotFound";
import SwiftConfirm from "../../../utils/alerts/SwiftConfirm";
import SwiftAlert from "../../../utils/alerts/SwiftAlert";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SmallLoader from "../../../Components/Loading/smallLoader";
import Loading from "../../../Components/Loading/Loading";

const ManageTickets = () => {
    const [isPending, setIsPending] = useState(false)
    const axios = useAxios();
    const axiosSecure = useAxiosSecure()

    const { data: tickets = [], refetch, isLoading } = useQuery({
        queryKey: ["tickets"],
        queryFn: async () => {
            const res = await axios.get("/tickets");
            return res.data;
        },
    });

    if (isLoading) {
        return <Loading></Loading>
    }

    if (tickets?.length === 0) {
        return <div>
            <p className="text-center text-4xl font-bold text-secondary pt-6">
                No tickets available
            </p>
            <NotFound></NotFound>
        </div>
    }

    const handleStatus = async (id, status) => {
        setIsPending(true)
        const statusInfo = {
            id,
            status
        }
        try {
            const result = await SwiftConfirm({
                title: `Are you sure?`,
                text: `you want to ${status === 'accepted' ? "accept" : "reject"} this task?`,
                icon: "info"
            })
            if (result.isConfirmed) {
                axiosSecure.patch('/tickets/status', statusInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            SwiftAlert({
                                title: "Success",
                                text: `Ticket has been ${status}`
                            })
                            refetch()
                        }
                    })
            }
        }
        catch (err) {
            console.log(err)
            SwiftAlert({
                title: "Something went wrong",
                text: `please try again`,
                icon: "error"
            })
        }
        finally {
            setIsPending(false)
        }
    }

    return (
        <div className="px-4 py-10 bg-oklch-90">
            {/* Page Title */}
            <h2 className="text-4xl font-bold mb-8 text-center">
                Manage Tickets
            </h2>

            {/* Table Container */}
            <div className="bg-white shadow-xl rounded-2xl p-6">
                <div className="overflow-x-auto rounded-xl">
                    <table className="table table-zebra">
                        {/* Table Head */}
                        <thead className="bg-oklch-92 text-oklch-20 font-semibold">
                            <tr>
                                <th>#</th>
                                <th>Ticket</th>
                                <th>Transport type</th>
                                <th>Vendor</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="text-oklch-30">
                            {tickets.map((ticket, i) => (
                                <tr
                                    key={ticket._id}
                                    className="hover:bg-oklch-96 transition"
                                >
                                    <td className="font-semibold">{i + 1}</td>

                                    {/* Ticket Name */}
                                    <td className="font-semibold text-oklch-20">
                                        {ticket.ticketName}
                                    </td>
                                    {/* type */}
                                    <td className="font-semibold text-oklch-20">
                                        {ticket.transport_type}
                                    </td>

                                    {/* Vendor Name */}
                                    <td>{ticket.vendorName}</td>

                                    {/* Price */}
                                    <td>${ticket.price}</td>

                                    {/* Status */}
                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold
                                            ${ticket.verification_status === "accepted"
                                                ? "bg-green-100 text-green-600"
                                                : ticket.verification_status === "rejected"
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-amber-100 text-amber-600"
                                            }
                                        `}>
                                            {ticket.verification_status}
                                        </span>
                                    </td>

                                    {/* Action Buttons */}
                                    <td>
                                        {ticket.verification_status === 'pending' &&
                                            <div className="flex items-center justify-center gap-3 flex-wrap">

                                                {/* Approve */}
                                                <button
                                                    onClick={() => handleStatus(ticket?._id, 'accepted')}
                                                    className="px-3 py-1 rounded-lg my-gradient hover-gradient text-white text-sm flex items-center gap-2 shadow"
                                                >
                                                    <FaCheckCircle size={16} />
                                                    {
                                                        isPending ? <SmallLoader /> : "Accept"
                                                    }
                                                </button>

                                                {/* Reject */}
                                                <button
                                                    onClick={() => handleStatus(ticket?._id, 'rejected')}
                                                    className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 flex items-center gap-2 shadow"
                                                >
                                                    <MdCancel size={18} />
                                                    Reject
                                                </button>

                                            </div>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageTickets;
