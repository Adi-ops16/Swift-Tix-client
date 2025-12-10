import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import GoogleLogin from '../../../Components/Shared/GoogleLogin';
import { useForm } from 'react-hook-form';
import registerAnimation from '../../../animations/register.json';
import Lottie from 'lottie-react';
import useAxios from '../../../Hooks/useAxios';
import useAuth from '../../../Hooks/useAuth';
import SwiftAlert from '../../../utils/alerts/SwiftAlert';
import Logo from '../../../Components/Shared/Logo';
import SmallLoader from '../../../Components/Loading/smallLoader';
import { imageUpload } from '../../../utils/imageUpload';

const Register = () => {
    const [isPending, setIsPending] = useState(false)
    const axios = useAxios()
    const { createUser, setUser, updateUserInfo, setLoading } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();



    const onSubmit = async (data) => {
        try {

            setIsPending(true)

            const { data: emails } = await axios.get('/users')
            const existingEmail = emails.find(e => e.email === data.email)
            if (existingEmail) {
                setIsPending(false)
                return SwiftAlert({
                    icon: "error",
                    title: "Email already in use",
                    text: "Please try another email"
                })
            }

            const { name, email, image, password } = data

            let photoURL = "https://i.ibb.co.com/BKZZLqwM/default-Logo.jpg"

            if (image && image.length > 0) {

                const imageFile = image[0]

                photoURL = await imageUpload(imageFile)
            }

            // setting name and image_url to update
            const updatedInfo = {
                photoURL,
                displayName: name
            }


            // creating user in firebase
            await createUser(email, password)
                .then(async res => {

                    // user data to post on DB
                    const user = {
                        displayName: name,
                        photoURL,
                        email: email
                    }
                    setIsPending(false)

                    // set user in database
                    await axios.post('/users', user)
                        .then(() => {
                            SwiftAlert({
                                title: "Welcome To Swift-Tix",
                                text: "Registration successful"
                            })
                            setUser(res.user)

                            // update the user data
                            updateUserInfo(updatedInfo)

                            setLoading(false)

                            navigate(location.state || "/")
                        })

                })
        }
        catch (err) {
            console.log(err)
            SwiftAlert({
                title: "Registration failed",
                text: err.message || "something went wrong",
                icon: "error"
            })
        }
        finally {
            setIsPending(false)
        }

    };

    return (
        <div className="min-h-[calc(100vh-100px)] flex flex-col md:flex-row items-center justify-center px-6 gap-6 md:gap-10">

            <div className="w-full md:w-1/2 flex justify-center items-center">
                <Lottie
                    animationData={registerAnimation}
                    className="max-w-[420px] w-full"
                />
            </div>

            <div className="w-full md:w-1/2 flex justify-center items-center my-10">

                <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-lg border border-base-300 p-8">
                    <div className='flex justify-center w-full'>
                        <Logo></Logo>
                    </div>
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-extrabold text-primary tracking-wide">
                            Create Your Account
                        </h1>
                        <p className="text-base-content/70 mt-1">
                            Join SwiftTix and experience seamless ticket booking
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* Name */}
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-sm">Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary/40"
                                {...register("name", {
                                    required: "Name is required",
                                    maxLength: {
                                        value: 20,
                                        message: "Name must be less than 20 characters"
                                    }
                                })}
                            />
                            {errors.name && (
                                <p className="text-xs text-red-500">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Photo */}
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-sm">Photo</label>
                            <input
                                {...register('image')}
                                type="file"
                                className="file-input file-input-bordered w-full"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-sm">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary/40"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Please enter a valid email"
                                    }
                                })}
                            />
                            {errors.email && (
                                <p className="text-xs text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-sm">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary/40"
                                {...register("password", {
                                    required: "Password is required",
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.{6,}).*$/,
                                        message:
                                            "Password must be 6+ chars and contain both uppercase & lowercase letters"
                                    }
                                })}
                            />
                            {errors.password && (
                                <p className="text-xs text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        {isPending ?
                            <div className='btn w-full bg-white text-black border-[#e5e5e5]'>
                                <SmallLoader></SmallLoader>
                            </div>
                            :
                            <button className="w-full py-3 rounded-xl font-bold text-lg my-gradient hover-gradient swift-btn transition-all">
                                Sign Up
                            </button>
                        }

                    </form>

                    <div className="my-5 flex items-center gap-3">
                        <div className="flex-1 h-px bg-base-300"></div>
                        <span className="text-sm text-base-content/60">OR</span>
                        <div className="flex-1 h-px bg-base-300"></div>
                    </div>

                    <GoogleLogin title="Sign Up" state={location.state} />

                    <p className="mt-5 text-center text-sm">
                        Already have an account?{" "}
                        <Link
                            to="/auth/login"
                            className="font-bold text-primary underline hover:opacity-80"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
