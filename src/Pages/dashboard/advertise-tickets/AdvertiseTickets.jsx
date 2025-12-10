import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Switch } from '@headlessui/react';
import { FaBullhorn } from "react-icons/fa";
import SwiftAlert from '../../../utils/alerts/SwiftAlert';
import SwiftConfirm from '../../../utils/alerts/SwiftConfirm';
import SmallLoader from '../../../Components/Loading/smallLoader';
import Loading from '../../../Components/Loading/Loading';

const AdvertiseTickets = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: tickets = [], isLoading } = useQuery({
        queryKey: ['tickets', 'accepted'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tickets?status=accepted');
            return res.data;
        }
    });

    const { mutateAsync } = useMutation({
        onMutate: async ({ advertise }) => {
            const result = await SwiftConfirm({
                title: "Are you sure?",
                text: `you want to ${advertise ? "advertise" : "unadvertised"} this ticket?`,
                icon: "info",
            })
            if (!result.isConfirmed) {
                throw { silent: true }
            }
        },
        mutationFn: async ({ id, advertise }) => {
            const res = await axiosSecure.patch(`/tickets/advertise/${id}`, { advertise });
            const result = res.data
            return { result, advertise }
        },
        onSuccess: ({ advertise }) => {
            queryClient.invalidateQueries(['tickets', 'accepted'])
            SwiftAlert({
                title: "Success",
                text: `This ticket has been ${advertise ? "advertised" : "unadvertised"}`
            })
        },
        onError: async (error) => {
            if (error?.silent) return

            SwiftAlert({
                title: "Error",
                text: error?.response?.data?.message || "Can't advertise more tickets",
                icon: "error"
            })
        }
    });

    if (isLoading) return <Loading />;

    return (
        <div className="p-6 mx-auto">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <FaBullhorn className="text-primary" /> Advertise Tickets
            </h2>

            <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 bg-white">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="py-3 px-4">#</th>
                            <th className="py-3 px-4">Title</th>
                            <th className="py-3 px-4">Category</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4">Seller</th>
                            <th className="py-3 px-4 text-center">Advertise</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tickets.map((ticket, index) => {
                            const { _id, ticketName, price, vendorEmail, transport_type, advertise } = ticket
                            return (
                                <tr
                                    key={_id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="py-3 px-4">{index + 1}</td>
                                    <td className="py-3 px-4 font-medium">{ticketName}</td>
                                    <td className="py-3 px-4">{transport_type}</td>
                                    <td className="py-3 px-4 font-semibold">${price}</td>
                                    <td className="py-3 px-4">{vendorEmail}</td>

                                    <td className="py-3 px-4 text-center">
                                        <Switch
                                            checked={advertise}
                                            onChange={async () =>
                                                await mutateAsync({ id: _id, advertise: !advertise })
                                            }
                                            className={`${ticket.advertise ? 'bg-green-600' : 'bg-gray-300'} relative inline-flex h-6 w-11 items-center rounded-full transition`}
                                        >
                                            <span
                                                className={`${ticket.advertise ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}>
                                            </span>

                                        </Switch>
                                    </td>
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </table>
            </div>

            <p className="text-sm text-gray-500 mt-3">
                * Maximum 6 tickets can be advertised at once.
            </p>
        </div>
    );
};

export default AdvertiseTickets;
