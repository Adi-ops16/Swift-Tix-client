import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import { imageUpload } from "../../../utils/imageUpload";
import SwiftConfirm from "../../../utils/alerts/SwiftConfirm";
import SwiftAlert from "../../../utils/alerts/SwiftAlert";
import SmallLoader from "../../../Components/Loading/smallLoader";

const Profile = () => {
    const [isPending, setIsPending] = useState(false)
    const { user, updateUserInfo, setLoading } = useAuth();
    const { role } = useRole()
    const [isOpen, setIsOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: user?.displayName || ""
        }
    });

    const onSubmit = async (data) => {
        setIsPending(true)
        try {
            const { name, image } = data
            const imageFile = image[0]

            let photoLink = user?.photoURL

            if (image && image.length > 0) {
                photoLink = await imageUpload(imageFile)
            }

            const updatedProfileInfo = {
                displayName: name,
                photoURL: photoLink
            }

            const result = await SwiftConfirm({
                title: "Profile Update",
                text: "Do you want to save this changes?",
                icon: "info",
                confirmText: "Yes"
            })
            if (result.isConfirmed) {
                updateUserInfo(updatedProfileInfo)
                    .then(() => {
                        setLoading(false)
                        SwiftAlert({
                            title: "Successful",
                            text: "Your profile has been updated",
                        })
                        setIsOpen(false)
                    })
            }
        }
        catch (err) {
            console.log(err)
            SwiftAlert({
                icon: "error",
                title: "Something went wrong",
                text: "Couldn't update your profile, please try again"
            })
        }
        finally {
            setIsPending(false)
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-oklch-95 px-4 py-10">
            <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Your Profile
            </h1>
            <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center space-y-5">

                {/* Avatar */}
                <div className="flex justify-center">
                    <img
                        src={user?.photoURL}
                        alt="profile"
                        className="w-28 h-28 rounded-full border-4 border-oklch-90 object-cover"
                    />
                </div>

                <h2 className="text-2xl font-bold text-oklch-20">
                    {user?.displayName}
                </h2>

                <p className="text-oklch-40">
                    {user?.email}
                </p>

                <p className="text-oklch-40">Role: {role}</p>

                <div className="border-t border-oklch-90 pt-4"></div>

                <button
                    onClick={() => setIsOpen(true)}
                    className="swift-btn my-gradient hover-gradient text-white px-6 py-2 rounded-xl font-semibold shadow"
                >
                    Edit Profile
                </button>
            </div>

            {/*Edit Modal*/}

            <AnimatePresence>
                {isOpen && (
                    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

                        <div className="fixed inset-0 flex items-center justify-center p-4">
                            <DialogPanel
                                as={motion.div}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.25 }}
                                className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 space-y-6"
                            >
                                <DialogTitle className="text-2xl font-bold text-gray-800">
                                    Edit Profile
                                </DialogTitle>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                                    {/* Name */}
                                    <div>
                                        <label className="font-medium">Name</label>
                                        <input
                                            {...register("name", { required: "Name is required" })}
                                            defaultValue={user?.displayName}
                                            type="text"
                                            className="input input-bordered w-full mt-1"
                                        />
                                        {errors.name && (
                                            <p className="text-xs text-red-500">{errors.name.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="font-medium">Upload New Photo</label>
                                        <input
                                            {...register("image")}
                                            type="file"
                                            accept="image/*"
                                            className="file-input w-full mt-1"
                                        />
                                    </div>

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
                                            {isPending ?
                                                <SmallLoader /> :
                                                "Save Changes"
                                            }
                                        </button>
                                    </div>
                                </form>
                            </DialogPanel>
                        </div>
                    </Dialog>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Profile;
