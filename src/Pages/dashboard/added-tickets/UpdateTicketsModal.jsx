import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { imageUpload } from '../../../utils/imageUpload';
import SwiftConfirm from '../../../utils/alerts/SwiftConfirm';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import SwiftAlert from '../../../utils/alerts/SwiftAlert';
import Loading from '../../../Components/Loading/Loading';
import Error from '../../error/Error';
import SmallLoader from '../../../Components/Loading/smallLoader';

const UpdateTicketsModal = ({ ticket, isOpen, setIsOpen, refetch }) => {
    const [pending, setPending] = useState(false)
    const axiosSecure = useAxiosSecure()

    const { _id, ticketName, from, to, price, quantity, departure, perks, transport_type, ticketURL } = ticket || {};


    const { mutateAsync, reset, isPending, isError } = useMutation({
        mutationFn: async (payload) => axiosSecure.patch(`/tickets/update/${_id}`, payload),
        onSuccess: () => {
            reset()
            refetch()
        },
        onError: (err) => {
            SwiftAlert({
                title: "Update failed",
                text: "Couldn't Update tickets",
                icon: "error"
            })
            console.log(err)
        }
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset: formReset
    } = useForm();

    const onSubmit = async (data) => {
        setPending(true)
        try {
            let prevImageURL = ticketURL

            const { departure, from, to, quantity, price, perks, image } = data

            if (image && image.length > 0) {
                // get image url
                const imageFile = image[0]
                prevImageURL = await imageUpload(imageFile)
            }

            // convert new departure time in iso
            const dateTimeString = new Date(departure)
            const isoTime = dateTimeString.toISOString()

            const updatedTicketInfo = {
                departure: isoTime,
                ticketURL: prevImageURL,
                from,
                to,
                perks,
                price: Number(price),
                quantity: Number(quantity),
            }

            console.log(updatedTicketInfo)
            const result = await SwiftConfirm({
                title: "Save changes?",
                text: "Are you sure you want to save these changes? You won't be able to revert this.",
                icon: "info"
            })
            if (result.isConfirmed) {
                const res = await mutateAsync(updatedTicketInfo)
                if (res.data.modifiedCount !== 0) {
                    SwiftAlert({
                        title: "Ticket Updated",
                        text: "Your ticked has been successfully updated"
                    })
                }
            }
        } catch (err) {
            SwiftAlert({
                title: "Update failed",
                text: "please, try again",
                icon: "error"
            })
            console.log(err)
        }
        finally {
            setPending(false)
            setIsOpen(false)
            formReset()
        }
    };

    if (isPending) return <Loading />

    if (isError) return <Error />

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                        <DialogPanel
                            as={motion.div}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-6"
                        >
                            <DialogTitle className="text-2xl font-bold text-gray-800">
                                Update Ticket
                            </DialogTitle>

                            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                                {/* Ticket Name (readonly) */}
                                <div>
                                    <label className="font-medium">Ticket Name</label>
                                    <input
                                        readOnly
                                        defaultValue={ticketName}
                                        className="input input-bordered w-full mt-1"
                                    />
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <label className="label">Upload New Image</label>
                                    <input
                                        {...register('image')}
                                        type="file"
                                        className="file-input w-full"
                                    />
                                </div>

                                {/* From / To */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="font-medium">From</label>
                                        <input
                                            {...register('from', { required: "From location is required" })}
                                            defaultValue={from}
                                            type="text"
                                            className="input input-bordered w-full mt-1"
                                        />
                                        {errors.from && <p className="text-xs text-red-500">{errors.from.message}</p>}
                                    </div>

                                    <div>
                                        <label className="font-medium">To</label>
                                        <input
                                            {...register('to', { required: "Destination is required" })}
                                            defaultValue={to}
                                            type="text"
                                            className="input input-bordered w-full mt-1"
                                        />
                                        {errors.to && <p className="text-xs text-red-500">{errors.to.message}</p>}
                                    </div>
                                </div>

                                {/* Departure */}
                                <div>
                                    <label className="font-medium">Departure Date & Time</label>
                                    <input
                                        {...register('departure', { required: "Departure date is required" })}
                                        defaultValue={departure?.slice(0, 16)}
                                        type="datetime-local"
                                        className="input input-bordered w-full mt-1"
                                    />
                                    {errors.departure && (
                                        <p className="text-xs text-red-500">{errors.departure.message}</p>
                                    )}
                                </div>

                                {/* Price / Quantity */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="font-medium">Price (৳)</label>
                                        <input
                                            {...register('price', {
                                                required: "Price is required",
                                                min: { value: 1, message: "Price must be greater than 0" }
                                            })}
                                            defaultValue={price}
                                            type="number"
                                            className="input input-bordered w-full mt-1"
                                        />
                                        {errors.price && (
                                            <p className="text-xs text-red-500">{errors.price.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="font-medium">Quantity</label>
                                        <input
                                            {...register('quantity', {
                                                required: "Quantity is required",
                                                min: { value: 1, message: "Quantity must be at least 1" }
                                            })}
                                            defaultValue={quantity}
                                            type="number"
                                            className="input input-bordered w-full mt-1"
                                        />
                                        {errors.quantity && (
                                            <p className="text-xs text-red-500">{errors.quantity.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="font-medium">Transport Type</label>
                                    <input
                                        readOnly
                                        defaultValue={transport_type}
                                        className="input input-bordered w-full mt-1"
                                    />
                                </div>

                                {/* Perks */}
                                <div className="col-span-2">
                                    <label className="label font-medium">Perks</label>

                                    <div className="flex flex-wrap gap-4">
                                        {["AC", "WiFi", "Breakfast", "Snacks"].map((perk) => (
                                            <label key={perk} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    {...register('perks')}
                                                    value={perk}
                                                    defaultChecked={perks?.includes(perk)}
                                                    className="checkbox"
                                                />
                                                {perk}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="px-4 py-2 rounded-lg my-gradient hover-gradient text-white font-semibold"
                                    >
                                        {
                                            pending ? <SmallLoader /> : "Save changes"
                                        }
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    );
};

export default UpdateTicketsModal;
