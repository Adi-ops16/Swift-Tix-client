import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { imageUpload } from "../../../utils/imageUpload";
import SwiftAlert from "../../../utils/alerts/SwiftAlert";
import SmallLoader from "../../../Components/Loading/smallLoader";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SwiftConfirm from "../../../utils/alerts/SwiftConfirm";
import { useNavigate } from "react-router";

const AddTicket = () => {
    const [isPending, setIsPending] = useState(false)
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        setIsPending(true)
        try {
            const { departure, image, perks, from, to, price, quantity, ticketName, transport } = data

            const dateTimeString = new Date(departure)
            const isoTime = dateTimeString.toISOString()

            const imageFile = image[0]
            const ticketURL = await imageUpload(imageFile)

            const ticketInfo = {
                ticketName,
                ticketURL,
                departure: isoTime,
                perks,
                from,
                to,
                price: Number(price),
                quantity: Number(quantity),
                transport_type: transport,
                vendorEmail: user?.email,
                vendorName: user?.displayName
            }

            const result = await SwiftConfirm({
                title: "Are you sure?",
                text: "you want to add this ticket?",
                icon: "info",
                confirmText: "Yes, confirm"
            })
            if (result.isConfirmed) {
                // post the ticket in database
                axiosSecure.post('/tickets', ticketInfo)
                    .then(res => {
                        if (res.data.insertedId !== 0) {
                            SwiftAlert({
                                title: "Ticket added",
                                text: "Your ticket will be verified and confirmed soon",
                            })
                        }
                        navigate("/dashboard/added-tickets")
                    })
                    .catch(err => {
                        console.log(err)
                        SwiftAlert({
                            icon: "error",
                            title: "Failed Operation",
                            text: "Couldn't post ticket,please try again"
                        })
                    })
            }

        }
        catch (err) {
            console.log(err)
            SwiftAlert({
                title: "Unsuccessful",
                text: "Couldn't create ticket,please try again.",
                icon: "error"
            })
        }
        finally {
            setIsPending(false)
        }
    };

    return (
        <div className="min-h-[calc(100vh-150px)] flex justify-center items-center p-4">
            <div className="card w-full max-w-2xl shadow-xl p-6 rounded-2xl border border-gray-200">

                <h2 className="text-2xl md:text-3xl font-bold text-center bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
                    Add New Ticket
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Ticket Title */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="label">Ticket Title</label>
                        <input
                            {...register("ticketName", { required: "Ticket title is required" })}
                            type="text"
                            className="input w-full focus-within:outline-0"
                            placeholder="Enter ticket name"
                        />
                        {errors.ticketName && <p className="text-xs text-red-500">{errors.ticketName.message}</p>}
                    </div>

                    {/* From */}
                    <div>
                        <label className="label">From (Location)</label>
                        <input
                            {...register("from", { required: "From location is required" })}
                            type="text"
                            className="input w-full focus-within:outline-0"
                            placeholder="eg.Dhaka"
                        />
                        {errors.from && <p className="text-xs text-red-500">{errors.from.message}</p>}
                    </div>

                    {/* To */}
                    <div>
                        <label className="label">To (Location)</label>
                        <input
                            {...register("to", { required: "Destination is required" })}
                            type="text"
                            className="input w-full focus-within:outline-0"
                            placeholder="eg.Chittagong"
                        />
                        {errors.to && <p className="text-xs text-red-500">{errors.to.message}</p>}
                    </div>

                    {/* Transport Type */}
                    <div>
                        <label className="label">Transport Type</label>
                        <select
                            {...register("transport", { required: "Transport type is required" })}
                            className="select w-full focus-within:outline-0"
                        >
                            <option value="">Select</option>
                            <option value="bus">Bus</option>
                            <option value="train">Train</option>
                            <option value="plane">Plane</option>
                            <option value="launch">Launch</option>
                        </select>
                        {errors.transport && <p className="text-xs text-red-500">{errors.transport.message}</p>}
                    </div>

                    {/* Price */}
                    <div>
                        <label className="label">Price TK (per unit)</label>
                        <input
                            {...register("price", { required: "Price is required" })}
                            type="number"
                            className="input w-full focus-within:outline-0"
                            placeholder="1200"
                        />
                        {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="label">Ticket Quantity</label>
                        <input
                            {...register("quantity", { required: "Quantity is required" })}
                            type="number"
                            className="input w-full focus-within:outline-0"
                            placeholder="50"
                        />
                        {errors.quantity && <p className="text-xs text-red-500">{errors.quantity.message}</p>}
                    </div>

                    {/* Date & Time */}
                    <div>
                        <label className="label">Departure Date & Time</label>
                        <input
                            {...register("departure", { required: "Departure time is required" })}
                            type="datetime-local"
                            className="input w-full focus-within:outline-0"
                        />
                        {errors.departure && <p className="text-xs text-red-500">{errors.departure.message}</p>}
                    </div>

                    {/* Image Upload */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="label">Upload Image (image of the) </label>
                        <input
                            {...register("image", { required: "Image is required" })}
                            type="file"
                            className="file-input w-full"
                        />
                        {errors.image && <p className="text-xs text-red-500">{errors.image.message}</p>}
                    </div>

                    {/* Vendor Name */}
                    <div>
                        <label className="label">Vendor Name</label>
                        <input
                            type="text"
                            value={`${user?.displayName}`}
                            readOnly
                            className="input w-full bg-gray-100 focus-within:outline-0"
                        />
                    </div>

                    {/* Vendor Email */}
                    <div>
                        <label className="label">Vendor Email</label>
                        <input
                            type="email"
                            value={`${user?.email}`}
                            readOnly
                            className="input w-full bg-gray-100 focus-within:outline-0"
                        />
                    </div>

                    {/* Perks */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="label">Perks</label>

                        <div className="flex flex-wrap gap-4">

                            <label className="flex items-center gap-2">
                                <input type="checkbox" {...register("perks")} value="AC" className="checkbox" />
                                AC
                            </label>

                            <label className="flex items-center gap-2">
                                <input type="checkbox" {...register("perks")} value="WiFi" className="checkbox" />
                                WiFi
                            </label>

                            <label className="flex items-center gap-2">
                                <input type="checkbox" {...register("perks")} value="Breakfast" className="checkbox" />
                                Breakfast
                            </label>

                            <label className="flex items-center gap-2">
                                <input type="checkbox" {...register("perks")} value="Snacks" className="checkbox" />
                                Snacks
                            </label>

                        </div>
                    </div>

                    {/* Submit */}
                    <div className="col-span-1 md:col-span-2 mt-4">
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl font-bold text-white bg-linear-to-r from-primary to-secondary hover:opacity-90 transition">
                            {isPending ? <SmallLoader /> : "Add ticket"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddTicket;
