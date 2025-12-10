import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "../../../Components/Shared/GoogleLogin";
import { useForm } from "react-hook-form";
import loginAnimation from "../../../animations/Login.json";
import Lottie from "lottie-react";
import Logo from "../../../Components/Shared/Logo";
import useAuth from "../../../Hooks/useAuth";
import SwiftAlert from "../../../utils/alerts/SwiftAlert";
import SmallLoader from "../../../Components/Loading/smallLoader";

const Login = () => {
    const [isPending, setIsPending] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const { login } = useAuth()

    const location = useLocation()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            setIsPending(true)
            const { email, password } = data

            await login(email, password)
                .then(() => {
                    SwiftAlert({
                        title: "Welcome Back",
                        text: "Login successful",
                    })
                    navigate(location.state || "/")
                })
        }
        catch (err) {
            console.log(err)
            SwiftAlert({
                title: "Login failed",
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
                    animationData={loginAnimation}
                    className="max-w-[420px] w-full"
                />
            </div>

            <div className="w-full md:w-1/2 flex justify-center items-center my-10">

                <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-lg border border-base-300 p-8">
                    <div className="flex justify-center w-full">
                        <Logo></Logo>
                    </div>

                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-extrabold text-primary tracking-wide">
                            Welcome Back
                        </h1>
                        <p className="text-base-content/70 mt-1">
                            Login to continue your SwiftTix journey
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* Email */}
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-sm">Email</label>
                            <input
                                type="email"
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary/40"
                                placeholder="Enter your email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Please enter a valid email address"
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
                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary/40"
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: "Password is required",
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.{6,}).*$/,
                                        message:
                                            "Your password must be at least 6 characters long and contain both uppercase and lowercase letters."
                                    }
                                })}
                            />
                            {errors.password && (
                                <p className="text-xs text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="text-right">
                            <a className="link link-hover text-sm text-primary font-semibold">
                                Forgot password?
                            </a>
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

                    {/* Google Login */}
                    <GoogleLogin title="Login" state={location.state} />

                    {/* Register Link */}
                    <p className="mt-5 text-center text-sm">
                        Don't have an account?{" "}
                        <Link
                            state={location.state}
                            to="/auth/register"
                            className="font-bold text-primary underline hover:opacity-80"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
